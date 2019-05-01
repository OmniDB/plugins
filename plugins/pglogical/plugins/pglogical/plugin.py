from . import metadata as metadata

def get_pglogical_version(p_database_object, p_data):
    return { 'pglogical_version': metadata.GetPglogicalVersion(p_database_object) }

def get_pglogical_templates(p_database_object, p_data):
    return {
        'pglogical_create_node': metadata.TemplatePglogicalCreateNode(p_database_object).v_text,
        'pglogical_drop_node': metadata.TemplatePglogicalDropNode(p_database_object).v_text,
        'pglogical_add_interface': metadata.TemplatePglogicalNodeAddInterface(p_database_object).v_text,
        'pglogical_drop_interface': metadata.TemplatePglogicalNodeDropInterface(p_database_object).v_text,
        'pglogical_create_repset': metadata.TemplatePglogicalCreateReplicationSet(p_database_object).v_text,
        'pglogical_alter_repset': metadata.TemplatePglogicalAlterReplicationSet(p_database_object).v_text,
        'pglogical_drop_repset': metadata.TemplatePglogicalDropReplicationSet(p_database_object).v_text,
        'pglogical_repset_add_table': metadata.TemplatePglogicalReplicationSetAddTable(p_database_object).v_text,
        'pglogical_repset_add_all_tables': metadata.TemplatePglogicalReplicationSetAddAllTables(p_database_object).v_text,
        'pglogical_repset_remove_table': metadata.TemplatePglogicalReplicationSetRemoveTable(p_database_object).v_text,
        'pglogical_repset_add_seq': metadata.TemplatePglogicalReplicationSetAddSequence(p_database_object).v_text,
        'pglogical_repset_add_all_seqs': metadata.TemplatePglogicalReplicationSetAddAllSequences(p_database_object).v_text,
        'pglogical_repset_remove_seq': metadata.TemplatePglogicalReplicationSetRemoveSequence(p_database_object).v_text,
        'pglogical_create_sub': metadata.TemplatePglogicalCreateSubscription(p_database_object).v_text,
        'pglogical_enable_sub': metadata.TemplatePglogicalEnableSubscription(p_database_object).v_text,
        'pglogical_disable_sub': metadata.TemplatePglogicalDisableSubscription(p_database_object).v_text,
        'pglogical_sync_sub': metadata.TemplatePglogicalSynchronizeSubscription(p_database_object).v_text,
        'pglogical_drop_sub': metadata.TemplatePglogicalDropSubscription(p_database_object).v_text,
        'pglogical_sub_add_repset': metadata.TemplatePglogicalSubscriptionAddReplicationSet(p_database_object).v_text,
        'pglogical_sub_remove_repset': metadata.TemplatePglogicalSubscriptionRemoveReplicationSet(p_database_object).v_text,
    }

def get_pglogical_nodes(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryPglogicalNodes(p_database_object)
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['node_name']
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc

def get_pglogical_interfaces(p_database_object, p_data):
    try:
        v_list_ifaces = []
        v_ifaces = metadata.QueryPglogicalNodeInterfaces(p_database_object, p_data['p_node'])
        for v_iface in v_ifaces.Rows:
            v_iface_data = {
                'v_name': v_iface['if_name'],
                'v_dsn': v_iface['if_dsn']
            }
            v_list_ifaces.append(v_iface_data)
        return v_list_ifaces
    except Exception as exc:
        raise exc

def get_pglogical_replicationsets(p_database_object, p_data):
    try:
        v_list_repsets = []
        v_repsets = metadata.QueryPglogicalReplicationSets(p_database_object)
        for v_repset in v_repsets.Rows:
            v_repset_data = {
                'v_name': v_repset['set_name'],
                'v_insert': v_repset['replicate_insert'],
                'v_update': v_repset['replicate_update'],
                'v_delete': v_repset['replicate_delete'],
                'v_truncate': v_repset['replicate_truncate']
            }
            v_list_repsets.append(v_repset_data)
        return v_list_repsets
    except Exception as exc:
        raise exc

def get_pglogical_repset_tables(p_database_object, p_data):
    try:
        v_list_tables = []
        v_tables = metadata.QueryPglogicalReplicationSetTables(p_database_object, p_data['p_repset'])
        for v_table in v_tables.Rows:
            v_table_data = {
                'v_name': v_table['table_name']
            }
            v_list_tables.append(v_table_data)
        return v_list_tables
    except Exception as exc:
        raise exc

def get_pglogical_repset_seqs(p_database_object, p_data):
    try:
        v_list_seqs = []
        v_seqs = metadata.QueryPglogicalReplicationSetSequences(p_database_object, p_data['p_repset'])
        for v_seq in v_seqs.Rows:
            v_seq_data = {
                'v_name': v_seq['sequence_name']
            }
            v_list_seqs.append(v_seq_data)
        return v_list_seqs
    except Exception as exc:
        raise exc

def get_pglogical_subscriptions(p_database_object, p_data):
    try:
        v_list_subs = []
        v_subs = metadata.QueryPglogicalSubscriptions(p_database_object)
        for v_sub in v_subs.Rows:
            v_sub_data = {
                'v_name': v_sub['sub_name'],
                'v_status': v_sub['sub_status'],
                'v_origin': v_sub['sub_origin'],
                'v_enabled': v_sub['sub_enabled'],
                'v_delay': v_sub['sub_apply_delay']
            }
            v_list_subs.append(v_sub_data)
        return v_list_subs
    except Exception as exc:
        raise exc

def get_pglogical_subscription_repsets(p_database_object, p_data):
    try:
        v_list_repsets = []
        v_repsets = metadata.QueryPglogicalSubscriptionReplicationSets(p_database_object, p_data['p_sub'])
        for v_repset in v_repsets.Rows:
            v_repset_data = {
                'v_name': v_repset['set_name']
            }
            v_list_repsets.append(v_repset_data)
        return v_list_repsets
    except Exception as exc:
        raise exc
