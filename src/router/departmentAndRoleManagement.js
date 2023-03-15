import Vue from "vue";
import Router from "vue-router";

import refresh from "../pages/refresh";
import roleManagement from "../pages/departmentAndRoleManagement/roleManagementComponent/roleManagement";

import departmentManagement from "../pages/departmentAndRoleManagement/departmentManagementComponent/departmentManagement";

import RLshoufei from "../pages/departmentAndRoleManagement/shoufeiguanli/RLshoufei";
import RLpaiban from "../pages/departmentAndRoleManagement/shoufeiguanli/RLpaiban";
import RLxunjian from "../pages/departmentAndRoleManagement/shoufeiguanli/RLxunjian";
import RLkaoqing from "../pages/departmentAndRoleManagement/shoufeiguanli/RLkaoqing";
Vue.use(Router);

const routes = [{
		path: "/refresh",
		component: refresh
	},
	{
		path: "/departmentAndRoleManagement/roleManagement",
		component: roleManagement
	},

	{
		path: "/departmentAndRoleManagement/departmentManagement",
		component: departmentManagement
	},
	{
		path: "/departmentAndRoleManagement/RLpaiban",
		component: RLpaiban
	},
	{
		path: "/departmentAndRoleManagement/RLshoufei",
		component: RLshoufei
	},
	{
		path: "/departmentAndRoleManagement/RLxunjian",
		component: RLxunjian
	},
	{
		path: "/departmentAndRoleManagement/RLkaoqing",
		component: RLkaoqing
	},
	{
		path: "*",
		component: departmentManagement
	}
];
const router = new Router({
	routes
});
export default router;
