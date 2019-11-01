package com.ertaki.conversion.controller.sys;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ertaki.conversion.entity.UserVO;

@Controller
@RequestMapping("/user")
public class UserController {
    
    @RequestMapping("/login")
    public String login(Model m, HttpServletRequest request) {
        UserVO userVO = new UserVO();
        userVO.setUserID("0010010001");
        userVO.setUserName("测试用户");
        HttpSession session = request.getSession();
        session.setAttribute("user", userVO);
        m.addAttribute("user", userVO);
        return "index";
    }
    
    
}
