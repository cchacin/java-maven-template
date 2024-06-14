# Java Project Template

Tools:

- JDK 22
- JEnv config
- Maven Wrapper
- Maven 3.9.7

Code Style:

- `.editorconfig`

Git:

- `.gitignore`
- `.gitattributes`

GitHub Actions:

- Maven Build Workflow

Separated plugins for unit and integration tests, surefire and failsafe:

- `mvn test` to run all test with the pattern `*Test.java`
- `mvn integration-tests` to run all test with the pattern `*IT.java`

`.mvn` config settings:

- [jvm.config](https://maven.apache.org/configure.html#mvn-jvm-config-file)
- [maven.config](https://maven.apache.org/configure.html#mvn-maven-config-file)