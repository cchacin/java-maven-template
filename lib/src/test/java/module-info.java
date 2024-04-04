open module org.acme.test {
    requires org.acme;
    exports org.acme.test;

    requires transitive net.jqwik.api;
    requires transitive org.assertj.core;

    requires transitive org.junit.jupiter.api;
    requires transitive org.junit.jupiter.engine;
}