package com.ertaki.conversion.socket;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import com.ertaki.conversion.utils.JsonUtil;
import com.ertaki.conversion.utils.ResponseData;

@ServerEndpoint("/websocket/{sid}")
@Component
public class WebSocketServer {
    static Log log = LogFactory.getLog(WebSocketServer.class);
    
    private static int onlineCount = 0;
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();
    private Session session;
    private String sid="";
    
    @OnOpen
    public void onOpen(Session session,@PathParam("sid") String sid) {
        this.session = session;
        webSocketSet.add(this);     
        addOnlineCount();          
        log.info("有新窗口开始监听:"+sid+",当前在线人数为" + getOnlineCount());
        this.sid=sid;
        
        //sendObject(new ResponseData("连接成功"));
    }
    
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);  
        subOnlineCount();           
        log.info("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("收到来自窗口"+sid+"的信息:"+message);
        
        ResponseData rd = new ResponseData();
        sendObject(rd);
    }
    
    public void sendMessage(String message) {
        try {
            synchronized (session) {
                this.session.getBasicRemote().sendText(message);
            }
        } catch (IOException e) {
            e.printStackTrace();
            log.info("发送数据错误，sid:{"+sid+"},msg：{"+message+"}");
        }
    }
    
    public void sendObject(Object obj) {
        this.sendMessage(JsonUtil.getDefault().obj2JsonStr(obj));
    }
    
    public static void send(Object obj, String sid) {
        WebSocketServer current = null;
        for (WebSocketServer item : webSocketSet) {
            if(item.sid.equals(sid)) {
                current = item;
                break;
            }
        }
        current.sendMessage(JsonUtil.getDefault().obj2JsonStr(obj));
    }
    
    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }
}
