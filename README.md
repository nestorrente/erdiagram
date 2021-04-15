# ERDiagram

_ERDiagram_ is a library that allows to define an _entity-relationship diagram_ using the _ERDiagram_ language, and then
generate the database creation script, OOP classes, and more.

## Table of contents

* [Live demo & CLI](#live-demo--cli)
* [Documentation](#documentation)
* [Supported output formats](#supported-output-formats)
* [Reliability](#reliability)
* [Contributing](#contributing)
  + [Wish list](#wish-list)

## Live demo & CLI

You can try _ERDiagram_ online using the [ERDiagram playground](http://erdiagram.nestorrente.com/) application. There
you will find some code examples that are very useful for learning the _ERDiagram_ language.

There is also a _work-in-progress_ [CLI version of _ERDiagram_](https://github.com/nestorrente/erdiagram-cli). Check it
out! :slightly_smiling_face:

## Documentation

* **[ERDiagram language](docs/ERDiagram_language.md)**: learn how to define entities and relationships.
* **[ERDiagram library](docs/Library_usage.md)**: installation, basic concepts, configuration and examples.


* Entity-relationship model conversion:
  * **[Database model](docs/Database_model.md)**: learn how entities and relationships are modeled as tables and columns.
  * **[Class model](docs/Class_model.md)**: learn how entities and relationships are modeled as OOP classes.

## Supported output formats

* Database creation script (SQL)
  * MySQL
  * Oracle DB
  * PostgreSQL
  * SQLite
  * SQL Server
* OOP classes
  * Java POJO (no JPA support so far)
  * TypeScript
* Diagram
  * PlantUML (code & SVG image)
  * Nomnoml (code & SVG image)

## Reliability

_ERDiagram_ is _almost fully_ tested, so you don't have to worry about upgrading or not when a new version is released.

Following you can see the code coverage statistics for the current version:

| Statements | Branches | Functions | Lines   |
|------------|----------|-----------|---------|
|    98.00 % |  99.40 % |   93.62 % | 97.97 % |

## Contributing

This is a side project I'm working on during my spare time, so I'd be very happy if you want to contribute :grinning:
bug report, suggestions, pull requests or any other kind of feedback are more than welcome.

If you want to create a PR, just be sure you're working on the _develop_ branch and go ahead :slightly_smiling_face:

If you want to get in touch, you can find me on LinkedIn: [@nestorpglez](https://www.linkedin.com/in/nestorpglez/)

### Wish list

This is a small list of features/tools that I'll be very happy to have:

* More database engines support.
* More OOP languages support.
* Syntax highlight for some text editors or IDEs (Sublime Text, Atom, IntelliJ IDEA, VS Code, ...).
* XSD / JSON schema generation.
* Liquibase files generation.
* Any other cool stuff :stuck_out_tongue:
