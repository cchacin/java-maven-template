package org.acme;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public sealed interface Result<T, E> permits Result.Success, Result.Failure {

    record Success<T, E>(T value) implements Result<T, E> {}

    record Failure<T, E>(E error) implements Result<T, E> {}

    // Factory methods
    static <T, E> Result<T, E> success(T value) {
        return new Success<>(value);
    }

    static <T, E> Result<T, E> failure(E error) {
        return new Failure<>(error);
    }

    static <T, E extends Exception> Result<T, E> of(ThrowingSupplier<T, E> supplier) {
        try {
            return success(supplier.get());
        } catch (Exception e) {
            @SuppressWarnings("unchecked")
            E error = (E) e;
            return failure(error);
        }
    }

    // Predicates
    default boolean isSuccess() {
        return this instanceof Success<T, E>;
    }

    default boolean isFailure() {
        return this instanceof Failure<T, E>;
    }

    // Transform success value
    default <U> Result<U, E> map(Function<? super T, ? extends U> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> new Success<>(mapper.apply(value));
            case Failure<T, E>(var error) -> new Failure<>(error);
        };
    }

    // Transform error value
    default <F> Result<T, F> mapError(Function<? super E, ? extends F> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> new Success<>(value);
            case Failure<T, E>(var error) -> new Failure<>(mapper.apply(error));
        };
    }

    // Chain operations that return Result
    default <U> Result<U, E> flatMap(Function<? super T, ? extends Result<U, E>> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> mapper.apply(value);
            case Failure<T, E>(var error) -> new Failure<>(error);
        };
    }

    // Pattern match with handlers
    default <U> U fold(
            Function<? super T, ? extends U> onSuccess,
            Function<? super E, ? extends U> onFailure) {
        return switch (this) {
            case Success<T, E>(var value) -> onSuccess.apply(value);
            case Failure<T, E>(var error) -> onFailure.apply(error);
        };
    }

    // Recover from error with fallback value
    default T recover(Function<? super E, ? extends T> recovery) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E>(var error) -> recovery.apply(error);
        };
    }

    // Recover from error with alternative Result
    default Result<T, E> recoverWith(Function<? super E, ? extends Result<T, E>> recovery) {
        return switch (this) {
            case Success<T, E> s -> s;
            case Failure<T, E>(var error) -> recovery.apply(error);
        };
    }

    // Get value or throw
    default T orElseThrow() {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E>(var error) -> {
                if (error instanceof Exception e) {
                    throw new RuntimeException(e);
                }
                throw new RuntimeException("Result failed with error: " + error);
            }
        };
    }

    // Get value or use default
    default T orElse(T defaultValue) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E> ignored -> defaultValue;
        };
    }

    // Get value or compute default
    default T orElseGet(Supplier<? extends T> supplier) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E> ignored -> supplier.get();
        };
    }

    // Peek at success value (for side effects)
    default Result<T, E> peek(Consumer<? super T> consumer) {
        if (this instanceof Success<T, E>(var value)) {
            consumer.accept(value);
        }
        return this;
    }

    // Peek at error value (for side effects)
    default Result<T, E> peekError(Consumer<? super E> consumer) {
        if (this instanceof Failure<T, E>(var error)) {
            consumer.accept(error);
        }
        return this;
    }

    // Functional interface for throwing operations
    @FunctionalInterface
    interface ThrowingSupplier<T, E extends Exception> {
        T get() throws E;
    }
}
