package com.ascendra.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String company;

    @NotBlank
    private String role;

    @NotNull
    private LocalDate dateApplied;

    @NotBlank
    private String resumeVersion;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ApplicationSource source;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ApplicationStage currentStage;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ApplicationOutcome finalOutcome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
