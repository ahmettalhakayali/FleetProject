import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeGoal, rosPoseListener, initialPose, rosBatteryListener, rosMoveBaseStatusListener } from './ROS';
import RobotMarkers from './RobotMarkers';
import Battery from './Battery';
//TODO: initial pose amcl
const useStyles = makeStyles({
	root: {
		'background-image': 'url(assets/images/patika/map1scaled.png)',
		'background-repeat': 'no-repeat',
		border: 0,
		borderRadius: 3,
		'z-index': 1,
		width: 640,
		height: 480
	}
});

function Home({ ros1, ros2 }) {
	const { t } = useTranslation('app1');
	const [loading, setLoading] = useState(true);
	const [activeItem, setActiveItem] = useState('');
	const [activeDestination, setActiveDestination] = useState('');
	const [currentLocation, setCurrentLocation] = useState('');
	const [disableActions, setDisableActions] = useState(false);
	const [activeRos, setActiveRos] = useState(ros1);
	const [robotPose, setRobotPose] = useState(initialPose);
	const [battery, setBattery] = useState(0);
	const classes = useStyles();
	const username = useSelector(({ auth }) => auth.user.data.displayName);

	const rosMove = function (ros, destination) {
		const goal1 = makeGoal(ros, 0.407244510932, 0.0723716663649, -0.985968631135, 0.166930699444);
		const goal2 = makeGoal(ros, 1.49164762027, 1.40518071125, 0.0502824815001, 0.99873503596);
		const goal3 = makeGoal(ros, -1.91538368682, -1.78181324408, 0.745086740343, 0.666967577446);

		if (destination === 0) goal1.send();
		else if (destination === 'Terminal1') goal2.send();
		else if (destination === 'Terminal2') goal3.send();
	};

	const handleClick = option => event => {
		if (option === 2) rosMove(activeRos, currentLocation);
		else if (option === 3) rosMove(activeRos, activeDestination);
		else if (option === 4) rosMove(activeRos, 0);
	};

	useEffect(() => {
		setActiveItem('PTK1000');
		if (username === 'Terminal1') {
			setCurrentLocation('Terminal1');
			setActiveDestination('Terminal2');
		} else if (username === 'Terminal2') {
			setCurrentLocation('Terminal2');
			setActiveDestination('Terminal1');
		}
	}, [username]);

	useEffect(() => {
		const poseListener = rosPoseListener(ros1);
		const batteryListener = rosBatteryListener(ros1);
		const moveBaseStatusListener = rosMoveBaseStatusListener(ros1);

		batteryListener.subscribe(result => {
			if (result.data) {
				setBattery(result.data);
				setLoading(false);
			}
		});

		poseListener.subscribe(actionResult => {
			setRobotPose(actionResult);
		});

		moveBaseStatusListener.subscribe(result => {
			const index = result.status_list.length;
			if (index > 0) {
				if (result && result.status_list[index - 1].status === 1) {
					setDisableActions(true);
				} else if (result.status_list[index - 1].status === 3) {
					setDisableActions(false);
				}
			}
		});
		return () => {
			poseListener.unsubscribe();
			batteryListener.unsubscribe();
			moveBaseStatusListener.unsubscribe();
		};
	}, []);

	return (
		<div className="grid grid-cols-3 gap-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="col-span-1">
					<hr />
					<div className="m-20 ">
						<Button className="w-full pt-20 pb-20" variant="contained">
							<Typography variant="button" color="textPrimary">
								{activeItem}
							</Typography>
						</Button>
					</div>
					<div className="m-20">
						<Button
							variant="contained"
							onClick={handleClick(2)}
							color="primary"
							className="w-full pt-20 pb-20"
							disabled={disableActions}
						>
							{t('CALLVEHICLE')}
						</Button>
					</div>
					<hr />
					<div className="m-20 ">
						<Button className="w-full pt-20 pb-20" variant="contained" aria-haspopup="true">
							{activeDestination ? activeDestination : t('DESTINATIONSELECTION')}
						</Button>
					</div>
					<div className="m-20">
						<Button
							variant="contained"
							color="secondary"
							onClick={handleClick(3)}
							className="w-full pt-20 pb-20"
							disabled={disableActions}
						>
							{t('SENDVEHICLE')}
						</Button>
					</div>
					<hr />
					<div className="m-20">
						<Button
							variant="contained"
							onClick={handleClick(4)}
							className="w-full pt-36 pb-36"
							style={{ backgroundColor: '#20D703' }}
							disabled={disableActions}
						>
							{t('JOBCOMPLETED')}
						</Button>
					</div>
					<div>{loading ? <FuseLoading /> : <Battery battery={battery} />}</div>
				</div>
			</FuseAnimate>
			<div className="col-span-2">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<div className={classes.root} className="ml-80">
						{
							<img
								src="/assets/images/patika/map1scaled.png"
								alt="ptk-map"
								style={{ position: 'absolute' }}
							/>
						}
						<RobotMarkers robotPose={robotPose} />
					</div>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default React.memo(Home);
