package org.acme;

public class Sample {

    public Output call(
            final Input input) {
        System.out.println("input = " + input);
        return new Output(input.x() + input.y());
    }

    record Input(int x, int y) {}
    record Output(long result) {}
}
