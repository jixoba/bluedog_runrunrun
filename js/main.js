// JavaScript Document
var oCan = document.getElementById("war_area");
var cxt=oCan.getContext("2d");
cxt.fillStyle = "#067983";
//蓝狗图片对象	
var oImg = new Image();
oImg.src = "images/langou.png";

//创建蓝狗对象
var oLg = new Lg(235,235,oImg,3);
oImg.onload = function(){
		oLg.hua();
	}

//蓝狗构造函数
function Lg(x,y,oImg,iSpeed){
		this.x = x;
		this.y = y;
		this.setX = function(a){
				this.x = a;
			}
		this.setY = function(b){
				this.y = b;
			}
		
		this.hua = function(){
				cxt.drawImage(oImg,this.x,this.y,30,30);
			}
		this.moveUp = function(){
				if(this.y <=0) this.y = 0;
				this.y -= iSpeed;
				this.hua();
			}
		this.moveDown = function(){
				if(this.y >=470) this.y = 470;
				this.y += iSpeed;
				this.hua();
			}
		this.moveLeft = function(){
				if(this.x <=0) this.x = 0;
				this.x -= iSpeed;
				this.hua();
			}
		this.moveRight = function(){
				if(this.x >=470) this.x = 470;
				this.x += iSpeed;
				this.hua();
			}
	}

//子弹构造函数
function Bullet(x,y,r,iSpeedX,iSpeedY){
		this.isDie = false;
		this.x = x;
		this.y = y;
		this.r = r;
		this.move = function(){
				this.x += iSpeedX;
				this.y += iSpeedY;
				drawCircle(this.x,this.y,this.r,0,360,false);
				if(this.x <= 0 || this.y >=500 || this.y <= 0 || this.x >=500){
						this.isDie = true;
					}
			}
	}
	
//创建子弹函数
function creatBullet(){
		var x,y,r,iSpeedX,iSpeedY,oBullet;
		do{
			x = rnd(0,500);
			y = rnd(0,500);
		}while(!(x==0 && y!=0 || x!=0 && y==0 || x==500 && y!=500 || x!=500 && y==500));
		r = rnd(3,5);
		switch(rnd(0,3)){
				case 0:
				iSpeedX = rnd(2,5);
				iSpeedY = rnd(2,5);
				break;
				case 1:
				iSpeedX = -rnd(2,5);
				iSpeedY = rnd(2,5);
				break;
				case 2:
				iSpeedX = rnd(2,5);
				iSpeedY = -rnd(2,5);
				break;
				default:
				iSpeedX = -rnd(2,5);
				iSpeedY = -rnd(2,5);
			}
		return new Bullet(x,y,r,iSpeedX,iSpeedY);//alert(oBullet);
	}
	
//画子弹
var aBullet = [];
createBullets();
function createBullets(){
		for(var i=0; i<20; i++){
				aBullet.push(new creatBullet());
			}
	}
//画子弹定时器
var huabu_time;
function t_huazidan(){
		huabu_time = window.setInterval(function(){
		clear();
		for(var i=0; i<aBullet.length; i++){
			aBullet[i].move();
		
		if(aBullet[i].isDie == true){
				aBullet[i] = null;
				aBullet[i] = creatBullet();
			}
		}
	oLg.hua();	
		
	},20);
	}


//清空画布
function clear(){
		cxt.clearRect(0,0,500,500);
	}
//画圆形
function drawCircle(x, y, r){
		cxt.beginPath();
		cxt.arc(x,y,r,0,360,false);
		cxt.closePath();
		cxt.fill();
	}

//键盘控制
var lg_timeup,lg_timedown,lg_timeleft,lg_timeright;
var lg_bup,lg_bdown,lg_bleft,lg_bright;
function jianpan_ctr(){
		
		//myAddEvent(document, "keydown", );
		document.addEventListener("keydown",lg_ctr,false);
		document.onkeyup = function(eve){
				
				var ev = eve || window.event;
				var code = ev.keyCode;
				//alert(code);
				switch(code){
						case 38:
						window.clearInterval(lg_timeup);
						lg_bup = false;
						break;
						
						case 40:
						window.clearInterval(lg_timedown);
						lg_bdown = false;
						break;
						
						case 37:
						window.clearInterval(lg_timeleft);
						lg_bleft = false;
						break;
						
						case 39:
						window.clearInterval(lg_timeright);
						lg_bright = false;
						break;
					}
			}
	};
