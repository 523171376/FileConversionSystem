package com.ertaki.conversion.utils;

import java.util.Map;

/**
 * 返回数据类
 * @ClassName:  ResponseData   
 * @Description:TODO  返回信息，返回编码，返回数据
 * @author: 锋华科技 
 * @date:   2018-4-11 下午4:09:50   
 *     
 * @Copyright: 2018 xafh All rights reserved. 
 * 注意：本内容仅限内部传阅，禁止外泄以及用于其他的商业目
 */
public class ResponseData {
    /**
     *  0 失败， 1 成功
     */
    private String code;
    /**
     * 提示信息
     */
    private String msg;
    /**
     * 返回数据
     */
    @SuppressWarnings("rawtypes")
    private Map data;
    
    private String finshed;
    private double progress;
    private double fileSize;
    private String fileID;
    
    public ResponseData(){
        this.code = "1";
        this.msg = "";
        this.finshed = "0";
        this.progress = 0d;
    }
    
    public ResponseData(String msg){
        this.code = "1";
        this.msg = msg;
        this.finshed = "0";
        this.progress = 0d;
    }
    
    /**
     * 构造方法
     */
    public ResponseData(String code, String msg){
        this.code = code;
        this.msg = msg;
    }

    @SuppressWarnings("rawtypes")
    public Map getData() {
        return data;
    }

    @SuppressWarnings("rawtypes")
    public void setData(Map data) {
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setCodeMsg(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getFinshed() {
        return finshed;
    }

    public void setFinshed(String finshed) {
        this.finshed = finshed;
    }

    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public double getFileSize() {
        return fileSize;
    }

    public void setFileSize(double fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileID() {
        return fileID;
    }

    public void setFileID(String fileID) {
        this.fileID = fileID;
    };
    

}
