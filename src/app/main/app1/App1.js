import Home from './Tabs/Home';
import Info from './Tabs/Info/Products';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { ros1, ros2 } from './Tabs/Home/ROS';
import Admin from './Tabs/Admin'
const useStyles = makeStyles({
	layoutRoot: {},
	header: { maxHeight: '1%' }
});

function SimpleTabbedSample() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	//const [ros1, setRos1] = useState(rosConnect('ws://192.168.168.200:9090'));
	//const [ros2,setRos2]= useState(rosConnect(''));
	const handleTabChange = (event, value) => {
		setSelectedTab(value);
	};

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-36 h-36',
				root: classes.layoutRoot,
				toolbar: 'px-16 sm:px-24'
			}}
			header={
				<div className="p-6">
					<h4>Alan 1</h4>
				</div>
			}
			contentToolbar={
				<>
					<Tabs
						value={selectedTab}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="off"
						className="w-full h-64 border-b-1"
					>
						<Tab className="h-64" label="Home" />
						<Tab className="h-64" label="Info" />
						<Tab className="h-64" label="Admin" />
					</Tabs>
				</>
			}
			content={
				<div className="p-24">
					{selectedTab === 0 && (
						<div>
							<Home ros1={ros1} ros2={ros2} />
						</div>
					)}
					{selectedTab === 1 && (
						<div>
							<Info ros1={ros1} />
						</div>
					)}
					{selectedTab === 2 && (
						<div>
							<Admin ros1={ros1} />
						</div>
					)}
				</div>
			}
		/>
	);
}

export default SimpleTabbedSample;
