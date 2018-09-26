var bdr3_templates;

activateHook('postgresqlTreeNodeOpen',function(p_node) {
  refreshTreeBDR3(p_node);
});

activateHook('postgresqlTreeContextMenu',function(p_node) {
  if (p_node.tag.type == 'bdr3_inactive_nonode') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Local Node',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate(
                'Create Local Node',
                bdr3_templates.create_local_node);
        }
    }, {
        text: 'Doc: BDR',
        icon: getPluginPath('OmniDB') + 'images/globe.png',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: BDR',
                'http://bdr-project.org/docs/1.0/index.html'
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_inactive_node') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Group',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate('Create Group',
                bdr3_templates.create_group);
        }
    }, {
        text: 'Join Group',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate('Join Group',
                bdr3_templates.join_group);
        }
    }, {
        text: 'Doc: BDR',
        icon: getPluginPath('OmniDB') + 'images/globe.png',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: BDR',
                'http://bdr-project.org/docs/1.0/index.html'
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_joining') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Join Group Wait',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate(
                'Join Group Wait', bdr3_templates.join_wait);
        }
    }, {
        text: 'Doc: BDR',
        icon: getPluginPath('OmniDB') + 'images/globe.png',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: BDR',
                'http://bdr-project.org/docs/1.0/index.html'
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_standby') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Promote Local Node',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate(
                'Promote Local Node',
                bdr3_templates.promote_local_node
            );
        }
    }, {
        text: 'Doc: BDR',
        icon: getPluginPath('OmniDB') + 'images/globe.png',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: BDR',
                'http://bdr-project.org/docs/1.0/index.html'
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_active') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Replicate DDL',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate(
                'Replicate DDL Command',
                bdr3_templates.replicate_ddl_command
            );
        }
    }, {
        text: 'Doc: BDR',
        icon: getPluginPath('OmniDB') + 'images/globe.png',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: BDR',
                'http://bdr-project.org/docs/1.0/index.html'
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_group_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }];

  } else if (p_node.tag.type == 'bdr3_group') {

    return v_elements = [];

  } else if (p_node.tag.type == 'bdr3_group_node_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }];

  } else if (p_node.tag.type == 'bdr3_group_node') {

    return v_elements = [{
        text: 'Part Node',
        icon: getPluginPath('OmniDB') + 'images/tab_close.png',
        action: function(node) {
            tabSQLTemplate('Part Node', bdr3_templates.part_node
                .replace('#node_name#', p_node.text)
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_local_group_node') {

    return v_elements = [];

  } else if (p_node.tag.type == 'bdr3_group_table_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: getPluginPath('OmniDB') + 'images/refresh.png',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreeBDR3(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Table',
        icon: getPluginPath('OmniDB') + 'images/text_edit.png',
        action: function(node) {
            tabSQLTemplate('Add Table',
                bdr3_templates.group_add_table
                .replace('#group_name#', p_node.parent
                    .text)
            );
        }
    }];

  } else if (p_node.tag.type == 'bdr3_group_table') {

    return v_elements = [{
        text: 'Remove Table',
        icon: getPluginPath('OmniDB') + 'images/tab_close.png',
        action: function(node) {
            tabSQLTemplate('Remove Table',
                bdr3_templates.group_remove_table
                .replace('#group_name#', p_node.parent
                    .parent.text)
                .replace('#table_name#', p_node.text)
            );
        }
    }];

  } else {

    return v_elements = [];

  }

});

function getBDRMajorVersion(p_version) {
    return p_version.split('.')[0]
}

function refreshTreeBDR3(node) {
  if (node.tag.type == 'database') {
    startBDR3(node);
  } else
  if (node.tag.type == 'bdr3_inactive_nonode' ||
      node.tag.type == 'bdr3_inactive_node' ||
      node.tag.type == 'bdr3_joining' ||
      node.tag.type == 'bdr3_standby' ||
      node.tag.type == 'bdr3_active') {
    getBDR3Properties(node);
  } else
  if (node.tag.type == 'bdr3_group_list') {
    getBDR3Groups(node);
  } else
  if (node.tag.type == 'bdr3_group_node_list') {
    getBDR3GroupNodes(node);
  } else
  if (node.tag.type == 'bdr3_group_table_list') {
    getBDR3GroupTables(node);
  }
}

