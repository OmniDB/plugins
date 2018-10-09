from enum import Enum

class TemplateType(Enum):
    EXECUTE = 1
    SCRIPT = 2

class Template:
    def __init__(self, p_text, p_type=TemplateType.EXECUTE):
        self.v_text = p_text
        self.v_type = p_type

def GetPglogicalVersion(p_database_object):
    return p_database_object.v_connection.ExecuteScalar('''
        select extversion
        from pg_extension
        where extname = 'pglogical'
    ''')

def QueryPglogicalNodes(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(n.node_name) || (case when l.node_id is not null then ' (local)' else '' end) as node_name
        from pglogical.node n
        left join pglogical.local_node l
        on l.node_id = n.node_id
        order by 1
    ''')

def QueryPglogicalNodeInterfaces(p_database_object, p_node):
    return p_database_object.v_connection.Query('''
        select i.if_name,
               i.if_dsn
        from pglogical.node_interface i
        inner join pglogical.node n
        on n.node_id = i.if_nodeid
        where n.node_name = '{0}'
    '''.format(p_node))

def QueryPglogicalReplicationSets(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(set_name) as set_name,
               replicate_insert,
               replicate_update,
               replicate_delete,
               replicate_truncate
        from pglogical.replication_set
        order by 1
    ''')

def QueryPglogicalReplicationSetTables(p_database_object, p_repset):
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
    '''.format(p_repset))

def QueryPglogicalReplicationSetSequences(p_database_object, p_repset):
    return p_database_object.v_connection.Query('''
        select quote_ident(n.nspname) || '.' || quote_ident(c.relname) as sequence_name
        from pglogical.replication_set_seq t
        inner join pglogical.replication_set r
        on r.set_id = t.set_id
        inner join pg_class c
        on c.oid = t.set_seqoid
        inner join pg_namespace n
        on n.oid = c.relnamespace
        where quote_ident(r.set_name) = '{0}'
        order by 1
    '''.format(p_repset))

def QueryPglogicalSubscriptions(p_database_object):
    return p_database_object.v_connection.Query('''
        select quote_ident(s.sub_name) as sub_name,
               (select status from pglogical.show_subscription_status(s.sub_name)) as sub_status,
               quote_ident(n.node_name) as sub_origin,
               s.sub_enabled,
               s.sub_apply_delay::text as sub_apply_delay
        from pglogical.subscription s
        inner join pglogical.node n
        on n.node_id = s.sub_origin
        order by 1
    ''')

def QueryPglogicalSubscriptionReplicationSets(p_database_object, p_subscription):
    return p_database_object.v_connection.Query('''
        select quote_ident(unnest(s.sub_replication_sets)) as set_name
        from pglogical.subscription s
        inner join pglogical.node n
        on n.node_id = s.sub_origin
        where quote_ident(s.sub_name) = '{0}'
    '''.format(p_subscription))

def TemplatePglogicalCreateNode(p_database_object):
    return Template('''select pglogical.create_node(
node_name := 'node_name',
dsn := 'host={0} port={1} dbname={2} user={3} password=password'
)
'''.format(p_database_object.v_server, p_database_object.v_port, p_database_object.v_service, p_database_object.v_user))

def TemplatePglogicalDropNode(p_database_object):
    return Template('''select pglogical.drop_node(
node_name := '#node_name#',
ifexists := true
)''')

def TemplatePglogicalNodeAddInterface(p_database_object):
    return Template('''select pglogical.alter_node_add_interface(
node_name := '#node_name#',
interface_name := 'name',
dsn := 'host= port= dbname= user= password='
)''')

def TemplatePglogicalNodeDropInterface(p_database_object):
    return Template('''select pglogical.alter_node_drop_interface(
node_name := '#node_name#',
interface_name := '#interface_name#'
)''')

def TemplatePglogicalCreateReplicationSet(p_database_object):
    return Template('''select pglogical.create_replication_set(
set_name := 'name',
replicate_insert := true,
replicate_update := true,
replicate_delete := true,
replicate_truncate := true
)''')

def TemplatePglogicalAlterReplicationSet(p_database_object):
    return Template('''select pglogical.alter_replication_set(
set_name := '#repset_name#',
replicate_insert := true,
replicate_update := true,
replicate_delete := true,
replicate_truncate := true
)''')

def TemplatePglogicalDropReplicationSet(p_database_object):
    return Template('''select pglogical.drop_replication_set(
set_name := '#repset_name#',
ifexists := true
)''')

def TemplatePglogicalReplicationSetAddTable(p_database_object):
    return Template('''select pglogical.replication_set_add_table(
set_name := '#repset_name#',
relation := 'schema.table'::regclass,
synchronize_data := true,
columns := null,
row_filter := null
)''')

def TemplatePglogicalReplicationSetAddAllTables(p_database_object):
    return Template('''select pglogical.replication_set_add_all_tables(
set_name := '#repset_name#',
schema_names := ARRAY['public'],
synchronize_data := true
)''')

def TemplatePglogicalReplicationSetRemoveTable(p_database_object):
    return Template('''select pglogical.replication_set_remove_table(
set_name := '#repset_name#',
relation := '#table_name#'::regclass
)''')

def TemplatePglogicalReplicationSetAddSequence(p_database_object):
    return Template('''select pglogical.replication_set_add_sequence(
set_name := '#repset_name#',
relation := 'schema.sequence'::regclass,
synchronize_data := true
)''')

def TemplatePglogicalReplicationSetAddAllSequences(p_database_object):
    return Template('''select pglogical.replication_set_add_all_sequences(
set_name := '#repset_name#',
schema_names := ARRAY['public'],
synchronize_data := true
)''')

def TemplatePglogicalReplicationSetRemoveSequence(p_database_object):
    return Template('''select pglogical.replication_set_remove_sequence(
set_name := '#repset_name#',
relation := '#sequence_name#'::regclass
)''')

def TemplatePglogicalCreateSubscription(p_database_object):
    return Template('''select pglogical.create_subscription(
subscription_name := 'sub_name',
provider_dsn := 'host= port= dbname= user= password=',
replication_sets := array['default','default_insert_only','ddl_sql'],
synchronize_structure := true,
synchronize_data := true,
forward_origins := array['all'],
apply_delay := '0 seconds'::interval
)''')

def TemplatePglogicalEnableSubscription(p_database_object):
    return Template('''select pglogical.alter_subscription_enable(
subscription_name := '#sub_name#',
immediate := true
)''')

def TemplatePglogicalDisableSubscription(p_database_object):
    return Template('''select pglogical.alter_subscription_disable(
subscription_name := '#sub_name#',
immediate := true
)''')

def TemplatePglogicalSynchronizeSubscription(p_database_object):
    return Template('''select pglogical.alter_subscription_synchronize(
subscription_name := '#sub_name#',
truncate := true
)''')

def TemplatePglogicalDropSubscription(p_database_object):
    return Template('''select pglogical.drop_subscription(
subscription_name := '#sub_name#',
ifexists := true
)''')

def TemplatePglogicalSubscriptionAddReplicationSet(p_database_object):
    return Template('''select pglogical.alter_subscription_add_replication_set(
subscription_name := '#sub_name#',
replication_set := 'set_name'
)''')

def TemplatePglogicalSubscriptionRemoveReplicationSet(p_database_object):
    return Template('''select pglogical.alter_subscription_remove_replication_set(
subscription_name := '#sub_name#',
replication_set := '#set_name#'
)''')
