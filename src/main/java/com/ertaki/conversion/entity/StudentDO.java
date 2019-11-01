package com.ertaki.conversion.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table( name = "STUDENT" )
public class StudentDO implements Serializable{
    private static final long serialVersionUID = 1L;
    @Column( name = "ID" )
    @Id
    private String id;
    @Column( name = "NAME" )
    private String name;
    @Column( name = "CODE1" )
    private String code1;
    @Column( name = "CODE2" )
    private String code2;
    @Column( name = "CODE3" )
    private String code3;
    @Column( name = "CODE4" )
    private String code4;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCode1() {
        return code1;
    }
    public void setCode1(String code1) {
        this.code1 = code1;
    }
    public String getCode2() {
        return code2;
    }
    public void setCode2(String code2) {
        this.code2 = code2;
    }
    public String getCode3() {
        return code3;
    }
    public void setCode3(String code3) {
        this.code3 = code3;
    }
    public String getCode4() {
        return code4;
    }
    public void setCode4(String code4) {
        this.code4 = code4;
    }
    
    
}
