from enum import Enum

class TemplateType(Enum):
    EXECUTE = 1
    SCRIPT = 2

class Template:
    def __init__(self, p_text, p_type=TemplateType.EXECUTE):
        self.v_text = p_text
        self.v_type = p_type

def GetBDRVersion(p_database_object):
    return p_database_object.v_connection.ExecuteScalar('''
        select extversion
        from pg_extension
        where extname = 'bdr'
    ''')

def GetBDRNodeName(p_database_object):
    return p_database_object.v_connection.ExecuteScalar('''
        select quote_ident(n.node_name) as node_name
        from bdr.node b
        inner join pglogical.node n
        on n.node_id = b.pglogical_node_id
        inner join pglogical.local_node l
        on l.node_id = n.node_id
        where bdr.peer_state_name(b.local_state) not like '%PART%'
        limit 1
    ''')

def QueryBDRProperties(p_database_object):
    return p_database_object.v_connection.Query('''
        select (select extversion
                from pg_extension
                where extname = 'bdr') as version,
               (select count(*)
                from bdr.node b
                inner join bdr.node_group g
                on g.node_group_id = b.node_group_id
                inner join pglogical.node n
                on n.node_id = b.pglogical_node_id
                inner join pglogical.local_node l
                on l.node_id = n.node_id
                where bdr.peer_state_name(b.local_state) not like '%PART%'
                limit 1) >= 1 as active,
               coalesce((select quote_ident(n.node_name)
                         from bdr.node b
                         inner join pglogical.node n
                         on n.node_id = b.pglogical_node_id
                         inner join pglogical.local_node l
                         on l.node_id = n.node_id
                         where bdr.peer_state_name(b.local_state) not like '%PART%'), 'Not set') as node_name,
               False as paused,
               (select bdr.peer_state_name(b.local_state)
                from bdr.node b
                inner join pglogical.node n
                on n.node_id = b.pglogical_node_id
                inner join pglogical.local_node l
                on l.node_id = n.node_id
                where bdr.peer_state_name(b.local_state) not like '%PART%') as node_state
    ''')

def QueryBDRGroups(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(node_group_name) as group_name
        from bdr.node_group
        order by 1
    ''')

def QueryBDRGroupNodes(p_database_object, p_group):
    return p_database_object.v_connection.Query('''
        select quote_ident(n.node_name) || (case when l.node_id is not null then ' (local)' else '' end) as node_name,
               bdr.peer_state_name(b.local_state) as node_state,
               l.node_id is not null as node_is_local
        from bdr.node b
        inner join bdr.node_group g
        on g.node_group_id = b.node_group_id
        inner join pglogical.node n
        on n.node_id = b.pglogical_node_id
        left join pglogical.local_node l
        on l.node_id = n.node_id
        where bdr.peer_state_name(b.local_state) not like '%PART%'
          and g.node_group_name = '{0}'
        order by 1
    '''.format(p_group))

def QueryBDRGroupTables(p_database_object, p_group):
    return p_database_object.v_connection.Query('''
        select quote_ident(n.nspname) || '.' || quote_ident(c.relname) as table_name
        from pglogical.replication_set_table t
        inner join pglogical.replication_set r
        on r.set_id = t.set_id
        inner join pg_class c
        on c.oid = t.set_reloid
        inner join pg_namespace n
        on n.oid = c.relnamespace
        where quote_ident(r.set_name) = '{0}'
        order by 1
    '''.format(p_group))

def TemplateBDRCreateLocalNode(p_database_object):
    return Template('''select bdr.create_node(
'node_name'
, 'host={0} port={1} dbname={2}'
)
'''.format(p_database_object.v_server, p_database_object.v_port, p_database_object.v_service))

def TemplateBDRPromoteLocalNode():
    return Template('select bdr.promote_node()')

def TemplateBDRCreateGroup():
    return Template('''select bdr.create_node_group('group_name')''')

def TemplateBDRJoinGroup():
    return Template('''select bdr.join_node_group(
join_target_dsn := 'host= port= dbname='
, node_group_name := 'group_name'
--, pause_in_standby := false
)
''')

def TemplateBDRJoinWait():
    return Template('''select bdr.wait_for_join_completion(
-- verbose_progress := false
)
''')

def TemplateBDRReplicateDDLCommand():
    return Template('''select bdr.replicate_ddl_command(
$$ DDL command here... $$
--, replication_sets := null:text[]
)
''')

def TemplateBDRPartNode():
    return Template('''select bdr.part_node(
node_name := '#node_name#'
--, wait_for_completion := true
)
''')

def TemplateBDRGroupAddTable():
    return Template('''select bdr.replication_set_add_table(
relation := 'schema.table'::regclass
--, set_name := '#group_name#'
--, synchronize_data := true
--, columns := null::text[]
--, row_filter := null
)''')

def TemplateBDRGroupRemoveTable():
    return Template('''select bdr.replication_set_remove_table(
relation := '#table_name#'::regclass
--, set_name := '#group_name#'
)''')
