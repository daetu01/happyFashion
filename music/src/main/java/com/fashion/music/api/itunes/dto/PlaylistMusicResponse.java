package com.fashion.music.api.itunes.dto;

import com.fashion.music.mood.domain.Mood;
import lombok.Builder;

import java.util.List;

@Builder
public record PlaylistMusicResponse(
        Long playlistMusicId,
        Long musicId,
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
) {
}
