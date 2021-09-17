# Java Project Template

Tools:

- JDK 17 by default
- [JEnv](https://www.jenv.be/)
- [Maven Wrapper](https://github.com/takari/maven-wrapper)
- Maven 3.8.2

Code Style:

- `.editorconfig`

Git:

- `.gitignore`
- `.gitattributes`

GitHub Actions:

- Maven Build Workflow

Dependencies:

- [JUnit 5](https://junit.org/junit5/)
- [AssertJ](https://assertj.github.io/doc/)
- [MapStruct](https://mapstruct.org/)

Separated plugins for unit and integration tests, surefire and failsafe:

- `mvn test` to run all test with the pattern `*Test.java`
- `mvn integration-tests` to run all test with the pattern `*IT.java`

`.mvn` config settings:

- [jvm.config](https://maven.apache.org/configure.html#mvn-jvm-config-file)
- [maven.config](https://maven.apache.org/configure.html#mvn-maven-config-file)