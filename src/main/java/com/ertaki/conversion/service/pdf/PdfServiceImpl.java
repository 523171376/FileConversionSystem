package com.ertaki.conversion.service.pdf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.jodconverter.DocumentConverter;
import org.jodconverter.office.OfficeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ertaki.conversion.constants.AppConfig;
import com.ertaki.conversion.socket.WebSocketServer;
import com.ertaki.conversion.utils.ResponseData;

@Service
public class PdfServiceImpl implements IPdfService{
    @Autowired
    private DocumentConverter documentConverter; 
    
    @Override
    public void uploadFileAndSend(MultipartFile file, String fileID, String userID) throws Exception {
        ResponseData rd = new ResponseData();
        rd.setFileID(fileID);
        
        String fileName = file.getOriginalFilename();
        File dest = new File(AppConfig.UPLOAD_FILE_PATH + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        File pdfFile = new File(AppConfig.UPLOAD_PDFFILE_PATH + fileName + ".pdf");
        if (!pdfFile.getParentFile().exists()) {
            pdfFile.getParentFile().mkdirs();
        }
        
        InputStream is = null;
        FileOutputStream fo = null;
        try {
            rd.setFileSize(Math.round((file.getSize() / 1024) * 100) / 100);
            WebSocketServer.send(rd, userID);
            
            is = file.getInputStream();
            fo = new FileOutputStream(dest);
            double size = file.getBytes().length;
            int len = 0,i = 1;
            byte[] buffer = new byte[1024 * 4]; 
            while ((len = is.read(buffer)) != -1){
                fo.write(buffer,0,len);
                double progress = (double) Math.round(((4096 * i++) / size) * 10000) / 100;
                rd.setProgress(progress);
                WebSocketServer.send(rd, userID);
                Thread.sleep(30);
            }
            
            rd.setFinshed("1");
            rd.setProgress(100.0d);
            WebSocketServer.send(rd, userID);
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
        
        rd.setFinshed("2");
        rd.setProgress(0d);
        WebSocketServer.send(rd, userID);
        try {
            documentConverter.convert(dest).to(pdfFile).execute();            
//            //FIX ME重写源码添加监听，实现进度显示
//            documentConverter.convert(dest).to(pdfFile).execute(new ProgressListener() {
//                @Override
//                public void getProgress(double totalSize, double currentSize) {
//                    double progress = (double) Math.round((currentSize / totalSize) * 10000) / 100;
//                    rd.setProgress(progress);
//                    WebSocketServer.send(rd, userID);
//                }
//            });
            
            rd.setFinshed("3");
            rd.setProgress(100.0d);
            WebSocketServer.send(rd, userID);
        } catch (OfficeException e) {
            rd.setFinshed("9");
            WebSocketServer.send(rd, userID);
            e.printStackTrace();
        }

    }
    
}
