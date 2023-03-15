<template>
	<div class="zyhAsidePage">
		<aside>
			<div class="logo">
				<a href="/#/summary">
					<span><img :src="loginConfig.imgs" /></span>
				</a>
			</div>
			<nav>
				<el-row>
					<el-col :span="12">
						<el-menu default-active="2" @open="handleOpen" @close="handleClose" background-color="#1e69fe"
							text-color="#fff" active-text-color="white" unique-opened>
							<el-submenu index="1" class="arrowIconHidden"
								@click.native="routerLinkDepartmentManagement">
								<template slot="title">
									<img src="../../assets/images/Department of management.png" />
									<span slot="title">员工管理</span>
								</template>
							</el-submenu>
							<el-submenu index="2" class="arrowIconHidden" @click.native="routerLinkRoleManagement">
								<template slot="title">
									<img src="../../assets/images/Role management.png" />
									<span slot="title">角色管理</span>
								</template>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">
									<img src="../../assets/images/jiesuanjilu.png" />
									<span>收费管理</span>
								</template>
								<el-menu-item index="1-1" @click.native="RLshoufei">
									<img src="../../assets/images/all.png" />
									<span>收费员</span>
								</el-menu-item>

								<el-menu-item index="1-2" @click.native="RLxunjian">
									<img src="../../assets/images/fenchengjilu.png" />
									<span>巡检员</span>
								</el-menu-item>
								<el-menu-item index="1-3" @click.native="RLpaiban">
									<img src="../../assets/images/zhaunzhangjilu.png" />
									<span>排班</span>
								</el-menu-item>
								<el-menu-item index="1-3" @click.native="RLkaoqing">
									<img src="../../assets/images/zhaunzhangjilu.png" />
									<span>考勤</span>
								</el-menu-item>

							</el-submenu>
						</el-menu>
					</el-col>
				</el-row>
			</nav>
		</aside>
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
	import router from "../../router/departmentAndRoleManagement";
	import {
		loginConfig
	} from "../../config.js";
	export default {
		router,
		data() {
			return {
				loginConfig
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
				console.log(this.option);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			//路由跳转
			routerLinkDepartmentManagement() {
				this.$router.push({
					path: `/departmentAndRoleManagement/departmentManagement`
				});
			},
			//路由跳转
			routerLinkRoleManagement() {
				this.$router.push({
					path: `/departmentAndRoleManagement/roleManagement`
				});
			},
			RLshoufei() {
				this.$router.push({
					path: `/departmentAndRoleManagement/RLshoufei`
				});
			},
			RLxunjian() {
				this.$router.push({
					path: `/departmentAndRoleManagement/RLxunjian`
				});
			},
			RLpaiban() {
				this.$router.push({
					path: `/departmentAndRoleManagement/RLpaiban`
				});
			},
			RLkaoqing() {
				this.$router.push({
					path: `/departmentAndRoleManagement/RLkaoqing`
				});
			},
			//弹出框
			tcClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	
</style>
