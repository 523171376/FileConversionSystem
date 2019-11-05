package com.ertaki.conversion.service.pdf;

import java.io.File;

import org.jodconverter.DocumentConverter;
import org.jodconverter.office.OfficeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ertaki.conversion.constants.AppConfig;
import com.ertaki.conversion.socket.WebSocketServer;
import com.ertaki.conversion.utils.FileUploadUtils;
import com.ertaki.conversion.utils.FileUtil;
import com.ertaki.conversion.utils.ResponseData;

@Service
public class PdfServiceImpl implements IPdfService{
    @Autowired
    private DocumentConverter documentConverter; 
    
    @Value("${path.upload_pdf_ofile_path}")
    private String UPLOAD_PDF_OFILE_PATH; 
    @Value("${path.upload_pdf_pdffile_path}")
    private String UPLOAD_PDF_PDFFILE_PATH; 
    
    @Override
    public void uploadFileAndSend(MultipartFile file, String fileID, String userID) throws Exception {
        ResponseData rd = new ResponseData();
        rd.setFileID(fileID);
        
        String fileName = file.getOriginalFilename();
        File dest = new File(UPLOAD_PDF_OFILE_PATH + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        File pdfFile = new File(UPLOAD_PDF_PDFFILE_PATH + fileName + AppConfig.FILE_SUFFIX_PDF);
        if (!pdfFile.getParentFile().exists()) {
            pdfFile.getParentFile().mkdirs();
        }
        
        rd.setFileSize(FileUtil.formartFileSize(file.getSize()));
        WebSocketServer.send(rd, userID);
        double size = file.getBytes().length;
        
        new FileUploadUtils().source(file.getInputStream()).to(dest)
            .execute(currentSize -> {
                rd.setProgress(FileUtil.progressCalculate(currentSize, size));
                WebSocketServer.send(rd, userID);
            });
        
        rd.setFinshed("1");
        rd.setProgress(100.0d);
        WebSocketServer.send(rd, userID);
        
        //FIX ME 仅测试进度效果使用，使用时删除
        Thread.sleep(200);
        
        rd.setFinshed("2");
        rd.setProgress(0d);
        WebSocketServer.send(rd, userID);
        
        try {
            documentConverter.convert(dest).to(pdfFile).execute();
//            //FIX ME重写源码添加监听
//            documentConverter.convert(dest).to(pdfFile).execute(new ProgressListener() {
//                @Override
//                public void getProgress(double totalSize, double currentSize) {
//                    rd.setProgress(FileUtil.progressCalculate(currentSize, totalSize));
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
