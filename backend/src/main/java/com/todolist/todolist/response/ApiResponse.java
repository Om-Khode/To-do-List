package com.todolist.todolist.response;

public class ApiResponse {
    private boolean success;

    public ApiResponse(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}