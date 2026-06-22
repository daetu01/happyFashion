package com.fashion.music.api.itunes.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record PlaylistDetailResponse(
        Long playlistId,
        String name,
        List<PlaylistMusicResponse> musics
) {
}
