package org.acme;

public class Maths {

    public record Input(int x, int y) {}

    public record Output(long result) {}

    public Output sum(final Input input) {
        return new Output(input.x() + input.y());
    }
}
