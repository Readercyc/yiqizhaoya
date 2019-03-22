var loginForm = new Vue({
	el:'#loginForm',
	data:{
		contact:false,
		id:'',
		psw:'',
		contact:'',
	},
	methods:{
		JsonToString:function(FormData){
			var data = "";
			Object.keys(FormData).forEach(function(key){
		     	//console.log(key,FormData[key]);
		     	data += key + '=' + FormData[key] + '&';
		     	////console.log(data);
			});
			data = data.substr(0,data.length-1);
			return data;
		},
		login:function(){
			if(this.id==""||this.psw=="")
			{
				mui.alert("请填写学号和密码!");
			}
			else if(this.contact == false)
			{
				mui.alert("请同意用户协议！");
			}
			else
			{
				var ajax = new XMLHttpRequest();
				var FormData = {
					stu_id:this.id,
					password:this.psw
				};
				var data = this.JsonToString(FormData);
				////console.log(data);
				ajax.onreadystatechange = function () {
					if (ajax.readyState == 4 && ajax.status == 200) {
						var result = JSON.parse(ajax.responseText);
						//console.log(result);
						if(result.code == 2)
						{
							mui.alert("账号密码错误");
						}
						else if(result.code == 3)
						{
							mui.alert("学号或密码格式错误");
						}
						else if(result.code != 0)
						{
							mui.alert("未知错误，请联系拱拱管理员")
						}
						else
							window.location.href = '../index.html'
					}
				}
				ajax.withCredentials = true;
				ajax.open("POST", "https://found.sky31.com/login", true);//false同步    true异步
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				ajax.send(data);
			}
		},
		showContact:function(){
			var mask = mui.createMask(function(){
				contact.displaynone = true;
			});//callback为用户点击蒙版时自动执行的回调；
			mask.show();//显示遮罩
			contact.displaynone = false;
		}
//		test: function () {
//				var ajax = new XMLHttpRequest();
//				var data = "stu_id=201705550820&password=qq1246009411";
//				ajax.onreadystatechange = function () {
//					if (ajax.readyState == 4 && ajax.status == 200) {
//						//console.log(ajax.responseText);
//					}
//				}
//				ajax.withCredentials = true;
//				ajax.open("get", "https://found.sky31.com/logintest", true);//false同步    true异步
//				ajax.withCredentials = true;
//				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//				ajax.send(data);
//		},
//
//		test2: function () {
//			var ajax = new XMLHttpRequest();
//			var data = "stu_id=201705550820&password=qq1246009411";
//			ajax.onreadystatechange = function () {
//				if (ajax.readyState == 4 && ajax.status == 200) {
//					//console.log(ajax.responseText);
//				}
//			}
//			ajax.withCredentials = true;
//			ajax.open("get", "https://found.sky31.com/user/lost", true);//false同步    true异步
//			ajax.withCredentials = true;
//			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//			ajax.send(data);
//		}
	}
})


