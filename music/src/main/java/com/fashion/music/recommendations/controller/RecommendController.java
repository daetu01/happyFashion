package com.fashion.music.recommendations.controller;

import com.fashion.music.global.security.CustomDetails;
import com.fashion.music.mood.domain.MusicMood;
import com.fashion.music.recommendations.dto.MusicMoodDto;
import com.fashion.music.recommendations.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {
    private final RecommendService recommendService;

    @GetMapping
    public ResponseEntity<List<MusicMoodDto.RESPONSE>> recommend(@AuthenticationPrincipal CustomDetails customDetails) {
        return ResponseEntity.ok(recommendService.recommend(customDetails.getUserId()));
    }
}
