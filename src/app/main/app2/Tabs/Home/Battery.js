import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';

import {
	Battery20,
	Battery30,
	Battery50,
	Battery60,
	Battery80,
	BatteryFull,
	Battery90,
	BatteryAlert
} from '@material-ui/icons';

const batteryUpdater = battery => {
	const [, Comp] = [
		[90, BatteryFull],
		[80, Battery90],
		[70, Battery80],
		[60, Battery60],
		[40, Battery50],
		[30, Battery30],
		[20, Battery20],
		[0, BatteryAlert]
	].find(item => battery >= item[0]);
	return <Comp />;
};

export default function ({ battery }) {
	const [activeIcon, setActiveIcon] = useState(<BatteryAlert />);

	useEffect(() => {
		setActiveIcon(batteryUpdater(battery));
	}, [battery]);
	return (
		<div style={{ width: '100%' }}>
			<Box className="m-20" display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
				<Box p={1} bgcolor="grey.300">
					<div className="mx-4">{activeIcon} </div>
				</Box>
				<Box p={1} bgcolor="grey.300">
					<Typography className="mx-4 font-bold h2" color="textSecondary">
						{battery}
					</Typography>
				</Box>
			</Box>
		</div>
	);
}
