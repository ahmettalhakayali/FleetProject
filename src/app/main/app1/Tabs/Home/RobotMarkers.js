import React, { useState, useEffect } from 'react';
import { Adb } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { calculateEuler } from './ROS';
import _ from 'lodash';

const RobotMarkers = function ({ robotPose }) {
	const [orientation, setOrientation] = React.useState('0');
	const [open, setOpen] = React.useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};



	React.useEffect(() => {
		setOrientation(
			-calculateEuler(
				robotPose.orientation.w,
				robotPose.orientation.z,
				robotPose.orientation.y,
				robotPose.orientation.x
			).x + 90
		);
	}, [robotPose]);
	return (
		<div >
			<Grid item>
				<ClickAwayListener onClickAway={handleTooltipClose}>
					<div>
						<Tooltip
							PopperProps={{
								disablePortal: true
							}}
							onClose={handleTooltipClose}
							open={open}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title="PTK200(Sadık)"
						>
							<Adb
								style={{
									borderRadius: '2em',
									position: 'relative',
									left: robotPose.position.x * 50 + 300,
									top: -robotPose.position.y * 50 + 350,
									transform: `rotate(${orientation}deg)`
								}}
								onClick={handleTooltipOpen}
							/>
						</Tooltip>
					</div>
				</ClickAwayListener>
			</Grid>
		</div>
	);
};
export default RobotMarkers;
