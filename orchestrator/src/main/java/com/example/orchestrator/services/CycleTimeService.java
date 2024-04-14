package com.example.orchestrator.services;

import com.example.orchestrator.models.TimeRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class CycleTimeService {
    WebClient webClient;

    String url = "http://cycle_time:8002";

    public CycleTimeService() {
        this.webClient = WebClient.create();
    }

    public String getCycleTimeMetric(final TimeRequest request, final String token) {
        URI uri = URI.create(url + "/metric/CycleTime");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
