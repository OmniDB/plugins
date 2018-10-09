var pglogical_templates;

activateHook('postgresqlTreeNodeOpen',function(p_node) {
  refreshTreePglogical(p_node);
});

activateHook('postgresqlTreeContextMenu',function(node) {

  if (node.tag.type == 'pglogical') {

    return v_elements = [{
        text: 'Doc: pglogical',
        icon: 'fas cm-all fa-globe-americas',
        action: function(node) {
            v_connTabControl.tag.createWebsiteTab(
                'Documentation: pglogical',
                'https://www.2ndquadrant.com/en/resources/pglogical/pglogical-docs/'
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_node_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
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
                pglogical_templates.pglogical_create_node
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_node') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Interface',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add Node Interface',
                pglogical_templates.pglogical_add_interface
                .replace('#node_name#', node.text.replace(
                    ' (local)', '')));
        }
    }, {
        text: 'Drop Node',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Node',
                pglogical_templates.pglogical_drop_node
                .replace('#node_name#', node.text.replace(
                    ' (local)', '')));
        }
    }];

  } else if (node.tag.type == 'pglogical_interface') {

    return v_elements = [{
        text: 'Drop Interface',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Node Interface',
                pglogical_templates.pglogical_drop_interface
                .replace('#node_name#', node.parent
                    .text.replace(' (local)', ''))
                .replace('#interface_name#', node.text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Replication Set',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Create Replication Set',
                pglogical_templates.pglogical_create_repset
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset') {

    return v_elements = [{
        text: 'Alter Replication Set',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Alter Replication Set',
                pglogical_templates.pglogical_alter_repset
                .replace('#repset_name#', node.text)
            );
        }
    }, {
        text: 'Drop Replication Set',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Replication Set',
                pglogical_templates.pglogical_drop_repset
                .replace('#repset_name#', node.text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset_table_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Table',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add Table',
                pglogical_templates.pglogical_repset_add_table
                .replace('#repset_name#', node.parent
                    .text)
            );
        }
    }, {
        text: 'Add All Tables',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add All Tables',
              pglogical_templates.pglogical_repset_add_all_tables
                .replace('#repset_name#', node.parent
                    .text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset_table') {

    return v_elements = [{
        text: 'Remove Table',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Remove Table',
                pglogical_templates.pglogical_repset_remove_table
                .replace('#repset_name#', node.parent
                    .parent.text)
                .replace('#table_name#', node.text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset_seq_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Sequence',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add Sequence',
                pglogical_templates.pglogical_repset_add_seq
                .replace('#repset_name#', node.parent
                    .text)
            );
        }
    }, {
        text: 'Add All Sequences',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add All Sequences',
                pglogical_templates.pglogical_repset_add_all_seqs
                .replace('#repset_name#', node.parent
                    .text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_repset_seq') {

    return v_elements = [{
        text: 'Remove Sequence',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Remove Sequence',
                pglogical_templates.pglogical_repset_remove_seq
                .replace('#repset_name#', node.parent
                    .parent.text)
                .replace('#sequence_name#', node.text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_subscription_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Create Subscription',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Create Subscription',
                pglogical_templates.pglogical_create_sub
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_subscription') {

    return v_elements = [{
        text: 'Enable Subscription',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Enable Subscription',
                pglogical_templates.pglogical_enable_sub
                .replace('#sub_name#', node.text));
        }
    }, {
        text: 'Disable Subscription',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Disable Subscription',
                pglogical_templates.pglogical_disable_sub
                .replace('#sub_name#', node.text));
        }
    }, {
        text: 'Sync Subscription',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Synchronize Subscription',
                pglogical_templates.pglogical_sync_sub
                .replace('#sub_name#', node.text));
        }
    }, {
        text: 'Drop Subscription',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Drop Subscription',
                pglogical_templates.pglogical_drop_sub
                .replace('#sub_name#', node.text));
        }
    }];

  } else if (node.tag.type == 'pglogical_subscription_repset_list') {

    return v_elements = [{
        text: 'Refresh',
        icon: 'fas cm-all fa-sync-alt',
        action: function(node) {
            if (node.childNodes == 0)
                refreshTreePglogical(node);
            else {
                node.collapseNode();
                node.expandNode();
            }
        }
    }, {
        text: 'Add Replication Set',
        icon: 'fas cm-all fa-edit',
        action: function(node) {
            tabSQLTemplate('Add Replication Set', pglogical_templates
                .pglogical_sub_add_repset
                .replace('#sub_name#', node.parent.text)
            );
        }
    }];

  } else if (node.tag.type == 'pglogical_subscription_repset') {

    return v_elements = [{
        text: 'Remove Replication Set',
        icon: 'fas cm-all fa-times',
        action: function(node) {
            tabSQLTemplate('Remove Replication Set',
                pglogical_templates.pglogical_sub_remove_repset
                .replace('#sub_name#', node.parent.parent
                    .text)
                .replace('#set_name#', node.text)
            );
        }
    }];

  } else {

    return v_elements = [];

  }

});

