package org.acme.test;

import org.acme.Function;
import org.acme.Function.Input;
import org.acme.Function.Output;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;

class FunctionIT implements WithAssertions {

    @Test
    void test() {
        assertThat(new Function().add(new Input(1, 2))).isEqualTo(new Output(3));
    }
}
