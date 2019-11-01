$(function(){
	/*** 默认进入页面radio选中对应的美化效果显示 ***/
	$(".zh_wrap ul input[type='radio']").each(function(){
		if($(this)[0].checked == true){
			$(this).parent("em").addClass("radiued");
		};
	});
	/*** radio点击美化效果选中 ***/
	$(".zh_wrap ul input[type='radio']").on("change",function(){
		if($(this)[0].checked == true){
			$(this).parent("em").addClass("radiued").parent("p").siblings("p").find("em").removeClass("radiued");
		};
	});
	
	
	/*** 表格最大高度设置，控制滚动条出现 ***/
	(function(){
		var $Height = $(window).height()-152-93;
		window.onresize = arguments.callee;
		$(".wj_table").css("maxHeight",$Height);
	})();
});
