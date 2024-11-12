package com.dcs.dcs_project.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public class TimesEntity {

    @CreationTimestamp
    @Column(name = "created_time", updatable = false)  
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time", insertable = false)
    private LocalDateTime updatedTime;

}