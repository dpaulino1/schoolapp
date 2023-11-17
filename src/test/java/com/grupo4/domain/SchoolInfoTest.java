package com.grupo4.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.grupo4.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SchoolInfoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolInfo.class);
        SchoolInfo schoolInfo1 = new SchoolInfo();
        schoolInfo1.setId(1L);
        SchoolInfo schoolInfo2 = new SchoolInfo();
        schoolInfo2.setId(schoolInfo1.getId());
        assertThat(schoolInfo1).isEqualTo(schoolInfo2);
        schoolInfo2.setId(2L);
        assertThat(schoolInfo1).isNotEqualTo(schoolInfo2);
        schoolInfo1.setId(null);
        assertThat(schoolInfo1).isNotEqualTo(schoolInfo2);
    }
}
