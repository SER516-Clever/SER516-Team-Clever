package com.example.orchestrator.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DevFocusRequest {

    public String project_id;

    public List<String> members;

    public String from_date;

    public String to_date;

    public String threshold;
}
