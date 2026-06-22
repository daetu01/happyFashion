package com.fashion.music.api.itunes.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // iTunes trackId 있으면 꼭 저장 추천
    @Column(nullable = false, unique = true)
    private Long externalTrackId;

    private String trackName;
    private String artistName;
    private String collectionName;
    private String artworkUrl100;
    private String previewUrl;
    private String trackViewUrl;
    private String primaryGenreName;
    private String releaseDate;

    @Builder
    public Music(
            Long externalTrackId,
            String trackName,
            String artistName,
            String collectionName,
            String artworkUrl100,
            String previewUrl,
            String trackViewUrl,
            String primaryGenreName,
            String releaseDate
    ) {
        this.externalTrackId = externalTrackId;
        this.trackName = trackName;
        this.artistName = artistName;
        this.collectionName = collectionName;
        this.artworkUrl100 = artworkUrl100;
        this.previewUrl = previewUrl;
        this.trackViewUrl = trackViewUrl;
        this.primaryGenreName = primaryGenreName;
        this.releaseDate = releaseDate;
    }
}
