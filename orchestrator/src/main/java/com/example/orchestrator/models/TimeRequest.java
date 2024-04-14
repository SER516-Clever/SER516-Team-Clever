package com.example.orchestrator.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimeRequest {

    public String projectslug;

    public String from_date;

    public String to_date;
}
