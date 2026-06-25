package com.fashion.music.api.itunes.controller;

import com.fashion.music.api.itunes.ItunesApiClient;
import com.fashion.music.api.itunes.dto.LikeMusicRequest;
import com.fashion.music.api.itunes.dto.LikedMusicResponse;
import com.fashion.music.api.itunes.dto.MusicSearchResponse;
import com.fashion.music.api.itunes.dto.SearchHistoryResponse;
import com.fashion.music.api.itunes.service.MusicService;
import com.fashion.music.global.security.CustomDetails;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
@Validated
public class MusicController {
    private final ItunesApiClient itunesApiClient;
    private final MusicService musicService;

    @GetMapping("/search")
    public List<MusicSearchResponse> search(
            @RequestParam String keyword,
            @AuthenticationPrincipal CustomDetails userDetails
            ) {
        return musicService.search(keyword, userDetails.getUserId());
    }

    @PostMapping("/likes")
    public ResponseEntity<Void> likeMusic(
            @AuthenticationPrincipal CustomDetails userDetails,
            @Valid @RequestBody LikeMusicRequest request
    ) {
        musicService.likeMusic(request, userDetails.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/likes")
    public ResponseEntity<List<LikedMusicResponse>> getMyLikedMusics(
            @AuthenticationPrincipal CustomDetails userDetails
    ) {
        return ResponseEntity.ok(
                musicService.getMyLikedMusics(userDetails.getUserId())
        );
    }

    @DeleteMapping("/likes/{likedMusicId}")
    public ResponseEntity<Void> unlikeMusic(
            @AuthenticationPrincipal CustomDetails userDetails,
            @PathVariable @Positive(message = "musicId는 양수여야 합니다.") Long likedMusicId
    ) {
        musicService.unlikeMusic(userDetails.getUserId(), likedMusicId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search-histories")
    public ResponseEntity<List<SearchHistoryResponse>> getRecentKeyword() {
        return ResponseEntity.ok(
                musicService.getKeywords()
        );
    }

    @DeleteMapping("/search-histories/{id}")
    public ResponseEntity<Void> deleteKeyword(
            @PathVariable @Positive(message = "history id는 양수여야 합니다.") Long id
    ) {
        musicService.deleteKeyword(id);
        return ResponseEntity.noContent().build();
    }
}

