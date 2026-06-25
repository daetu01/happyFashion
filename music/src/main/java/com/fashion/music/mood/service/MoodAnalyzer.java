package com.fashion.music.mood.service;

import com.fashion.music.mood.domain.Mood;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MoodAnalyzer {
    public List<Mood> analyze(String genre, String trackName, String artistName) {
        String text = normalize(genre) + " " + normalize(trackName) + " " + normalize(artistName);

        List<Mood> moods = new ArrayList<>();

        if (containsAny(text, "pop", "k-pop", "dance", "edm")) {
            moods.add(Mood.BRIGHT);
            moods.add(Mood.ENERGETIC);
        }

        if (containsAny(text, "ballad", "acoustic", "piano")) {
            moods.add(Mood.CALM);
            moods.add(Mood.SAD);
        }

        if (containsAny(text, "r&b", "soul", "jazz", "lo-fi", "lofi")) {
            moods.add(Mood.CHILL);
        }

        if (containsAny(text, "rock", "hip-hop", "hip hop", "rap", "metal")) {
            moods.add(Mood.INTENSE);
        }

        if (containsAny(text, "love", "romance", "romantic")) {
            moods.add(Mood.ROMANTIC);
        }

        if (moods.isEmpty()) {
            moods.add(Mood.NEUTRAL);
        }

        return moods.stream()
                .distinct()
                .toList();
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }

        return value.toLowerCase();
    }

    private boolean containsAny(String text, String... keywords) {
        for (String keyword : keywords) {
            if (text.contains(keyword)) {
                return true;
            }
        }

        return false;
    }
}
