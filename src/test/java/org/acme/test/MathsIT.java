package org.acme.test;

import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import org.acme.Maths;
import org.acme.Maths.Input;
import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;

class MathsIT implements WithAssertions, WithAssumptions {

    @Property
    void sumTwoValuesIsValid(@ForAll final int x, @ForAll final int y) {
        assertThat(new Maths().sum(new Input(x, y)).result())
                .isBetween(Long.MIN_VALUE, Long.MAX_VALUE);
    }
}
