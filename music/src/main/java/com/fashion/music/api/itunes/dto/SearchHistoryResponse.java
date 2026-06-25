package com.fashion.music.api.itunes.dto;

import lombok.Builder;

@Builder
public record SearchHistoryResponse(
        Long id,
        String keyword
) {
}
