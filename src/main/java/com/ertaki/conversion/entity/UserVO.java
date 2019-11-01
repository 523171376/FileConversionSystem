package com.ertaki.conversion.entity;

import java.io.Serializable;

public class UserVO implements Serializable{
    private static final long serialVersionUID = 1L;
    
    private String userID;
    private String userName;
    public String getUserID() {
        return userID;
    }
    public void setUserID(String userID) {
        this.userID = userID;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
}
