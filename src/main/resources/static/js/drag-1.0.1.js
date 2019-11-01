/**
 * 
 * @author WC 2019/07/17
 * @version V1.0.1
 * 
 * @description 拖拽文件上传 JS 简单封装（基于jquery）
 * 
 */
$.fn.extend({
    initDrag: function(opt){
    	this[0].ondragenter = function(e){
			e.preventDefault();
		}
 
    	this[0].ondragover = function(e){
			e.preventDefault();
		}
 
    	this[0].ondragleave = function(e){
			e.preventDefault();
		}
 
    	this[0].ondrop = function(e){
			e.preventDefault();
			opt.overed.call(this, e.dataTransfer.files);
		}
    }
});