function refreshTreePglogical(node) {
  if (node.tag.type == 'database') {
    startPglogical(node);
  } else if (node.tag.type == 'pglogical_node_list') {
      getPglogicalNodes(node);
  } else if (node.tag.type == 'pglogical_node') {
      getPglogicalInterfaces(node);
  } else if (node.tag.type == 'pglogical_repset_list') {
      getPglogicalReplicationSets(node);
  } else if (node.tag.type == 'pglogical_repset_table_list') {
      getPglogicalReplicationSetTables(node);
  } else if (node.tag.type == 'pglogical_repset_seq_list') {
      getPglogicalReplicationSetSequences(node);
  } else if (node.tag.type == 'pglogical_subscription_list') {
      getPglogicalSubscriptions(node);
  } else if (node.tag.type == 'pglogical_subscription_repset_list') {
      getPglogicalSubscriptionReplicationSets(node);
  }
}

function startPglogical(node) {
  callPluginFunction({
    p_plugin_name: 'pglogical',
    p_function_name: 'get_pglogical_version',
    p_data: null,
    p_callback: function(p_data) {
      if (p_data.pglogical_version != null) {

          callPluginFunction({
            p_plugin_name: 'pglogical',
            p_function_name: 'get_pglogical_templates',
            p_data: null,
            p_callback: function(p_data) {
              pglogical_templates = p_data;
            },
            p_loading: false,
            p_check_database_connection: true
          });

          var node_pglogical = node.createChildNode(
              'pglogical', false,
              'fas node-all fa-sitemap node-pglogical', {
                  type: 'pglogical',
              }, null);
          var node_nodes = node_pglogical.createChildNode(
              'Nodes', false,
              'fas node-all fa-server node-pglogical-server', {
                  type: 'pglogical_node_list',
              }, null);
          node_nodes.createChildNode('', true,
              'node-spin', null, null);
          var node_repsets = node_pglogical.createChildNode(
              'Replication Sets', false,
              'fas node-all fa-tasks node-pglogical-repset', {
                  type: 'pglogical_repset_list',
              }, null);
          node_repsets.createChildNode('', true,
              'node-spin', null, null);
          var node_subscriptions = node_pglogical.createChildNode(
              'Subscriptions', false,
              'fas node-all fa-arrow-alt-circle-up node-pglogical-subscription', {
                  type: 'pglogical_subscription_list',
              }, null);
          node_subscriptions.createChildNode('', true,
              'node-spin', null, null);

      }
    },
    p_loading: false,
    p_check_database_connection: true
  });
}

