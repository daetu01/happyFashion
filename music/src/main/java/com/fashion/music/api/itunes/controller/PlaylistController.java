package com.fashion.music.api.itunes.controller;
import com.fashion.music.api.itunes.dto.AddMusicToPlaylistRequest;
import com.fashion.music.api.itunes.dto.CreatePlaylistRequest;
import com.fashion.music.api.itunes.dto.PlaylistDetailResponse;
import com.fashion.music.api.itunes.dto.PlaylistResponse;
import com.fashion.music.api.itunes.service.PlaylistService;
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
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
@Validated
public class PlaylistController {

    private final PlaylistService playlistService;

    @PostMapping
    public ResponseEntity<Void> createPlaylist(
            @AuthenticationPrincipal CustomDetails userDetails,
            @Valid @RequestBody CreatePlaylistRequest request
    ) {
        playlistService.createPlaylist(userDetails.getUserId(), request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<PlaylistResponse>> getMyPlaylists(
            @AuthenticationPrincipal CustomDetails userDetails
    ) {
        return ResponseEntity.ok(
                playlistService.getMyPlaylists(userDetails.getUserId())
        );
    }

    @GetMapping("/{playlistId}")
    public ResponseEntity<PlaylistDetailResponse> getPlaylistDetail(
            @AuthenticationPrincipal CustomDetails userDetails,
            @Positive(message = "playlistId는 양수여야 합니다.") @PathVariable Long playlistId
    ) {
        return ResponseEntity.ok(
                playlistService.getPlaylistDetail(userDetails.getUserId(), playlistId)
        );
    }

    @PostMapping("/{playlistId}/musics")
    public ResponseEntity<Void> addMusicToPlaylist(
            @AuthenticationPrincipal CustomDetails userDetails,
            @Positive(message = "playlistId는 양수여야 합니다") @PathVariable Long playlistId,
            @Valid @RequestBody AddMusicToPlaylistRequest request
    ) {
        playlistService.addMusicToPlaylist(
                userDetails.getUserId(),
                playlistId,
                request
        );

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/musics/{playlistMusicId}")
    public ResponseEntity<Void> removeMusicFromPlaylist(
            @AuthenticationPrincipal CustomDetails userDetails,
            @Positive(message = "playlistId는 양수여야 합니다.") @PathVariable Long playlistId,
            @Positive(message = "playlistMusicId는 양수여야 합니다.") @PathVariable Long playlistMusicId
    ) {
        playlistService.removeMusicFromPlaylist(
                userDetails.getUserId(),
                playlistId,
                playlistMusicId
        );

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{playlistId}")
    public ResponseEntity<Void> deletePlaylist(
            @AuthenticationPrincipal CustomDetails userDetails,
            @PathVariable Long playlistId
    ) {
        playlistService.deletePlaylist(userDetails.getUserId(), playlistId);
        return ResponseEntity.noContent().build();
    }
}
