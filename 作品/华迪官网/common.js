!function($){
	$("li.sub_menu").each(function(){
	    var obj = this;
	    var left =  parseInt($(obj).find("a").css("padding-left").split("px")[0]);
	    console.log(left);
	    $(obj).find("ul").css({
	      width:$(obj).find("a").width()+2*left+"px"
	    });
	  });
	 $("li.sub_menu").mouseover(function(){
		    $(this).addClass('sub_active');
		  });
		  $("li.sub_menu").mouseout(function(){
		    $(this).removeClass('sub_active');
		  });
 $(".menu > ul > li").each(function(index){
	if($(this).hasClass("sub_menu")){
		$(".menu > ul > li").eq(index-1).addClass("sub_before");
	}
 });
 $(".menu > ul > li").eq( $(".menu > ul > li").length-1).addClass("sub_last");
  //置顶
  $(window).scroll(function() {
    if($(window).scrollTop() > 0){
      $(".top_header").addClass('scroll_header');
    } else {
      $(".top_header").removeClass('scroll_header');
    }
    var box = windowScreen();
    if(box.w > 1150){
      tLeft = (box.w - 1150) / 2 - 39;
      $('.getTop').css('right',tLeft);
    }else{
      $('.getTop').css('right',0);
    }
    if ($(window).scrollTop() >= 200) {
      $('.getTop').fadeIn(300);
      $('.s_top').fadeIn(300,function(){
    	  $(this).css({display:"block"});
      });
    } else {
      $('.getTop').fadeOut(300);
      $('.s_top').fadeOut(300);
    };
    $('.top_header').css('position','fixed').scrollTop($(this).scrollTop());
  });
  $('.getTop').click(function() {
    $('html,body').animate({
      scrollTop: '0px'
    },
    800);
  });
  $('.s_top').click(function() {
    $('html,body').animate({
      scrollTop: '0px'
    },
    800);
  });
}(jQuery);
function openPre(t,id){//预定产品：Allone智能遥控器
	  var box = windowScreen();
	  if(checkBrowser() == "mobile"){
	    var ml = ml = (box.w - 320) / 2;
	  }else{
	    var  ml = (box.w - 450) / 2;
	  }
	  var bgTop = document.documentElement.scrollTop || document.body.scrollTop || 0,
	      preTop = bgTop + 60,
	      sw = document.documentElement.offsetWidth || document.body.offsetWidth || 0,
	      sbw = sw - box.w;
	  $('.pre_window').show().css({
	    top:''+preTop+'px',
	    left:''+ml+'px'
	  });
	  $('.media_bg').show().css({
	    top:''+bgTop+'px',
	    width:''+sw+'px',
	    height:''+box.h+'px'
	  })
	  $('.prew_top').find('div').text("预定产品：" + t);
	  $('.prew_top').find('input').val(id);
	  $('body').addClass('modal-open').css("padding-right",''+sbw+'px');
	  

	}

	function closePreWindow(){
	  $('.pre_window').hide();
	  $('.media_bg').hide();
	  $('.oc_window').hide();
	  $('body').removeClass('modal-open').attr('style','');
	}
 // 浏览器判断
function checkBrowser(){
  var u = window.navigator.userAgent.toLocaleLowerCase(),
      msie = /(msie) ([\d.]+)/,
      chrome = /(chrome)\/([\d.]+)/,
      firefox = /(firefox)\/([\d.]+)/,
      safari = /(safari)\/([\d.]+)/,
      opera = /(opera)\/([\d.]+)/,
      ie11 = /(trident)\/([\d.]+)/,
      b = u.match(msie)||u.match(chrome)||u.match(firefox)||u.match(safari)||u.match(opera)||u.match(ie11),
      m = u.indexOf('mobile');
  if(m > 0){
    return "mobile";
  }else{
    return {name: b[1], version: parseInt(b[2])};
  };
};

function windowScreen(){
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0,
      w = document.documentElement.clientWidth || document.body.clientWidth || 0,
      box = {};
      box.h = h;
      box.w = w;
  return box;
}

 // 轮换图组件
