$(function(){
			//搜索切换
			(function(){
				var aLi=$(".search_tab li");
				var oText=$(".search_main_text");
				var iNow=0;
				var arrText=[
				"例如：荷棠鱼坊烤鱼或樱花日本料理",
				"例如：昌平区新站龙骑广场2号楼888室内",
				"例如：万达影院双人情侣卷",
				"例如：美国要打朝鲜了",
				"例如：电影最top推荐好看电影",
				];

				oText.val(arrText[iNow]);

				aLi.each(function(index){
					$(this).click(function(){
						aLi.attr("class","");
						$(this).attr("class","active");
						iNow=index;
						oText.val(arrText[iNow]);
					});
				})

				oText.focus(function(){
					if($(this).val()==arrText[iNow]){
						$(this).val("");
					}
				});
				oText.blur(function(){
					if($(this).val()==""){
						$(this).val(arrText[iNow]);
					}
				})
			})();
			//上下滚动
			(function(){
				var oUpdate=$('.update');
				var oUl=oUpdate.find('ul');
				var iH=0;
				var arrData=[
					{'name':'萱萱','time':'1','title':'第一个','url':'https://www.baidu.com/'},
					{'name':'琳琳','time':'8','title':'那些灿烂华美的瞬间','url':'http://www.sina.com.cn/'},
					{'name':'木木','time':'2','title':'那些灿烂华美的瞬间','url':'http://www.qq.com/'},
					{'name':'哥哥','time':'6','title':'那些灿烂华美的瞬间','url':'https://www.sohu.com/'},
					{'name':'笑笑','time':'7','title':'那些灿烂华美的瞬间','url':'https://www.taobao.com/'},
					{'name':'西苑','time':'8','title':'那些灿烂华美的瞬间','url':'https://www.baidu.com/'},
					{'name':'杨辉','time':'4','title':'那些灿烂华美的瞬间','url':'https://www.baidu.com/'},
					{'name':'小月','time':'3','title':'第88888个','url':'https://www.baidu.com/'},
				]
				var str="";
				var oBtnUp=$('#updateUp');
				var oBtnDown=$('#updateDown');
				var iNow=0;
				var timer=null;

				for(var i=0;i<arrData.length;i++){
					str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span>写了一篇新文章：'+arrData[i].title+'...</a></li>'
				}
				oUl.html(str);
				iH=oUl.find("li").height();
				oBtnUp.click(function(){
					doMove(1);
				});
				oBtnDown.click(function(){
					doMove(-1);
				});

				oUpdate.hover(function(){
					clearInterval(timer);
				},autoPlay)

				function autoPlay(){
					timer=setInterval(function(){
						doMove(-1);
					},2500)
				};
				autoPlay();

				oUpdate.mouseover(function(){

				})

				function doMove(num){
					iNow+=num;
					if(Math.abs(iNow)>arrData.length-1){
						iNow=0;
					}
					if(iNow>0){
						iNow=-(arrData.length-1);
					}
					oUl.stop().animate({'top':iH*iNow},1000)
				}
			})();
			//option 选型卡切换
			(function(){
				fnTab($('.tabNav1'),$('.tabCon1'));
				fnTab($('.tabNav2'),$('.tabCon2'));
				fnTab($('.tabNav3'),$('.tabCon3'));
				fnTab($('.tabNav4'),$('.tabCon4'));

				function fnTab(oNav,aCon){
					var aElem=oNav.children();
					aCon.hide().eq(0).show();

					aElem.each(function(index){
						$(this).click(function(){
							aElem.removeClass('active').addClass('gradient');
							$(this).addClass('active').removeClass('gradient');
							aElem.find('a').attr('class','triangle_down_gray');
							$(this).find('a').attr('class','triangle_down_red');

							aCon.hide().eq( index ).show();

						})
						
					})
				}
			})();
			//焦点图切换
			(function(){
				var oDiv=$('#fade');
				var aUlLi=oDiv.find('ul li');
				var aOlLi=oDiv.find('ol li');
				var oP=oDiv.find('p');
				var arr=['爸爸去哪儿','人像摄影机中的光影感','娇柔妩媚、美颜大方'];
				var iNow=0;
				var timer=null;

				fnfade();

				aOlLi.click(function(){
					iNow=$(this).index();
					fnfade();
				});

				oDiv.hover(function(){clearInterval(timer);},autoPlay);

				function autoPlay(){
					timer=setInterval(function(){
						iNow++;
						iNow%=arr.length;
						fnfade();
					},2500)
				};

				autoPlay();


				function fnfade(){
					aUlLi.each(function(i){
						if(i!=iNow){
							aUlLi.eq(i).fadeOut().css('zIndex',1);
							aOlLi.eq(i).removeClass('active');
						}else{
							aUlLi.eq(i).fadeIn().css('zIndex',2);
							aOlLi.eq(i).addClass('active');
						}
					})
					oP.text(arr[iNow]);
				};
				fnfade();
			})();

			//日历效果
			(function(){
				var aSpan=$('.calendar h3').find('span');
				var aImg=$('.calendar').find('.img');
				var oTaday=$('.today_info');
				var oP=oTaday.find('p');
				var oStrong=oTaday.find('strong');
				var oImg=oTaday.find('img')


				aImg.hover(function(){
					var iTop=$(this).parent().position().top;
					var iLeft=$(this).parent().position().left;
					var index=$(this).parent().index()%aSpan.size();


					
					oTaday.show().css({'top':iTop-30,'left':iLeft+50});
					oP.text($(this).attr('info'));
					oImg.attr('src',$(this).attr('src'));
					oStrong.text(aSpan.eq(index).text());
				},function(){
					oTaday.hide();
				})
			})();

			//BBS 高亮
			(function(){
				var aLi=$('.bbs li');

				aLi.mouseover(function(){
					aLi.removeClass('active');
					$(this).addClass('active');
				})
			})();

			//HOT区透明效果
			(function(){
				var arr = [
					'',
					'用户1<br />人气1',
					'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
					'用户3<br />人气3',
					'用户4<br />人气4',
					'用户5<br />人气5',
					'用户6<br />人气6',
					'用户7<br />人气7',
					'用户8<br />人气8',
					'用户9<br />人气9',
					'用户10<br />人气10'
				];
				var aLi=$('.hot_area li');

				aLi.mouseover(function(){

					if($(this).index()==0) return;

					aLi.find('p').remove();
					$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
				})
				console.log(aLi.length)
			})();

		});