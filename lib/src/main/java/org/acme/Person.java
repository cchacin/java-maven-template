package org.acme;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record Person(/* @JsonUnwrapped */ Name name, Age age) {

    public record Name(String name) {
        public Name {
            if (name == null || name.isEmpty() || name.isBlank()) {
                throw new IllegalArgumentException("name can't be null, blank or empty");
            }
        }

        public static Name of(final String name) {
            return new Name(name);
        }
    }

    public record Age(int age) {
        public Age {
            if (age < 0 | age > 150) {
                throw new IllegalArgumentException("age has to be between 0 and 150");
            }
        }

        public static Age of(final int name) {
            return new Age(name);
        }
    }
}
