package org.acme.test;

import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.constraints.UseType;
import org.acme.Maths;
import org.acme.Maths.Input;
import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;

class MathsIT implements WithAssertions, WithAssumptions {

    @Property
    void sumTwoValuesIsValid(@ForAll @UseType Input input) {
        assertThat(new Maths().sum(input).result()).isBetween(Long.MIN_VALUE, Long.MAX_VALUE);
    }
}
