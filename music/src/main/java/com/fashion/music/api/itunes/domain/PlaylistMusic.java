package com.fashion.music.api.itunes.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"playlist_id", "music_id"})
        }
)
public class PlaylistMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Playlist playlist;

    @ManyToOne(fetch = FetchType.LAZY)
    private Music music;

    private LocalDateTime addedAt;

    public PlaylistMusic(Playlist playlist, Music music) {
        this.playlist = playlist;
        this.music = music;
        this.addedAt = LocalDateTime.now();
    }
}
