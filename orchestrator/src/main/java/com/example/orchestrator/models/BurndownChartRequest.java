package com.example.orchestrator.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BurndownChartRequest {

    public List<String> milestoneIds;

    public String attributeKey;
}
