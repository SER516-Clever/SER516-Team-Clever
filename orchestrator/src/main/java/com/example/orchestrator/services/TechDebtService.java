package com.example.orchestrator.services;

import com.example.orchestrator.models.CruftRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class TechDebtService {

    WebClient webClient;

    String url = "http://techdebt:8006";

    public TechDebtService() {
        this.webClient = WebClient.create();
    }

    public String getTechDebtMetric(final CruftRequest request, final String token) {
        URI uri = URI.create(url + "/metric/TechDebt");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
