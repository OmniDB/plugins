import OmniDB_app.plugins.bdr3.metadata as metadata

def get_bdr_version(p_database_object, p_data):
    return { 'bdr_version': metadata.GetBDRVersion(p_database_object) }

def get_bdr_templates(p_database_object, p_data):
    return {
        'create_local_node': metadata.TemplateBDRCreateLocalNode(p_database_object).v_text,
        'promote_local_node': metadata.TemplateBDRPromoteLocalNode().v_text,
        'create_group': metadata.TemplateBDRCreateGroup().v_text,
        'join_group': metadata.TemplateBDRJoinGroup().v_text,
        'join_wait': metadata.TemplateBDRJoinWait().v_text,
        'replicate_ddl_command': metadata.TemplateBDRReplicateDDLCommand().v_text,
        'part_node': metadata.TemplateBDRPartNode().v_text,
        'group_add_table': metadata.TemplateBDRGroupAddTable().v_text,
        'group_remove_table': metadata.TemplateBDRGroupRemoveTable().v_text
    }

def get_bdr_properties(p_database_object, p_data):
    try:
        v_list_bdr = []
        v_bdrs = metadata.QueryBDRProperties(p_database_object)
        for v_bdr in v_bdrs.Rows:
            v_bdr_data = {
                'v_version': v_bdr['version'],
                'v_active': v_bdr['active'],
                'v_node_name': v_bdr['node_name'],
                'v_paused': v_bdr['paused'],
                'v_state': v_bdr['node_state']
            }
            v_list_bdr.append(v_bdr_data)
        return v_list_bdr
    except Exception as exc:
        raise exc

def get_bdr_groups(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryBDRGroups(p_database_object)
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['group_name']
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc

def get_bdr_group_nodes(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryBDRGroupNodes(p_database_object, p_data['p_group'])
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['node_name'],
                'v_state': v_node['node_state'],
                'v_is_local': v_node['node_is_local']
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc

def get_bdr_group_tables(p_database_object, p_data):
    try:
        v_list_tables = []
        v_tables = metadata.QueryBDRGroupTables(p_database_object, p_data['p_group'])
        for v_table in v_tables.Rows:
            v_table_data = {
                'v_name': v_table['table_name']
            }
            v_list_tables.append(v_table_data)
        return v_list_tables
    except Exception as exc:
        raise exc
