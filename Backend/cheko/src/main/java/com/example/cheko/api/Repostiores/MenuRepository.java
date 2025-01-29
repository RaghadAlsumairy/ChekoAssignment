package com.example.cheko.api.Repostiores;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import com.example.cheko.api.model.MenuItem;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Integer> {
 @Query(value = "SELECT * FROM get_second_highest_calorie()", nativeQuery = true)
     List<MenuItem> secondHighestCalorie();
}
