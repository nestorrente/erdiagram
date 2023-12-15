# ERDiagram library

## Table of contents

* [Installation](#installation)
    + [Using NPM](#using-npm)
    + [Using `<script>` tag](#using-script-tag)
* [Concepts](#concepts)
    + [EntityRelationshipModel](#entityrelationshipmodel)
    + [DatabaseModel](#databasemodel)
    + [ClassModel](#classmodel)
* [Configuration options](#configuration-options)
* [Use cases with examples](#use-cases-with-examples)
    + [Parsing the ERDiagram language into a EntityRelationshipModel object](#parsing-the-erdiagram-language-into-a-entityrelationshipmodel-object)
    + [Generate a database creation script from an EntityRelationshipModel object](#generate-a-database-creation-script-from-an-entityrelationshipmodel-object)
  + [Generate TypeScript interfaces from an EntityRelationshipModel object](#generate-typescript-interfaces-from-an-entityrelationshipmodel-object)
  + [Generate Java classes from an EntityRelationshipModel object](#generate-java-classes-from-an-entityrelationshipmodel-object)
  + [Generate diagram code from an EntityRelationshipModel object](#generate-diagram-code-from-an-entityrelationshipmodel-object)

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
<script src="https://unpkg.com/@nestorrente/erdiagram@1.0.0-rc2"></script>

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@nestorrente/erdiagram@1.0.0-rc2"></script>
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

## Use cases with examples

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
* [`EntityRelationshipModelParserConfig`](Configuration_options.md#entity-relationship-model-parser)

### Generate a database creation script from an EntityRelationshipModel object

```javascript
import {
    MysqlDialect,
    SqlSourceCodeGenerator
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

// First, we have to choose the SQL dialect we want to use. In this case, we will use MySQL.
const sqlDialect = new MysqlDialect();

// Then, we can create the SQL source code generator that will use the chosen dialect for generating the code
const sourceCodeGenerator = SqlSourceCodeGenerator.withDefaultConfig(sqlDialect);

const outputCode = sourceCodeGenerator.generateSourceCode(model);
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

Both the `MysqlDialect` and the `SqlSourceCodeGenerator` could be also instantiated using custom config properties:

```javascript
import {
    SqlSourceCodeGenerator,
    MysqlDialect,
    StandardCaseFormats
} from '@nestorrente/erdiagram';

const sqlDialect = new MysqlDialect({
    tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
    // ... other config options...
});

const sourceCodeGenerator = SqlSourceCodeGenerator.builder(sqlDialect)
        .configureDatabaseModel({
            usePluralTableNames: true,
          // ... other config options...
        })
        .build();
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
* [Database model](Configuration_options.md#database-model)
* [SQL dialects (`MysqlDialect`, `OracleDialect`, `PostgresqlDialect`, `SqliteDialect`, and `SqlServerDialect`)](Configuration_options.md#sql-dialects)

### Generate TypeScript interfaces from an EntityRelationshipModel object

```javascript
import {
    TypeScriptSourceCodeGenerator
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

const sourceCodeGenerator = TypeScriptSourceCodeGenerator.withDefaultConfig();

const outputCode = sourceCodeGenerator.generateSourceCode(erModel);
console.log(outputCode);
```

Output:

```typescript
interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    active: boolean;
}

interface Order {
    id?: number;
    creationDate: Date;
    state: string;
    products: Product[];
}
```

You can also instantiate the `TypeScriptSourceCodeGenerator` using custom configuration options:

```javascript
import {
    TypeScriptSourceCodeGenerator,
    StandardIdNamingStrategies,
    parseTypeScriptType
} from '@nestorrente/erdiagram';

const sourceCodeGenerator = TypeScriptSourceCodeGenerator.builder()
        .configureClassModel({
            idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
        })
        .configureTypeScript({
            typeBindings: {
                [EntityPropertyType.BLOB]: parseTypeScriptType('Array<MyCustomByteType>')
            }
        })
        .build();
```

#### See also

Configurable options of the mentioned components:
* [Class model](Configuration_options.md#class-model)
* [TypeScript](Configuration_options.md#typescript)

### Generate Java classes from an EntityRelationshipModel object

```javascript
import {
  JavaSourceCodeGenerator
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

const sourceCodeGenerator = JavaSourceCodeGenerator.withDefaultConfig();

const outputCode = sourceCodeGenerator.generateSourceCode(erModel);
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
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

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

}
```

You can also instantiate the `JavaSourceCodeGenerator` using custom configuration options.
This allows you to add JPA, validation and Lombok annotations among other features:

```javascript
import {
    BeanValidationTransformer,
    JavaSourceCodeGenerator,
    JpaTransformer,
    NotNullTextValidationStrategy,
    StandardIdNamingStrategies
} from '@nestorrente/erdiagram';

const sourceCodeGenerator = JavaSourceCodeGenerator.builder()
        .configureClassModel({
            idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
        })
        .configureJavaClassModel({
            generatedClassesPackage: 'com.example.my_package'
        })
        .addTransformers(
                new LombokTransformer({
					dataAnnotation: false,
                    toStringAnnotation: true,
					equalsAndHashCodeAnnotation: true
                }),
                new BeanValidationTransformer({
                    notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_BLANK
                }),
                JpaTransformer.builder()
                        .configureDatabaseModel({
                            usePluralTableNames: true
                        })
                        .configureJpa({
                            annotateGetters: true,
                            useExplicitTableName: true
                        })
                        .build()
        )
        .build();
```

#### See also

Configurable options of the mentioned components:
* [Class model](Configuration_options.md#class-model)
* [Java class model](Configuration_options.md#java-class-model)
* [Bean Validation transformer](Configuration_options.md#bean-validation)
* [JPA transformer](Configuration_options.md#jpa)
* [Database model](Configuration_options.md#database-model)

### Generate diagram code from an EntityRelationshipModel object

_ERDiagram_ currently supports generating _PlantUML_ and _Nomnoml_ diagram code. This allows you to get a visual diagram
of your entity-relationship model.

**Note:** _ERDiagram_ generates only the code of the diagram. In order to generate the image, you must use the
[Nomnoml](https://nomnoml.com/) and [PlantUML](http://www.plantuml.com/) online services.

```javascript
import {
    NomnomlSourceCodeGenerator,
    PlantUmlSourceCodeGenerator
} from '@nestorrente/erdiagram';

const model = { /* the model of the parsing example */};

const nomnomlSourceCodeGenerator = new NomnomlSourceCodeGenerator();
const nomnomlCode = nomnomlSourceCodeGenerator.generateSourceCode(model);

const plantUmlSourceCodeGenerator = new PlantUmlSourceCodeGenerator();
const plantUmlCode = plantUmlSourceCodeGenerator.generateSourceCode(model);
```

#### See also

Configurable options of the mentioned components:
* [Nomnoml source code generator](Configuration_options.md#nomnoml)
* [PlantUML source code generator](Configuration_options.md#plantuml)
