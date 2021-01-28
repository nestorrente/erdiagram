# Entity-Relationship Diagram Code Generator

## Brief introduction to ERDiagram DSL

```bash
# This is a line comment.
# Block comments are not supported (yet).
# Line comments at the end of a statement are not supported (yet).

# This statement represents the name of an entity.
User
	# These statements represent the properties of the User entity.
	username text(30)
	name text(50)
	# Properties are required (non-null) by default.
	# The question mark (?) modifier indicates this is an optional property.
	lastName? text(100)
	# There are some types that doesn't require length to be specified
	active bool

# Supported types so far are:
# - text(length)
# - long
# - int
# - short
# - decimal(length)
# - bool
# - date
# - time
# - datetime

# All entities have an identity property by default. You don't have to declare it.
# By default, that property will be named "id", but you can change the configuration
# in order to prefix it with the entity name ("userId" in the entity above).

# This is another entity
Country
	# The exclamation mark (!) modifier indicates this property has an "unique restriction".
	# This means that every country must have its own unique code.
	code! text(10)
	name text(100)
	# Even when each country will have an autoincremental ID property,
	# you can define other autoincremental properties using the plus (+) modifier.
	autoincrementalProperty+ int

# This statement represents a Many-To-One relationship:
User *<->1 Country

# When the cardinality is 1, you can omit it.
# So, we can rewrite the previous statement as:
User *<-> Country

# Here you have examples of other types of relationships

# One-To-One
User <-> Country
# One-To-Many
User <->* Country
# Many-To-One
User *<-> Country
# Many-To-Many
User *<->* Country

# Also, if you don't want to define bidirectional relationships,
# you can use right (->) or left (<-) arrows:
User *-> Country

# You can also use the exclamation (!) and question (?) marks modifiers
# in order to define optional or unique relationships:

# This means that an user may or may not have his country defined
User *->? Country

# This means that each user must have his own country different to others.
# This means that you can't have two or more users from Spain.
User *->! Country
```

## SQL code generation (MySQL)

Work in progress...

## Class generation (Java POJO)

Work in progress...