!function($){
  $.fn.slider=function(settings,t){
    if(!this.length){
      return false;
    };
    settings=$.extend({},$.slider.defaults,settings);
    var obj=this;
    var scroller={};
    scroller.fn={};
    scroller.li = obj.find('li');
    var box = windowScreen();

    scroller.sliderName = $('.'+settings.sliderName+'');
    scroller.onNum = 0;
    scroller.auto = settings.auto;
    scroller.itemSum = scroller.li.length;
    for(var u = 0 ; u < scroller.itemSum; u++ ){
      scroller.li.eq(u).css('width','100%');
      //scroller.li.eq(u).find('div').css('width',''+box.w+'px');
    }
    scroller.bLeftBtn = obj.parent('div').find('a.bLeft');
    scroller.bRightBtn = obj.parent('div').find('a.bRight');
    scroller.bLeftBtnPer = settings.bLeft;
    scroller.bRightBtnPer = settings.bRight;
    scroller.moveSlider = settings.moveSlider;
    scroller.times = settings.time;
    scroller.opacity = settings.opacity;
    scroller.colorCout = 0;
    
    // 方法：开始
    scroller.fn.on=function(){

      scroller.fn.off();
      scroller.fn.removeControl();
      scroller.fn.addControl();

      if(!scroller.auto){return;};
      scroller.run=setTimeout(function(){
        scroller.fn.goto(settings.direction);
      },scroller.times);
    };
    // 方法：停止
    scroller.fn.off=function(){
      if(typeof(scroller.run)!=="undefined"){clearTimeout(scroller.run);};
    };
    // 方法：增加控制
    scroller.fn.addControl=function(){
      if(scroller.bLeftBtnPer&&scroller.bLeftBtn.length){
        scroller.bLeftBtn.bind("click",function(){
          scroller.fn.goto("bLeft");
        });
      };
      if(scroller.bRightBtnPer&&scroller.bRightBtn.length){
        scroller.bRightBtn.bind("click",function(){
          scroller.fn.goto("bRight");
        });
      };
    };
    // 方法：解除控制
    scroller.fn.removeControl=function(){
      if(scroller.bLeftBtn.length){scroller.bLeftBtn.unbind("click");};
      if(scroller.bRightBtn.length){scroller.bRightBtn.unbind("click");};
    };

    //有轮播标记
    if(settings.markSlider && !scroller.moveSlider) {

      scroller.markLi  =obj.siblings('.'+settings.markClass+'').find('li');
      // 方法：点击轮播标记切换
      scroller.markLi.on(settings.control,function(){
        scroller.fn.off();
        scroller.markNum = scroller.markLi.index($(this));
        scroller.rotateEffectNum = $('.bvclb_title > p > em').index($('.rotateEffect'));
        if(scroller.markNum == scroller.rotateEffectNum){
          return false;
        }
        scroller.li.addClass(''+settings.play+'').stop(1,1).css({
          opacity:"1",
          filter:"alpha(opacity=100)",
          display:"none"
        });
        scroller.li.eq(scroller.markNum-1).stop(1,1).css("opacity",'0.5').addClass(''+settings.play+'').css("display",'block').animate({opacity:"0"},settings.speed,function(){
          $(this).css('display','none');
        }); 
        scroller.li.eq(scroller.markNum).stop(1,1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
        if(settings.phonebg && settings.ln){//手机轮换
          scroller.phonebg = $('.bvc_right').find('li');
          scroller.phonebg.addClass(''+settings.play+'').stop(1,1).css({
            opacity:"1",
            filter:"alpha(opacity=100)",
            display:"none"
          });
        
          scroller.phonebg.eq(scroller.markNum).stop(1,1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
        }else if(settings.phonebg && !settings.ln){
          scroller.phonebg = $('.phone_bg');
          scroller.phonebg.addClass(''+settings.play+'').stop(1,1).css({
            opacity:"1",
            filter:"alpha(opacity=100)",
            display:"none"
          },settings.speed);
          scroller.phonebg.eq(scroller.markNum).stop(1,1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
        }
        if(settings.specialText){//文字轮换
          scroller.specialText = $('.bvclb_title > p > em');
          scroller.specialText.addClass(''+settings.play+'').removeClass('rotateEffect').stop(1,1).css({
            opacity:"1",
            filter:"alpha(opacity=100)"
          });
          scroller.specialText.eq(scroller.rotateEffectNum).addClass('upEffect').siblings().removeClass('upEffect');
          scroller.specialText.eq(scroller.markNum).stop(1,1).css('opacity','0.1').removeClass(''+settings.play+'').addClass('rotateEffect').css("display",'inline-block').animate({
            opacity:"1"
          },settings.speed);

        }
        scroller.markLi.removeClass(''+settings.markLiClass+'');
        $(this).addClass(''+settings.markLiClass+'');
        scroller.fn.on();
      });    
    }else if(settings.markSlider && scroller.moveSlider){
      scroller.markLi  =obj.siblings('.'+settings.markClass+'').find('li');
      scroller.markLi.on(settings.markEvent,function() {
        scroller.markNum = scroller.markLi.index($(this));
        scroller.li.removeClass(''+settings.play+'');
        scroller.li.eq(scroller.markNum+1).addClass(''+settings.play+'');
        scroller.markLi.removeClass(''+settings.markLiClass+'');
        obj.animate({
            left:'-'+(scroller.markNum+1)*scroller.li.width()+'px'
        });
        $(this).addClass(''+settings.markLiClass+'');  
      });   
      
    
    };
    if(settings.hoverStop){
      scroller.li.hover(function(){
        scroller.fn.off();
      },function(){
        scroller.fn.on();
        scroller.colorCout == 1;
      });
    }
    // 方法：滚动
    scroller.fn.goto=function(d){
      scroller.fn.off();
      if(settings.bLeft && settings.bRight){
        scroller.fn.removeControl();
      };
      
      obj.stop(true);
      if(!scroller.moveSlider){
        scroller.onCurNum = scroller.li.index(obj.find('li:not(.'+settings.play+')'))  ;//play 位置
      }else{
        scroller.onCurNum = scroller.li.index(obj.find('li[class="'+settings.play+'"]'))  ;//play 位置   
      };
     
      if(scroller.opacity && !scroller.moveSlider){
        scroller.li.eq(scroller.onCurNum).addClass(''+settings.play+'').stop(1, 1).animate({
          opacity:"0",
          filter:"alpha(opacity=0)"
        },settings.speed,function(){
          $(this).css({display:"none",opacity:"1"});
        });
     
      };
      if(settings.phonebg && settings.ln){
          scroller.phonebg = $('.bvc_right').find('li');
          scroller.phonebg.addClass(''+settings.play+'').stop(1, 1).animate({
            opacity:"0",
            filter:"alpha(opacity=0)"
          },0,function(){
              $(this).css({display:"none",opacity:"1"});
          });
         
      }else if(settings.phonebg && !settings.ln){
        scroller.phonebg = $('.phone_bg');
          scroller.phonebg.addClass(''+settings.play+'').stop(1, 1).animate({
            opacity:"0",
            filter:"alpha(opacity=0)"
          },0,function(){
              $(this).css({display:"none",opacity:"1"});
          });

      }
      switch(d){

        case "bRight":
        //滑动
        if(scroller.moveSlider && (scroller.onCurNum+1) == scroller.itemSum){//5
          scroller.totalWidth = scroller.itemSum * scroller.li.width();
          obj.css('left','-'+scroller.li.width()+'px');
          obj.animate({left:'-'+2*scroller.li.width()+'px'});
          scroller.li.removeClass(''+settings.play+'');
          scroller.li.eq(2).addClass(''+settings.play+'');
          if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(1).addClass(''+settings.markLiClass+'');}

        }else if(scroller.moveSlider && scroller.onCurNum == 1){
          obj.animate({left:'-'+2*scroller.li.width()+'px'});
          scroller.li.removeClass(''+settings.play+'');
          scroller.li.eq(2).addClass(''+settings.play+'');
          if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(1).addClass(''+settings.markLiClass+'');}
        }else if(scroller.moveSlider && scroller.onCurNum != scroller.itemSum){//1-4
          obj.animate({
           left:'-'+(scroller.onCurNum+1)*scroller.li.width()+'px'
          });
          scroller.li.removeClass(''+settings.play+'');
          scroller.li.eq(scroller.onCurNum+1).addClass(''+settings.play+'');
          if(settings.markSlider) {
            if((scroller.onCurNum+2) == scroller.itemSum){
              scroller.markLi.removeClass(''+settings.markLiClass+'').eq(0).addClass(''+settings.markLiClass+'');
            }else{
              scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum).addClass(''+settings.markLiClass+'');
            }
          }
        }
        //渐隐
        if(((scroller.onCurNum+1) == scroller.itemSum) && !scroller.moveSlider ){
          $('.'+settings.numClass+'').html("<em>1</em> / "  + scroller.itemSum);
          scroller.li.eq(0).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 
          if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(0).addClass(''+settings.markLiClass+'');}
          if(settings.phonebg && settings.ln){
            scroller.phonebg = $('.bvc_right').find('li');
            scroller.phonebg.eq(0).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed); 
          }else if(settings.phonebg && !settings.ln){
            scroller.phonebg = $('.phone_bg');
            scroller.phonebg.eq(0).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
          }
          if(settings.specialText){//文字轮换
            scroller.specialText = $('.bvclb_title > p > em');
            scroller.specialText.addClass(''+settings.play+'').removeClass('rotateEffect').stop(1,1).css({
              opacity:"1",
              filter:"alpha(opacity=100)"
            });
            scroller.specialText.eq(scroller.onCurNum).addClass('upEffect').siblings().removeClass('upEffect');
            scroller.specialText.eq(0).stop(1,1).css('opacity','0.1').removeClass(''+settings.play+'').addClass('rotateEffect').css("display",'inline-block').animate({
              opacity:"1"
            },settings.speed);

          }
  
        }else if(((scroller.onCurNum+1) != scroller.itemSum) && !scroller.moveSlider ){
          $('.'+settings.numClass+'').html("<em>"+( scroller.onCurNum + 2)+"</em> / "  + scroller.itemSum);
          scroller.li.eq(scroller.onCurNum+1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
     
          if(settings.markSlider){
            scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum+1).addClass(''+settings.markLiClass+'');
          }  
          if(settings.phonebg && settings.ln){
            scroller.phonebg = $('.bvc_right').find('li');
            scroller.phonebg.eq(scroller.onCurNum+1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
          }else if(settings.phonebg && !settings.ln){
            scroller.phonebg = $('.phone_bg');
            scroller.phonebg.eq(scroller.onCurNum+1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);
          }
          if(settings.specialText){//文字轮换
            scroller.specialText = $('.bvclb_title > p > em');
            scroller.specialText.addClass(''+settings.play+'').removeClass('rotateEffect').stop(1,1).css({
              opacity:"1",
              filter:"alpha(opacity=100)"
            });
            scroller.specialText.eq(scroller.onCurNum).addClass('upEffect').siblings().removeClass('upEffect');
            scroller.specialText.eq(scroller.onCurNum + 1).stop(1,1).css('opacity','0.1').removeClass(''+settings.play+'').addClass('rotateEffect').css("display",'inline-block').animate({
              opacity:"1"
            },settings.speed);

          }
        };
        break;
        case "bLeft":
        //滑动
        if(scroller.moveSlider && scroller.onCurNum == 0){//0
            scroller.totalWidth = scroller.itemSum * scroller.li.width();
            obj.css('left','-'+(scroller.itemSum-2)*scroller.li.width()+'px');
            obj.animate({left:'-'+(scroller.itemSum-3)*scroller.li.width()+'px'});
            scroller.li.removeClass(''+settings.play+'');
            scroller.li.eq(scroller.onCurNum-3).addClass(''+settings.play+'');
            if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-2).addClass(''+settings.markLiClass+'');};
            
        }else if(scroller.moveSlider && scroller.onCurNum == 1){
            obj.animate({left:'0px'});
            scroller.li.removeClass(''+settings.play+'');
            scroller.li.eq(0).addClass(''+settings.play+'');
            if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum+2).addClass(''+settings.markLiClass+'');};
            
        }else if(scroller.moveSlider && scroller.onCurNum != scroller.itemSum){//1-4
            obj.animate({
             left:'-'+(scroller.onCurNum-1)*scroller.li.width()+'px'
            });
            scroller.li.removeClass(''+settings.play+'');
            scroller.li.eq(scroller.onCurNum-1).addClass(''+settings.play+'');
            if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-2).addClass(''+settings.markLiClass+'');}
            
        };
        //渐隐
        if(scroller.onCurNum == 0  && !scroller.moveSlider ){
            scroller.li.eq(scroller.itemSum-1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed,function(){
                $(this).css('display','block');
            });

            $('.'+settings.numClass+'').html("<em>"+scroller.itemSum+"</em> / "  + scroller.itemSum);

            if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.itemSum-1).addClass(''+settings.markLiClass+'');};

            

        }else if(scroller.onCurNum != 0  && !scroller.moveSlider ){
            scroller.li.eq(scroller.onCurNum-1).stop(1, 1).css('opacity','0.5').removeClass(''+settings.play+'').css("display",'block').animate({opacity:"1"},settings.speed);

            $('.'+settings.numClass+'').html("<em>"+( scroller.onCurNum )+"</em> / "  + scroller.itemSum);

            //sisi
            if(settings.markSlider){scroller.markLi.removeClass(''+settings.markLiClass+'').eq(scroller.onCurNum-1).addClass(''+settings.markLiClass+'');};
            //sisi
            
        }
        break;

      }
      obj.queue(function(){
        if(settings.bLeft && settings.bRight ){
          scroller.fn.removeControl();
          scroller.fn.addControl();
        };
        if(scroller.auto){
          scroller.run=setTimeout(function(){
            scroller.fn.goto(settings.direction);
          },scroller.times);
        };
       
        
        $(this).dequeue();
      });
    };
        
    scroller.fn.on();
  };

  // 默认值
  $.slider={defaults:{
      speed:800,      // 滚动速度
      time:4000,      // 自动滚动间隔时间
      play:"on",         //选中样式
      num:true,        //是否出现总数
      numClass:"slider_num" ,    // 总数显示区域
      auto:true,
      bLeft:true,                 //左控
      bRight:true ,            //右控
      direction:"bRight",  // 顺序
      addControl:false,
      control:"mouseenter",
      moveSlider:false,
      opacity:true, 
      hoverStop:true,
      markSlider:true,           //是否有轮播标记
      markClass:"slider_mark",       //轮播结构
      markLiClass:"mark_dot_on",        //轮播当前态class
      markEvent:"click"//点击跳转
  }};
}(jQuery);

