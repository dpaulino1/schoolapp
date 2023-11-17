package com.grupo4.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.grupo4.IntegrationTest;
import com.grupo4.domain.SchoolInfo;
import com.grupo4.repository.SchoolInfoRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SchoolInfoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SchoolInfoResourceIT {

    private static final String DEFAULT_SCHOOL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SCHOOL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PRINCIPAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PRINCIPAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SCHOOL_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SCHOOL_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/school-infos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SchoolInfoRepository schoolInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSchoolInfoMockMvc;

    private SchoolInfo schoolInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchoolInfo createEntity(EntityManager em) {
        SchoolInfo schoolInfo = new SchoolInfo()
            .schoolName(DEFAULT_SCHOOL_NAME)
            .address(DEFAULT_ADDRESS)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .email(DEFAULT_EMAIL)
            .principalName(DEFAULT_PRINCIPAL_NAME)
            .schoolDescription(DEFAULT_SCHOOL_DESCRIPTION);
        return schoolInfo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SchoolInfo createUpdatedEntity(EntityManager em) {
        SchoolInfo schoolInfo = new SchoolInfo()
            .schoolName(UPDATED_SCHOOL_NAME)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .principalName(UPDATED_PRINCIPAL_NAME)
            .schoolDescription(UPDATED_SCHOOL_DESCRIPTION);
        return schoolInfo;
    }

    @BeforeEach
    public void initTest() {
        schoolInfo = createEntity(em);
    }

    @Test
    @Transactional
    void createSchoolInfo() throws Exception {
        int databaseSizeBeforeCreate = schoolInfoRepository.findAll().size();
        // Create the SchoolInfo
        restSchoolInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isCreated());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeCreate + 1);
        SchoolInfo testSchoolInfo = schoolInfoList.get(schoolInfoList.size() - 1);
        assertThat(testSchoolInfo.getSchoolName()).isEqualTo(DEFAULT_SCHOOL_NAME);
        assertThat(testSchoolInfo.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSchoolInfo.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testSchoolInfo.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSchoolInfo.getPrincipalName()).isEqualTo(DEFAULT_PRINCIPAL_NAME);
        assertThat(testSchoolInfo.getSchoolDescription()).isEqualTo(DEFAULT_SCHOOL_DESCRIPTION);
    }

    @Test
    @Transactional
    void createSchoolInfoWithExistingId() throws Exception {
        // Create the SchoolInfo with an existing ID
        schoolInfo.setId(1L);

        int databaseSizeBeforeCreate = schoolInfoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSchoolNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolInfoRepository.findAll().size();
        // set the field null
        schoolInfo.setSchoolName(null);

        // Create the SchoolInfo, which fails.

        restSchoolInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isBadRequest());

        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolInfoRepository.findAll().size();
        // set the field null
        schoolInfo.setAddress(null);

        // Create the SchoolInfo, which fails.

        restSchoolInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isBadRequest());

        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolInfoRepository.findAll().size();
        // set the field null
        schoolInfo.setPhoneNumber(null);

        // Create the SchoolInfo, which fails.

        restSchoolInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isBadRequest());

        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllSchoolInfos() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        // Get all the schoolInfoList
        restSchoolInfoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schoolInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].schoolName").value(hasItem(DEFAULT_SCHOOL_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].principalName").value(hasItem(DEFAULT_PRINCIPAL_NAME)))
            .andExpect(jsonPath("$.[*].schoolDescription").value(hasItem(DEFAULT_SCHOOL_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getSchoolInfo() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        // Get the schoolInfo
        restSchoolInfoMockMvc
            .perform(get(ENTITY_API_URL_ID, schoolInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(schoolInfo.getId().intValue()))
            .andExpect(jsonPath("$.schoolName").value(DEFAULT_SCHOOL_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.principalName").value(DEFAULT_PRINCIPAL_NAME))
            .andExpect(jsonPath("$.schoolDescription").value(DEFAULT_SCHOOL_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingSchoolInfo() throws Exception {
        // Get the schoolInfo
        restSchoolInfoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSchoolInfo() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();

        // Update the schoolInfo
        SchoolInfo updatedSchoolInfo = schoolInfoRepository.findById(schoolInfo.getId()).get();
        // Disconnect from session so that the updates on updatedSchoolInfo are not directly saved in db
        em.detach(updatedSchoolInfo);
        updatedSchoolInfo
            .schoolName(UPDATED_SCHOOL_NAME)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .principalName(UPDATED_PRINCIPAL_NAME)
            .schoolDescription(UPDATED_SCHOOL_DESCRIPTION);

        restSchoolInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSchoolInfo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSchoolInfo))
            )
            .andExpect(status().isOk());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
        SchoolInfo testSchoolInfo = schoolInfoList.get(schoolInfoList.size() - 1);
        assertThat(testSchoolInfo.getSchoolName()).isEqualTo(UPDATED_SCHOOL_NAME);
        assertThat(testSchoolInfo.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSchoolInfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSchoolInfo.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSchoolInfo.getPrincipalName()).isEqualTo(UPDATED_PRINCIPAL_NAME);
        assertThat(testSchoolInfo.getSchoolDescription()).isEqualTo(UPDATED_SCHOOL_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, schoolInfo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(schoolInfo))
            )
            .andExpect(status().isBadRequest());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(schoolInfo))
            )
            .andExpect(status().isBadRequest());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(schoolInfo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSchoolInfoWithPatch() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();

        // Update the schoolInfo using partial update
        SchoolInfo partialUpdatedSchoolInfo = new SchoolInfo();
        partialUpdatedSchoolInfo.setId(schoolInfo.getId());

        partialUpdatedSchoolInfo.address(UPDATED_ADDRESS).phoneNumber(UPDATED_PHONE_NUMBER).schoolDescription(UPDATED_SCHOOL_DESCRIPTION);

        restSchoolInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSchoolInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSchoolInfo))
            )
            .andExpect(status().isOk());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
        SchoolInfo testSchoolInfo = schoolInfoList.get(schoolInfoList.size() - 1);
        assertThat(testSchoolInfo.getSchoolName()).isEqualTo(DEFAULT_SCHOOL_NAME);
        assertThat(testSchoolInfo.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSchoolInfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSchoolInfo.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSchoolInfo.getPrincipalName()).isEqualTo(DEFAULT_PRINCIPAL_NAME);
        assertThat(testSchoolInfo.getSchoolDescription()).isEqualTo(UPDATED_SCHOOL_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateSchoolInfoWithPatch() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();

        // Update the schoolInfo using partial update
        SchoolInfo partialUpdatedSchoolInfo = new SchoolInfo();
        partialUpdatedSchoolInfo.setId(schoolInfo.getId());

        partialUpdatedSchoolInfo
            .schoolName(UPDATED_SCHOOL_NAME)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .principalName(UPDATED_PRINCIPAL_NAME)
            .schoolDescription(UPDATED_SCHOOL_DESCRIPTION);

        restSchoolInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSchoolInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSchoolInfo))
            )
            .andExpect(status().isOk());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
        SchoolInfo testSchoolInfo = schoolInfoList.get(schoolInfoList.size() - 1);
        assertThat(testSchoolInfo.getSchoolName()).isEqualTo(UPDATED_SCHOOL_NAME);
        assertThat(testSchoolInfo.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSchoolInfo.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSchoolInfo.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSchoolInfo.getPrincipalName()).isEqualTo(UPDATED_PRINCIPAL_NAME);
        assertThat(testSchoolInfo.getSchoolDescription()).isEqualTo(UPDATED_SCHOOL_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, schoolInfo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(schoolInfo))
            )
            .andExpect(status().isBadRequest());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(schoolInfo))
            )
            .andExpect(status().isBadRequest());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSchoolInfo() throws Exception {
        int databaseSizeBeforeUpdate = schoolInfoRepository.findAll().size();
        schoolInfo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSchoolInfoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(schoolInfo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SchoolInfo in the database
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSchoolInfo() throws Exception {
        // Initialize the database
        schoolInfoRepository.saveAndFlush(schoolInfo);

        int databaseSizeBeforeDelete = schoolInfoRepository.findAll().size();

        // Delete the schoolInfo
        restSchoolInfoMockMvc
            .perform(delete(ENTITY_API_URL_ID, schoolInfo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SchoolInfo> schoolInfoList = schoolInfoRepository.findAll();
        assertThat(schoolInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
