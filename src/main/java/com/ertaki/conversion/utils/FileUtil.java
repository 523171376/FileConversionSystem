package com.ertaki.conversion.utils;

/**
 * @ClassName:  FileUtil   
 * @author: ZWC
 * @date:   2019-10-26 上午9:32:53   
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
    
    

}
