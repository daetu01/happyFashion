package com.fashion.music.api.itunes.domain;

import com.fashion.music.user.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "music_id"})
        }
)
public class LikedMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Music music;

    private LocalDateTime likedAt;

    public LikedMusic(User user, Music music) {
        this.user = user;
        this.music = music;
        this.likedAt = LocalDateTime.now();
    }
}
