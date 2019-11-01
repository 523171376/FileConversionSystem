package com.ertaki.conversion.controller.sys;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/fragment")
public class FragmentController {
    
    @RequestMapping("/renderPdf")
    public String pdf(Model m) {
        return "fragment/pdf";
    }
    
    @RequestMapping("/renderWord")
    public String word(Model m) {
        return "fragment/word";
    }
    
}
