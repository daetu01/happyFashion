package com.fashion.music.api.itunes.repository;

import com.fashion.music.api.itunes.domain.LikedMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikedMusicRepository extends JpaRepository<LikedMusic, Long> {
    boolean existsByUserIdAndMusicId(Long userId, Long musicId);

    List<LikedMusic> findAllByUserId(Long userId);

    Optional<LikedMusic> findByIdAndUserId(Long likedMusicId, Long userId);
}
