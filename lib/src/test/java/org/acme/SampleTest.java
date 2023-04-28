package org.acme;

import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import org.acme.Sample.Input;
import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;

class SampleTest
        implements WithAssertions, WithAssumptions {

    @Property
    void sumTwoValuesIsValid(@ForAll final int x, @ForAll final int y) {
        assertThat(new Sample().call(new Input(x, y)).result())
                .isBetween(Long.MIN_VALUE, Long.MAX_VALUE);
    }
}