/// <summary>
/// Retrieving pglogical Nodes.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalNodes(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_nodes',
      p_data: null,
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Nodes (' + p_data.length + ')');

        node.tag.num_nodes = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false, 'fas node-all fa-server node-pglogical-server', {
                    type: 'pglogical_node',
                }, null, null, false);
            v_node.createChildNode('', true,
                'node-spin', null, null,
                null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Interfaces.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalInterfaces(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_interfaces',
      p_data: { "p_node": node.text.replace(' (local)', '') },
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false, 'fas node-all fa-plug node-pglogical-server', {
                    type: 'pglogical_interface',
                }, null, null, false);
            v_node.createChildNode(p_data[i].v_dsn, true,
                'fas node-all fa-ellipsis-h node-bullet', null, null,
                null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Replication Sets.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalReplicationSets(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_replicationsets',
      p_data: null,
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Replication Sets (' + p_data.length +
            ')');

        node.tag.num_repsets = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false,
                'fas node-all fa-tasks node-pglogical-repset', {
                    type: 'pglogical_repset',
                }, null, null, false);
            v_node.createChildNode('Insert: ' + p_data[i].v_insert,
                true, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Update: ' + p_data[i].v_update,
                true, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Delete: ' + p_data[i].v_delete,
                true, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Truncate: ' + p_data[i].v_truncate,
                true, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_tables = v_node.createChildNode('Tables',
                false,
                'fas node-all fa-th node-table-list', {
                    type: 'pglogical_repset_table_list',
                }, null, null, false);
            v_tables.createChildNode('', true,
                'node-spin', null, null,
                null, false);
            v_seqs = v_node.createChildNode('Sequences',
                false,
                'fas node-all fa-sort-numeric-down node-sequence-list', {
                    type: 'pglogical_repset_seq_list',
                }, null, null, false);
            v_seqs.createChildNode('', true,
                'node-spin', null, null,
                null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Replication Set Tables.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalReplicationSetTables(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_repset_tables',
      p_data: { "p_repset": node.parent.text },
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Tables (' + p_data.length + ')');

        node.tag.num_tables = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false, 'fas node-all fa-table node-table', {
                    type: 'pglogical_repset_table',
                }, null, null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Replication Set Sequences.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalReplicationSetSequences(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_repset_seqs',
      p_data: { "p_repset": node.parent.text },
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Sequences (' + p_data.length + ')');

        node.tag.num_seqs = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false,
                'fas node-all fa-sort-numeric-down node-sequence', {
                    type: 'pglogical_repset_seq',
                }, null, null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Subscriptions.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalSubscriptions(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_subscriptions',
      p_data: null,
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Subscriptions (' + p_data.length + ')');

        node.tag.num_subs = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false, 'fas node-all fa-arrow-alt-circle-up node-pglogical-subscription', {
                    type: 'pglogical_subscription',
                }, null, null, false);
            v_node.createChildNode('Status: ' + p_data[i].v_status,
                false, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Provider: ' + p_data[i].v_origin,
                false, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Enabled: ' + p_data[i].v_enabled,
                false, 'fas node-all fa-ellipsis-h node-bullet', {
                }, null, null, false);
            v_node.createChildNode('Apply Delay: ' + p_data[i]
                .v_delay,
                false, 'fas node-all fa-ellipsis-h node-bullet',
                null, null, null, false);
            v_repsets = v_node.createChildNode('Replication Sets',
                false,
                'fas node-all fa-tasks node-pglogical-repset', {
                    type: 'pglogical_subscription_repset_list',
                }, null, null, false
            );
            v_repsets.createChildNode('', true,
                'node-spin', null, null,
                null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}

/// <summary>
/// Retrieving pglogical Subscription Replication Sets.
/// </summary>
/// <param name="node">Node object.</param>
function getPglogicalSubscriptionReplicationSets(node) {

    node.removeChildNodes();
    node.createChildNode('', false, 'node-spin', null,
        null);

    callPluginFunction({
      p_plugin_name: 'pglogical',
      p_function_name: 'get_pglogical_subscription_repsets',
      p_data: { "p_sub": node.parent.text },
      p_callback: function(p_data) {

        if (node.childNodes.length > 0)
            node.removeChildNodes();

        node.setText('Replication Sets (' + p_data.length +
            ')');

        node.tag.num_repsets = p_data.length;

        for (i = 0; i < p_data.length; i++) {

            v_node = node.createChildNode(p_data[i].v_name,
                false,
                'fas node-all fa-tasks node-pglogical-repset', {
                    type: 'pglogical_subscription_repset',
                }, null, null, false);

        }

        node.drawChildNodes();

      },
      p_loading: false,
      p_check_database_connection: true
    });

}
