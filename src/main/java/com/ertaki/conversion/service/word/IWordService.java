package com.ertaki.conversion.service.word;

import org.springframework.web.multipart.MultipartFile;

public interface IWordService {
    public void uploadFileAndSend(MultipartFile file, String fileID, String userID) throws Exception;
}
