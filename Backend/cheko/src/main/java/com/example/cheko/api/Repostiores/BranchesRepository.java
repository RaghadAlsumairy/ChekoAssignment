package com.example.cheko.api.Repostiores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cheko.api.model.Branch;

@Repository
public interface BranchesRepository extends JpaRepository<Branch,Integer> {
    
}