function startBDR3(node) {
  callPluginFunction({
    p_plugin_name: 'bdr3',
    p_function_name: 'get_bdr_version',
    p_data: null,
    p_callback: function(p_data) {
      if (p_data.bdr_version != null &&
          parseInt(getBDRMajorVersion(p_data.bdr_version)) == 3) {

            callPluginFunction({
              p_plugin_name: 'bdr3',
              p_function_name: 'get_bdr_templates',
              p_data: null,
              p_callback: function(p_data) {
                bdr3_templates = p_data;
              },
              p_loading: false,
              p_check_database_connection: true
            });

            callPluginFunction({
              p_plugin_name: 'bdr3',
              p_function_name: 'get_bdr_properties',
              p_data: null,
              p_callback: function(p_data) {
                if (!p_data[0].v_active) {

                  if (p_data[0].v_node_name == 'Not set') {

                    var node_bdr = node.createChildNode(
                        'BDR', false,
                        getPluginPath('bdr3') + 'images/bdr.png', {
                            type: 'bdr3_inactive_nonode',
                            database: v_connTabControl.selectedTab.tag.selectedDatabase
                        }, null);
                    node_bdr.createChildNode('', true,
                        getPluginPath('OmniDB') + 'images/spin.svg', null, null);

                  } else {

                    var node_bdr = node.createChildNode(
                        'BDR', false,
                        getPluginPath('bdr3') + 'images/bdr.png', {
                            type: 'bdr3_inactive_node',
                            database: v_connTabControl.selectedTab.tag.selectedDatabase
                        }, null);
                    node_bdr.createChildNode('', true,
                        getPluginPath('OmniDB') + 'images/spin.svg', null, null);

                  }

                } else {

                  if (p_data[0].v_state ==
                      'BDR_PEER_STATE_JOINING') {

                    var node_bdr = node.createChildNode(
                        'BDR', false,
                        getPluginPath('bdr3') + 'images/bdr.png', {
                            type: 'bdr3_joining',
                            database: v_connTabControl.selectedTab.tag.selectedDatabase
                        }, null);
                    node_bdr.createChildNode('', true,
                        getPluginPath('OmniDB') + 'images/spin.svg', null, null);

                  } else if (p_data[0].v_state ==
                      'BDR_PEER_STATE_STANDBY') {

                    var node_bdr = node.createChildNode(
                        'BDR', false,
                        getPluginPath('bdr3') + 'images/bdr.png', {
                            type: 'bdr3_standby',
                            database: v_connTabControl.selectedTab.tag.selectedDatabase
                        }, null);
                    node_bdr.createChildNode('', true,
                        getPluginPath('OmniDB') + 'images/spin.svg', null, null);

                  } else {

                    var node_bdr = node.createChildNode(
                        'BDR', false,
                        getPluginPath('bdr3') + 'images/bdr.png', {
                            type: 'bdr3_active',
                            database: v_connTabControl.selectedTab.tag.selectedDatabase
                        }, null);
                    node_bdr.createChildNode('', true,
                        getPluginPath('OmniDB') + 'images/spin.svg', null, null);

                  }

                }
              },
              p_loading: false,
              p_check_database_connection: true
            });

      }
    },
    p_loading: false,
    p_check_database_connection: true
  });
}

