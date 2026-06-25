package com.fashion.music.api.itunes.repository;
import com.fashion.music.api.itunes.domain.ItunesSearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<ItunesSearchHistory, Long> {
    List<ItunesSearchHistory> findAllByOrderBySearchedAtDesc();
}
