package com.fashion.music.api.itunes.service;

import com.fashion.music.api.itunes.domain.Music;
import com.fashion.music.api.itunes.domain.Playlist;
import com.fashion.music.api.itunes.domain.PlaylistMusic;
import com.fashion.music.api.itunes.dto.*;
import com.fashion.music.api.itunes.repository.MusicRepository;
import com.fashion.music.api.itunes.repository.PlaylistMusicRepository;
import com.fashion.music.api.itunes.repository.PlaylistRepository;
import com.fashion.music.user.domain.User;
import com.fashion.music.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final UserRepository userRepository;
    private final MusicRepository musicRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;

    @Transactional
    public void createPlaylist(Long userId, CreatePlaylistRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Playlist playlist = new Playlist(request.name(), user);

        playlistRepository.save(playlist);
    }

    @Transactional(readOnly = true)
    public List<PlaylistResponse> getMyPlaylists(Long userId) {
        return playlistRepository.findAllByUserId(userId).stream()
                .map(playlist -> PlaylistResponse.builder()
                        .playlistId(playlist.getId())
                        .name(playlist.getName())
                        .build())
                .toList();
    }

    @Transactional(readOnly = true)
    public PlaylistDetailResponse getPlaylistDetail(Long userId, Long playlistId) {
        Playlist playlist = playlistRepository.findByIdAndUserId(playlistId, userId)
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트를 찾을 수 없습니다."));

        List<PlaylistMusicResponse> musics = playlistMusicRepository.findAllByPlaylistId(playlistId)
                .stream()
                .map(playlistMusic -> {
                    Music music = playlistMusic.getMusic();

                    return PlaylistMusicResponse.builder()
                            .playlistMusicId(playlistMusic.getId())
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

        return PlaylistDetailResponse.builder()
                .playlistId(playlist.getId())
                .name(playlist.getName())
                .musics(musics)
                .build();
    }

    @Transactional
    public void addMusicToPlaylist(
            Long userId,
            Long playlistId,
            AddMusicToPlaylistRequest request
    ) {
        Playlist playlist = playlistRepository.findByIdAndUserId(playlistId, userId)
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트를 찾을 수 없습니다."));

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

        if (playlistMusicRepository.existsByPlaylistIdAndMusicId(playlistId, music.getId())) {
            throw new IllegalArgumentException("이미 플레이리스트에 추가된 곡입니다.");
        }

        playlistMusicRepository.save(new PlaylistMusic(playlist, music));
    }

    @Transactional
    public void removeMusicFromPlaylist(
            Long userId,
            Long playlistId,
            Long playlistMusicId
    ) {
        playlistRepository.findByIdAndUserId(playlistId, userId)
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트를 찾을 수 없습니다."));

        PlaylistMusic playlistMusic = playlistMusicRepository.findByIdAndPlaylistId(
                        playlistMusicId,
                        playlistId
                )
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트 음악을 찾을 수 없습니다."));

        playlistMusicRepository.delete(playlistMusic);
    }

    @Transactional
    public void deletePlaylist(Long userId, Long playlistId) {
        Playlist playlist = playlistRepository.findByIdAndUserId(playlistId, userId)
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트를 찾을 수 없습니다."));

        playlistRepository.delete(playlist);
    }
}
