package com.fashion.music.api.itunes.dto;

public record ItunesTrackResponse(
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
