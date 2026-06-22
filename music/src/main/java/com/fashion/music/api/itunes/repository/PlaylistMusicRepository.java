package com.fashion.music.api.itunes.repository;

import com.fashion.music.api.itunes.domain.PlaylistMusic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaylistMusicRepository extends JpaRepository<PlaylistMusic, Long> {
    List<PlaylistMusic> findAllByPlaylistId(Long playlistId);

    boolean existsByPlaylistIdAndMusicId(Long playlistId, Long musicId);

    Optional<PlaylistMusic> findByIdAndPlaylistId(Long playlistMusicId, Long playlistId);
}
