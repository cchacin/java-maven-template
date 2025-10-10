package org.acme.test;

import org.acme.Maths;
import org.acme.Maths.Input;
import org.acme.Maths.Output;
import org.assertj.core.api.WithAssertions;
import org.junit.jupiter.api.Test;

class MathsTest implements WithAssertions {

    @Test
    void test() {
        assertThat(new Maths().sum(new Input(1, 2))).isEqualTo(new Output(3));
    }
}
