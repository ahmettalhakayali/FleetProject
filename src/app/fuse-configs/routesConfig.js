import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import App1Config from 'app/main/app1/App1Config';
import App2Config from 'app/main/app2/App2Config';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [App1Config, App2Config, LoginConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs /* , ['admin', 'staff', 'user'] */),
	{
		path: '/',
		component: () => <Redirect to="/home" />
	}
];

export default routes;
