package com.example.orchestrator;

import com.example.orchestrator.models.BurndownChartRequest;
import com.example.orchestrator.models.CruftRequest;
import com.example.orchestrator.models.DevFocusRequest;
import com.example.orchestrator.models.ProjectRequest;
import com.example.orchestrator.models.TimeRequest;
import com.example.orchestrator.services.BurndownChart;
import com.example.orchestrator.services.CruftService;
import com.example.orchestrator.services.CycleTimeService;
import com.example.orchestrator.services.DevFocusService;
import com.example.orchestrator.services.SprintService;
import com.example.orchestrator.services.TaskService;
import com.example.orchestrator.services.TechDebtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
public class ControllerTest {

    @MockBean
    TaskService taskService;

    @MockBean
    CycleTimeService cycleTimeService;

    @MockBean
    BurndownChart burndownChart;

    @MockBean
    DevFocusService devFocusService;

    @MockBean
    CruftService cruftService;

    @MockBean
    SprintService sprintService;

    @MockBean
    TechDebtService techDebtService;

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @SneakyThrows
    @Test
    void testLeadTime() {
        TimeRequest request = new TimeRequest();
        request.setFrom_date("abcd");
        request.setProjectslug("project");
        request.setTo_date("pqrs");
        when(taskService.getLeadTimeMetric(any(TimeRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/LeadTime")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testCycleTime() {
        TimeRequest request = new TimeRequest();
        request.setFrom_date("abcd");
        request.setProjectslug("project");
        request.setTo_date("pqrs");
        when(cycleTimeService.getCycleTimeMetric(any(TimeRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/CycleTime")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testBurndownMetric() {
        BurndownChartRequest request = new BurndownChartRequest();
        request.setAttributeKey("attr");
        request.setMilestoneIds(List.of("sample"));
        when(burndownChart.getBurndownMetric(any(BurndownChartRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/Burndown")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testDevFocusMetric() {
        DevFocusRequest request = new DevFocusRequest();
        request.setFrom_date("from");
        request.setMembers(List.of("member"));
        request.setTo_date("to");
        request.setProject_id("project");
        request.setThreshold("2");
        when(devFocusService.getDevFocusMetric(any(DevFocusRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/Devfocus")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testCruft() {
        CruftRequest request = new CruftRequest();
        request.setAttributeKey("attr");
        request.setProjectId("pro");
        request.setStartDate("start");
        request.setEndDate("end");
        when(cruftService.getCruftMetric(any(CruftRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/Cruft")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testProject() {
        ProjectRequest request = new ProjectRequest();
        request.setProjectslug("slug");
        when(sprintService.getProject(any(ProjectRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/Project")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testSprints() {
        ProjectRequest request = new ProjectRequest();
        request.setProjectslug("slug");
        when(sprintService.getProject(any(ProjectRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/Sprints")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @SneakyThrows
    @Test
    void testTechDebt() {
        CruftRequest request = new CruftRequest();
        request.setAttributeKey("attr");
        request.setProjectId("pro");
        request.setStartDate("start");
        request.setEndDate("end");
        when(techDebtService.getTechDebtMetric(any(CruftRequest.class), anyString())).thenReturn("Response");
        mvc.perform(MockMvcRequestBuilders.post("/api/metric/TechDebt")
                        .content(mapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
