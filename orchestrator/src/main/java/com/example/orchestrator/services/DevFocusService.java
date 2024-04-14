package com.example.orchestrator.services;

import com.example.orchestrator.models.DevFocusRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;

@Service
public class DevFocusService {

    WebClient webClient;

    String url = "http://dev_focus:8003";

    public DevFocusService() {
        this.webClient = WebClient.create();
    }

    public String getDevFocusMetric(final DevFocusRequest request, final String token) {
        URI uri = URI.create(url + "/metric/Devfocus");

        return webClient.post()
                .uri(uri)
                .bodyValue(request)
                .header("token", token)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}
