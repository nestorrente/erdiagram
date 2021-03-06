# ERDiagram library

DISCLAIMER: This documentation is still work in progress.

## Table of contents

* [Installation](#installation)
    + [Using NPM](#using-npm)
    + [Using `<script>` tag](#using-script-tag)
* [Concepts](#concepts)
    + [EntityRelationshipModel](#entityrelationshipmodel)
    + [DatabaseModel](#databasemodel)
    + [ClassModel](#classmodel)
* [Configuration options](#configuration-options)
* [Usage examples](#usage-examples)
    + [Parsing the ERDiagram language into a EntityRelationshipModel object](#parsing-the-erdiagram-language-into-a-entityrelationshipmodel-object)
    + [Generate a database creation script from an EntityRelationshipModel object](#generate-a-database-creation-script-from-an-entityrelationshipmodel-object)
    + [Generate OOP classes from an EntityRelationshipModel object](#generate-oop-classes-from-an-entityrelationshipmodel-object)
    + [Generate a diagram image from an EntityRelationshipModel object](#generate-a-diagram-image-from-an-entityrelationshipmodel-object)

## Installation

### Using NPM

Install the latest stable version:

```bash
npm install --save @nestorrente/erdiagram
```

Then you can import _ERDiagram_ components in your modules:

```javascript
import {
    EntityRelationshipModel,
    EntityRelationshipModelParser,
    // ... other imports...
} from '@nestorrente/erdiagram';
```

### Using `<script>` tag

You can [download the latest version from here](../dist/erdiagram.js). Then, you can use it as any other JavaScript file:

```html
<script src="erdiagram.js"></script>
```

Or, if you prefer, you can use any of the following CDN repositories:

```html
<!-- Unpkg -->
<script src="https://unpkg.com/@nestorrente/erdiagram@1.0.0-beta.2"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@nestorrente/erdiagram@1.0.0-beta.2"></script>
```

The script will create a global  `ERDiagram` object, which contains all the exported classes, objects and functions.

## Concepts

### EntityRelationshipModel

This interface represents the entities and relationships. Entity-relationship models written using the _ERDiagram_
language are parsed into objects of this type.

### DatabaseModel

This interface represents the database tables (and their references) that represent the input entity-relationship model.
The `EntityRelationshipModel` object is transformed into a `DatabaseModel` in order to generate the database creation
code.

You can learn more about how the database model is generated [here](Database_model.md).

### ClassModel

This interface represents the OOP classes that represent the input entity-relationship model. The
`EntityRelationshipModel` object is transformed into a `ClassModel` in order to generate the code of the classes.

You can learn more about how the class model is generated [here](Class_model.md).

## Configuration options

You can read the [Configuration options](Configuration_options.md) document in order to get further
information about the configuration options of the different components of _ERDiagram_. 

## Usage examples

### Parsing the ERDiagram language into a EntityRelationshipModel object

```javascript
import {
    EntityRelationshipModelParser
} from '@nestorrente/erdiagram';

// Define the entity-relationship model as a string using the ERDiagram language
const modelCode = `

Product
    name text(50)
    description text(1000)
    price decimal(10, 3)
    active bool
  
Order
    creationDate datetime
    state text(10)

Order ->* Product

`;

// Instantiate the parser using the default config
const parser = new EntityRelationshipModelParser();

// Parse the model and print it
const model = parser.parseModel(modelCode);
console.log(model);
```

Output:

```json
{
  "entities": [
    {
      "name": "Product",
      "properties": [
        {
          "name": "name",
          "optional": false,
          "unique": false,
          "type": "text",
          "length": [50]
        },
        {
          "name": "description",
          "optional": false,
          "unique": false,
          "type": "text",
          "length": [1000]
        },
        {
          "name": "price",
          "optional": false,
          "unique": false,
          "type": "decimal",
          "length": [10, 3]
        },
        {
          "name": "active",
          "optional": false,
          "unique": false,
          "type": "bool",
          "length": []
        }
      ]
    },
    {
      "name": "Order",
      "properties": [
        {
          "name": "creationDate",
          "optional": false,
          "unique": false,
          "type": "datetime",
          "length": []
        },
        {
          "name": "state",
          "optional": false,
          "unique": false,
          "type": "text",
          "length": [10]
        }
      ]
    }
  ],
  "relationships": [
    {
      "direction": "left_to_right",
      "leftMember": {
        "entity": "Order",
        "entityAlias": "order",
        "cardinality": "one"
      },
      "rightMember": {
        "entity": "Product",
        "entityAlias": "product",
        "cardinality": "many"
      }
    }
  ]
}
```

The `EntityRelationshipModelParser` could be also instantiated using custom config properties:

```javascript
const parser = new EntityRelationshipModelParser({
    allowUnknownEntities: true
});
```

#### See also

Configurable options of the mentioned components:
* [`EntityRelationshipModelParser`](Configuration_options.md#entityrelationshipmodelparser)

### Generate a database creation script from an EntityRelationshipModel object

```javascript
import {
    EntityRelationshipModelToDatabaseCodeConverter,
    DatabaseModelGenerator,
    DatabaseModelToSqlCodeConverter,
    MysqlDialect
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

// 1. Create a DatabaseModelGenerator
const databaseModelGenerator = new DatabaseModelGenerator();

// 2. Create a DatabaseModelToSqlCodeConverter using a SQL dialect (the one for MySQL databases in this case)
const sqlDialect = new MysqlDialect();
const databaseModelToCodeConverter = new DatabaseModelToSqlCodeConverter(sqlDialect);

// 3. The code generation can be attached in 2 ways:

// Way 1: 2-step conversion using both the databaseModelGenerator and the databaseModelToCodeConverter.
// First the database model is generated, then it's converted to the output code.
// This is useful when you want to generate the same tables for different database engines,
// so you can reuse the DatabaseModel instance.

const databaseModel = databaseModelGenerator.generateDatabaseModel(model);

const outputCode = databaseModelToCodeConverter.convertToCode(databaseModel);
console.log(outputCode);

// Way 2: create an EntityRelationshipModelToDatabaseCodeConverter.
// That class implements the EntityRelationshipModelToCodeConverter interface,
// which allows to transform the EntityRelationshipModel to the output code directly.
// It does the 2-step conversion under the hood.

const erModelToCodeConverter = new EntityRelationshipModelToDatabaseCodeConverter(
    databaseModelGenerator,
    databaseModelToCodeConverter
);

const outputCode = erModelToCodeConverter.convertToCode(model)
console.log(outputCode);
```

Output:

```mysql
CREATE TABLE `Product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `price` DECIMAL(10, 3) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `orderId` BIGINT NOT NULL,
    CONSTRAINT `Product_pk` PRIMARY KEY (`id`)
);

CREATE TABLE `Order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `creationDate` TIMESTAMP NOT NULL,
    `state` VARCHAR(10) NOT NULL,
    CONSTRAINT `Order_pk` PRIMARY KEY (`id`)
);

ALTER TABLE `Product` ADD CONSTRAINT `Product_orderId_fk` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`);
```

Both the `DatabaseModelGenerator` and the `MysqlDialect` could be also instantiated using custom config properties:

```javascript
import {
    DatabaseModelGenerator,
    MysqlDialect,
    StandardIdNamingStrategies,
    LowerCamelCaseFormat
} from '@nestorrente/erdiagram';

const databaseModelGenerator = new DatabaseModelGenerator({
    usePluralTableNames: true,
    // ... other config options...
});

const sqlDialect = new MysqlDialect({
    tableNameCaseFormat: LowerCamelCaseFormat.UPPER_UNDERSCORE,
    // ... other config options...
});
```

Although we are using `MysqlDialect` in this example, there is also support for other database engines. This is the full
list of the supported engines:

| Database engine | SQL dialect class   |
|-----------------|---------------------|
| MySQL           | `MysqlDialect`      |
| Oracle DB       | `OracleDialect`     |
| PostgreSQL      | `PostgresqlDialect` |
| SQLite          | `SqliteDialect`     |
| SQL Server      | `SqlServerDialect`  |

#### See also

Configurable options of the mentioned components:
* [`DatabaseModelGenerator`](Configuration_options.md#databasemodelgenerator)
* [`SqlDialect` (`MysqlDialect`, `OracleDialect`, `PostgresqlDialect`, `SqliteDialect`, and `SqlServerDialect`)](Configuration_options.md#sqldialect-mysqldialect-oracledialect-postgresqldialect-sqlitedialect-and-sqlserverdialect)

### Generate OOP classes from an EntityRelationshipModel object

```javascript
import {
    EntityRelationshipModelToClassCodeConverter,
    ClassModelGenerator,
    JavaClassModelToCodeConverter
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

// We instantiate a ClassModelGenerator and a ClassModelToCodeConverter
// (the one for Java classes in this case) using the default config.
const classModelGenerator = new ClassModelGenerator();
const classModelToCodeConverter = new JavaClassModelToCodeConverter();

// Way 1: 2-step conversion using both the classModelGenerator and the classModelToCodeConverter.
// First the class model is generated, then it's converted to the output code.

const classModel = classModelGenerator.generateClassModel(model);
const outputCode = classModelToCodeConverter.convertToCode(classModel);
console.log(outputCode);

// Way 2: create an EntityRelationshipModelToClassCodeConverter.
// That class implements the EntityRelationshipModelToCodeConverter interface,
// which allows to transform the EntityRelationshipModel to the output code directly.
// It does the 2-step conversion under the hood.

const erModelToCodeConverter = new EntityRelationshipModelToClassCodeConverter(
        classModelGenerator,
        classModelToCodeConverter
);

const outputCode = erModelToCodeConverter.convertToCode(model)
console.log(outputCode);
```

Output:

```java
/* ========== Product class ========== */

import java.math.BigDecimal;

public class Product {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Boolean active;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public String setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getActive() {
        return active;
    }

    public Boolean setActive(Boolean active) {
        this.active = active;
    }

}

/* ========== Order class ========== */

import java.time.LocalDateTime;
import java.util.List;

public class Order {

    private Long id;
    private LocalDateTime creationDate;
    private String state;
    private List<Product> products;

    public Long getId() {
        return id;
    }

    public Long setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getState() {
        return state;
    }

    public String setState(String state) {
        this.state = state;
    }

    public List<Product> getProducts() {
        return products;
    }

    public List<Product> setProducts(List<Product> products) {
        this.products = products;
    }

}
```

Both the `ClassModelGenerator` and the `JavaClassModelToCodeConverter` could be also instantiated using custom config
properties:

```javascript
import {
    ClassModelGenerator,
    JavaClassModelToCodeConverter,
    StandardIdNamingStrategies,
    LowerCamelCaseFormat
} from '@nestorrente/erdiagram';

const classModelGenerator = new ClassModelGenerator({
    idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX,
    // ... other config options...
});

const classModelToCodeConverter = new JavaClassModelToCodeConverter({
    generatedClassesPackage: 'com.example.mypackage',
    // ... other config options...
});
```

Although we are using `JavaClassModelToCodeConverter` in this example, there is also support for TypeScript (using the
`TypeScriptClassModelToCodeConverter` class).

#### See also

Configurable options of the mentioned components:
* [`ClassModelGenerator`](Configuration_options.md#classmodelgenerator)
* [`JavaClassModelToCodeConverter`](Configuration_options.md#javaclassmodeltocodeconverter)
* [`TypeScriptClassModelToCodeConverter`](Configuration_options.md#typescriptclassmodeltocodeconverter)

### Generate diagram code from an EntityRelationshipModel object

_ERDiagram_ currently supports generating _PlantUML_ and _Nomnoml_ diagram code. This allows you to get a visual diagram
of your entity-relationship model.

**Note:** _ERDiagram_ generates only the code of the diagram. In order to generate the image, you must use the
[Nomnoml](https://nomnoml.com/) and [PlantUML](http://www.plantuml.com/) online services.

```javascript
import {
    PlantUmlEntityRelationshipModelToDiagramCodeConverter,
    PlantUmlEntityRelationshipModelToDiagramImageConverter
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

const plantUmlERModelToDiagramCodeConverter = new PlantUmlEntityRelationshipModelToDiagramCodeConverter();
const plantUmlCode = erModelToDiagramCodeConverter.convertToCode(model);

const nomnomlERModelToDiagramCodeConverter = new NomnomlEntityRelationshipModelToDiagramCodeConverter({
    // Optional config options
});
const nomnomlCode = nomnomlERModelToDiagramCodeConverter.convertToCode(model);
```
