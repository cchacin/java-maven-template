package org.acme;

import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import jakarta.json.bind.JsonbBuilder;
import org.acme.Clazz.Field;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.function.Function;

public final class JsonbProcessor {

    private final Function<Clazz, String> renderer;

    private JsonbProcessor(
            final Function<Clazz, String> renderer) {
        this.renderer = renderer;
    }

    public static JsonbProcessor of(
            final Function<Clazz, String> renderer) {
        return new JsonbProcessor(renderer);
    }

    public String process(
            final String json) {
        final var jsonb = JsonbBuilder.newBuilder().build();
        final var jsonObject = jsonb.fromJson(json, JsonObject.class);
        final Set<Clazz> clazzSet = this.process(jsonObject, "Wrapper", new HashSet<>());
        return clazzSet.stream()
                .map(renderer)
                .toList()
                .toString();
    }

    public Set<Clazz> process(
            final JsonObject jsonObject,
            final String name,
            final Set<Clazz> clazzSet) {
        final Set<Field> fieldSet = new LinkedHashSet<>();

        jsonObject.forEach(
                (key, value) -> {
                    if (value.getValueType().equals(JsonValue.ValueType.OBJECT)) {
                        process(value.asJsonObject(), key, clazzSet);
                    }
                    if (value.getValueType().equals(JsonValue.ValueType.FALSE) ||
                            value.getValueType().equals(JsonValue.ValueType.TRUE)) {
                        fieldSet.add(new Field("Boolean", key));
                    }
                    if (value.getValueType().equals(JsonValue.ValueType.STRING)) {
                        fieldSet.add(new Field("String", key));
                    }
                    if (value.getValueType().equals(JsonValue.ValueType.NUMBER)) {
                        fieldSet.add(new Field("Integer", key));
                    }
                    if (value.getValueType().equals(JsonValue.ValueType.NULL)) {
                        fieldSet.add(new Field("Optional<Object>", key));
                    }
                    if (value.getValueType().equals(JsonValue.ValueType.ARRAY)) {
                        fieldSet.add(new Field("List<%s>".formatted(key), key));
                        final var jsonArray = value.asJsonArray();
                        jsonArray.forEach(av -> process(av.asJsonObject(), key, clazzSet));
                    }
                });

        clazzSet.add(new Clazz(name, fieldSet));
        return new HashSet<>(clazzSet);
    }
}
