package com.practice.cheetcode.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int status;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, T data, HttpStatus status) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status.value();
    }


    public static <T> ApiResponse<T> success(T data, String message, HttpStatus status) {
        return new ApiResponse<>(true, message, data, status);
    }

}
