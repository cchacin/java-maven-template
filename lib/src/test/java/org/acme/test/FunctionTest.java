package org.acme.test;

import org.acme.Function;
import org.acme.Function.Input;
import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;

import net.jqwik.api.ForAll;
import net.jqwik.api.Property;

class FunctionTest
        implements WithAssertions, WithAssumptions {

    @Property
    void sumTwoValuesIsValid(@ForAll final int x, @ForAll final int y) {
        assertThat(new Function().add(new Input(x, y)).result())
                .isBetween(Long.MIN_VALUE, Long.MAX_VALUE);
    }
}
