package com.fashion.music.api.itunes.repository;

import com.fashion.music.api.itunes.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findAllByUserId(Long userId);

    Optional<Playlist> findByIdAndUserId(Long playlistId, Long userId);
}
