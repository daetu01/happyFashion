package com.fashion.music.api.itunes.domain;

import com.fashion.music.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ItunesSearchHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String keyword;

    private LocalDateTime searchedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public ItunesSearchHistory(String keyword, User user) {
        this.keyword = keyword;
        this.user = user;
        this.searchedAt = LocalDateTime.now();
    }
}
