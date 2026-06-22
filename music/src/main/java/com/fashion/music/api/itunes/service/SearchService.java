package com.fashion.music.api.itunes.service;

import com.fashion.music.api.itunes.ItunesApiClient;
import com.fashion.music.api.itunes.domain.ItunesSearchHistory;
import com.fashion.music.api.itunes.dto.ItunesSearchResponse;
import com.fashion.music.api.itunes.dto.MusicSearchResponse;
import com.fashion.music.api.itunes.repository.SearchHistoryRepository;
import com.fashion.music.user.domain.User;
import com.fashion.music.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserRepository userRepository;
    private final SearchHistoryRepository searchHistoryRepository;
    private final ItunesApiClient itunesApiClient;

    @Transactional
    public List<MusicSearchResponse> search(String keyword, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        searchHistoryRepository.save(new ItunesSearchHistory(keyword, user));

        ItunesSearchResponse response = itunesApiClient.searchTracks(keyword);

        return response.results().stream()
                .map(track -> new MusicSearchResponse(
                        track.trackName(),
                        track.artistName(),
                        track.collectionName(),
                        track.artworkUrl100(),
                        track.previewUrl(),
                        track.trackViewUrl(),
                        track.primaryGenreName(),
                        track.releaseDate()
                ))
                .toList();
    }
}
