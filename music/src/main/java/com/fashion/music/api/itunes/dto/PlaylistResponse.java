package com.fashion.music.api.itunes.dto;

import lombok.Builder;

@Builder
public record PlaylistResponse(
        Long playlistId,
        String name
) {
}
