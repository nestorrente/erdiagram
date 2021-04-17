# ERDiagram

> Define an _entity-relationship diagram_, then generate the database creation script, OOP classes, and much more!

[![License](https://img.shields.io/npm/l/make-coverage-badge.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/dw/@nestorrente/erdiagram.svg)](https://www.npmjs.com/package/@nestorrente/erdiagram)

![Coverage statements](coverage/badge-statements.svg)
![Coverage branches](coverage/badge-branches.svg)
![Coverage functions](coverage/badge-functions.svg)
![Coverage lines](coverage/badge-lines.svg)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

## Table of contents

* [Live demo & CLI](#live-demo--cli)
* [Installation](#installation)
  + [Installation steps for users](#installation-steps-for-users)
  + [Installation steps for contributors](#installation-steps-for-contributors)
* [Documentation](#documentation)
* [Contributing](#contributing)
  + [Wish list](#wish-list)

## Live demo & CLI

You can try _ERDiagram_ online using the [ERDiagram playground](http://erdiagram.nestorrente.com/) application. There
you will find some code examples that are very useful for learning the _ERDiagram_ language.

There is also a _work-in-progress_ [CLI version of _ERDiagram_](https://github.com/nestorrente/erdiagram-cli). Check it
out! :slightly_smiling_face:

## Installation

### Installation steps for users

You can find the installation steps of the library in the
[Library usage](docs/Library_usage.md#installation) document.

### Installation steps for contributors

#### Download the project

1. Clone the repository

```shell
git clone https://github.com/nestorrente/erdiagram.git
```

2. Access to the project's directory

```shell
cd erdiagram
```

3. Install dependencies

```shell
npm install
```

#### Run tests and build

For running the tests and generating the badges for the README file, you can use the following command:

```shell
npm run test
```

For building the library, you can use the following command:

```shell
npm run build
```

## Documentation

* **[ERDiagram language](docs/ERDiagram_language.md)**: learn how to define entities and relationships.
* **[ERDiagram library](docs/Library_usage.md)**: installation, basic concepts, configuration and examples.


* Entity-relationship model conversion:
  * **[Database model](docs/Database_model.md)**: learn how entities and relationships are modeled as tables and columns.
  * **[Class model](docs/Class_model.md)**: learn how entities and relationships are modeled as OOP classes.


* Supported output formats:
  * Database creation script (SQL):
    * MySQL
    * Oracle DB
    * PostgreSQL
    * SQLite
    * SQL Server
  * OOP classes/interfaces:
    * Java POJO (no JPA support so far)
    * TypeScript
  * Diagram code:
    * PlantUML
    * Nomnoml

## Contributing

This is a side project I'm working on during my spare time, so I'd be very happy if you want to contribute :grinning:
bug report, suggestions, pull requests, or any other kind of feedback are really appreciated.

Please contribute using [GitHub Flow](https://guides.github.com/introduction/flow). Create a branch from the `develop`
one, add commits, and [open a pull request](https://github.com/nestorrente/erdiagram/compare).

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

If you want to get in touch with the author, you can contact me through
[LinkedIn](https://www.linkedin.com/in/nestorpglez/) or [email](mailto:nestorpglez@gmail.com).

### Wish list

This is a small list of features/tools that I'll be very happy to have:

* More database engines support.
* More OOP languages support.
* Syntax highlight for some text editors or IDEs (Sublime Text, Atom, IntelliJ IDEA, VS Code, ...).
* XSD / JSON schema generation.
* Liquibase files generation.
* Any other cool stuff :stuck_out_tongue:
