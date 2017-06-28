$(function(){
	//first-nav
	var aNormal = $("#header").find(".normal");
	var aaa=$(".page_nav a");
	

 	//first_nav
	aaa.click(function(){
		//!$(this).removeClass("active")
		aaa.removeClass("active");
		$(this).addClass("active");
	})

	aaa.each(function(){
		if($(this).attr("class")=="active"){
			return;
		}else{
			$(this).hover(function(){
				$(this).css({"color":"#31c27c"})
			},function(){
				$(this).css({"color":"#333"})
			})
		}
	})


	































})