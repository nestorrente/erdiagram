# ERDiagram library

DISCLAIMER: This documentation is still work in progress.

## Table of contents

* **[Installation](#installation)**
	+ **[Using NPM](#using-npm)**
	+ **[Using `<script>` tag](#using-script-tag)**
* **[Concepts](#concepts)**
	+ [EntityRelationshipModel](#entityrelationshipmodel)
	+ [DatabaseModel](#databasemodel)
	+ [ClassModel](#classmodel)
	+ [Code converters](#code-converters)
		- [EntityRelationshipModelToCodeConverter](#entityrelationshipmodeltocodeconverter)
		- [DatabaseModelToCodeConverter](#databasemodeltocodeconverter)
		- [ClassModelToCodeConverter](#classmodeltocodeconverter)
* **[Usage example](#usage-example)**

## Installation

### Using NPM

Install the latest stable version:

```bash
npm install --save @nestorrente/erdiagram
```

Then you can import _Reaction.js_ methods in your modules:

```javascript
import {ref, reactive, computed, watch, nextTick} from '@nestorrente/erdiagram';

// ...or import all within an object
import * as Reaction from '@nestorrente/erdiagram';
```

### Using `<script>` tag

You can [download the latest version from here](../dist/erdiagram.js). Then, you can use it as any other JavaScript file:

```html
<script src="erdiagram.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/@nestorrente/erdiagram@0.1.0-alpha.1"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@nestorrente/erdiagram@0.1.0-alpha.1"></script>
```

The script will create a global  `ERDiagram` object, which contains all the exported classes, objects and functions.

## Concepts

### EntityRelationshipModel

### DatabaseModel

### ClassModel

### Code converters

#### EntityRelationshipModelToCodeConverter

#### DatabaseModelToCodeConverter

TODO: mention MySQLDatabaseModelToCodeConverter, OracleDatabaseModelToCodeConverter and SqlServerDatabaseModelToCodeConverter.

#### ClassModelToCodeConverter

TODO: mention JavaClassModelToCodeConverter and TypeScriptClassModelToCodeConverter.

## Usage example
