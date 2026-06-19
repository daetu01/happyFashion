package com.fashion.music.api.itunes.dto;

import java.util.List;

public record ItunesSearchResponse(
        int resultCount,
        List<ItunesTrackResponse> results
) {
}
