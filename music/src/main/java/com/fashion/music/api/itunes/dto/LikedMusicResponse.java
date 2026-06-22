package com.fashion.music.api.itunes.dto;

import lombok.Builder;

@Builder
public record LikedMusicResponse(
        Long likedMusicId,
        Long musicId,
        Long trackId,

        String trackName,
        String artistName,
        String collectionName,
        String artworkUrl100,
        String previewUrl,
        String trackViewUrl,
        String primaryGenreName,
        String releaseDate
) {
}
