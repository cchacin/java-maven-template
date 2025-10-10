# Java 25 Maven Template

[![Maven Build](https://github.com/cchacin/java-maven-template/workflows/Maven%20Build/badge.svg)](https://github.com/cchacin/java-maven-template/actions)

Modern Java 25 Maven template with best practices, testing excellence, and CI/CD ready to use.

**🌐 [View Full Documentation](https://cchacin.github.io/java-maven-template/)**

## What's Included

**🧪 Modern Testing Stack**
- JUnit 5, AssertJ, jqwik property testing, ArchUnit architecture testing
- Separated unit and integration tests with parallel execution

**⚙️ Build & Quality**
- Maven Wrapper (no local Maven required)
- Java Preview Features enabled (--enable-preview)
- Maven Build Cache Extension 1.2.0 for faster incremental builds
- OpenTelemetry Maven Extension 1.50.0-alpha for build tracing
- Spotless code formatting with Google Java Format (AOSP style)
- GitHub Actions CI/CD with Oracle JDK 25

**🔧 Developer Tools**
- JShell integration for REPL development
- Java version management with jenv
- Modularization ready with JPMS

## Quick Start

1. **[Use This Template](https://github.com/cchacin/java-maven-template/generate)** on GitHub
2. Clone your new repository
3. Run `./mvnw test` to verify everything works
4. Start building your application!

## Commands

- `./mvnw test` - Run unit tests
- `./mvnw verify` - Run all tests and quality checks
- `./mvnw spotless:apply` - Format code
- `./mvnw jshell:run` - Start interactive JShell

## Requirements

- Java 21+ (Java 25 recommended)
- No local Maven installation needed (wrapper included)

---

📖 **[Complete Documentation](https://cchacin.github.io/java-maven-template/)** • 🚀 **[Getting Started Guide](https://cchacin.github.io/java-maven-template/getting-started)** • 🔧 **[Development Guide](https://cchacin.github.io/java-maven-template/development)**