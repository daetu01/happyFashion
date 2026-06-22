package com.fashion.music.api.itunes.service;

import com.fashion.music.api.itunes.ItunesApiClient;
import com.fashion.music.api.itunes.domain.ItunesSearchHistory;
import com.fashion.music.api.itunes.domain.LikedMusic;
import com.fashion.music.api.itunes.domain.Music;
import com.fashion.music.api.itunes.dto.ItunesSearchResponse;
import com.fashion.music.api.itunes.dto.LikeMusicRequest;
import com.fashion.music.api.itunes.dto.LikedMusicResponse;
import com.fashion.music.api.itunes.dto.MusicSearchResponse;
import com.fashion.music.api.itunes.repository.LikedMusicRepository;
import com.fashion.music.api.itunes.repository.MusicRepository;
import com.fashion.music.api.itunes.repository.SearchHistoryRepository;
import com.fashion.music.user.domain.User;
import com.fashion.music.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final UserRepository userRepository;
    private final SearchHistoryRepository searchHistoryRepository;
    private final MusicRepository musicRepository;
    private final LikedMusicRepository likedMusicRepository;
    private final ItunesApiClient itunesApiClient;

    @Transactional
    public List<MusicSearchResponse> search(String keyword, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        searchHistoryRepository.save(new ItunesSearchHistory(keyword, user));

        ItunesSearchResponse response = itunesApiClient.searchTracks(keyword);

        return response.results().stream()
                .map(track -> new MusicSearchResponse(
                        track.trackId(),
                        track.trackName(),
                        track.artistName(),
                        track.collectionName(),
                        convertArtworkSize(track.artworkUrl100()),
                        track.previewUrl(),
                        track.trackViewUrl(),
                        track.primaryGenreName(),
                        track.releaseDate()
                ))
                .toList();
    }

    private String convertArtworkSize(String url) {
        if (url == null) {
            return null;
        }

        return url.replace("100x100", "600x600");
    }

    @Transactional
    public void likeMusic(LikeMusicRequest request, Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        Music music = musicRepository.findByExternalTrackId(request.trackId())
                .orElseGet(() -> musicRepository.save(Music.builder()
                        .externalTrackId(request.trackId())
                        .trackName(request.trackName())
                        .artistName(request.artistName())
                        .collectionName(request.collectionName())
                        .artworkUrl100(request.artworkUrl100())
                        .previewUrl(request.previewUrl())
                        .trackViewUrl(request.trackViewUrl())
                        .primaryGenreName(request.primaryGenreName())
                        .releaseDate(request.releaseDate())
                        .build()));

        if (likedMusicRepository.existsByUserIdAndMusicId(userId, music.getId())) {
            throw new IllegalArgumentException("이미 좋아요한 곡입니다.");
        }

        likedMusicRepository.save(new LikedMusic(user, music));
    }

    @Transactional(readOnly = true)
    public List<LikedMusicResponse> getMyLikedMusics(Long userId) {
        return likedMusicRepository.findAllByUserId(userId).stream()
                .map(likedMusic -> {
                    Music music = likedMusic.getMusic();

                    return LikedMusicResponse.builder()
                            .likedMusicId(likedMusic.getId())
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
                            .build();
                })
                .toList();
    }

    @Transactional
    public void unlikeMusic(Long userId, Long likedMusicId) {
        LikedMusic likedMusic = likedMusicRepository.findByIdAndUserId(likedMusicId, userId)
                .orElseThrow(() -> new IllegalArgumentException("좋아요한 음악을 찾을 수 없습니다."));

        if (!userId.equals(likedMusic.getUser().getId())) {
            throw new IllegalArgumentException("일치하지 않는 사용자입니다.");
        }
        likedMusicRepository.delete(likedMusic);
    }
}
