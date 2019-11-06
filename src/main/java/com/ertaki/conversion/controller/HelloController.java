package com.ertaki.conversion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ertaki.conversion.service.IHelloService;
import com.ertaki.conversion.socket.WebSocketServer;
import com.ertaki.conversion.utils.ResponseData;

@Controller
@RequestMapping("/sys")
public class HelloController {
    @Autowired
    private IHelloService helloService; 
    
    @RequestMapping("/hello")
    public ModelAndView hello(ModelAndView mv) {
        String name2 = helloService.sayHelloJpa();
        mv.addObject("name2", name2);
        mv.addObject("text", "hello world");
        mv.setViewName("hello/hello");
        return mv;
    }

    @RequestMapping("/helloSocket")
    public String helloSocket() {
        return "hello/hello_socket";
    }
    
    @RequestMapping("/demodata")
    @ResponseBody
    public Object demodata() {
        return "";
    }
    
    @RequestMapping("/uploadTest/{sid}")
    @ResponseBody
    public void uploadTest(@PathVariable("sid") String sid) {
        ResponseData rd = new ResponseData();
        for(double i = 0 ; i < 100 ;) {
            i += 0.1;
            i = (double) Math.round(i * 100) / 100;
            rd.setProgress(i);
            WebSocketServer.send(rd, sid);
            try {
                Thread.sleep(10L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        rd.setFinshed("1");
        rd.setProgress(100.0d);
        WebSocketServer.send(rd, sid);
    }
    
    @RequestMapping("/login")
    public String login(Model m) {
        return "login";
    }
    
    
}
