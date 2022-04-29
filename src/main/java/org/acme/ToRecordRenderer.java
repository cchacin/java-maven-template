package org.acme;

import java.util.stream.Collectors;

public interface ToRecordRenderer {

    static String renderClass(
            final Clazz clazz) {
        final var fields = clazz.fields().stream()
                .map(ToRecordRenderer::renderField)
                .collect(Collectors.joining(",\n    "));
        return """
               public record %s(
                   %s) {
                   
                   %s {
                   }
               }
               """.formatted(clazz.name(), fields, clazz.name());
    }

    private static String renderField(
            final Clazz.Field field) {
        return """
               %s %s""".formatted(field.type(), field.javaName());
    }
}
