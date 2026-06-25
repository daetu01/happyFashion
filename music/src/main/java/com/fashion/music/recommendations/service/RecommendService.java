package com.fashion.music.recommendations.service;

import com.fashion.music.api.itunes.domain.LikedMusic;
import com.fashion.music.api.itunes.domain.Music;
import com.fashion.music.api.itunes.domain.Playlist;
import com.fashion.music.api.itunes.domain.PlaylistMusic;
import com.fashion.music.api.itunes.repository.LikedMusicRepository;
import com.fashion.music.api.itunes.repository.PlaylistMusicRepository;
import com.fashion.music.api.itunes.repository.PlaylistRepository;
import com.fashion.music.mood.domain.Mood;
import com.fashion.music.mood.repository.MusicMoodRepository;
import com.fashion.music.mood.service.MoodAnalyzer;
import com.fashion.music.recommendations.dto.MusicMoodDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final LikedMusicRepository likedMusicRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;
    private final MusicMoodRepository musicMoodRepository;


    public List<MusicMoodDto.RESPONSE> recommend(Long userId) {
        List<Mood> topMoods = getUserTopMoods(userId);

        if (topMoods.isEmpty()) {
            return List.of();
        }

        List<Long> excludedMusicIds = getUserOwnedMusicIds(userId);

        List<Music> candidates;

        if (excludedMusicIds.isEmpty()) {
            candidates = musicMoodRepository.findCandidatesByMoodIn(topMoods);
        } else {
            candidates = musicMoodRepository.findCandidatesByMoodInExcluding(
                    topMoods,
                    excludedMusicIds
            );
        }

        Collections.shuffle(candidates);

        return candidates.stream()
                .map(music -> MusicMoodDto.RESPONSE
                        .builder()
                        .musicId(music.getId())
                        .trackId(music.getExternalTrackId())
                        .trackName(music.getTrackName())
                        .artistName(music.getArtistName())
                        .collectionName(music.getCollectionName())
                        .artworkUrl100(music.getArtworkUrl100())
                        .previewUrl(music.getPreviewUrl())
                        .trackViewUrl(music.getTrackViewUrl())
                        .primaryGenreName(music.getPrimaryGenreName())
                        .releaseDate(music.getReleaseDate())
                        .moods(
                                music.getMoodValues()
                        )
                        .build())
                .limit(20)
                .toList();
    }

    public List<Mood> getUserTopMoods(Long userId) {
        Map<Mood, Integer> moodScore = calculateUserMoodScore(userId);

        return moodScore.entrySet()
                .stream()
                .sorted(Map.Entry.<Mood, Integer>comparingByValue().reversed())
                .limit(3)
                .map(Map.Entry::getKey)
                .toList();
    }

    private Map<Mood, Integer> calculateUserMoodScore(Long userId) {
        Map<Mood, Integer> moodMap = new HashMap<>();

        List<LikedMusic> likedMusics = likedMusicRepository.findAllByUserId(userId);

        for (LikedMusic likedMusic : likedMusics) {
            addMoodScore(moodMap, likedMusic.getMusic());
        }

        List<Playlist> playlists = playlistRepository.findAllByUserId(userId);

        for (Playlist playlist : playlists) {
            List<PlaylistMusic> playlistMusics =
                    playlistMusicRepository.findAllByPlaylistId(playlist.getId());

            for (PlaylistMusic playlistMusic : playlistMusics) {
                addMoodScore(moodMap, playlistMusic.getMusic());
            }
        }

        return moodMap;
    }

    private void addMoodScore(Map<Mood, Integer> moodMap, Music music) {
        for (Mood mood : music.getMoodValues()) {
            moodMap.put(mood, moodMap.getOrDefault(mood, 0) + 1);
        }
    }

    private List<Long> getUserOwnedMusicIds(Long userId) {
        List<Long> likedMusicIds = likedMusicRepository.findAllByUserId(userId).stream()
                .map(likedMusic -> likedMusic.getMusic().getId())
                .toList();

        List<Long> playlistMusicIds = playlistRepository.findAllByUserId(userId).stream()
                .flatMap(playlist -> playlistMusicRepository.findAllByPlaylistId(playlist.getId()).stream())
                .map(playlistMusic -> playlistMusic.getMusic().getId())
                .toList();

        return Stream.concat(likedMusicIds.stream(), playlistMusicIds.stream())
                .distinct()
                .toList();
    }
}
