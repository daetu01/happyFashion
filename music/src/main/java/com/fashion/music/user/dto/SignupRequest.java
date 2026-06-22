package com.fashion.music.user.dto;

public record SignupRequest(
        String email,
        String password,
        String nickname
) {
}
