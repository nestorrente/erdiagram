# ERDiagram: Entity-Relationship diagram code generator

## Table of contents

* **[What is ERDiagram?](#what-is-erdiagram)**
    + [Supported databases and languages](#supported-databases-and-languages)
* **[ERDiagram language](#erdiagram-language)**
    + **[Defining an entity](#defining-an-entity)**
        - [Supported property types](#supported-property-types)
        - [Property modifiers](#property-modifiers)
    + **[Relationships](#relationships)**
        - [Directions](#directions)
        - [Aliases](#aliases)
        - [Cardinalities](#cardinalities)
        - [Relationship's name](#relationships-name)
        - [Relationship examples](#relationship-examples)
    + **[Comments](#comments)**
* **[Contributing](#contributing)**
    + [Wish list](#wish-list)

## What is ERDiagram?

_ERDiagram_ is a library for auto-generate the code of your entities and relationships. It can generate SQL creation
code (a.k.a. `GENERATE TABLE` statements) for your database and OOP classes' code for your application.

_ERDiagram_ uses its namesake language, which is exaplained later in this page.

### Supported databases and languages

* Database
    * MySQL
    * Oracle DB
    * SQL Server
* OOP
    * Java POJO
    * TypeScript interfaces

## ERDiagram language

This language allows to define entities and relationships in a concise way. In the following sections, you will learn
how to define an entity, its properties and its relationships.

### Defining an entity

This is the way you can define an `User` entity with `name`, `lastName` and `active` properties:

```erdiagram
User
  name text(50)
  lastName text(50)
  active bool
```

As you can see, the properties of an entity must be indented (no matter how many tabs or spaces you use). Properties are
defined by writing its name followed by its type, which can include an optional length, similar to SQL.

Also, notice that we haven't defined an identifier property. This is because _ERDiagram_ will always generate an
identifier property for each entity. By default, that property will be named `id`, but this behaviour can be changed in
order to use another naming strategy (more information on the _Usage_ section of this document).

#### Supported property types

* `bool`: a boolean value, like _true_ and _false_.
* `short`, `int` and `long`: integer numeric values, like _42_, _73_ or _2038_.
* `decimal`: real numeric values, like _3.14_.
* `text`: string values, like _hello world_ or _don't be evil_.
* `date`: a date without time, like _01/01/1970_.
* `time`: a time representation, like _00:00:00_.
* `datetime`: a date and time representation, like _01/01/1970 at 00:00:00_.
* `blob`: a binary object, a.k.a. a byte array.

#### Property modifiers

Also, it's possible to add some _modifier characters_ after a property's name. Supported modifiers are:

* Optional modifier (`?`): indicates that the property may or may not have a value.
* Unique modifier (`!`): indicates that each possible value of the property must be used by at most one of the instances
  of the entity.
* Auto-incremental modifier (`+`): indicates the property is auto-incremental, so sequential values will be assigned
  every time an instance of the entity is created.

Here you can see an example of defining an optional unique property:

```erdiagram
Task
  description text(100)
  priorityOrder?! int
  done bool
```

### Relationships

Each relationship is defined by its _direction_ and _cardinality_. It's _direction_ indicates how data can be accessed,
while it's _cardinality_ indicates how many elements constitute the relationship. You can know more about
_cardinalities_ [here](https://en.wikipedia.org/wiki/Cardinality_(data_modeling)).

#### Directions

_ERDiagram_ supports 3 different direction values:

* _left to right_ (`->`): indicates that the _right_ entity of the relationship is accessible from the _left_ entity.
* _right to left_ (`<-`): indicates that the _left_ entity of the relationship is accessible from the _right_ entity.
* _bidirectional_ (`<->`): indicates that both entities are accessible from the other.

#### Aliases

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

#### Cardinalities

This is how you can define the different types of relationships (examples are written using bidirectional
relationships):

* _one-to-one_: `A 1<->1 B` or simply `A <-> B`.
* _one-to-many_: `A 1<->* B` or simply `A <->* B`.
* _many-to-one_: `A *<->1 B` or simply `A *<-> B`.
* _many-to-many_: `A *<->* B`.

As you can see, you can omit the character `1`, as that's the default cardinality.

You can also use the character `?`, which allows to specify a `0..1` cardinality. For example, imagine you are modelling
a tree structure, where each node points to its parent. In this scenario, the root nodes will not have a parent, so the
relationship will be a _many-to-zero-or-one_, which can be write this way:

```erdiagram
TreeNode child *<->? TreeNode parent
```

#### Relationship's name

It's also possible to define a name for the relationship. This is done by writting it in brackets after the
relationship:

```erdiagram
User *<->* User (Friendship)
```

This is specially useful in _many-to-many_ relationships, in order to define the name of the _intermediate table_ of the
output SQL code.

#### Relationship examples

##### Example 1

```erdiagram
Employee *<-> Company
```

The cardinality of this relationship indicates that each employee belongs to one company, and each company has many
employees.

On the other side, its direction indicates that the employee's company can be accessed from the Employee instance, and
the company's employees can be accessed from the Company instance.

##### Example 2

```erdiagram
Employee *->? Employee boss
```

The cardinality of this relationship indicates that each employee may have a boss or not, and it can have many
subordinates.

On the other side, its direction indicates that employee's boss can be accessed from the Employee instance, but it's not
possible to get its subordinates.

##### Example 3

```erdiagram
Employee *<-* Project (EmployeesWorkingOnProjects)
```

The cardinality of this relationship indicates that each employee can work on many projects, and each project can have
many employees working on it.

On the other side, its direction indicates that it's possible to get the employees that are working on a project, but
it's not possible to access to an employee's projects.

Finally, the relationship's name is _EmployeesWorkingOnProjects_, which may be used as a name for the intermediate _
relationship table used_ in relational databases.

### Comments

Even when [Uncle Bob](https://en.wikipedia.org/wiki/Robert_C._Martin) doesn't like them, every language needs comments,
so _ERDiagram_ couldn't be less :stuck_out_tongue:

Comments start with a _hash_ character (`#`). Only line comments are supported so far. Here you can see an example:

```erdiagram
TreeNode
  description text(100)
  deleted bool # we use logical erase

# The root node doesn't have a parent, that's why
# the "parent" member of the relationship is optional.
TreeNode child *<->? TreeNode parent
```

## Contributing

This is a side project I work on during my spare time, I'd be very happy if you want to contribute :grinning: bug
report, suggestions, pull requests or any other kind of feedback is more than welcome.

If you want to create a PR, just be sure you're working on the _develop_ branch :slightly_smiling_face:

You can find me on LinkedIn: [@nestorpglez](https://www.linkedin.com/in/nestorpglez/)

### Wish list

This is a small list of features/tools that I'll be very happy to have:

* More database engines support (i.e. SQLite, PostgreSQL).
* More OOP languages support (i.e. C# classes).
* Syntax highlight for some text editors or IDEs (i.e. Sublime Text, Atom, IntelliJ IDEA, VS Code...).
* XSD / JSON Schema generation.
* Liquibase files generation.
