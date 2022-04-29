package org.acme;

import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;
import org.junit.jupiter.api.Test;

class SampleTest
        implements WithAssertions, WithAssumptions {

    @Test
    void test()
            throws Exception {
        // Given
        final var json = """
                {
                  "a_string": "string",
                  "a_number": 1234,
                  "an_array": [],
                  "a_boolean": true,
                  "a_null_object": null,
                  "an_nested_object": {
                    "an_array": []
                  }
                }
                """;

        // When
        final var result = JsonbProcessor.of(ToRecordRenderer::renderClass)
                .process(json);

        // Then
        assertThat(result)
                .contains("""
                        [public record AnNestedObject(
                            List<an_array> anArray) {
                                        
                            AnNestedObject {
                            }
                        }
                        """)
                .contains("""
                        public record Wrapper(
                            String aString,
                            Integer aNumber,
                            List<an_array> anArray,
                            Boolean aBoolean,
                            Optional<Object> aNullObject) {
                                        
                            Wrapper {
                            }
                        }
                        """);
    }


}
