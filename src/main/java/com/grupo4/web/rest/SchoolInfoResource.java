package com.grupo4.web.rest;

import com.grupo4.domain.SchoolInfo;
import com.grupo4.repository.SchoolInfoRepository;
import com.grupo4.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.grupo4.domain.SchoolInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SchoolInfoResource {

    private final Logger log = LoggerFactory.getLogger(SchoolInfoResource.class);

    private static final String ENTITY_NAME = "schoolInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SchoolInfoRepository schoolInfoRepository;

    public SchoolInfoResource(SchoolInfoRepository schoolInfoRepository) {
        this.schoolInfoRepository = schoolInfoRepository;
    }

    /**
     * {@code POST  /school-infos} : Create a new schoolInfo.
     *
     * @param schoolInfo the schoolInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new schoolInfo, or with status {@code 400 (Bad Request)} if the schoolInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/school-infos")
    public ResponseEntity<SchoolInfo> createSchoolInfo(@Valid @RequestBody SchoolInfo schoolInfo) throws URISyntaxException {
        log.debug("REST request to save SchoolInfo : {}", schoolInfo);
        if (schoolInfo.getId() != null) {
            throw new BadRequestAlertException("A new schoolInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolInfo result = schoolInfoRepository.save(schoolInfo);
        return ResponseEntity
            .created(new URI("/api/school-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /school-infos/:id} : Updates an existing schoolInfo.
     *
     * @param id the id of the schoolInfo to save.
     * @param schoolInfo the schoolInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated schoolInfo,
     * or with status {@code 400 (Bad Request)} if the schoolInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the schoolInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/school-infos/{id}")
    public ResponseEntity<SchoolInfo> updateSchoolInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SchoolInfo schoolInfo
    ) throws URISyntaxException {
        log.debug("REST request to update SchoolInfo : {}, {}", id, schoolInfo);
        if (schoolInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, schoolInfo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!schoolInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SchoolInfo result = schoolInfoRepository.save(schoolInfo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, schoolInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /school-infos/:id} : Partial updates given fields of an existing schoolInfo, field will ignore if it is null
     *
     * @param id the id of the schoolInfo to save.
     * @param schoolInfo the schoolInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated schoolInfo,
     * or with status {@code 400 (Bad Request)} if the schoolInfo is not valid,
     * or with status {@code 404 (Not Found)} if the schoolInfo is not found,
     * or with status {@code 500 (Internal Server Error)} if the schoolInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/school-infos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SchoolInfo> partialUpdateSchoolInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SchoolInfo schoolInfo
    ) throws URISyntaxException {
        log.debug("REST request to partial update SchoolInfo partially : {}, {}", id, schoolInfo);
        if (schoolInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, schoolInfo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!schoolInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SchoolInfo> result = schoolInfoRepository
            .findById(schoolInfo.getId())
            .map(existingSchoolInfo -> {
                if (schoolInfo.getSchoolName() != null) {
                    existingSchoolInfo.setSchoolName(schoolInfo.getSchoolName());
                }
                if (schoolInfo.getAddress() != null) {
                    existingSchoolInfo.setAddress(schoolInfo.getAddress());
                }
                if (schoolInfo.getPhoneNumber() != null) {
                    existingSchoolInfo.setPhoneNumber(schoolInfo.getPhoneNumber());
                }
                if (schoolInfo.getEmail() != null) {
                    existingSchoolInfo.setEmail(schoolInfo.getEmail());
                }
                if (schoolInfo.getPrincipalName() != null) {
                    existingSchoolInfo.setPrincipalName(schoolInfo.getPrincipalName());
                }
                if (schoolInfo.getSchoolDescription() != null) {
                    existingSchoolInfo.setSchoolDescription(schoolInfo.getSchoolDescription());
                }

                return existingSchoolInfo;
            })
            .map(schoolInfoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, schoolInfo.getId().toString())
        );
    }

    /**
     * {@code GET  /school-infos} : get all the schoolInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schoolInfos in body.
     */
    @GetMapping("/school-infos")
    public List<SchoolInfo> getAllSchoolInfos() {
        log.debug("REST request to get all SchoolInfos");
        return schoolInfoRepository.findAll();
    }

    /**
     * {@code GET  /school-infos/:id} : get the "id" schoolInfo.
     *
     * @param id the id of the schoolInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the schoolInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/school-infos/{id}")
    public ResponseEntity<SchoolInfo> getSchoolInfo(@PathVariable Long id) {
        log.debug("REST request to get SchoolInfo : {}", id);
        Optional<SchoolInfo> schoolInfo = schoolInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(schoolInfo);
    }

    /**
     * {@code DELETE  /school-infos/:id} : delete the "id" schoolInfo.
     *
     * @param id the id of the schoolInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/school-infos/{id}")
    public ResponseEntity<Void> deleteSchoolInfo(@PathVariable Long id) {
        log.debug("REST request to delete SchoolInfo : {}", id);
        schoolInfoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
