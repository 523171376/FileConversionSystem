/**
 * 
 * @author WC 2019/07/17
 * @version V1.0.1
 * 
 * @description websocke JS端调用简单封装
 * 
 */
var Socket = function(){
	var _socket = this;
	
	this.setOpt = function(opt){
		_socket.opt = opt;
	}
	
	this.openClient = function(arg){
		var socket;  
		if(typeof(WebSocket) !== 'undefined') {
	        var zurl = 'ws://' + _socket.opt.rootPath + '/websocket/' + _socket.opt.userID;
	        socket = new WebSocket(zurl);  
	        socket.onopen = function() {  
	        };  
	        
	        socket.onmessage = function(msg) {  
	        	var data = {};
	        	if(msg.data){
	        		data = eval('(' + msg.data + ')');
	        	}
	        	_socket.opt.receiveData.call(this, data);
	        };  
	        
	        socket.onclose = function() {  
	        };  
	        
	        socket.onerror = function() {  
	        }  
		}
	}
	
	return {
		'init' : function(option){
			_socket.setOpt(option);
			_socket.openClient();
		}
	}
}();
