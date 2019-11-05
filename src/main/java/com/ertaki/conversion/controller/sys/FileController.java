package com.ertaki.conversion.controller.sys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ertaki.conversion.constants.AppConfig;
import com.ertaki.conversion.utils.FileUtil;

@Controller
@RequestMapping("/file")
public class FileController {
    @Value("${path.upload_pdf_pdffile_path}")
    private String UPLOAD_PDF_PDFFILE_PATH; 
    @Value("${path.upload_word_wfile_path}")
    private String UPLOAD_WORD_WFILE_PATH; 
    
    @RequestMapping("/download/{fileType}/{fileID}")
    public ResponseEntity<InputStreamResource> download(@PathVariable("fileType") String fileType, @PathVariable("fileID") String fileID) {
        String fileName = "";
        if(AppConfig.FILE_TYPE_PDF.equals(fileType)) {
            fileName = UPLOAD_PDF_PDFFILE_PATH + fileID + AppConfig.FILE_SUFFIX_PDF;
        }else if(AppConfig.FILE_TYPE_WORD.equals(fileType)) {
            fileName = UPLOAD_WORD_WFILE_PATH + fileID + AppConfig.FILE_SUFFIX_WORD;
        }
        
        return FileUtil.getDefault().downloadFile(fileName);
    }
    
}
