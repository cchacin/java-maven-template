package org.acme;

public class Function {

    public record Input(int x, int y) {}

    public record Output(long result) {}

    public Output add(final Input input) {
        String s = "Hello";
        System.out.println("input = " + input + s);
        return new Output(input.x() + input.y());
    }
}
