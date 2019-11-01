package com.ertaki.conversion.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ertaki.conversion.entity.StudentDO;


public interface IHelloRepository extends JpaRepository<StudentDO, String>{
    
}
