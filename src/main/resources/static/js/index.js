$(function(){
	
	/*** 设置右侧区域高度 ***/
	(function(){
		var $Height = $(window).height()-105;
		window.onresize = arguments.callee;
		$("#mainIframe").height($Height);
	})();
	
	/*** 菜单点击切换 ***/
	$(".left_wrap ul li").on("click",function(){
		$(this).addClass("add").siblings("li").removeClass("add");
	});
});

