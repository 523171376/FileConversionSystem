var WC = function(){
	var executor = {};
	var wcOption = {};
	return {
		checkCode:{
			randomCheckCode: function (){
				var titles = wcOption.titles;
				var icos = wcOption.icos;
			    var index = Math.floor(Math.random()*icos.length);
			    for (var i = 0,li = []; i < 5; ) {
			    	var j = Math.floor(Math.random()*icos.length);
			    	if(li.indexOf(icos[j]) != -1 || icos[index] == icos[j]){
			    		continue;
			    	}
			    	li[i++] = icos[j];
			    }
			    var obj = {
			    	"title":titles[index],
			    	"ico":icos[index],
			    	"list":li,
			    }
			    return obj;
			},
			initRandom: function (){
				var tar = executor.randomCheckCode();
				var index = Math.floor(Math.random()*tar.list.length);
				tar.list[index] = tar.ico;
				var lis = '';
				for (var i = 0; i < tar.list.length; i++) {
					lis += '<li class="m-demo-icon__preview"><i class="'+tar.list[i]+'"></i></li>';
				}
				$('#'+wcOption.ids[0]).html(tar.title);
				$('#'+wcOption.ids[1]).html(lis);
				
			},
			refresh: function (){
				executor.initRandom();
			},
			init: function(arg){
				$.extend(wcOption, arg);
				executor = this;
				executor.initRandom();
			}
		}
	}
}();
