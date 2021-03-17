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
    + [Directions](#directions)
    + [Aliases](#aliases)
    + [Relationship's name](#relationships-name)

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

_ERDiagram_ allows 4 types of relationships regarding the cardinality of its members:

* _one-to-one_
* _one-to-many_
* _many-to-one_
* _many-to-many_

Members with a cardinality of _one_ (`1`) are modelled by using a field whose type is the entity of that member, while members with a
cardinality of _many_ (`*`) are modelled by using a _list_ or _array_.

In addition, there is a special _zero-or-one_ (`0..1`) cardinality, which is modelled in the same way as a cardinality
of _one_ (`1`) with the only difference that its corresponding field will be _nullable_.

### Directions

The direction of the relationship is used to indicate how the data can be accessed from one side of the relationship to
the other one. Let's see some examples in order to learn how the direction affects the _class model_:

```erdiagram
User ->* Address
```

As you can see, the relationship defined in the example above is defined as _left-to-right_. This makes the `User`
entity to have a list of addresses, but it doesn't make the `Address` entity to have a reference to the user.

If we want to have a reference from the `Address` entity to its user, we can define the relationship as _bidirectional_:

```erdiagram
User <->* Address
```

Finally, if we don't want the `User` entity to have a reference to its addresses, we can define the relationship as
_right-to-left_:

```erdiagram
User <-* Address
```

### Aliases

Defining aliases for the members of a relationship is useful not only for semantic purposes but also for customizing the
name of its corresponding fields.

For example, imagine you want to model a _Travel_ entity that as 2 relationships to the same _City_ entity, one for the _origin
city_ and the other for the _destiny city_. If you define those relationships without specifying an alias for the _City_ member,
you will end up with two identical `City city` fields in your `Travel` class.

The way to handle this situation is by adding alias to the _City_ member of both relationships:

```erdiagram
Travel *-> City originCity
Travel *-> City destinyCity
```

By doing this, _ERDiagram_ will name the fields `City originCity` and `City destinyCity`.

You can also use _aliases_ in _self referencing_ classes:

```erdiagram
Employee subordinates *<-> Employee boss
```

This will be modelled by creating the `Employee boss` and `Employee[] subordinates` fields in the `Employee` class. If you don't
use _aliases_, the fields would be `Employee employee` and `Employee[] employees` respectively, which are much less semantic.

### Relationship's name

_The name of the relationship is intended for database code generation, and it's not used in class model generation._

This means that defining a relationship's name has doesn't produce any effect over the class model.