function getBDR3Properties(node) {

  node.removeChildNodes();
  node.createChildNode('', false, getPluginPath('OmniDB') + 'images/spin.svg', null,
      null);

  callPluginFunction({
    p_plugin_name: 'bdr3',
    p_function_name: 'get_bdr_properties',
    p_data: null,
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.createChildNode('Version: ' + p_data[0]
          .v_version, false,
          getPluginPath('OmniDB') + 'images/bullet_red.png', {
              database: v_connTabControl.selectedTab.tag.selectedDatabase
          },
          null);
      node.createChildNode('Active: ' + p_data[0]
          .v_active, false,
          getPluginPath('OmniDB') + 'images/bullet_red.png', {
              database: v_connTabControl.selectedTab.tag.selectedDatabase
          },
          null);
      node.createChildNode('Node name: ' + p_data[0]
          .v_node_name, false,
          getPluginPath('OmniDB') + 'images/bullet_red.png', {
              database: v_connTabControl.selectedTab.tag.selectedDatabase
          },
          null);
      node.createChildNode('Node state: ' + p_data[0]
          .v_state, false,
          getPluginPath('OmniDB') + 'images/bullet_red.png', {
              database: v_connTabControl.selectedTab.tag.selectedDatabase
          },
          null);
      v_groups = node.createChildNode('Groups',
          false,
          getPluginPath('OmniDB') + 'images/replication_set.png', {
              type: 'bdr3_group_list',
              database: v_connTabControl.selectedTab.tag.selectedDatabase
          }, null);
      v_groups.createChildNode('', true,
          getPluginPath('OmniDB') + 'images/spin.svg', null, null);

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

function getBDR3Groups(node) {

  node.removeChildNodes();
  node.createChildNode('', false, getPluginPath('OmniDB') + 'images/spin.svg', null,
      null);

  callPluginFunction({
    p_plugin_name: 'bdr3',
    p_function_name: 'get_bdr_groups',
    p_data: null,
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Groups (' + p_data.length +
          ')');

      node.tag.num_groups = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          v_group = node.createChildNode(p_data[i].v_name,
              false,
              getPluginPath('OmniDB') + 'images/replication_set.png', {
                  type: 'bdr3_group',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null, null);
          v_nodes = v_group.createChildNode('Nodes',
              false,
              getPluginPath('OmniDB') + 'images/node.png', {
                  type: 'bdr3_group_node_list',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null);
          v_nodes.createChildNode('', true,
              getPluginPath('OmniDB') + 'images/spin.svg', null, null);
          v_tables = v_group.createChildNode('Tables',
              false,
              getPluginPath('OmniDB') + 'images/table_multiple.png', {
                  type: 'bdr3_group_table_list',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null, null, false);
          v_tables.createChildNode('', true,
              getPluginPath('OmniDB') + 'images/spin.svg', null, null,
              null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}

function getBDR3GroupNodes(node) {

  node.removeChildNodes();
  node.createChildNode('', false, getPluginPath('OmniDB') + 'images/spin.svg', null,
      null);

  callPluginFunction({
    p_plugin_name: 'bdr3',
    p_function_name: 'get_bdr_group_nodes',
    p_data: {"p_group": node.parent.text},
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Nodes (' + p_data.length + ')');

      node.tag.num_nodes = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          if (p_data[i].v_is_local) {
              v_node = node.createChildNode(p_data[i].v_name,
                  false, getPluginPath('OmniDB') + 'images/node.png', {
                      type: 'bdr3_local_group_node',
                      database: v_connTabControl.selectedTab.tag.selectedDatabase
                  }, null, null, false);
          } else {
              v_node = node.createChildNode(p_data[i].v_name,
                  false, getPluginPath('OmniDB') + 'images/node.png', {
                      type: 'bdr3_group_node',
                      database: v_connTabControl.selectedTab.tag.selectedDatabase
                  }, null, null, false);
          }
          v_node.createChildNode('State: ' + p_data[i]
              .v_state, false,
              getPluginPath('OmniDB') + 'images/bullet_red.png', {
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

function getBDR3GroupTables(node) {

  node.removeChildNodes();
  node.createChildNode('', false, getPluginPath('OmniDB') + 'images/spin.svg', null,
      null);

  callPluginFunction({
    p_plugin_name: 'bdr3',
    p_function_name: 'get_bdr_group_tables',
    p_data: {"p_group": node.parent.text},
    p_callback: function(p_data) {

      if (node.childNodes.length > 0)
          node.removeChildNodes();

      node.setText('Tables (' + p_data.length + ')');

      node.tag.num_tables = p_data.length;

      for (i = 0; i < p_data.length; i++) {

          v_node = node.createChildNode(p_data[i].v_name,
              false, getPluginPath('OmniDB') + 'images/table.png', {
                  type: 'bdr3_group_table',
                  database: v_connTabControl.selectedTab.tag.selectedDatabase
              }, null, null, false);

      }

      node.drawChildNodes();

    },
    p_loading: false,
    p_check_database_connection: true
  });

}
