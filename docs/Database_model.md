# Database model

The concept _database model_ refers to the set of tables and columns of a relational database. This page will cover how
the input _entity-relationship model_ is converted to a _database model_.

## Table of contents

* **[Entities](#entities)**
    + [Property modifiers](#property-modifiers)
    + [Entity identifier property](#entity-identifier-property)
* **[Relationships](#relationships)**
    + [Directions](#directions)
    + [Aliases](#aliases)
    + [Cardinalities](#cardinalities)
    + [Relationship's name](#relationships-name)
    + [Relationship examples](#relationship-examples)
* **[Comments](#comments)**

## Entities

Each entity defined in the input _entity-relationship model_ will be mapped to a different table in the _database
model_. In the same way, every entity property will be mapped to a different column of that table.

### Property modifiers

#### Optional modifier

_ERDiagram_ defines all database columns as `NOT NULL` by default. However, properties defined using the optional
modifier will be mapped as _nullable_ columns, so `NOT NULL` statement will not be used on its definition.

#### Unique modifier

Properties defined using the unique modifier will be mapped using a `UNIQUE` constraint on relational databases.

#### Auto-incremental modifier

Properties defined using the auto-incremental modifier will be mapped to `AUTO_INCREMENTAL` columns.

_Note: as there are some database engines that doesn't support the `AUTO_INCREMENTAL` modifier, ERDiagram will try to
emulate the same behavior using a combination of a `SEQUENCE` and a `DEFAULT` value in those database engines that
support those features._

### Entity identifier property

The identifier property of the entity will be treated as any other column, with the only difference that it will be
defined as the `PRIMARY KEY` (a.k.a. `IDENTIFIER`) of the table.

## Relationships

### Cardinalities

#### One to one

Relationships whose cardinality is _one-to-one_ are modelled just in the same way that _many-to-one_ relationships. This
means that a _foreign column_ is added to the left table. See the following sections for more detail.

#### One to many

Relationships whose cardinality is _one-to-many_ are modelled by adding a _foreign column_ to the right table (the _many_
side of the relationship).

Let's see an example:

```erdiagram
User <->* Address
```

The relationship above represents a _User_ that may have many _Addresses_. On the other side, an _Address_ belongs to
one (and only one) _User_. This is modelled by adding a `usedId` column and its corresponding `FOREIGN KEY` to the
`Address` table.

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

_**TODO pending**_

### Relationship's name

When defining the name of a _many-to-many_ relationship, _ERDiagram_ will use it for naming the _intermediate table_
the relationship is mapped to.

Defining the name of any other kind of relationship has no effect over the _database model_.

### Aliases

_**TODO pending**_

It's possible to name the members of a relationship using _aliases_. Imagine you are modelling a `Travel` entity which
has two `originCity` and `destinyCity` attributes, both referencing the `City` entity. You could write `Travel -> City`
in order to model one relationship from `Travel` to `City`, but how can you model both relationships at the same time?

The way that _ERDiagram_ solves this is by using _aliases_:

```erdiagram
Travel *-> City originCity
Travel *-> City destinyCity
```

By doing this, you're naming the right member of your relationship. You can also name both sides of the relationship,
just like this:

```erdiagram
Employee subordinates *<-> Employee boss
```

When you don't specify any _alias_, the name of the entity is used as the name of the member.

### Directions

Relationship's directions are no taken into account when generating the _database model_. The reason for this is that
the relationship's direction defines how the data can be accessed (i.e. it's possible to get the roles of a user, but
it's not possible to get the users that have a specific role), which is out of the scope of the _database model_, as
data can be queried in any way using `JOIN` statements.
