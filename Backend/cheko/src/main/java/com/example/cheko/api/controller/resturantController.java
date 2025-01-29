package com.example.cheko.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.cheko.api.Repostiores.BranchesRepository;
import com.example.cheko.api.model.Branch;
import com.example.cheko.api.model.MenuItem;
import com.example.cheko.service.MenuService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" })
@RestController
@RequestMapping("/api/restaurant")
public class resturantController {

    private final MenuService _menuService;
    private final BranchesRepository _branchsRepository;

    public resturantController(MenuService menuService, BranchesRepository branchesRepository) {
        this._menuService = menuService;
        _branchsRepository = branchesRepository;
    }

    @GetMapping("/menu")
    public List<MenuItem> getMenu() {

        return _menuService.getMenu();
    }

    @GetMapping("/branches")
    public List<Branch> getBranches() {
        return _branchsRepository.findAll();
    }

    @GetMapping("/second-highest-calorie")
    public List<MenuItem> getSecondHighestCalorie() {
        return _menuService.getSecondHighestCalorieItems();
    }

}
