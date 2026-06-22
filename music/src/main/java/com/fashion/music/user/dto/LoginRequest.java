package com.fashion.music.user.dto;

public record LoginRequest(
        String email,
        String password
) {
}
