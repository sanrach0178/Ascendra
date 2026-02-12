package com.ascendra.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "saved_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String role;

    @ElementCollection
    private List<String> companies;

    private int matchScore;

    @ElementCollection
    @CollectionTable(name = "saved_analysis_skill_gaps", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "skill_gap", columnDefinition = "TEXT")
    private List<String> skillGaps;

    @ElementCollection
    @CollectionTable(name = "saved_analysis_fit_issues", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "fit_issue", columnDefinition = "TEXT")
    private List<String> companyFitIssues;

    @ElementCollection
    @CollectionTable(name = "saved_analysis_recommendations", joinColumns = @JoinColumn(name = "analysis_id"))
    @Column(name = "recommendation", columnDefinition = "TEXT")
    private List<String> recommendations;

    @Column(columnDefinition = "TEXT")
    private String overallFeedback;

    private LocalDateTime createdAt = LocalDateTime.now();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
