# Class model

The concept _class model_ refers to the set of classes of an object-oriented programming language. This page will cover
how _ERDiagram_ converts the input _entity-relationship model_ into a _class model_.

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

Each entity defined in the input _entity-relationship model_ will be converted into a class in the _class model_. In the
same way, every entity property will be modelled as a field of that class.

### Property modifiers

#### Optional modifier

_ERDiagram_ considers all properties as mandatory by default. However, properties defined using the optional modifier
will be modelled as _nullable_ fields.

#### Unique modifier

_The unique modifier is intended for database code generation, and it's not used in class model generation._

This means that defining unique class fields is currently an unsupported feature. This may change in the future, so you can
create an issue in order to discuss this if you need it :slightly_smiling_face:

#### Auto-incremental modifier

_The auto-incremental modifier is intended for database code generation, and it's not used in class model generation._

This means that defining auto-incremental class fields is currently an unsupported feature. This may change in
the future, so you can create an issue in order to discuss this if you need it :slightly_smiling_face:

Properties defined using the auto-incremental modifier will be modelled as `AUTO_INCREMENTAL` columns.

_Note: as there are some database engines that doesn't support the `AUTO_INCREMENTAL` modifier, ERDiagram will try to
emulate the same behavior using a combination of a `SEQUENCE` and a `DEFAULT` value in the database engines that
support those features._

### Entity identifier property

The identifier property of the entity will be treated just like any other field.

## Relationships

### Cardinalities

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

### Directions

Relationship's directions are no taken into account when generating the _database model_. The reason for this is that
the relationship's direction defines how the data can be accessed (i.e. it's possible to get the roles of a user, but
it's not possible to get the users that have a specific role), which is out of the scope of the _database model_, as
data can be queried in any way using `JOIN` statements.

### Aliases

Defining aliases for the members of a relationship is useful not only for semantic purposes but also for customizing the
_foreign columns_ names.

For example, imagine you want to model a _Travel_ entity that as 2 relationships to the same _City_ entity, one for the _origin
city_ and the other for the _destiny city_. If you define those relationships without specifying an alias for the _City_ member,
you will end up with two identical `cityId` columns in your `Travel` table.

The way to handle this situation is by adding alias to the _City_ member of both relationships:

```erdiagram
Travel *-> City originCity
Travel *-> City destinyCity
```

By doing this, _ERDiagram_ will name the columns `originCityId` and `destinyCityId`.

You can also use _aliases_ in _self referencing_ tables:

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

_Note: defining the name of any other kind of relationship (one-to-one, one-to-many or many-to-one) does not affect the
database model._
