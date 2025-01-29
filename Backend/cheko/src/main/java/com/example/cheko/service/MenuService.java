package com.example.cheko.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.cheko.api.Repostiores.MenuRepository;
import com.example.cheko.api.model.MenuItem;

@Service
public class MenuService {

    private MenuRepository _menuRepository;
    private final JdbcTemplate _jdbcTemplate;

    public MenuService(MenuRepository menuRepository, JdbcTemplate jdbcTemplate) {
        _menuRepository = menuRepository;
        _jdbcTemplate= jdbcTemplate;
    }

    public List<MenuItem> getMenu() {
        
        return _menuRepository.findAll();
    }

    public List<MenuItem> getSecondHighestCalorieItems() {
        return _menuRepository.secondHighestCalorie();
    }

}
