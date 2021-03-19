# Database model

The concept _database model_ refers to the set of tables and columns of a relational database. This page will cover how
_ERDiagram_ converts the input _entity-relationship model_ into a _database model_.

## Table of contents

* **[Entities](#entities)**
    + [Property modifiers](#property-modifiers)
        + [Optional modifier](#optional-modifier)
        + [Unique modifier](#unique-modifier)
        + [Auto-incremental modifier](#auto-incremental-modifier)
    + [Entity identifier property](#entity-identifier-property)
* **[Relationships](#relationships)**
    + [Cardinalities](#cardinalities)
        + [One to one](#one-to-one)
        + [One to many](#one-to-many)
        + [Many to one](#many-to-one)
        + [Many to many](#many-to-many)
    + [Aliases](#aliases)
    + [Relationship's name](#relationships-name)
    + [Directions](#directions)

## Entities

Each entity defined in the input _entity-relationship model_ will be modelled as a table in the _database model_. In the
same way, every entity property will be modelled as a column of that table.

### Property modifiers

#### Optional modifier

_ERDiagram_ defines all database columns as `NOT NULL` by default. However, properties defined using the optional
modifier will be modelled as _nullable_ columns, so `NOT NULL` statement will not be used on its definition.

#### Unique modifier

Properties defined using the unique modifier will be modelled by adding a `UNIQUE` constraint to that column.

#### Auto-incremental modifier

Properties defined using the auto-incremental modifier will be modelled as `AUTO_INCREMENTAL` columns.

_Note: as some database engines don't support the `AUTO_INCREMENTAL` modifier, ERDiagram will try to emulate the same
behavior using a combination of a `SEQUENCE` and a `DEFAULT` value in the database engines that support those features._

### Entity identifier property

The identifier property of the entity will be modelled as a `NOT_NULL` and `AUTO_INCREMENTAL` column. Moreover, it will
be also defined as the `PRIMARY KEY` (a.k.a. `IDENTIFIER`) of the table.

## Relationships

### Cardinalities

_ERDiagram_ supports different types of relationships regarding the cardinality of its members. We recommend reading
[Cardinalities](ERDiagram_language.md#cardinalities) before continue for a better understanding.

#### One to one

Relationships whose cardinality is _one-to-one_ are modelled just in the same way that _many-to-one_ relationships. This
means that a _foreign column_ is added to the left table. See the following sections for more detail.

#### One to many

Relationships whose cardinality is _one-to-many_ are modelled by adding a _foreign column_ to the right table (the _many_
side of the relationship). Let's see an example:

```erdiagram
User <->* Address
```

The relationship above represents a _User_ that may have many _Addresses_. On the other side, each _Address_ belongs to
one (and only one) _User_. This is modelled by adding a `usedId` column and its corresponding `FOREIGN KEY` constraint
referencing the `Address` table.

You can learn how to customize the name of the _foreign column_ in the [Aliases](#aliases) section.

#### Many to one

Relationships whose cardinality is _many-to-one_ are just like mirrored _one-to-many_ relationships. To be precise, the
following relationships are equivalent:

```erdiagram
# many-to-one
Address *<-> User

# one-to-many
User <->* Address
```

#### Many to many

Relationships whose cardinality is _many-to-many_ are modelled by creating an _intermediate_table_ which 2 _foreign columns_,
one for each entity. Let's see an example:

```erdiagram
User *<->* Role
```

The relationship above represents a _User_ that may have many _Roles_. At the same time, each _Role_ is related to many _Users_.
This is modelled by creating a new table `UserRole` with the columns `userId` and `roleId`, including their corresponding
`FOREIGN KEY` constraints referencing the `User` and `Role` tables respectively.

You can learn how to customize the name of the _intermediate table_ and the _foreign columns_ in the
[Relationship's name](#relationships-name) and [Aliases](#aliases) sections.

### Aliases

Defining aliases for the members of a relationship is useful not only for semantic purposes but also for customizing the
_foreign columns_ names.

For example, imagine you want to model a _Travel_ entity that has 2 relationships to the same _City_ entity, one for the _origin
city_ and the other for the _destination city_. If you define those relationships without specifying an alias for the _City_ member,
you will end up with two identical `cityId` columns in your `Travel` table.

The way to handle this situation is by adding an alias to the _City_ member of both relationships:

```erdiagram
Travel *-> City originCity
Travel *-> City destinationCity
```

By doing this, _ERDiagram_ will name the columns `originCityId` and `destinationCityId`.

You can also use _aliases_ in _self-referencing_ tables:

```erdiagram
Employee subordinates *<-> Employee boss
```

This will be modelled by adding a `bossId` column to the `Employee` table. If you don't use _aliases_, the column would
be named `employeeId`, which is much less semantic.

### Relationship's name

When defining the name of a _many-to-many_ relationship, _ERDiagram_ will use it for naming the corresponding _intermediate
table_. Let's see an example:

```erdiagram
User *<->* Role
```

The relationship above will be modelled by creating the `UserRole` table. If we want to customize this name, we can define a
name for the relationship in this way:

```erdiagram
User *<->* Role (UserRoleMapping)
```

By doing this, we are telling _ERDiagram_ to use the name `UserRoleMapping` for the _intermediate table_.

_Note: defining the name of any other kind of relationship (one-to-one, one-to-many, or many-to-one) does not affect the
database model._

### Directions

_The auto-incremental modifier is intended for OOP classes code generation, and it's not used in database model generation._

The main reason for ignoring the direction of the relationship in the database model is because it's used to define how the data
can be accessed (i.e. it's possible to get the roles of a user, but it's not possible to get the users that have a specific
role), which is out of the scope of the _database model_, as database data can be queried in any direction using `JOIN`
statements.