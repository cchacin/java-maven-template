package org.acme;

public class Function {

    record Input(int x, int y) {}
    record Output(long result) {}

    public Output add(
            final Input input) {
        System.out.println("input = " + input);
        return new Output(input.x() + input.y());
    }
}
