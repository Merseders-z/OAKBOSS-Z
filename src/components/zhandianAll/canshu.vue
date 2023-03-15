<template>
	<div class="jiben">
		<div class="jiben-right-top">
			<div class="myhead1">
				<div class="jiben-left">
					<span class="user-word">参数设置</span>
				</div>
				<div class="jiben-right">
					<myhead></myhead>
				</div>
			</div>
			<div class="myhead2">
				<div class="myhead2-left">
					<!-- <img src="../../assets/images/timgr.png" style="width: 53px;height: 53px;" /> -->
					<span class="jiben-nameWord">{{charName}}</span>
					<span class="jiben-green">(运行中)</span>
					<div class="myhead2-but-box">
						<router-link to="/motoAll">
							<div class="myhead2-but">返回上一级页面</div>
						</router-link>
					</div>
				</div>
				<div class="myhead2-right">
					<div class="myhead2-right-box">
						<el-button icon="el-icon-refresh" @click="shua">刷新</el-button>
					</div>
				</div>
			</div>
			<div class="canshuCon">
				<div class="keyBox">
					<div style="font-size: 30px;font-weight: 500;display:flex;flex-direction: row;justify-content:space-between;" class="g">
						<div style="width: 150px;"></div>
						<div style="font-size: 30px;">key</div>
						<div style="display: flex;flex-direction: row;align-items: center;font-size: 15px;width: 150px;justify-content: center;">
							
						</div>
					</div>
					<div class="keyBox1">
						<input type="text" v-model="key1" class="key" disabled="disabled">
					</div>
					<div class=" g">
						<input type="text" v-model="key2" class="key" disabled="disabled">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="key3" class="key" disabled="disabled">
					</div>
					<div class="g">
						<input type="text" v-model="key4" class="key" disabled="disabled">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="key5" class="key" disabled="disabled">
					</div>
					<div class="g">
						<input type="text" v-model="key6" class="key" disabled="disabled">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="key7" class="key" disabled="disabled">
					</div>
					<div class="g">
						<input type="text" v-model="key8" class="key" disabled="disabled">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="key9" class="key" disabled="disabled">
					</div>
				</div>
				<div class="keyBox">
					<div style="font-size: 30px;font-weight: 500;display:flex;flex-direction: row;justify-content:space-between;" class="g">
						<div style="width: 120px;"></div>
						<div style="font-size: 30px;">value</div>
						<div style="display: flex;flex-direction: row;align-items: center;font-size: 18px;width: 120px;justify-content: center;">
							是否启用
							<input type="checkbox" @click="checkValid" style="width: 20px;height: 20px;">
						</div>
					</div>
					<div class="keyBox1">
						<input type="text" v-model="addForm.min_i" class="key">
					</div>
					<div class="g">
						<input type="text" v-model="addForm.min_i_duration" class="key">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="addForm.max_i" class="key">
					</div>
					<div class="g">
						<input type="text" v-model="addForm.max_i_duration" class="key">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="addForm.max_p" class="key">
					</div>
					<div class="g">
						<input type="text" v-model="addForm.max_p_duration" class="key">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="addForm.max_v" class="key">
					</div>
					<div class="g">
						<input type="text" v-model="addForm.max_t" class="key">
					</div>
					<div class="keyBox1">
						<input type="text" v-model="addForm.max_t_duration" class="key">
					</div>
				</div>
			</div>
			<div class="butBox">
				<div class="b" @click="exit">保存</div>
				<div class="bW" @click="quxiao">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myhead from '../../components/myhead.vue'
	export default {
		components: {
			myhead
		},
		data() {
			return {
				charName: '',
				token: '',
				charId:'',
				key1:'最小电流(mA)',
				key2:'最小电流断电时间(s)',
				key3:'最大电流(mA)',
				key4:'最大电流断电时间(s)',
				key5:'最大功率(WH)',
				key6:'最大功率断电时间',
				key7:'最大电压(V)',
				key8:'最高温度(℃)',
				key9:'高温断电时间(s)',
				addForm:{
					min_i:'',
					min_i_duration:'',
					max_i:'',
					max_i_duration:'',
					max_p:'',
					max_p_duration:'',
					max_v:'',
					max_t:'',
					max_t_duration:'',
					auto_detect:0,
					valid:0,
					token:localStorage.getItem("token").replace(/\"/g, "")
				}
			}
		},
		created() {
			this.token = localStorage.getItem("token");
			this.charName = localStorage.getItem("charName");
			this.charId = localStorage.getItem("charId");
			console.log(this.charId, this.charName)
			this.getcharger()
		},
		mounted() {

		},
		methods: {
			getcharger(){
				let toKen = this.token.replace(/\"/g, "")
				this.$axios.get("/admin/api/charger/" + this.charId + "/param?token=" + toKen).then(res =>{
					console.log(res)
					if(res.status == 200){
						this.addForm.min_i = res.data.param.min_i
						this.addForm.min_i_duration = res.data.param.min_i_duration
						this.addForm.max_i = res.data.param.max_i
						this.addForm.max_i_duration = res.data.param.max_i_duration
						this.addForm.max_p = res.data.param.max_p
						this.addForm.max_p_duration = res.data.param.max_p_duration
						this.addForm.max_v = res.data.param.max_v
						this.addForm.max_t = res.data.param.max_t
						this.addForm.max_t_duration = res.data.param.max_t_duration
						this.addForm.auto_detect = res.data.param.auto_detect
						this.addForm.valid = res.data.param.valid
					}
				})
			},
			exit(){
				let toKen = this.token.replace(/\"/g, "")
				if(confirm('确认修改吗?')){
					this.$axios.post("admin/api/charger/" + this.charId + "/param",this.addForm).then(res=>{
						if (res.status !== 200) {
							this.$message.error('保存失败!')
						}else{
							this.$message.success('保存成功!')
							this.getcharger()
						}
					})
				}
			},
			checkValid(){
				if(event.target.checked){
					this.addForm.valid = 1
				}else{
					this.addForm.valid = 0
				}
			},
			checkTest(){
				if(event.target.checked){
					this.addForm.auto_detect = 1
				}else{
					this.addForm.auto_detect = 0
				}
			},
			quxiao(){
				this.addForm.min_i = ''
				this.addForm.min_i_duration = ''
				this.addForm.max_i = ''
				this.addForm.max_i_duration = ''
				this.addForm.max_p = ''
				this.addForm.max_p_duration = ''
				this.addForm.max_v = ''
				this.addForm.max_t = ''
				this.addForm.max_t_duration = ''
				this.addForm.auto_detect = 0
				this.addForm.valid = 0
			},
			shua() {
				this.$router.go(0); //刷新
			},
			back() {
				this.$router.push({
					name: 'motoAll'
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.jiben {
		width: 100%;
		height: 100vh;
		background-color: white;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}
	
	.butBox div{
		width: 120px;
		height: 40px;
		border: solid 2px #1e69fe;
		border-radius: 15px;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
	}
	
	.b{
		background-color: #1e69fe;
		color: white;
		cursor: pointer;
	}
	
	.bW{
		color: #1e69fe;
		cursor: pointer;
	}
	
	.butBox{
		width: 300px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30px;
	}

	.key {
		width: 90%;
		height: 35px;
		border-radius: 5px;
		border: solid 1px gainsboro;
		font-size: 20px;
		text-align: center;
	}
	
	.g{
		background-color:#eeeeee;
		margin: 0 auto;
		width: 100%;
		height: 10%;
		border-bottom: solid 1px gray;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.keyBox {
		display: flex;
		flex-direction: column;
		width: 50%;
		height: 100%;
		border-right: solid 1px #000000;
	}

	.keyBox1 {
		margin: 0 auto;
		width: 100%;
		height: 10%;
		border-bottom: solid 1px gray;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.canshuCon {
		width: 95%;
		height: 600px;
		margin: 0 auto;
		border-radius: 15px;
		box-shadow: 0px 0px 5px 2px gainsboro;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		margin-top: 50px;
	}

	.jiben-green {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #4ea805;
		margin-left: 10px;
	}

	.jiben-left {
		width: 50%;
	}

	.el-button--default {
		border-radius: 10px;
		padding: 10px 20px;
	}

	.jiben-right-top {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 20px auto;
		margin-top: 35px;
	}

	.myhead2 {
		display: flex;
		flex-direction: row;
		border-bottom: solid 1px gray;
		padding: 20px 0px;
	}


	.myhead2-but-box {
		width: 200px;
	}

	.myhead2-right-box {
		display: block;
		float: right;
	}

	.myhead2-but {
		width: 135px;
		height: 30px;
		background-color: #1e69fe;
		margin: 0 auto;
		color: white;
		line-height: 30px;
		text-align: center;
		border-radius: 5px;
		font-size: 12px;
		cursor: pointer;
	}

	.jiben-nameWord {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 20px;
		letter-spacing: 0px;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 30px;
		width: 300px;
		line-height: 30px;
		text-align: center;
	}

	.myhead2-right {
		display: block;
		width: 50%;
		line-height: 53px;
	}

	.myhead2-left {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.user-word {
		width: 47px;
		height: 23px;
		font-family: PingFangSC-Regular;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
	}

	.jiben-right {
		width: 50%;
	}

	.myhead1 {
		display: flex;
		flex-direction: row;
	}

	.jiben-right-conWord {
		font-family: PingFangSC-Regular;
		font-size: 20px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 24px;
		letter-spacing: 1px;
		color: #000000;
		margin-left: 15px;
	}

	.jiben-right-con {
		display: flex;
		flex-direction: column;
		width: 95%;
		margin: 30px auto;
		justify-content: space-between;
		height: 1100px;
	}
</style>
