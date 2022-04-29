package org.acme;

import org.apache.commons.text.CaseUtils;

import java.util.Set;

public record Clazz(
        String name,
        Set<Field> fields) {

    public Clazz(
            final String name,
            final Set<Field> fields) {
        this.name = CaseUtils.toCamelCase(name, true, '_', '-', ' ');
        this.fields = fields;
    }

    public record Constructor(
            String name) {
    }

    public record Field(
            String type,
            String javaName,
            String jsonName) {

        public Field(
                final String type,
                final String jsonName) {
            this(
                    type,
                    CaseUtils.toCamelCase(jsonName, false, '_', '-', ' '),
                    jsonName
            );
        }
    }
}
