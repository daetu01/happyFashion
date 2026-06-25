package com.fashion.music.api.itunes.dto;

import com.fashion.music.mood.domain.Mood;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public record MusicSearchResponse (
    Long trackId,
    String trackName,
    String artistName,
    String collectionName,
    String artworkUrl100,
    String previewUrl,
    String trackViewUrl,
    String primaryGenreName,
    String releaseDate,
    List<Mood> moods
){};
