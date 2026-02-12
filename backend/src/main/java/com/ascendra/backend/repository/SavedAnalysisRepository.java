package com.ascendra.backend.repository;

import com.ascendra.backend.model.SavedAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SavedAnalysisRepository extends JpaRepository<SavedAnalysis, Long> {
    List<SavedAnalysis> findByUserIdOrderByCreatedAtDesc(Long userId);
}
