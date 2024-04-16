package com.example.orchestrator.services;

import com.example.orchestrator.models.CruftRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class CruftService {

    WebClient webClient;

    String url = "http://cruft:8005";

    public CruftService() {
        this.webClient = WebClient.create();
    }

    public String getCruftMetric(final CruftRequest request, final String token) {
        URI uri = URI.create(url + "/metric/Cruft");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
