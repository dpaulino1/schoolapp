package com.grupo4.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A SchoolInfo.
 */
@Entity
@Table(name = "school_info")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SchoolInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 80)
    @Column(name = "school_name", length = 80, nullable = false)
    private String schoolName;

    @NotNull
    @Size(max = 80)
    @Column(name = "address", length = 80, nullable = false)
    private String address;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "principal_name")
    private String principalName;

    @Column(name = "school_description")
    private String schoolDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SchoolInfo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolName() {
        return this.schoolName;
    }

    public SchoolInfo schoolName(String schoolName) {
        this.setSchoolName(schoolName);
        return this;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getAddress() {
        return this.address;
    }

    public SchoolInfo address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public SchoolInfo phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public SchoolInfo email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPrincipalName() {
        return this.principalName;
    }

    public SchoolInfo principalName(String principalName) {
        this.setPrincipalName(principalName);
        return this;
    }

    public void setPrincipalName(String principalName) {
        this.principalName = principalName;
    }

    public String getSchoolDescription() {
        return this.schoolDescription;
    }

    public SchoolInfo schoolDescription(String schoolDescription) {
        this.setSchoolDescription(schoolDescription);
        return this;
    }

    public void setSchoolDescription(String schoolDescription) {
        this.schoolDescription = schoolDescription;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SchoolInfo)) {
            return false;
        }
        return id != null && id.equals(((SchoolInfo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SchoolInfo{" +
            "id=" + getId() +
            ", schoolName='" + getSchoolName() + "'" +
            ", address='" + getAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", principalName='" + getPrincipalName() + "'" +
            ", schoolDescription='" + getSchoolDescription() + "'" +
            "}";
    }
}
