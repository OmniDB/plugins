var xl_templates;

activateHook('postgresqlTreeNodeOpen',function(p_node) {
  refreshTreeXL(p_node);
});

activateHook('postgresqlTreeContextMenu',function(p_node) {

  if (p_node.tag.type == 'xl') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Pause Cluster',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Pause Cluster',
                xl_templates.xl_pause_cluster);
        }
    }, {
        text: 'Unpause Cluster',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Unpause Cluster',
                xl_templates.xl_unpause_cluster);
        }
    }, {
        text: 'Clean Connection',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Clean Connection',
                xl_templates.xl_clean_connection);
        }
    }, {
        text: 'Doc: Postgres-XL',
        icon: 'fas cm-all fa-globe-americas',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: Postgres-XL',
                'https://www.postgres-xl.org/documentation/'
            );
        }
    }];

  } else if (p_node.tag.type == 'xl_node_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Node',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Create Node',
                xl_templates.xl_create_node);
        }
    }];

  } else if (p_node.tag.type == 'xl_group_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Group',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Create Group',
                xl_templates.xl_create_group);
        }
    }];

  } else if (p_node.tag.type == 'xl_node') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Execute Direct',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Execute Direct',
                xl_templates.xl_execute_direct
                .replace(/#node_name#/g, node.text)
            );
        }
    }, {
        text: 'Pool Reload',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Pool Reload',
                xl_templates.xl_pool_reload
                .replace(/#node_name#/g, node.text)
            );
        }
    }, {
        text: 'Alter Node',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Alter Node',
                xl_templates.xl_alter_node
                .replace(/#node_name#/g, node.text)
            );
        }
    }, {
        text: 'Drop Node',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Node',
                xl_templates.xl_drop_node
                .replace(/#node_name#/g, node.text)
            );
        }
    }];

  } else if (p_node.tag.type == 'xl_group') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Drop Group',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Group',
                xl_templates.xl_drop_group
                .replace(/#group_name#/g, node.text)
            );
        }
    }];

  } else if (p_node.tag.type == 'xl_table') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Alter Distribution',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Alter Table Distribution',
                xl_templates.xl_altertable_distribution
                .replace('#table_name#',
                    node.parent.parent.parent.text +
                    '.' + node.parent.text));
        }
    }, {
        text: 'Alter Location',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Alter Table Distribution',
                xl_templates.xl_altertable_location
                .replace('#table_name#',
                    node.parent.parent.parent.text +
                    '.' + node.parent.text));
        }
    }];

  } else if (p_node.tag.type == 'xl_table_node_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Node',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Alter Table Add Node',
                xl_templates.xl_altertable_addnode
                .replace('#table_name#',
                    node.parent.parent.parent.parent
                    .text + '.' +
                    node.parent.parent.text));
        }
    }];

  } else if (p_node.tag.type == 'xl_table_node') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeXL(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Delete Node',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Alter Table Delete Node',
                xl_templates.xl_altertable_deletenode
                .replace('#table_name#',
                    node.parent.parent.parent.parent
                    .parent.text + '.' +
                    node.parent.parent.parent.text)
                .replace('#node_name#', node.text));
        }
    }];

  } else {

    return v_elements = [];

  }

});

function refreshTreeXL(node) {
  if (node.tag.type == 'server') {
    startXL(node);
  } else if (node.tag.type == 'xl_node_list') {
    getXLNodes(node);
  } else if (node.tag.type == 'xl_group_list') {
    getXLGroups(node);
  } else if (node.tag.type == 'xl_group') {
    getXLGroupNodes(node);
  } else if (node.tag.type == 'table') {
    startXLTable(node);
  } else if (node.tag.type == 'xl_table') {
    getXLTableProperties(node);
  } else if (node.tag.type == 'xl_table_node_list') {
    getXLTableNodes(node);
  }
}

function startXL(node) {
  
  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_version',
    p_data: null,
    p_callback: function(p_data) {
      if (p_data.xl_version != null &&
          p_data.xl_version.indexOf('XL') !== -1) {

            callPluginFunction({
              p_plugin_name: 'xl',
              p_function_name: 'get_xl_templates',
              p_data: null,
              p_callback: function(p_data) {
                xl_templates = p_data;
              },
              p_loading: false,
              p_check_database_connection: true
            });

            var node_xl = node.createChildNode('Postgres-XL', false,
                'node-xl', {
                    type: 'xl',
                }, null);
            var node_xl_nodes = node_xl.createChildNode('Nodes', false,
                'fas node-all fa-server node-xl-server', {
                    type: 'xl_node_list',
                }, null);
            node_xl_nodes.createChildNode('', true,
                'node-spin', null, null);
            var node_xl_groups = node_xl.createChildNode('Groups',
                false,
                'fas node-all fa-object-group node-xl-group', {
                    type: 'xl_group_list',
                }, null);
            node_xl_groups.createChildNode('', true,
                'node-spin', null, null);

      }
    },
    p_loading: false,
    p_check_database_connection: true
  });
}

