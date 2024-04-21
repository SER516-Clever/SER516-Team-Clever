package com.example.orchestrator;

import com.example.orchestrator.models.AuthModel;
import com.example.orchestrator.models.AuthRequest;
import com.example.orchestrator.models.BurndownChartRequest;
import com.example.orchestrator.models.CruftRequest;
import com.example.orchestrator.models.DevFocusRequest;
import com.example.orchestrator.models.ProjectRequest;
import com.example.orchestrator.models.TimeRequest;
import com.example.orchestrator.services.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
@Slf4j
public class Controller {

    @Autowired
    AuthService authentication;

    private String token;

    @Autowired
    ProjectService projectService;
    @Autowired
    BurndownChart burndownChart;
    @Autowired
    CycleTimeService cycleTimeService;
    @Autowired
    TaskService taskService;
    @Autowired
    AdoptedWorkService adoptedWorkService;
    @Autowired
    DeliveryOnTimeService deliveryOnTimeService;
    @Autowired
    FoundWorkService foundWorkService;
    @Autowired
    CruftService cruftService;
    @Autowired
    DevFocusService devFocusService;
    @Autowired
    SprintService sprintService;
    @Autowired
    TechDebtService techDebtService;


    @PostMapping("/login")
    @ResponseBody
    public Object login(@RequestBody AuthRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        AuthModel authModel = authentication.authenticate(username, password);
        if (authModel != null && authModel.getMemberID() != null) {
            token = authModel.getToken();
            return ResponseEntity.ok(authModel.getMemberID());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @GetMapping("/projectList/{memberID}")
    @ResponseBody
    public String getProjectList(@PathVariable("memberID") Integer memberID) {
        return projectService.getProjectList(memberID, token);
    }

    @GetMapping("/projects/{projectID}")
    @ResponseBody
    public String getProjectDetails(@PathVariable("projectID") Integer projectID) {
        return projectService.getPojectDetails(projectID, token);
    }

    @GetMapping("/projects/by-slug/{slug}")
    @ResponseBody
    public String getProjectDetailsSlug(@PathVariable("slug") String Slug) {
        return projectService.getProjectDetailsSlug(Slug, token);
    }

    @PostMapping("/metric/Burndown")
    public String getBurndownMetric(@RequestBody final BurndownChartRequest request) {
        return burndownChart.getBurndownMetric(request, token);
    }

    @PostMapping("/metric/CycleTime")
    public String getCycleTime(@RequestBody final TimeRequest request) {
        return cycleTimeService.getCycleTimeMetric(request, token);
    }

    @PostMapping("/metric/LeadTime")
    public String getLeadTime(@RequestBody final TimeRequest request) {
        return taskService.getLeadTimeMetric(request, token);
    }

    @GetMapping("/adoptedWork/{milestoneID}")
    @ResponseBody
    public String getUSAddedAfterSprintPlanning(@PathVariable("milestoneID") Integer milestoneID) {
        return adoptedWorkService.getUSAddedAfterSprintPlanning(milestoneID, token);
    }

    @Cacheable(value = "adoptedWorkByProject", key = "#slug")
    @GetMapping("/adoptedWork/project/{slug}")
    @ResponseBody
    public String getAdoptedWorkForAllSprints(@PathVariable("slug") String slug) {
        return adoptedWorkService.getAdoptedWorkForAllSprints(slug, token);
    }

    @GetMapping("/DoT/{projectID}")
    @ResponseBody
    public String getClosedMilestonesbyID(@PathVariable("projectID") Integer projectID) {
        return deliveryOnTimeService.getClosedMilestonesbyID(projectID, token);
    }

    @GetMapping("/DoT/by-slug/{Slug}")
    @ResponseBody
    public String getClosedMilestonesbySlug(@PathVariable("Slug") String Slug) {
        String response = "{ \"story_points\": " + 
        deliveryOnTimeService.getClosedMilestonesbySlug(Slug, token) + 
        ", \"BV\": " + deliveryOnTimeService.getClosedMilestonesbySlugForBV(Slug, token) + "}";
        return response;
    }

    @GetMapping("DoT/{projectID}/BV")
    public @ResponseBody String getClosedMilestonesforBV(@PathVariable("projectID") Integer projectID) {
        return deliveryOnTimeService.getClosedMilestonesbyIDForBV(projectID, token);
    }

    @GetMapping("DoT/by-slug/{Slug}/BV")
    public @ResponseBody String getClosedMilestonesforBV(@PathVariable("Slug") String slug) {
        return deliveryOnTimeService.getClosedMilestonesbySlugForBV(slug, token);
    }

    @GetMapping("/foundWork/{milestoneID}")
    @ResponseBody
    public String getFoundWorkByID(@PathVariable("milestoneID") Integer milestoneID) {
        return foundWorkService.getFoundWork(milestoneID, token);
    }

    @PostMapping("/metric/Cruft")
    public String getCruftMetric(@RequestBody final CruftRequest request) {
        return cruftService.getCruftMetric(request, token);
    }

    @PostMapping("/metric/Devfocus")
    public String getDevFocusMetric(@RequestBody final DevFocusRequest request) {
        return devFocusService.getDevFocusMetric(request, token);
    }

    @PostMapping("/Sprints")
    public String getSprint(@RequestBody final ProjectRequest request) {
        return sprintService.getSprint(request, token);
    }

    @PostMapping("/Project")
    public String getProject(@RequestBody final ProjectRequest request) {
        return sprintService.getProject(request, token);
    }

    @PostMapping("/metric/TechDebt")
    public String getTechDebt(@RequestBody final CruftRequest request) {
        return techDebtService.getTechDebtMetric(request, token);
    }

}