//播放
function openVideo(address){
  var box = windowScreen(),
      str = '',
      vw = box.w * 0.8,
      ml = box.w * 0.1,
      vh = box.h - 120,
      n = checkBrowser(),
      bgTop = document.documentElement.scrollTop || document.body.scrollTop || 0,
      videoTop = bgTop + 60,
      closeTop = bgTop + 10,
      sw = sw = document.documentElement.offsetWidth || document.body.offsetWidth || 0,
      sbw = sw - box.w;
  str += '<div class="media_bg" onclick="javascript:closeVideo()" style="width:'+box.w+'px; height:'+box.h+'px; top:'+bgTop+'px"></div>';
  str += '<a href="javascript:closeVideo()" class="video_close" style="top:'+closeTop+'px" ></a>';
  str += '<div class="media_play" style="width:'+vw+'px; height:'+vh+'px; left:'+ml+'px; top:'+videoTop+'px">';
  str += '<video width="'+vw+'" height="'+vh+'" controls autoplay>';
  str += '<source src="'+address+'" type="video/mp4; codecs="avc1.42E01E, mp4a.40.2""></source>';
  str += '</video></div>';
  $('body').append(str);
  $('body').addClass('modal-open').css("padding-right",''+sbw+'px');
  if(n.name = 'msie' && n.version <9){
    $.getScript("js/html5media.min.js");
  }
}
function popAd(imgSrc){
  var box = windowScreen(),
      str = '',
      vw = box.w * 0.8,
      ml = box.w * 0.1,
      vh = box.h - 120,
      n = checkBrowser(),
      bgTop = document.documentElement.scrollTop || document.body.scrollTop || 0,
      videoTop = bgTop + 120,
      closeTop = bgTop + 10,
      sw = sw = document.documentElement.offsetWidth || document.body.offsetWidth || 0,
      sbw = sw - box.w;
  str += '<div class="media_bg" onclick="javascript:closeVideo()" style="width:'+box.w+'px; height:'+box.h+'px; top:'+bgTop+'px"></div>';
  str += '<div class="advertisement" style="width:'+vw+'px; left:'+ml+'px ; top:'+videoTop+'px">';
  str += '<a href="http://blog.orvibo.com/enblog/?p=203" target="_blank">';
  str += '<img src="'+imgSrc+'">';
  str += '</a></div>';
  $('body').append(str);
  $('body').addClass('modal-open').css("padding-right",''+sbw+'px');

}
function popHad(imgSrc,url){
  var str = '';
  str += '<div class="h_ad">';
  str += '<a href="'+url+'"></a>';
  str += '<span>3秒后自动消失</span>';
  str += '<em></em>';
  str += '</div>';
  $('body').append(str);
}
var popTime = 3;
function reciprocal(){
  popTime --;
  if (popTime > 0){
    $('.h_ad > span').text(''+popTime+'秒后自动消失');
  }else if(popTime < 1){
    $('.h_ad').remove();
  }
}
setInterval(function(){
  //reciprocal();
},1000)

