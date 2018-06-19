# Plugin API

## Javascript functions

- activateHook(p_hook, p_function)
  - **DESCRIPTION**: Enables a specific hook.
  - **PARAMETERS**:
    - p_hook: the name of hook to be activated.
    - p_function: the function to be called whenever that hook is triggered. Depending on the hook, this function is called with specific arguments and expects a specific returning value.
  - **AVAILABLE HOOKS**:
    - innerTabMenu: Used to insert custom options in the + internal tab.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - outerTabMenu: Used to insert custom options in the + external tab.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - windowResize: Called every time window is resized, including when internal objects are resized
    - changeTheme: Called when theme is changed.
      - **PARAMETERS**:
        - p_editor_theme: The name of the new selected theme.
        - p_theme_type: The type of the new theme (dark or light).
    - postgresqlTreeNodeOpen: After opening a postgresql tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - postgresqlTreeContextMenu: Used to insert custom options in the current postgresql tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - postgresqlTreeNodeClick: After clicking on postgresql tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - oracleTreeNodeOpen: After opening a oracle tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - oracleTreeContextMenu: Used to insert custom options in the current oracle tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - oracleTreeNodeClick: After clicking on oracle tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - mysqlTreeNodeOpen: After opening a mysql tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - mysqlTreeContextMenu: Used to insert custom options in the current mysql tree node.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - mysqlTreeNodeClick: After clicking on mysql tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - mariadbTreeNodeOpen: After opening a mariadb tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
    - mariadbTreeContextMenu: Used to insert custom options in the current mariadb tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.
      - **MUST RETURN**: List of menu itens (Check test_plugin for example).
    - mariadbTreeNodeClick: After clicking on mariadb tree node.
      - **PARAMETERS**:
        - p_node: Tree node object.

- p_node.createChildNode(p_text,p_expanded,p_icon,p_tag)
  - **DESCRIPTION**: Creates a child node in the current node. This function is supposed to be called with hooks that contain p_node as parameter.
  - **PARAMETERS**:
    - p_text: node text.
    - p_expanded: whether to expand the node when creating it. This is useful when creating childs of childs.
    - p_icon: path of an image to be used in the tab title. Use together with getPluginPath() to get the correct relative path.
    - p_tag: sets a tag for the child node. This is useful to create custom attributes that will be used to identify this node when other hooks are triggered.

- callPluginFunction({ p_plugin_name, p_function_name, p_data = null, p_callback = null, p_loading = true, p_check_database_connection = true })
  - **DESCRIPTION**: Asynchronously calls a specific python function of a specific plugin (python backend).
  - **PARAMETERS**:
    - p_plugin_name: the name of the plugin.
    - p_function_name: the name of the function being called.
    - p_data: data to be sent to the python function.
    - p_callback: javascript function to be called when the function ends.
    - p_loading: whether to show the loading image.
    - p_check_database_connection: whether to check if the database connection is working before calling the python function.

- createInnerTab({ p_name = '', p_image = '', p_select_function = null, p_before_close_function = null })
  - **DESCRIPTION**: Creates an internal blank tab.
  - **PARAMETERS**:
    - p_name: the name of the tab.
    - p_image: path of an image to be used in the tab title. Use together with getPluginPath() to get the correct relative path.
    - p_select_function: function to be called whenever the tab is selected.
    - p_before_close_function: function to be called before the tab is closed.
  - **RETURNS**: tab object tag.

- createOuterTab({ p_name = '', p_image = '', p_select_function = null, p_before_close_function = null })
  - **DESCRIPTION**: Creates an external blank tab.
  - **PARAMETERS**:
    - p_name: the name of the tab.
    - p_image: path of an image to be used in the tab title. Use together with getPluginPath() to get the correct relative path.
    - p_select_function: function to be called whenever the tab is selected.
    - p_before_close_function: function to be called before the tab is closed.
  - **RETURNS**: tab object tag.

- getSelectedInnerTabTag()
  - **DESCRIPTION**: Gets the tag of the selected internal tab, allowing to store information there.
  - **RETURNS**: Selected internal tab tag.

- getSelectedOuterTabTag()
  - **DESCRIPTION**: Gets the tag of the selected external tab, allowing to store information there.
  - **RETURNS**: Selected external tab tag.

- createSQLTab({ p_name = '', p_template = '', p_show_qtip = true })
  - **DESCRIPTION**: Creates an internal Query Tab with a specific SQL passed as a parameter.
  - **PARAMETERS**:
    - p_name: the name of the tab.
    - p_template: the SQL to be filled in the editor.
    - p_show_qtip: whether to show a tip with the message "Adjust command and run!"

- getPluginPath(p_plugin_name)
  - **DESCRIPTION**: Get the path of the specific plugin to use reference static files.
  - **PARAMETERS**:
    - p_plugin_name: the name of the plugin.

- showError(p_message): shows a popup with the specific error message

- setDDL({ p_ddl = '', p_select = true})
  - **DESCRIPTION**: Sets the content of the DDL box in the DDL tab.
  - **PARAMETERS**:
    - p_ddl: the DDL to be filled in the editor.
    - p_select: whether to also select the DDL tab.

- setProperties({ p_properties = [], p_select = true})
  - **DESCRIPTION**: Sets the content of the Properties grid in the Properties tab.
  - **PARAMETERS**:
    - p_properties: the properties to be displayed in the grid. This is a list of lists.
    - p_select: whether to also select the Properties tab.

## Python side

Plugins on the python side are implemented as user defined functions that will be called by
the javascript API function `callPluginFunction()`. The functions are called always
with 2 parameters:

- my_python_function(p_database_object, p_data)
  - p_database_object: OmniDB's database object that contains several attributes
  and functions to retrieve data from the database.
  - p_data: optional paramater to send data from the javascript side.