/// <summary>
/// Retrieving XL Nodes.
/// </summary>
/// <param name="node">Node object.</param>
function getXLNodes(node) {

  node.removeChildNodes();
  node.createChildNode('', false, 'node-spin', null,
      null);

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_nodes',
    p_data: null,
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Nodes (' + p_data.length + ')');

      node.tag.num_nodes = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          v_node = node.createChildNode(p_data[i].v_name,
              false, 'fas node-all fa-server node-xl-server', {
                  type: 'xl_node',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null, null, false);
          v_node.createChildNode('Type: ' + p_data[i]
              .v_type, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);
          v_node.createChildNode('Host: ' + p_data[i]
              .v_host, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);
          v_node.createChildNode('Port: ' + p_data[i]
              .v_port, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);
          v_node.createChildNode('Primary: ' + p_data[i]
              .v_primary, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);
          v_node.createChildNode('Preferred: ' + p_data[i]
              .v_preferred, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

/// <summary>
/// Retrieving XL Groups.
/// </summary>
/// <param name="node">Node object.</param>
function getXLGroups(node) {

  node.removeChildNodes();
  node.createChildNode('', false, 'node-spin', null,
      null);

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_groups',
    p_data: null,
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Groups (' + p_data.length + ')');

      node.tag.num_groups = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          v_node = node.createChildNode(p_data[i].v_name,
              false, 'fas node-all fa-object-group node-xl-group', {
                  type: 'xl_group',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null, null, false);
          v_node.createChildNode('', false,
              'node-spin', null,
              null, null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

/// <summary>
/// Retrieving XL Group Nodes.
/// </summary>
/// <param name="node">Node object.</param>
function getXLGroupNodes(node) {

  node.removeChildNodes();
  node.createChildNode('', false, 'node-spin', null,
      null);

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_group_nodes',
    p_data: {"p_group": node.text},
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText(node.text + ' (' + p_data.length +
          ' nodes)');

      node.tag.num_nodes = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          node.createChildNode(p_data[i].v_name,
              false, 'fas node-all fa-server node-xl-server', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

function startXLTable(node) {

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_version',
    p_data: null,
    p_callback: function(p_data) {
      if (p_data.xl_version != null &&
          p_data.xl_version.indexOf('XL') !== -1) {

            var node_xl = node.createChildNode('Postgres-XL', false,
                'node-xl', {
                    type: 'xl_table',
                    database: v_connTabControl.selectedTab.tag.selectedDatabase
                }, null, null, true);
            node_xl.createChildNode('', true,
                'node-spin', null, null,
                null, true);

      }
    },
    p_loading: false,
    p_check_database_connection: true
  });

}

/// <summary>
/// Retrieving XL Table Properties.
/// </summary>
/// <param name="node">Node object.</param>
function getXLTableProperties(node) {

  node.removeChildNodes();
  node.createChildNode('', false, 'node-spin', null,
      null);

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_table_properties',
    p_data: {
      "p_table": node.parent.text,
      "p_schema": node.parent.parent.parent.text
    },
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      if (p_data.length > 0) {

          node.createChildNode('Distributed by: ' + p_data[0]
              .v_distributed_by, false,
              'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null);
          node.createChildNode('Located in all nodes: ' + p_data[
                  0]
              .v_all_nodes, false,
              'fas node-all fa-ellipsis-h node-bullet', null,
              null);
          v_node = node.createChildNode('Located in nodes', false,
              'fas node-all fa-server node-xl-server', {
                  type: 'xl_table_node_list',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null);
          v_node.createChildNode('', false,
              'node-spin', null, null);

      } else {

          node.createChildNode('Exists only in coordinator',
              false, 'fas node-all fa-ellipsis-h node-bullet', {
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null);

      }

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

/// <summary>
/// Retrieving XL Table Nodes.
/// </summary>
/// <param name="node">Node object.</param>
function getXLTableNodes(node) {

  node.removeChildNodes();
  node.createChildNode('', false, 'node-spin', null,
      null);

  callPluginFunction({
    p_plugin_name: 'xl',
    p_function_name: 'get_xl_table_nodes',
    p_data: {
      "p_table": node.parent.parent.text,
      "p_schema": node.parent.parent.parent.parent.text
    },
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Located in nodes (' + p_data.length +
          ')');

      node.tag.num_nodes = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          node.createChildNode(p_data[i].v_name,
              false, 'fas node-all fa-server node-xl-server', {
                  type: 'xl_table_node',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              },
              null, null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}
