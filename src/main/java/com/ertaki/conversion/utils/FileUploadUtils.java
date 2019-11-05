package com.ertaki.conversion.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.ertaki.conversion.utils.linstener.ProgressListener;

/**
 * @ClassName:  FileUploadUtils   
 * @author: ZWC
 * @date:   2019-11-6 上午9:32:53   
 *     
 * @Copyright: 2018 xafh All rights reserved. 
 * 注意：本内容仅限内部传阅，禁止外泄以及用于其他的商业目
 */
public class FileUploadUtils {
    private volatile InputStream stream;
    private volatile File dest;
    
    public FileUploadUtils source(InputStream stream) {
        this.stream = stream;
        return this;
    }
    
    public FileUploadUtils to(File dest) {
        this.dest = dest;
        return this;
    }
    
    public void execute(ProgressListener listener) throws IOException{
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

}
