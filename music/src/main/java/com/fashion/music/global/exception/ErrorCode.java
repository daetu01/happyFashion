package com.fashion.music.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    PLAYLIST_NOT_FOUND(HttpStatus.NOT_FOUND, "플레이리스트를 찾을 수 없습니다."),
    PLAYLIST_MUSIC_NOT_FOUND(HttpStatus.NOT_FOUND, "플레이리스트 음악을 찾을 수 없습니다."),
    LIKED_MUSIC_NOT_FOUND(HttpStatus.NOT_FOUND, "좋아요한 음악을 찾을 수 없습니다."),
    MUSIC_ALREADY_IN_PLAYLIST(HttpStatus.BAD_REQUEST, "이미 플레이리스트에 추가된 곡입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
    USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 가입된 이메일입니다."),
    MUSIC_ALREADY_LIKED(HttpStatus.BAD_REQUEST, "이미 좋아요한 곡입니다."),
    INVALID_LOGIN(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다."),
    HISTORY_NOT_FOUND(HttpStatus.NOT_FOUND, "검색 기록이 없습니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");
    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
