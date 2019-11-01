package com.ertaki.conversion.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ertaki.conversion.entity.StudentDO;
import com.ertaki.conversion.repository.IHelloRepository;
import com.ertaki.conversion.service.IHelloService;

@Service
public class HelloServiceImpl implements IHelloService{
    @Autowired
    private IHelloRepository helloRepository;
    
    @Override
    public String sayHelloJpa() {
        StudentDO student = helloRepository.getOne("1");
        return student.getName();
    }

}
