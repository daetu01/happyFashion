package com.fashion.music.mood.repository;

import com.fashion.music.api.itunes.domain.Music;
import com.fashion.music.mood.domain.Mood;
import com.fashion.music.mood.domain.MusicMood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicMoodRepository extends JpaRepository<MusicMood, Long> {
    @Query("""
            SELECT DISTINCT mm.music
            FROM MusicMood mm
            WHERE mm.mood IN :moods
            """)
    List<Music> findCandidatesByMoodIn(
            @Param("moods") List<Mood> moods
    );

    @Query("""
            SELECT DISTINCT mm.music
            FROM MusicMood mm
            WHERE mm.mood IN :moods
            AND mm.music.id NOT IN :excludedMusicIds
            """)
    List<Music> findCandidatesByMoodInExcluding(
            @Param("moods") List<Mood> moods,
            @Param("excludedMusicIds") List<Long> excludedMusicIds
    );
}
