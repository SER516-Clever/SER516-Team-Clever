package com.example.adoptedWork;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AdoptedWorkController {
    @Autowired
    AdoptedWorkService adoptedWorkService;

    @Cacheable(value = "adoptedWorkByProject", key = "#slug")
    @GetMapping("/adoptedWork/project/{slug}")
    @ResponseBody
    public List<AdoptedWorkDTO> getAdoptedWorkForAllSprints(@PathVariable("slug") String slug,  HttpServletRequest request) {
        String token = request.getHeader("token");
        return adoptedWorkService.getAdoptedWorkForAllSprints(slug, token);
    }
}