function lg_ctr(eve){
				
				var ev = eve || window.event;
				var code = ev.keyCode;
				//alert(code);
				switch(code){
						case 38:
						if(!lg_bup){
								lg_timeup = window.setInterval(function(){
										oLg.moveUp();
									},20);
								lg_bup = true;
							}
						break;
						
						case 40:
						if(!lg_bdown){
								lg_timedown = window.setInterval(function(){
										oLg.moveDown();
									},20);
								lg_bdown = true;
							}
						break;
						
						case 37:
						if(!lg_bleft){
								lg_timeleft = window.setInterval(function(){
										oLg.moveLeft();
									},20);
								lg_bleft = true;
							}
						break;
						
						case 39:
						if(!lg_bright){
								lg_timeright = window.setInterval(function(){
										oLg.moveRight();
									},20);
								lg_bright = true;
							}
						break;
					}
			}
//随机数函数
function rnd(min, max)
{
	return parseInt((Math.random()*999)%(max-min+1))+min;
}

//判断是否相撞函数
function isCollide(oBlt,oLg){
		if(oBlt.x>(oLg.x+30) || (oBlt.x+oBlt.r)<oLg.x || oBlt.y>(oLg.y+30) || (oBlt.y+oBlt.r)<oLg.y){
				return false;
			}else{
					return true;
				}
	}

//判断是否相撞定时器
function t_xiangzuang(){}
		window.setInterval(function(){
			for(var i=0; i<aBullet.length; i++){
					if(isCollide(aBullet[i],oLg)){
							window.clearInterval(lg_timeup);
							window.clearInterval(lg_timedown);
							window.clearInterval(lg_timeleft);
							window.clearInterval(lg_timeright);
							window.clearInterval(huabu_time);
							window.clearInterval(jisi_time);
							
							var btn2 = document.querySelector('.btn2');
							btn2.style.display = "block";
							btn2.onclick = function(){
									window.location.reload();
								}
							
							//document.removeEventListener('keydown',space_down,false);
							//document.removeEventListener('keydown',lg_ctr,false);
							
						}
				}
		},20);


var oStart = document.querySelector('.start');
var oBtn = document.querySelector('.btn');
var isStart = false;
//空格按键按下
document.addEventListener('keydown',space_down,false);
function space_down(ev){
		var ev = ev || window.event;
		if(ev.keyCode == 32){
				if(!isStart){
					jianpan_ctr();
					t_huazidan();
					t_xiangzuang();
					isStart = true;
					jisi();
					oBtn.style['display'] = 'none';
				}
			}
		
	}
//绑定事件函数
function myAddEvent(obj, sEv, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEv, function (){
			fn.call(obj);
		});
	}
	else
	{
		obj.addEventListener(sEv, fn, false);
	}
}

//计时器
var jisi_time;
function jisi(){
var oJisi = document.getElementById('jisi');
var oSpan1 = oJisi.getElementsByTagName('span')[0];
var oSpan2 = oJisi.getElementsByTagName('span')[1];
var sec = 0;
var hao_s = 0;
jisi_time = window.setInterval(function(){
		hao_s ++;
		if(hao_s >= 99){
				hao_s = 0;
				sec ++;
			}
		if(hao_s<=9 && sec<=9){
				oSpan1.innerHTML = "0"+sec;
				oSpan2.innerHTML = "0"+hao_s;
			}else if(hao_s<=9 && sec>9){
					oSpan1.innerHTML = sec;
					oSpan2.innerHTML = "0"+hao_s;
				}else if(hao_s>9 && sec<=9){
					oSpan1.innerHTML = "0"+sec;
					oSpan2.innerHTML = hao_s;
				}else{
						oSpan1.innerHTML = sec;
						oSpan2.innerHTML = hao_s;
					}
		
	},5);
}





