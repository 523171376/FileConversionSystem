package com.ertaki.conversion.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ertaki.conversion.utils.linstener.ProgressListener;

/**
 * @ClassName:  FileUtil   
 * @author: ZWC
 * @date:   2019-11-4 上午18:32:53   
 *     
 * @Copyright: 2018 xafh All rights reserved. 
 * 注意：本内容仅限内部传阅，禁止外泄以及用于其他的商业目
 */
public class FileUtil {
    /**
     * 单利对象
     */
    private volatile static FileUtil instance;
    
    private FileUtil(){
    }
    /**
     * @Title: getDefault   
     * @Description: 获取初始化对象
     */
    public static FileUtil getDefault(){
        if (instance == null) {
            synchronized (FileUtil.class) {
                if (instance == null) {
                    instance = new FileUtil();
                }
            }
        }
        return instance;
    }
    
    /**
     * 文件上传
     * 
     */
    public void uploadFile(InputStream stream, File dest, ProgressListener listener) throws IOException{
        InputStream is = null;
        FileOutputStream fo = null;
        try {
            is = stream;
            fo = new FileOutputStream(dest);
            int len = 0,i = 1;
            byte[] buffer = new byte[1024 * 4]; 
            while ((len = is.read(buffer)) != -1){
                fo.write(buffer,0,len);
                listener.getProgress(4096 * i++);
                //FIX ME 仅测试进度效果使用，使用时删除
                try {
                    Thread.sleep(30);
                } catch (InterruptedException e) {
                }
            }
        } catch (IOException e) {
            throw e;
        }finally {
            try {
                if(is != null) {
                    is.close();
                }
                if(fo != null) {
                    fo.close();
                }
            } catch (IOException e) {
            }
        }
    }
    
    /**
     * 文件下载
     */
    public ResponseEntity<InputStreamResource> downloadFile(String fileName){
        FileSystemResource file = new FileSystemResource(fileName);
        HttpHeaders headers = new HttpHeaders();  
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");  
        try {
            headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", new String(file.getFilename().getBytes("utf-8"), "ISO-8859-1")));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }  
        headers.add("Pragma", "no-cache");  
        headers.add("Expires", "0"); 
        try {
            return new ResponseEntity<InputStreamResource>(new InputStreamResource(file.getInputStream()), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<InputStreamResource>(null, headers, HttpStatus.BAD_REQUEST);
    }
    
    public static double formartFileSize(long size) {
        return (double)Math.round((size / 1024) * 100) / 100;
    }
    
    public static double progressCalculate(double currentNum, double totalNum) {
        return (double)Math.round((currentNum / totalNum) * 10000) / 100;
    }
}
