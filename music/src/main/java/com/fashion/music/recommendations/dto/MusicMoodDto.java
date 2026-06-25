package com.fashion.music.recommendations.dto;

import com.fashion.music.mood.domain.Mood;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


public class MusicMoodDto {

    @Builder
    @Getter
    public static class RESPONSE {
        private Long musicId;
        private Long trackId;
        private String trackName;
        private String artistName;
        private String collectionName;
        private String artworkUrl100;
        private String previewUrl;
        private String trackViewUrl;
        private String primaryGenreName;
        private String releaseDate;
        private List<Mood> moods;
    }
}
