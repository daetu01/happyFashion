package com.fashion.music.api.itunes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

public record MusicSearchResponse (
    String trackName,
    String artistName,
    String collectionName,
    String artworkUrl100,
    String previewUrl,
    String trackViewUrl,
    String primaryGenreName,
    String releaseDate
){};
