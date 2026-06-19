package com.fashion.music.api.itunes.controller;

import com.fashion.music.api.itunes.ItunesApiClient;
import com.fashion.music.api.itunes.dto.ItunesSearchResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/music")
public class MusicSearchController {
    private final ItunesApiClient itunesApiClient;

    public MusicSearchController(ItunesApiClient itunesApiClient) {
        this.itunesApiClient = itunesApiClient;
    }

    @GetMapping("/search")
    public ItunesSearchResponse search(@RequestParam String keyword) {
        return itunesApiClient.searchTracks(keyword);
    }
}

