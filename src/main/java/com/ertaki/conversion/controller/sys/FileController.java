package com.ertaki.conversion.controller.sys;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ertaki.conversion.constants.AppConfig;

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
        
        FileSystemResource file = new FileSystemResource(fileName);
        HttpHeaders headers = new HttpHeaders();  
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");  
        try {
            headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", new String(file.getFilename().getBytes("utf-8"), "ISO-8859-1")));
        } catch (UnsupportedEncodingException e1) {
            return new ResponseEntity<InputStreamResource>(null, headers, HttpStatus.BAD_REQUEST);
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
    
}
