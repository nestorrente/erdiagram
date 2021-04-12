# Database model

The concept _database model_ refers to the set of tables and columns of a relational database. This page will cover how
_ERDiagram_ converts the input _entity-relationship model_ into a _database model_.

## Table of contents

* [Entities](#entities)
    + [Property modifiers](#property-modifiers)
        + [Optional modifier](#optional-modifier)
        + [Unique modifier](#unique-modifier)
    + [Entity identifier property](#entity-identifier-property)
* [Relationships](#relationships)
    + [Cardinalities](#cardinalities)
        + [One to one](#one-to-one)
        + [One to many](#one-to-many)
        + [Many to one](#many-to-one)
        + [Many to many](#many-to-many)
    + [Aliases](#aliases)
    + [Relationship's name](#relationships-name)
    + [Directions](#directions)

## Entities

Each entity defined in the input _entity-relationship model_ will be modeled as a table in the _database model_. In the
same way, every entity property will be modeled as a column of that table.

### Property modifiers

#### Optional modifier

_ERDiagram_ defines all database columns as `NOT NULL` by default. However, properties defined using the optional
modifier will be modeled as _nullable_ columns, so `NOT NULL` statement will not be used on its definition.

#### Unique modifier

Properties defined using the unique modifier will be modeled by adding a `UNIQUE` constraint to that column.

### Entity identifier property

The identifier property of the entity will be modeled as a `NOT_NULL` column. Moreover, it will be also defined as the
`PRIMARY KEY` (a.k.a. `IDENTIFIER`) of the table.

## Relationships

### Cardinalities

_ERDiagram_ supports different types of relationships regarding the cardinality of its members. We recommend reading
[Cardinalities](ERDiagram_language.md#cardinalities) before continue for a better understanding.

#### One to one

Relationships whose cardinality is _one-to-one_ are modeled just in the same way that _many-to-one_ relationships. This
means that a _foreign column_ is added to the left table. See the following sections for more detail.

#### One to many

Relationships whose cardinality is _one-to-many_ are modeled by adding a _foreign column_ to the right table (the _many_
side of the relationship). Let's see an example:

```erdiagram
User <->* Address
```

The relationship above represents a _User_ that may have many _Addresses_. On the other side, each _Address_ belongs to
one (and only one) _User_. This is modeled by adding a `usedId` column and its corresponding `FOREIGN KEY` constraint
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

Relationships whose cardinality is _many-to-many_ are modeled by creating an _intermediate_table_ which 2 _foreign
columns_, one for each entity. Let's see an example:

```erdiagram
User *<->* Role
```

The relationship above represents a _User_ that may have many _Roles_. At the same time, each _Role_ is related to
many _Users_. This is modeled by creating a new table `UserRole` with the columns `userId` and `roleId`, including their
corresponding
`FOREIGN KEY` constraints referencing the `User` and `Role` tables respectively.

You can learn how to customize the name of the _intermediate table_ and the _foreign columns_ in the
[Relationship's name](#relationships-name) and [Aliases](#aliases) sections.

### Aliases

Defining aliases for the members of a relationship is useful not only for semantic purposes but also for customizing the
_foreign columns_ names.

For example, imagine you want to model a _Travel_ entity that has 2 relationships to the same _City_ entity, one for
the _origin city_ and the other for the _destination city_. If you define those relationships without specifying an
alias for the _City_ member, you will end up with two identical `cityId` columns in your `Travel` table.

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

This will be modeled by adding a `bossId` column to the `Employee` table. If you don't use _aliases_, the column would
be named `employeeId`, which is much less semantic.

### Relationship's name

When defining the name of a _many-to-many_ relationship, _ERDiagram_ will use it for naming the corresponding
_intermediate table_. Let's see an example:

```erdiagram
User *<->* Role
```

The relationship above will be modeled by creating the `UserRole` table. If we want to customize this name, we can
define a name for the relationship in this way:

```erdiagram
User *<->* Role (UserRoleMapping)
```

By doing this, we are telling _ERDiagram_ to use the name `UserRoleMapping` for the _intermediate table_.

_Note: defining the name of any other kind of relationship (one-to-one, one-to-many, or many-to-one) does not affect the
database model._

#### Relationship's name and `usePluralTableNames` option

It's possible to [configure _ERDiagram_ to use plural table names](docs/Configuration_options.md#databasemodelgenerator), so the entity `User` will be modeled by creating a
`Users` table. However, if you have specified the relationship's name explicitly, it will be used without applying any
transformation, so you have to specify it in plural if you what that behavior.

The reason for this is that there are some scenarios where the pluralization of the relationship's name can lead to
unexpected behaviors. For example, the default name of a table representing the relationship between `Users` and `Roles`
tables should be `UsersRoles`. However. if you specify the relationship's name as `UserAndRole`, it will be pluralized
to `UserAndRoles` instead of `UsersAndRoles`. To prevent this, _ERDiagram_ will use explicit relationship names without
applying any transformation, so you can manually pluralize them in the right way.

### Directions

_The direction of the relationships is intended for OOP classes code generation, and it's not used in database model
generation._

The main reason for ignoring the direction of the relationship in the database model is because it's used to define how
the data can be accessed (i.e. it's possible to get the roles of a user, but it's not possible to get the users that
have a specific role), which is out of the scope of the _database model_, as database data can be queried in any
direction using `JOIN` statements.
