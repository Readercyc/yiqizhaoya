var head = new Vue({
	el:'#find',
	data:{
		address:"",
		addressAll:['金翰林','琴湖','北苑','南苑','逸夫楼','一教','三教'],
		nickname:'',
		Class:'',
		phone:'',
		qq:'',
		weixin:'',
		type:'',
		stu_card:'',
		description:'',
		title:'',
		date:'',
		src:'../img/yuhan.jpg',
		none:true,
		card_id:null
	},
	methods:{
		upload:function(c,d){
		    "use strict";
		    var $c = document.querySelector(c),
		        $d = document.querySelector(d),
		        file = $c.files[0],
		        reader = new FileReader();
		    	reader.readAsDataURL(file);
		    	reader.onload = function(e){
		        $d.setAttribute("src", e.target.result);
		    };
     	},
     	judge:function(data){
     		//必填项
     		if(data.type==="")
     		{
     			mui.alert("请选择发布类型");
     			return false;
     		}
     		if(data.stu_card === "")
     		{
     			mui.alert("请选择是丢失校园卡还是其他");
     			return false;
     		}
     		if(data.title==""||data.title.length>100)
     		{
     			mui.alert("标题必填并且长度不超过100字");
     			return false;
     		}
     		if(data.description==""||data.description.length>200)
     		{
     			mui.alert("描述必填并且长度不超过200字");
     			return false;
     		}
     		
     		var patt = /^[\d]{4}-[\d]{2}-[\d]{2}$/;
     		if(data.date==""||patt.test(data.date) == false)
     		{
     			mui.alert("请完整填写日期");
     			return false;
			 }
			 var patt = /^20[\d]{8,10}$/;
			 if(head.stu_card == 1 && patt.test(data.card_id) == false)
			  {
				  mui.alert("请填写正确卡号");
				  return false;
			  }
     		return true;
     		
     	},
     	JsonToString:function(FormData){
			var data = "";
			Object.keys(FormData).forEach(function(key){
		     	////console.log(key,FormData[key]);
		     	data += key + '=' + FormData[key] + '&';
		     	////console.log(data);
			});
			data = data.substr(0,data.length-1);
			return data;
		},
		getCouponSelected:function(){
            //获取选中的优惠券
            //console.log(this.address)
        },
		submit:function(){
			var find = document.querySelector('#find');
			var Formdata = {
				type:this.type,
				title:this.title,
				description:this.description,
				stu_card:this.stu_card,
				address:this.address,
				date:this.date,
				img:document.querySelector('#fileBtn').files[0]
			}
			//console.log(Formdata);
			
			var data = new FormData(find);
			data.append('date', this.date);
			data.append('address', this.address);
			data.append('title', this.title);
			if(this.judge(Formdata) == true)
				this.Ajax(data);

		},
		Ajax:function(data){
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if(ajax.readyState == 1)
				{
					mui.toast("文件上传中,请稍后",{duration:100000})
				}
				if (ajax.readyState == 4 && ajax.status == 200) {
					var result = JSON.parse(ajax.responseText);
					//console.log(result);
					//console.log(head.type);
					if(result.code == 0&&this.type == 1)
					{
						localStorage.setItem('type',1)
						window.location.href = "../list/list.html"
					}
						
					else if(result.code == 0&&this.type == 0)
					{
						localStorage.setItem('type',0)
						window.location.href = "../list/list.html"
					}
					else if(result.code == 9||result.code==10)
					{
						mui.alert("服务器正忙，请等10秒再提交");
					}
					else if(result.code == 12)
					{
						mui.alert("有敏感词汇!请修改");
					}
					else{
						mui.alert("发布失败，请联系管理员");
					}
				}
			}
			ajax.withCredentials = true;
			ajax.open("POST", "https://found.sky31.com/update/"+localStorage.getItem('id'), true);//false同步    true异步
			//ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(data);
		}
	}
})
function loadForm(){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			//console.log(ajax.responseText);
			var result = JSON.parse(ajax.responseText);
			result = result.data;
			//console.log(result);
			head.date = result.date;
			head.type = result.type;
			head.stu_card = result.stu_card;
			head.addrss = result.address;
			head.title = result.title;
			head.description = result.description;
			head.src='https://found.sky31.com/upload/laf/' + result.img;
			head.card_id = result.card_id
		}
	}
	ajax.withCredentials = true;
	ajax.open("GET", "https://found.sky31.com/laf/"+localStorage.getItem('id'), true);//false同步    true异步
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
}

function limitDate(){
	var date_now = new Date();
	//得到当前年份
	var year = date_now.getFullYear();
	//得到当前月份
	//注：
	//  1：js中获取Date中的month时，会比当前月份少一个月，所以这里需要先加一
	//  2: 判断当前月份是否小于10，如果小于，那么就在月份的前面加一个 '0' ， 如果大于，就显示当前月份
	var month = date_now.getMonth()+1 < 10 ? "0"+(date_now.getMonth()+1) : (date_now.getMonth()+1);
	//得到当前日子（多少号）
	var date = date_now.getDate() < 10 ? "0"+date_now.getDate() : date_now.getDate();
	//设置input标签的max属性
	document.querySelector("#date").setAttribute("max",year+"-"+month+"-"+date);
}
window.onload = function(){
      checkStage();
	head.address = head.addressAll[0];
	if(localStorage.getItem('id')==undefined||localStorage.getItem('id')==null)
	{
			mui.alert("访问路径错误");
			window.location.href = "../index.html"
	}
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			//console.log(ajax.responseText);
			var result = JSON.parse(ajax.responseText);
			
			if(result.code == 6)
			{
				mui.alert("请先登录");
				window.location.href = "../login/login.html"
			}
			else{
				result = result.data;
				head.nickname = result.nickname;
				head.Class = result['class'];
				head.qq = result.qq;
				head.phone = result.phone;
				head.weixin = result.wx;
			}
		}
	}
	ajax.withCredentials = true;
	ajax.open("GET", "https://found.sky31.com/user/info", true);//false同步    true异步
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
	loadForm();
}