var contact = new Vue({
	el:'#contact',
	data:{
		displaynone:true,
		contact:[
			["1.声明与承诺",
				["1.1 本服务协议内容包括协议正文及所有「翼起找啊」已经发布的或将来可能发布的各类规则。所有规则为协议不可分割的组成部分，与本协议正文具有同等效力。",
				"1.2 用户同意所有协议条款并完成注册程序，才能成为“翼起找啊”的正式用户。用户在使用各项服务的同时，承诺接受并遵守各项相关规则的规定。",
				"1.3「翼起找啊」有权根据需要不时地制定、修改本协议或各类规则，如本协议有任何变更，会刊载公告，用户需及时关注并注意遵守该等规则。",
				"1.4 用户登录或继续使用「服务」将表示用户接受经修订的协议或规则。除另行明确声明外，任何使「服务」范围扩大或功能增强的新内容均受本协议约束。",
				"1.5 用户申请注册即视为同意本协议，请用户务必审慎阅读、充分理解各条款内容。阅读本协议的过程中，如果用户不同意本协议或其中任何条款约定，用户应立即停止注册登录。请用户务必在注册登录之前认真阅读全部服务协议内容，如有任何疑问，可向平台工作人员进行咨询。无论用户事实上是否在注册之前认真阅读了本服务协议，只要用户选择同意本协议并按照注册程序成功注册为用户，用户的行为仍然表示其同意并签署了本服务协议。"	
				]
			],
			[
				"2. 定义",
				[
				"2.1 “翼起找啊”：指三翼工作室开发的失物招领信息发布分享平台。",
				"2.2 “用户”：用户应当是具有完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若您不具备相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。",
				"2.3 “用户登录”：是指用户进入“翼起找啊”，通过三翼通行证（或教务管理系统）登录，按要求填写相关信息并确认同意履行相关用户协议的过程。",
				"2.4 “被标注的”：为用户已上传过的、被标记找到的失物和招领信息，点击将跳转到详情页。下方为所有用户发布的过的失物招领的具体信息，包括图片、地点、时间以及联系方式。",
				"2.5 “寻物”：是指用户发布遗失物品找寻的信息板块。用户通过填写好寻物标题、物品信息，以及联系方式等进行提交发布。该条信息将会上传至寻物板块。",
				"2.6 “招领”：是指用户发布捡拾物品招领的信息板块。用户通过填写好招领标题、物品信息，以及联系方式等进行提交发布。该条信息将会上传至招领板块。",
				"2.7 “标记找到”：是指在物品已经被找到的情况下进行的标记状态。点击“标记找到”按钮后，本条信息将会在用户的“个人信息页-被标注的”区域显示。"
				]
			],
			[
				"3. 用户权利和义务",
					[
						"3.1 请妥善保管好用户的账号、密码等信息，用户须对用户在对应账号、密码进行的所有活动承担责任。",
						"3.2 用户同意：如发现任何人未经授权使用用户的账号或密码，或发生账号及密码泄露的任何其他情况，用户应当立即通知平台，要求暂停相关服务。“翼起找啊”不对因用户未能遵守本平台规定而发生的任何损失或损毁负责。",
						"3.3 用户应当保证在使用失物招领平台的过程中遵守诚实信用的原则，不扰乱正常秩序，不从事与失物招领无关的行为；用户在使用平台服务的过程中，所产生的费用，以及一切硬件、软件、服务及其它方面的费用，均由用户独自承担。",
						"3.4 用户在「翼起找啊」的平台上不得发布各类违法或违规信息。",
						"3.5 用户承诺自己在使用时的所有行为均遵守国家法律、法规和「翼起找啊」的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，用户将以自己的名义独立承担所有相应的法律责任。",
						"3.6 用户同意，不对「翼起找啊」上任何数据作商业性利用，包括但不限于在未经「翼起找啊」事先书面批准的情况下，以复制、传播等方式使用展示的任何资料；用户同意接收来自平台发出的信息。",
						"3.7 同时用户须做到：昵称的注册与使用应符合网络道德，遵守中华人民共和国的相关法律法规。\n昵称中不能含有威胁、淫秽、漫骂、非法、侵害他人权益等有争议性的文字。\n用户必须保护好自己的账号和密码，因用户本人泄露而造成的任何损失由用户本人负责。\n另外，每个用户都要对其账号中的所有活动和事件负全责。用户若发现任何非法使用用户账号或安全漏洞的情况，应当立即通告三翼工作室。不得盗用他人账号，由此行为造成的后果自负。",      
						"3.8 未经本平台的授权或许可，任何用户不得借用平台的名义从事任何商业活动，也不得将平台作为从事商业活动的场所或其他任何形式的媒介。禁止将本平台用作从事各种非法活动的场所或者其他任何形式的媒介。"
					]
			],
			[
			"4.「翼起找啊」权利和义务",
				[
					"4.1 「翼起找啊」有义务在现有技术上维护整个平台的正常运行，并努力提升和改进技术，使用户活动得以顺利进行；对用户在使用时所遇到的有关平台的问题及反映的情况，「翼起找呀」应及时做出回复；",
					"4.2 对于用户在平台上的不当行为或其它任何「翼起找啊」认为应当终止服务的情况，本平台有权随时做出删除相关信息、终止服务等处理，而无须征得用户的同意；",
					"4.3 对于用户在平台发布的部分不合理信息，「翼起找啊」有权在不通知用户的前提下进行删除或采取其它限制性措施。此类不合理信息包括但不限于：\n①以商业买卖为目的信息；\n②以炒作不实信用为目的的信息；\n③平台有理由相信存在欺诈等恶意或虚假内容的信息；\n④平台有理由相信不以失物招领为目的的信息；\n⑤平台有理由相信存在恶意扰乱正常转转秩序因素的信息；\n⑥平台有理由相信该信息违反公共利益或可能严重损害“翼起找啊”和其它用户合法利益的。",
					"4.4 「翼起找啊」有义务按期对平台发布信息进行审核，以确保失物招领信息的正常发布，确保平台内容与失物招领相关。"
				]
			],
			[
			"5. 失物招领基本流程",
				[
					"5.1 账号注册登录。用户通过三翼通行证（或教务管理系统）进行登录即可进入平台主界面。",
					"5.2 个人信息完善。用户需要完善个人的身份信息包括昵称、年级、学院、联系方式等。",
					"5.3 发布寻物/招领信息。进入发布寻物/招领页面，填写标题、物品信息，上传物品图片，选择物品类型，填写好个人信息后可进行提交。已完善个人信息的用户，系统会自动对本部分内容进行填写。",
				]
			],
			[
			"6. 其他规定",
				[
					"6.1本平台协议各方面应受中华人民共和国大陆地区法律的管辖。倘若本协议任何规定被裁定为无效或不可强制执行，该项规定应被撤销，而其余规定应予执行。条款标题仅为方便参阅而设，并不以任何方式界定、限制、解释或描述该条款的范围或限度。平台未就用户或其他人士的某项违约行为采取行动，并不表明撤回就任何继后或类似的违约事件采取行动的权利。",
					"6.2「翼起找呀」如发现用户有本协议约定的任何方面违约、违规,甚至违法行为，平台有权进行相应的处罚，包括:通报、警告、封锁用户账号，对相关违法行为向当地公安部门进行举报。",

				]
			],
			[
			"7. 特殊声明",
				[
					"「翼起找啊」旨为湘大广大师生提供失物招领的信息发布平台，不涉及线下寻物人或拾物人的物品交接过程。本平台对线下双方的物品交接过程所产生的问题、争议等不负任何责任。"
				]
			]
		]
		
		
	}
}
)

window.onload = function(){
	checkStage();
}