function closeVideo(){
  $('.media_bg').remove();
  $('.video_close').remove();
  $('.media_play').remove();
  $('.advertisement').remove();
  $('body').removeClass('modal-open').attr('style','');
}

//box
// JavaScript Document
(function($){
$.fn.skyBox = function(options, callback){  
  var defaults = {  
    title: "skybox",  
    content:"信息内容",
    cancel: "Cancel",
    okay: "Okay",
    okaybutton: true,
    cancelbutton: true,
    opacity: 0,
    fadeout: true,
    overlayclose: true,
    modalwidth: "",
    autoClose:false,
    autoCloseTime:1000
  };
  var options = $.extend(defaults, options),
      domWidth=document.documentElement.clientWidth || document.body.clientWidth || 0 ,
      domHeight=document.documentElement.clientHeight || document.body.clientHeight || 0,
      scrollHeight=document.documentElement.scrollTop || document.body.scrollTop || 0,  
      str="",
  boxWidth="";
  options.modalwidth=="" ? boxWidth=="310px" :  boxWidth=options.modalwidth ; 
  var left=(domWidth-boxWidth)/2;
  str+='<div id="box" style="width:'+boxWidth+'px; left:'+left+'px">';
  str+='<div class="title"><h2>'+options.title+'</h2></div>';
  str+='<div class="content"><div class="text">'+options.content+'</div>';
  if((options.okaybutton!=false && options.cancelbutton==false) || (options.okaybutton==false && options.cancelbutton!=false)){
    str+='<div class="input">';
    options.okaybutton==true ? str += '<input type="button" value="'+options.okay+'" class="confrimBox">' : str+='<input type="button" value="'+options.cancel+'" class="closeBox">';
    str+='</div>';
  }else if(options.okaybutton==true && options.cancelbutton==true){
    str+='<div class="input">';
    str+='<input type="button" value="'+options.okay+'" class="confrimBox">' ;
    str+='<input type="button" value="'+options.cancel+'" class="closeBox">';
    str+="</div>";
  };
  str+='</div>';
  str+='</div>';
  options.fadeout==true ? str+='<div class="fadeLayerBox" style="opacity:"'+options.opacity+'";filter: alpha(opacity="'+options.opacity*10+'")"></div>' : str+='<div class="fadeLayerBox closeBoxTwo"></div>';
 
  $('body').append(str); 
  var top=(domHeight-$('#box').height())/2+scrollHeight;
  $('#box').css('top',""+top+"px");
  $('.closeBox').click(function(){
    $('#box').remove();
    $('.fadeLayerBox').remove();
    return 2;
  });
  if(options.overlayclose==true){
    $('.fadeLayerBox').click(function(){
    $('#box').remove();
    $('.fadeLayerBox').remove();
    return 2;
   });
  };
  if(options.autoClose){
    setTimeout(function(){
      $('#box').remove();
      $('.fadeLayerBox').remove();
      return 2;
    },options.autoCloseTime);
  }
}
})(jQuery);


