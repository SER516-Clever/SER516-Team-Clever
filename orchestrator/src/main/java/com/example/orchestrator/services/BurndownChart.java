package com.example.orchestrator.services;

import com.example.orchestrator.models.BurndownChartRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class BurndownChart {
    WebClient webClient;

    String url = "http://burndown_chart:8004";

    public BurndownChart() {
        this.webClient = WebClient.create();
    }

    public String getBurndownMetric(final BurndownChartRequest request, final String token) {
        URI uri = URI.create(url + "/metric/Burndown");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
