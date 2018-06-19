# Plugin API

## Javascript functions

- activateHook(p_hook, p_function)
  - **DESCRIPTION**: Enables a specific hook.
  - **PARAMETERS**:
    - p_hook: the name of hook to be activated.
    - p_function: the function to be called whenever that hook is triggered. Depending on the hook, this function is called with specific arguments.
  - **AVAILABLE HOOKS**:
    - innerTabMenu: Used to insert custom options in the + internal tab
    - outerTabMenu: Used to insert custom options in the + external tab
    - windowResize: Called every time window is resized, including when internal objects are resized
    - changeTheme: Called when theme is changed
    - postgresqlTreeNodeOpen: After opening a postgresql tree node
    - postgresqlTreeContextMenu: Used to insert custom options in the current postgresql tree node
    - postgresqlTreeNodeClick: After clicking on postgresql tree node
    - oracleTreeNodeOpen: After opening a oracle tree node
    - oracleTreeContextMenu: Used to insert custom options in the current oracle tree node
    - oracleTreeNodeClick: After clicking on oracle tree node
    - mysqlTreeNodeOpen: After opening a mysql tree node
    - mysqlTreeContextMenu: Used to insert custom options in the current mysql tree node
    - mysqlTreeNodeClick: After clicking on mysql tree node
    - mariadbTreeNodeOpen: After opening a mariadb tree node
    - mariadbTreeContextMenu: Used to insert custom options in the current mariadb tree node
    - mariadbTreeNodeClick: After clicking on mariadb tree node

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
  - ** RETURNS **: tab object tag.

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
  - ** RETURNS **: Selected external tab tag.

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
