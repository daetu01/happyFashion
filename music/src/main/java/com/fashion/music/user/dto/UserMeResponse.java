package com.fashion.music.user.dto;

public record UserMeResponse(
        Long id,
        String email,
        String nickname
) {
}
