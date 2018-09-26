from enum import Enum

class TemplateType(Enum):
    EXECUTE = 1
    SCRIPT = 2

class Template:
    def __init__(self, p_text, p_type=TemplateType.EXECUTE):
        self.v_text = p_text
        self.v_type = p_type

def GetXLVersion(p_database_object):
    return p_database_object.v_connection.ExecuteScalar('show server_version')

def QueryXLNodes(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(node_name) as node_name,
               (case node_type
                  when 'C' then 'coordinator'
                  when 'D' then 'datanode'
                end) as node_type,
               node_host,
               node_port,
               nodeis_primary,
               nodeis_preferred
        from pgxc_node
        order by 1
    ''')

def QueryXLGroups(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(group_name) as group_name
        from pgxc_group
        order by 1
    ''')

def QueryXLGroupNodes(p_database_object, p_group):
    return p_database_object.v_connection.Query('''
        select quote_ident(n.node_name) as node_name
        from (
        select unnest(group_members) as group_member
        from pgxc_group
        where group_name = '{0}'
        ) g
        inner join pgxc_node n
        on n.oid = g.group_member
        order by 1
    '''.format(p_group))

def QueryTablesXLProperties(p_database_object, p_table, p_schema):
    v_filter = "and quote_ident(n.nspname) = '{0}' and quote_ident(c.relname) = '{1}' ".format(p_schema, p_table)
    return p_database_object.v_connection.Query('''
        select quote_ident(n.nspname) as schema_name,
               quote_ident(c.relname) as table_name,
               (case x.pclocatortype
                  when 'R' then 'replication'
                  when 'N' then 'roundrobin'
                  when 'H' then 'hash (' || a.attname || ')'
                  when 'M' then 'modulo (' || a.attname || ')'
                end) as distributed_by,
               (t.num_nodes = d.num_nodes) as all_nodes
        from pgxc_class x
        inner join pg_class c
        on c.oid = x.pcrelid
        inner join pg_namespace n
        on n.oid = c.relnamespace
        left join pg_attribute a
        on a.attrelid = c.oid
        and a.attnum = x.pcattnum
        inner join (
        select t.pcrelid,
               count(*) as num_nodes
        from (
        select pcrelid,
               unnest(nodeoids) as nodeoid
        from pgxc_class
        ) t
        group by t.pcrelid
        ) t
        on t.pcrelid = c.oid
        inner join (
        select count(*) as num_nodes
        from pgxc_node
        where node_type = 'D'
        ) d
        on 1=1
        where 1=1
        {0}
    '''.format(v_filter), True)

def QueryTablesXLNodes(p_database_object, p_table, p_schema):
    v_filter = "and quote_ident(t.schema_name) = '{0}' and quote_ident(t.table_name) = '{1}' ".format(p_schema, p_table)
    return p_database_object.v_connection.Query('''
        select quote_ident(t.schema_name) as schema_name,
               quote_ident(t.table_name) as table_name,
               quote_ident(n.node_name) as node_name
        from (
        select n.nspname as schema_name,
               c.relname as table_name,
               unnest(nodeoids) as nodeoid
        from pgxc_class x
        inner join pg_class c
        on c.oid = x.pcrelid
        inner join pg_namespace n
        on n.oid = c.relnamespace
        ) t
        inner join pgxc_node n
        on n.oid = t.nodeoid
        where 1=1
        {0}
        order by 1, 2, 3
    '''.format(v_filter), True)

def TemplateXLPauseCluster(p_database_object):
    return Template('PAUSE CLUSTER')

def TemplateXLUnpauseCluster(p_database_object):
    return Template('UNPAUSE CLUSTER')

def TemplateXLCleanConnection(p_database_object):
    return Template('''CLEAN CONNECTION TO
--COORDINATOR ( nodename [, ... ] )
--NODE ( nodename [, ... ] )
--ALL
--ALL FORCE
--FOR DATABASE database_name
--TO USER role_name
''')

def TemplateXLCreateGroup(p_database_object):
    v_text = '''-- This command needs to be executed in all nodes.
-- Please adjust the parameters in all commands below.

'''
    v_table = QueryXLNodes(p_database_object)
    for r in v_table.Rows:
        v_text = v_text + '''EXECUTE DIRECT ON ({0}) 'CREATE NODE GROUP name WITH ( nodename [, ... ] )'

'''.format(r['node_name'])
    return Template(v_text)

def TemplateXLDropGroup(p_database_object):
    v_text = '''-- This command needs to be executed in all nodes.

'''
    v_table = QueryXLNodes(p_database_object)
    for r in v_table.Rows:
        v_text = v_text + '''EXECUTE DIRECT ON ({0}) 'DROP NODE GROUP #group_name#'

'''.format(r['node_name'])
    return Template(v_text)

def TemplateXLCreateNode(p_database_object):
    v_text = '''-- This command needs to be executed in all nodes.
-- Please adjust the parameters in all commands below.

'''
    v_table = QueryXLNodes(p_database_object)
    for r in v_table.Rows:
        v_text = v_text + '''EXECUTE DIRECT ON ({0}) 'CREATE NODE name WITH (
TYPE = {{ coordinator | datanode }},
HOST = hostname,
PORT = portnum
--, PRIMARY
--, PREFERRED
)'

'''.format(r['node_name'])
    return Template(v_text)

def TemplateXLAlterNode(p_database_object):
    v_text = '''-- This command needs to be executed in all nodes.
-- Please adjust the parameters in all commands below.

'''
    v_table = QueryXLNodes(p_database_object)
    for r in v_table.Rows:
        v_text = v_text + '''EXECUTE DIRECT ON ({0}) 'ALTER NODE #node_name# WITH (
TYPE = {{ coordinator | datanode }},
HOST = hostname,
PORT = portnum
--, PRIMARY
--, PREFERRED
)'

'''.format(r['node_name'])
    return Template(v_text)

def TemplateXLExecuteDirect(p_database_object):
    return Template('''EXECUTE DIRECT ON (#node_name#)
'SELECT ...'
''')

def TemplateXLPoolReload(p_database_object):
    return Template('EXECUTE DIRECT ON (#node_name#) \'SELECT pgxc_pool_reload()\'')

def TemplateXLDropNode(p_database_object):
    v_text = '''-- This command needs to be executed in all nodes.

'''
    v_table = QueryXLNodes(p_database_object)
    for r in v_table.Rows:
        v_text = v_text + '''EXECUTE DIRECT ON ({0}) 'DROP NODE #node_name#'

'''.format(r['node_name'])
    return Template(v_text)

def TemplateXLAlterTableDistribution(p_database_object):
    return Template('''ALTER TABLE #table_name# DISTRIBUTE BY
--REPLICATION
--ROUNDROBIN
--HASH ( column_name )
--MODULO ( column_name )
''')

def TemplateXLAlterTableLocation(p_database_object):
    return Template('''ALTER TABLE #table_name#
TO NODE ( nodename [, ... ] )
--TO GROUP ( groupname [, ... ] )
''')

def TemplateXLALterTableAddNode(p_database_object):
    return Template('ALTER TABLE #table_name# ADD NODE (node_name)')

def TemplateXLAlterTableDeleteNode(p_database_object):
    return Template('ALTER TABLE #table_name# DELETE NODE (#node_name#)')
