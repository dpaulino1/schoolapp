package com.grupo4.domain;

import com.grupo4.domain.enumeration.RelationshipType;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A Relationship.
 */
@Entity
@Table(name = "relationship")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Relationship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_type")
    private RelationshipType relationshipType;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Relationship id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RelationshipType getRelationshipType() {
        return this.relationshipType;
    }

    public Relationship relationshipType(RelationshipType relationshipType) {
        this.setRelationshipType(relationshipType);
        return this;
    }

    public void setRelationshipType(RelationshipType relationshipType) {
        this.relationshipType = relationshipType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Relationship)) {
            return false;
        }
        return id != null && id.equals(((Relationship) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Relationship{" +
            "id=" + getId() +
            ", relationshipType='" + getRelationshipType() + "'" +
            "}";
    }
}
