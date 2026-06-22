package com.fashion.music.api.itunes.repository;

import com.fashion.music.api.itunes.domain.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
    Optional<Music> findByExternalTrackId(Long externalTrackId);
}
