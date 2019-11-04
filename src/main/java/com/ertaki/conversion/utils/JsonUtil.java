package com.ertaki.conversion.utils;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @ClassName:  JsonUtil   
 * @Description:JSON格式化工具类，JSON字符串和对象的转换  
 * @author: ZWC
 * @date:   2018-3-26 上午9:32:53   
 *     
 * @Copyright: 2018 xafh All rights reserved. 
 * 注意：本内容仅限内部传阅，禁止外泄以及用于其他的商业目
 */
public class JsonUtil {
    /**
     * 单利对象
     */
    private volatile static JsonUtil instance;
    private ObjectMapper mapper;
    /**
     * @Title:  JsonUtil   
     * @Description:    构造JSON工具 
     */
    private JsonUtil(){
        mapper = new ObjectMapper();
    }
    /**
     * @Title: getDefault   
     * @Description: 获取初始化对象
     * @param: @return      
     * @return: JsonUtil      
     * @throws
     */
    public static JsonUtil getDefault(){
        if (instance == null) {
            synchronized (JsonUtil.class) {
                if (instance == null) {
                    instance = new JsonUtil();
                }
            }
        }
        return instance;
    }
    /**
     * 
     * @Title: obj2JsonStr   
     * @Description: 转换String字符串
     * @param: @param elem
     * @param: @return      
     * @return: String      
     * @throws
     */
    public <T> String obj2JsonStr(T elem){
        String str = null;
        try {
            str = mapper.writeValueAsString(elem);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }        
        return str;
    }
    
    /**
     * 
     * @Title: jsonStr2Obj   
     * @Description: 字符串转对象
     * @param: @param jsonString
     * @param: @param clazz
     * @param: @return      
     * @return: Object      
     * @throws
     */
    @SuppressWarnings("unchecked")
    public <T> T jsonStr2Obj(String jsonString, Class<?> clazz){
        T ret = null;
        Object obj = null;
        try {
            obj = mapper.readValue(jsonString, clazz);
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        ret = (T) clazz.cast(obj);
        
        return ret;
    }

}
