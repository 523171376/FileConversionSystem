package com.ertaki.conversion.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ertaki.conversion.entity.UserVO;
import com.ertaki.conversion.service.pdf.IPdfService;

@Controller
@RequestMapping("/pdf")
public class TransPdfController {
    @Autowired
    private IPdfService pdfService;
    
    @RequestMapping("/uploadFile/{fileID}")
    @ResponseBody
    public void uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("fileID") String fileID, HttpServletRequest request) {
        if (file.isEmpty()) {
            return ;
        }
        UserVO user = getUser(request);
        try {
            pdfService.uploadFileAndSend(file, fileID, user.getUserID());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @RequestMapping("/uploadFiles")
    @ResponseBody
    public void uploadFiles(@PathVariable("sid") String sid) {
    }
    
    private UserVO getUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        UserVO user = (UserVO) session.getAttribute("user");
        return user;
    }
    
}
