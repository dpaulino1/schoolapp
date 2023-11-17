package com.grupo4.repository;

import com.grupo4.domain.SchoolInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SchoolInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolInfoRepository extends JpaRepository<SchoolInfo, Long> {}
