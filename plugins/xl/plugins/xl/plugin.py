import OmniDB_app.plugins.xl.metadata as metadata

def get_xl_version(p_database_object, p_data):
    return { 'xl_version': metadata.GetXLVersion(p_database_object) }

def get_xl_templates(p_database_object, p_data):
    if 'XL' in metadata.GetXLVersion(p_database_object):
        return {
            'xl_pause_cluster': metadata.TemplateXLPauseCluster(p_database_object).v_text,
            'xl_unpause_cluster': metadata.TemplateXLUnpauseCluster(p_database_object).v_text,
            'xl_clean_connection': metadata.TemplateXLCleanConnection(p_database_object).v_text,
            'xl_create_group': metadata.TemplateXLCreateGroup(p_database_object).v_text,
            'xl_drop_group': metadata.TemplateXLDropGroup(p_database_object).v_text,
            'xl_create_node': metadata.TemplateXLCreateNode(p_database_object).v_text,
            'xl_alter_node': metadata.TemplateXLAlterNode(p_database_object).v_text,
            'xl_drop_node': metadata.TemplateXLDropNode(p_database_object).v_text,
            'xl_execute_direct': metadata.TemplateXLExecuteDirect(p_database_object).v_text,
            'xl_pool_reload': metadata.TemplateXLPoolReload(p_database_object).v_text,
            'xl_altertable_distribution': metadata.TemplateXLAlterTableDistribution(p_database_object).v_text,
            'xl_altertable_location': metadata.TemplateXLAlterTableLocation(p_database_object).v_text,
            'xl_altertable_addnode': metadata.TemplateXLALterTableAddNode(p_database_object).v_text,
            'xl_altertable_deletenode': metadata.TemplateXLAlterTableDeleteNode(p_database_object).v_text
        }
    else:
        return {}

def get_xl_nodes(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryXLNodes(p_database_object)
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['node_name'],
                'v_type': v_node['node_type'],
                'v_host': v_node['node_host'],
                'v_port': v_node['node_port'],
                'v_primary': v_node['nodeis_primary'],
                'v_preferred': v_node['nodeis_preferred'],
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc

def get_xl_groups(p_database_object, p_data):
    try:
        v_list_groups = []
        v_groups = metadata.QueryXLGroups(p_database_object)
        for v_group in v_groups.Rows:
            v_group_data = {
                'v_name': v_group['group_name']
            }
            v_list_groups.append(v_group_data)
        return v_list_groups
    except Exception as exc:
        raise exc

def get_xl_group_nodes(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryXLGroupNodes(p_database_object, p_data['p_group'])
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['node_name']
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc

def get_xl_table_properties(p_database_object, p_data):
    try:
        v_list_props = []
        v_props = metadata.QueryTablesXLProperties(p_database_object, p_data['p_table'], p_data['p_schema'])
        for v_prop in v_props.Rows:
            v_prop_data = {
                'v_distributed_by': v_prop['distributed_by'],
                'v_all_nodes': v_prop['all_nodes']
            }
            v_list_props.append(v_prop_data)
        return v_list_props
    except Exception as exc:
        raise exc

def get_xl_table_nodes(p_database_object, p_data):
    try:
        v_list_nodes = []
        v_nodes = metadata.QueryTablesXLNodes(p_database_object, p_data['p_table'], p_data['p_schema'])
        for v_node in v_nodes.Rows:
            v_node_data = {
                'v_name': v_node['node_name']
            }
            v_list_nodes.append(v_node_data)
        return v_list_nodes
    except Exception as exc:
        raise exc
