package com.fashion.music.api.itunes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LikeMusicRequest(
        @NotNull(message = "trackId는 필수입니다.")
        Long trackId,

        @NotBlank(message = "곡 제목은 필수입니다.")
        String trackName,

        @NotBlank(message = "아티스트명은 필수입니다.")
        String artistName,

        String collectionName,
        String artworkUrl100,
        String previewUrl,
        String trackViewUrl,
        String primaryGenreName,
        String releaseDate
) {
}
