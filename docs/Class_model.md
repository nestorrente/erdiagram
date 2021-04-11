# Class model

The concept _class model_ refers to the set of classes of an object-oriented programming language. This page will cover
how _ERDiagram_ converts the input _entity-relationship model_ into a _class model_.

## Table of contents

* [Entities](#entities)
    + [Property modifiers](#property-modifiers)
        + [Optional modifier](#optional-modifier)
        + [Unique modifier](#unique-modifier)
    + [Property's length](#propertys-length)
    + [Entity identifier property](#entity-identifier-property)
* [Relationships](#relationships)
    + [Cardinalities](#cardinalities)
    + [Directions](#directions)
    + [Aliases](#aliases)
    + [Relationship's name](#relationships-name)

## Entities

Each entity defined in the input _entity-relationship model_ will be converted into a class in the _class model_. In the
same way, every entity property will be modeled as a field of that class.

### Property modifiers

#### Optional modifier

_ERDiagram_ considers all properties as mandatory by default. However, properties defined using the optional modifier
will be modeled as _nullable_ fields.

#### Unique modifier

_The unique modifier is intended for database code generation, and it's not used in class model generation._

This means that defining unique class fields is currently an unsupported feature. This may change in the future, so you
can create an issue to discuss this if you need it :slightly_smiling_face:

### Property's length

As some OOP languages allow to define the max size of its fields (i.e. Java via validation constraints), the length of
the entity properties is used for this purpose.

Currently, only `text` and `blob` property types are taking into account. For example, a property `name text(50)`
will be modelled as a property with `maxSize: 50`.

### Entity identifier property

The identifier property of the entity will be modeled just like any other field. Contrary to the
_[database model](Database_model.md#entity-identifier-property)_, the identifier field of the _class model_ must be
_nullable_, so a `null` value can be used to represent an _unsaved instance_ of an entity.

## Relationships

Relationships are modeled by adding new fields to the entity classes. In the following sections, we will explain in deep
how the cardinalities, direction, and aliases of the relationship affect the final _class model_.

### Cardinalities

_ERDiagram_ supports different types of relationships regarding the cardinality of its members. We recommend reading
[Cardinalities](ERDiagram_language.md#cardinalities) before continue for a better understanding.

Each member of a relationship can have 2 different cardinalities:

* _one_ (`1`): members with this cardinality are modeled by using a field whose type is the entity of that member.
* _many_ (`*`): members with this cardinality are modeled by using a _list_ or _array_.

Also, there is a special _zero-or-one_ cardinality (represented in _ERDiagram_ using a question mark `?`), which is
modeled in the same way as the _one_ (`1`) cardinality, with the only difference that its corresponding field will be
_nullable_.

### Directions

_ERDiagram_ supports 3 different directions for a relationship (see
[Directions](ERDiagram_language.md#directions) for more detail):

* _left-to-right_ (`->`)
* _right-to-left_ (`<-`)
* _bidirectional_ (`<->`)

The direction of the relationship is used to indicate how the data can be accessed from one side of the relationship to
the other one. Let's see some examples in order to learn how the direction affects the _class model_:

```erdiagram
User ->* Address
```

As you can see, the relationship defined in the example above is defined as _left-to-right_. This makes the `User`
entity have a list of addresses, but it doesn't make the `Address` entity have a reference to the user.

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

For example, imagine you want to model a _Travel_ entity that has 2 relationships to the same _City_ entity, one for
the _origin city_ and the other for the _destination city_. If you define those relationships without specifying an
alias for the _City_ member, you will end up with two identical `City city` fields in your `Travel` class.

The way to handle this situation is by adding an alias to the _City_ member of both relationships:

```erdiagram
Travel *-> City originCity
Travel *-> City destinationCity
```

By doing this, _ERDiagram_ will name the fields `City originCity` and `City destinationCity`.

You can also use _aliases_ in _self-referencing_ classes:

```erdiagram
Employee subordinates *<-> Employee boss
```

This will be modeled by creating the `Employee boss` and `Employee[] subordinates` fields in the `Employee` class. If
you don't use _aliases_, the fields would be `Employee employee` and `Employee[] employees` respectively, which are much
less semantic.

### Relationship's name

_The name of the relationship is intended for database code generation, and it's not used in class model generation._

This means that defining a relationship's name has doesn't produce any effect on the class model.
