package com.ertaki.conversion.service.pdf;

import org.springframework.web.multipart.MultipartFile;

public interface IPdfService {
    public void uploadFileAndSend(MultipartFile file, String fileID, String userID) throws Exception;
}
