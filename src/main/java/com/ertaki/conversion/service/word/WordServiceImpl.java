package com.ertaki.conversion.service.word;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.Charset;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ertaki.conversion.constants.AppConfig;
import com.ertaki.conversion.socket.WebSocketServer;
import com.ertaki.conversion.utils.FileUtil;
import com.ertaki.conversion.utils.ResponseData;

@Service
public class WordServiceImpl implements IWordService{
    @Value("${path.upload_word_pfile_path}")
    private String UPLOAD_WORD_PFILE_PATH; 
    @Value("${path.upload_word_wfile_path}")
    private String UPLOAD_WORD_WFILE_PATH; 
    
    @Override
    public void uploadFileAndSend(MultipartFile file, String fileID, String userID) throws Exception {
        ResponseData rd = new ResponseData();
        rd.setFileID(fileID);
        
        String fileName = file.getOriginalFilename();
        File dest = new File(UPLOAD_WORD_PFILE_PATH + fileName);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        File wordFile = new File(UPLOAD_WORD_WFILE_PATH + fileName + AppConfig.FILE_SUFFIX_WORD);
        if (!wordFile.getParentFile().exists()) {
            wordFile.getParentFile().mkdirs();
        }
        
        rd.setFileSize(FileUtil.formartFileSize(file.getSize()));
        WebSocketServer.send(rd, userID);
        double size = file.getBytes().length;
        
        FileUtil.getDefault().uploadFile(file.getInputStream(), dest, currentSize -> {
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
        
        PDDocument doc = null;
        OutputStream fos = null;
        Writer writer = null;
        PDFTextStripper stripper = null;
        try {
            doc = PDDocument.load(dest);
            fos = new FileOutputStream(wordFile);
            writer = new OutputStreamWriter(fos, Charset.defaultCharset());
            stripper = new PDFTextStripper();
            int pageNum = doc.getNumberOfPages();
            stripper.setSortByPosition(true);
            stripper.setStartPage(1);
            stripper.setEndPage(pageNum);
//            stripper.writeText(doc, writer);
            //重写源码添加监听
            stripper.writeText(doc, writer, currentPage -> {
                rd.setProgress(FileUtil.progressCalculate(currentPage, pageNum));
                WebSocketServer.send(rd, userID);
            });
            
            rd.setFinshed("3");
            rd.setProgress(100.0d);
            WebSocketServer.send(rd, userID);
        } catch (Exception e) {
            rd.setFinshed("9");
            WebSocketServer.send(rd, userID);
            e.printStackTrace();
        }finally {
            if(writer != null) {
                writer.close();
            }
            if(fos != null) {
                fos.close();
            }
            if(doc != null) {
                doc.close();
            }
        }
    }
    
}