//lazyload frame
(function($,window){var $window=$(window);$.fn.lazyload=function(options){var elements=this;var $container;var settings={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:true,appear:null,load:null};function update(){var counter=0;elements.each(function(){var $this=$(this);if(settings.skip_invisible&&!$this.is(":visible")){return};if($.abovethetop(this,settings)||$.leftofbegin(this,settings)){}else if(!$.belowthefold(this,settings)&&!$.rightoffold(this,settings)){$this.trigger("appear")}else{if(++counter>settings.failure_limit){return false}}})};if(options){if(undefined!==options.failurelimit){options.failure_limit=options.failurelimit;delete options.failurelimit};if(undefined!==options.effectspeed){options.effect_speed=options.effectspeed;delete options.effectspeed};$.extend(settings,options)};$container=(settings.container===undefined||settings.container===window)?$window:$(settings.container);if(0===settings.event.indexOf("scroll")){$container.bind(settings.event,function(event){return update()})};this.each(function(){var self=this;var $self=$(self);self.loaded=false;$self.one("appear",function(){if(!this.loaded){if(settings.appear){var elements_left=elements.length;settings.appear.call(self,elements_left,settings)};$("<img />").bind("load",function(){$self.hide().attr("src",$self.data(settings.data_attribute))[settings.effect](settings.effect_speed);self.loaded=true;var temp=$.grep(elements,function(element){return!element.loaded});elements=$(temp);if(settings.load){var elements_left=elements.length;settings.load.call(self,elements_left,settings)}}).attr("src",$self.data(settings.data_attribute))}});if(0!==settings.event.indexOf("scroll")){$self.bind(settings.event,function(event){if(!self.loaded){$self.trigger("appear")}})}});$window.bind("resize",function(event){update()});update();return this};$.belowthefold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.height()+$window.scrollTop()}else{fold=$(settings.container).offset().top+$(settings.container).height()};return fold<=$(element).offset().top-settings.threshold};$.rightoffold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.width()+$window.scrollLeft()}else{fold=$(settings.container).offset().left+$(settings.container).width()};return fold<=$(element).offset().left-settings.threshold};$.abovethetop=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollTop()}else{fold=$(settings.container).offset().top};return fold>=$(element).offset().top+settings.threshold+$(element).height()};$.leftofbegin=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollLeft()}else{fold=$(settings.container).offset().left};return fold>=$(element).offset().left+settings.threshold+$(element).width()};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings)};$.extend($.expr[':'],{"below-the-fold":function(a){return $.belowthefold(a,{threshold:0})},"above-the-top":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-screen":function(a){return $.rightoffold(a,{threshold:0})},"left-of-screen":function(a){return!$.rightoffold(a,{threshold:0})},"in-viewport":function(a){return!$.inviewport(a,{threshold:0})},"above-the-fold":function(a){return!$.belowthefold(a,{threshold:0})},"right-of-fold":function(a){return $.rightoffold(a,{threshold:0})},"left-of-fold":function(a){return!$.rightoffold(a,{threshold:0})}})})(jQuery,window);

function openMesWindow(content,isChina,title,cancel,okay,okaybutton,cancelbutton,fadeout,overlayclose,width,autoClose,autoCloseTime){ //弹框
  if(!title){
        if(isChina == 0){
          title = "提示";
        }else{
          title = "tip";
        }
      }
      if(!cancel){
        if(isChina == 0){
          cancel = "关闭";
        }else{
          cancel = "close";
        }
      }
      if(!okay){
        if(isChina == 0){
          okay = "确定";
        }else{
          okay = "confirm";
        }
      }
      if(!okaybutton){
        okaybutton = false;
      }
      if(!cancelbutton){
        cancelbutton = true;
      }
      if(!fadeout){
        fadeout = true;
      }
      if(!overlayclose){
        overlayclose = true;
      }
      if(!width){
        width = "310";
      }
      if(!autoClose){
        autoClose = true;
      }
      if(!autoCloseTime){
        autoCloseTime = "1000";
      }
      $('.skyBox').skyBox({
        title: title,//窗口标题
        content:content,//内容
        cancel: cancel,//按钮VALUE值
        okay: okay,
        okaybutton: okaybutton,
        cancelbutton: cancelbutton,
        opacity: 1,
        fadeout: fadeout, //是否开启阴影
        overlayclose: overlayclose, //是否开启阴影关闭窗口功能
        modalwidth: width, //窗口宽度
        autoClose:autoClose,
        autoCloseTime:autoCloseTime
      });
  }

