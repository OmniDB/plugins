# Plugin System

- [Introduction](#introduction)
- [Installing existing Plugins](#installing-existing-plugins)
- [Creating Plugins](#creating-plugins)

## Introduction

OmniDB 2.9 introduces the plugin system, a feature that allows users to develop and
share their own features that can be plugged into OmniDB without having to deploy
the whole application again.

### Plugin file architecture

![](https://omnidb.org/images/screenshots/plugins/plugin_files.png)

OmniDB is a web application written in python, so each plugin is a combination of
javascript, python and other resources (such as images) that together implement
the feature it was created for. Javascript files control OmniDB's interface while
python files control what happens in the server side, the portion of code that
actually communicates with the database.

### Hooks

The plugin system is based on hooks that are located in different parts of the
interface. Each plugin can subscribe to any hook and have a collection of API
functions to perform different tasks, such as creating inner/outer tabs, creating
tree nodes and calling python functions in the plugin's python code.

## Installing existing Plugins

Every plugin must contain the exact file structure with at least the default files:

- plugin.conf
- plugin.py
- plugin.js

These files are contained in a specific folder structure that respects OmniDB's
architecture.

To install a plugin just extract its zip file to OmniDB's folder that contain the
web application:

### OmniDB-server:

#### Linux:

```/opt/omnidb-server/OmniDB_app```

#### Windows:

```C:/OmniDB-server/OmniDB_app```

### OmniDB-app:

#### Linux:

```/opt/omnidb-app/resources/app/omnidb-server/OmniDB_app```

#### Windows:

```C:/OmniDB-app/resources/app/omnidb-server/OmniDB_app```

#### OSX:

Right click on the app then -> Show Package Contents

```Contents/Resources/app/app/omnidb-server/OmniDB_app```

After installing the plugin you must restart OmniDB in order to load the python
related files. When you access OmniDB with loaded plugins you can see them by
clicking in the plugin icon on the top right part of the screen:

![](https://omnidb.org/images/screenshots/plugins/plugin_list.png)

This ```test_plugin``` subscribes to a few hooks to show what the API can do. One
of the hooks used is ```innerTabMenu``` called whenever the + tab is clicked in
the inner tab list. This hook allows you to implement custom items in that context
menu:

![](https://omnidb.org/images/screenshots/plugins/inner_test.png)

## Creating Plugins

[Plugin API](https://github.com/OmniDB/plugins/blob/master/API.md)

To create a plugin you can start with an existing sample plugin (test_plugin,
for instance), that already contains the required folder structure, and then modify
the core files to implement your desired features.

You can use the [Plugin API](https://github.com/OmniDB/plugins/blob/master/API.md)
as a reference to use all functions and hooks available so far, also check existing
plugins to have an idea of how to they are used.

### plugin.conf

Configuration file that contains basic information about the plugin.

### plugin.js

Javascript file loaded when OmniDB's interface is started in the client. This file
is the starting point to load other client side files such as other javascript files,
libraries, css files, etc and to also subscribe to the API Hooks that will actually
implement custom features.

### plugin.js

Python file loaded when OmniDB is started. This file contains server side custom
functions that can be called by the javascript API and can use the database object
passed as argument to perform queries in the database.

Every plugin python function The functions is always called with 2 parameters:

- my_python_function(p_database_object, p_data)
  - p_database_object: OmniDB's database object that contains several attributes
  and functions to retrieve data from the database.
  - p_data: optional paramater to send data from the javascript side.
