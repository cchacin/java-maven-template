package org.acme;

import java.util.Set;

@FunctionalInterface
public interface Processor {
    Set<Clazz> process(String json);
}
