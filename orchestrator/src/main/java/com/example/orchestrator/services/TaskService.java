package com.example.orchestrator.services;

import com.example.orchestrator.models.TimeRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class TaskService {
    WebClient webClient;

    String authUrl2 = "http://leadtime:8001";

    public TaskService() {
        this.webClient = WebClient.create();
    }

    public String getLeadTimeMetric(final TimeRequest request, final String token) {
        URI uri = URI.create(authUrl2 + "/metric/LeadTime");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
