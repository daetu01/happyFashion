package com.fashion.music.api.itunes;

import com.fashion.music.api.itunes.dto.ItunesSearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import tools.jackson.core.JacksonException;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ItunesApiClient {
    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://itunes.apple.com")
            .build();
    private final ObjectMapper objectMapper;

    public ItunesSearchResponse searchTracks(String keyword) {
        String responseBody = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("term", keyword)
                        .queryParam("media", "music")
                        .queryParam("entity", "song")
                        .queryParam("country", "KR")
                        .queryParam("limit", 10)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            return objectMapper.readValue(
                    responseBody,
                    ItunesSearchResponse.class
            );
        } catch (JacksonException e) {
            throw new RuntimeException("iTunes API 응답 파싱 실패", e);
        }
    }
}
