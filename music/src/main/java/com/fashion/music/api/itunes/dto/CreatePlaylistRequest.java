package com.fashion.music.api.itunes.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePlaylistRequest(

        @NotBlank(message = "플레이리스트 이름은 필수입니다.")
        @Size(max = 30, message = "플레이리스트 이름은 30자 이하이어야 합니다.")
        String name
) {
}
