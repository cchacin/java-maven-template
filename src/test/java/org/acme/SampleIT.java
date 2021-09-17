package org.acme;

import net.jqwik.api.Arbitraries;
import net.jqwik.api.Arbitrary;
import net.jqwik.api.Builders;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.Provide;
import org.assertj.core.api.WithAssertions;
import org.assertj.core.api.WithAssumptions;

class SampleIT
        implements WithAssertions, WithAssumptions {

    @Property
    void aPersonsIsAlwaysValid(@ForAll("validPeopleWithPersonAsBuilder") final Person aPerson) {
        assertThat(aPerson.name().name()).isNotEmpty();
        assertThat(aPerson.age().age()).isBetween(0, 150);
    }

    @Provide
    Arbitrary<Person> validPeopleWithPersonAsBuilder() {
        final var names =
                Arbitraries.strings().withCharRange('a', 'z').ofMinLength(3).ofMaxLength(21);
        final var ages = Arbitraries.integers().between(0, 130);

        return Builders.withBuilder(PersonBuilder::builder)
                .use(names).in((builder, name) -> builder.name(Person.Name.of(name)))
                .use(ages).in((builder, age) -> builder.age(Person.Age.of(age)))
                .build(PersonBuilder::build);
    }
}
