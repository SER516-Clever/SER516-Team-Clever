package com.example.orchestrator.services;

import com.example.orchestrator.models.ProjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class SprintService {

    WebClient webClient;

    String url = "http://backend:8010";

    public SprintService() {
        this.webClient = WebClient.create();
    }

    public String getSprint(final ProjectRequest request, final String token) {
        URI uri = URI.create(url + "/Sprints");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }

    public String getProject(final ProjectRequest request, final String token) {
        URI uri = URI.create(url + "/Project");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
