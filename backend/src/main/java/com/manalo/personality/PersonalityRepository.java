package com.manalo.personality;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called personalityRepository
// CRUD refers Create, Read, Update, Delete

public interface PersonalityRepository extends JpaRepository<Personality, Integer> {
    List<Personality> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrUrlContainingIgnoreCaseOrAltContainingIgnoreCase(String name, String description, String url, String alt);
    // You can add other custom query methods here if needed
}