<template>
	<div class="login_bg">
		<div class="chooseTitle" @click="back">
			<img :src="loginConfig.imgs" style="width: 230px;height: 40px;margin-top: 40px;" title="返回上一页"/>
		</div>
		<div class="chooseBox">
			<div class="chooseBoxTitle">
				用户类型
			</div>
			<div class="chooseBoxCon">
				<div class="chooseB" v-for="item in chooseList" @click="getChoose(item.id)">
					<div class="blueQ" :class="{quan:item.id == type}">
						<img :src="item.img" style="width:70px;height: 90px;" v-show="type == 1">
						<img :src="item.img1" style="width:70px;height: 90px;" v-show="type == 2">
					</div>
					<div class="colorW">{{item.name}}</div>
				</div>
			</div>
			<div class="blueBot" @click="chooseToken">
				确定
			</div>
		</div>
		<<!-- div class="jianyiword1">建议使用Chrome浏览器，分辨率1920X1080，操作系统字体100%</div>
		<div class="jianyiword" @click="goPage">{{loginConfig.deployName}}</div> -->
	</div>
	
</template>

<script>
	import {
		loginConfig
	} from "../config.js";
	export default {
		data() {
			return {
				loginConfig,
				chooseList:[{
					name:'管理员',
					id:1,
					img:require("../assets/images/administrator-B.png"),
					img1:require("../assets/images/administrator-G.png")
				},
				{
					name:'代理商',
					id:2,
					img:require("../assets/images/Operator-G.png"),
					img1:require("../assets/images/Operator-B.png")
				}],
				adminToken:'',
				agentToken:'',
				type:1,
				}
			},
			created() {
				this.adminToken = localStorage.getItem("token")
				this.agentToken = localStorage.getItem("agentToken")
			},
			methods:{
				back(){
					this.$router.go(-1)
				},
				getChoose(id){
					this.type = id
				},
				chooseToken(){
					if(this.type == 1){
						localStorage.setItem("token",this.adminToken);
						localStorage.setItem("admin", JSON.stringify(localStorage.getItem("adminMes")));
						console.log(this.adminToken,'管理员')
						this.$router.push({
							path: "/summary",
						});
					}else if(this.type == 2){
						localStorage.setItem("token", this.agentToken);
						localStorage.setItem("admin", JSON.stringify(localStorage.getItem("agentMes")));
						console.log(this.agentToken,'代理商')
						this.$router.push({
							path: "/summary",
						});
					}
				},
			}
		}
</script>

<style scoped="scoped">
	.login_bg{
		width: 100%;
		height: 100vh;
		background: url(../assets/images/bgm.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
	}
	
	.chooseB{
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		cursor: pointer;
	}
	
	.colorW{
		font-size: 20px;
		color: #1B85F8;
		width: 100%;
		text-align: center;
	}
	
	.blueBot{
		width: 150px;
		height: 40px;
		border-radius: 20px;
		background-color: #1B85F8;
		color: white;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		cursor: pointer;
	}
	
	.blueQ{
		width: 150px;
		height: 150px;
		border-radius: 50%;
		border: solid 5px #BFBFBF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.quan{
		border: solid 5px #1B85F8;
	}
	
	.chooseBoxCon{
		display: flex;
		flex-direction: row;
		width: 60%;
		margin: 0 auto;
		justify-content: space-between;
	}
	
	.chooseTitle{
		width: 95%;
		margin: 0 auto;
		cursor: pointer;
	}
	
	.login_bot {
		color: white;
		cursor: pointer;
		font-size: 16px;
	}
	
	.chooseBoxTitle{
		font-size: 26px;
	}
	
	.chooseBox{
		background-color: white;
		width: 50%;
		height: 500px;
		margin: 110px auto;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	
	.jianyiword{
		color: white;
		font-size: 14px;
		position: fixed;
		z-index: 99;
		bottom: 15px;
		width: 100%;
		text-align: center;
		cursor: pointer;
	}
	
	.jianyiword1{
		color: white;
		font-size: 14px;
		position: fixed;
		z-index: 99;
		bottom: 30px;
		width: 100%;
		text-align: center;
	}
</style>
