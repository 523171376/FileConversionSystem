/**
 * temple JS异步刷新模板化加载
 * 
 * @author WC 2019/07/17
 * @version V1.0.1
 * 
 * @description 
 * #模板赋值语法
 * ${project.name} --赋值
 * ${#list:students}<span>循${name}环</span>${#list/} --循环赋值
 * ${#if: sex eq '1'}<span>男</span>${#if/} --判断
 * 				
 * #调用 'content'--模板    data-- 参数
 * Temple.load('content');
 * Temple.load('content', data);
 * 
 */
var Temple = function(){
	var _temple = this;
	this.templeURL = '';
	this.config = {};
	this.cacheData = {};

	this.readProperties = function(arg){
		var obj = {};
		arg.match(/^[^#\s].*$/gm).forEach(function(_entity){
			var temp = _entity.split('=');
			obj[temp[0].trim()] = temp[1].trim();
		});
		return obj;
	}
	this.loadProperties = function(){
		$.ajax({
		    type: "GET",
		    url: "/conversion/config/defaul.properties",
		    async: false,
		    dataType: "text",
		    success: function(arg){
		    	_temple.config = _temple.readProperties(arg);
		    }
		});
	}();
	this.initInner = function(){
		_temple.templeURL = this.config.temple_url;
	}();
	
	this.putDatas = function(str) {
		return _temple.cellPut(_temple.listPut(str), _temple.cacheData);
	}
	
	this.listPut = function(str){
		var targetStr = '';
		targetStr = _temple.replaceAll(str, /\$\{#list\:.*(.(?!\$\{#list\/\}).)*#list\/\}/g);
		return _temple.replaceAll(targetStr, /\$\{#list\:([\W\w](?!\$\{#list\/\})[\W\w])*#list\/\}/g);
	}
	
	this.replaceAll = function(str, reg){
		return str.replace(reg,function(meacher){
			var _key = meacher.substring(meacher.indexOf('#list:')+6,meacher.indexOf('}')).trim();
			var temp = meacher.substring(meacher.indexOf('}')+1,meacher.indexOf('${#list/'));
			var tempData = {};
			if (_key.indexOf('.')>-1) {
				var li = _key.split('.');
				tempData =  _temple.cacheData[li[0]];
				for (var i = 0; i < li.length; i++) {
					if (i === 0) {
						continue;
					}
					tempData = tempData[li[i]]
				}
			} else {
				tempData = _temple.cacheData[_key];
			}
			var tarStr = '';
			for (var i=0 ; i< tempData.length ; i++) {
				tarStr += _temple.cellPut(temp, tempData[i]);
			}
			
			return tarStr;
		});
	}
	
	this.cellPut = function(str, obj){
		return str.replace(/\$\{[^}]*}/g,function(meacher){
			if (typeof obj === 'number' || typeof obj === 'string') {
				return obj;
			}
			meacher = meacher.substring(2,meacher.length-1).trim();
			if (meacher.indexOf('.')>-1) {
				var li = meacher.split('.');
				var temp = obj[li[0]];
				for (var i = 0; i < li.length; i++) {
					if (i === 0) {
						continue;
					}
					temp = temp[li[i]]
				}
				return temp==undefined?'':temp;
			}else{
				return obj[meacher]==undefined?'':obj[meacher];
			}
		});		
	}
	
	return {
		"load" : function(zurl, data) {
			var res = "";
			$.ajax({
			    type: "GET",
			    url: _temple.templeURL + zurl + ".ht",
			    async: false,
			    dataType: "text",
			    success: function(arg){
			    	res = arg;
			    	if(data){
			    		_temple.cacheData = data;
			    		res = _temple.putDatas(arg);
			    	}
			    }
			});
			return res;
		},
		"init" : function(option){
			_temple.templeURL = option.templeURL;
		}
	}
}();
