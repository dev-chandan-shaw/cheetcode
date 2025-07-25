package com.practice.cheetcode.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when a client's request is malformed or invalid.
 * This will result in an HTTP 400 Bad Request response.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    /**
     * Constructs a new BadRequestException with the specified detail message.
     *
     * @param message the detail message.
     */
    public BadRequestException(String message) {
        super(message);
    }

    /**
     * Constructs a new BadRequestException with the specified detail message and cause.
     *
     * @param message the detail message.
     * @param cause   the cause (which is saved for later retrieval by the getCause() method).
     */
    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}