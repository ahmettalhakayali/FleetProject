import ROSLIB from 'roslib';
import _ from '@lodash';

const rosConnect = function (url) {
	const ros = new ROSLIB.Ros({
		url: url
	});
	ros.on('connection', function () {
		console.log('wowza connected');
	});
	ros.on('error', function (error) {
		console.log('Error connecting to websocket server: ', error);
	});
	ros.on('close', function () {
		console.log('Connection to websocket server closed.');
	});
	return ros;
};

const makeGoal = function (ros, Vx, Vy, Oz, Ow) {
	const actionClient = new ROSLIB.ActionClient({
		ros: ros,
		serverName: '/move_base',
		actionName: 'move_base_msgs/MoveBaseAction'
	});
	const positionVec3 = new ROSLIB.Vector3({ x: Vx, y: Vy, z: 0.0 });
	const orientation = new ROSLIB.Quaternion({ x: 0.0, y: 0.0, z: Oz, w: Ow });
	const pose = new ROSLIB.Pose({
		position: positionVec3,
		orientation: orientation
	});
	const goal = new ROSLIB.Goal({
		actionClient: actionClient,
		goalMessage: {
			target_pose: {
				header: {
					frame_id: '/map'
				},
				pose: pose
			}
		}
	});
	return goal;
};

const rosPoseListener = function (ros) {
	var pose_listener = new ROSLIB.Topic({
		ros: ros,
		name: '/robot_pose',
		messageType: 'geometry_msgs/Pose'
	});

	return pose_listener;
};

const rosMoveBaseStatusListener = function (ros) {
	var status_listener = new ROSLIB.Topic({
		ros: ros,
		name: '/move_base/status',
		messageType: 'actionlib_msgs/GoalStatusArray'
	});

	return status_listener;
};

const rosBatteryListener = function (ros) {
	var battery_listener = new ROSLIB.Topic({
		ros: ros,
		name: '/battery',
		messageType: 'std_msgs/Int16'
	});

	return battery_listener;
};
const rosInitialPose = function (ros) {
	let initialPose = new ROSLIB.Topic({
		ros: ros,
		name: '/initialpose',
		messageType: 'geometry_msgs/PoseWithCovarianceStamped'
	});
	const positionVec3 = new ROSLIB.Vector3({ x: -0.560553076287, y: -0.19738611083, z: 0.0 });
	const orientation = new ROSLIB.Quaternion({ x: 0.0, y: 0.0, z: 0.375082692774, w: 0.926991355721 });
	const pose = new ROSLIB.Pose({
		position: positionVec3,
		orientation: orientation
	});
	var posMsg = new ROSLIB.Message({
		header: {
			seq: 0,
			stamp: {
				secs: 0,
				nsecs: 0
			},
			frame_id: '/map'
		},
		pose: {
			pose,
			covariance: [
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0,
				0.0
			]
		}
	});
	initialPose.publish(posMsg);
};

const rosInitialTwist = function (ros) {
	var cmdVel = new ROSLIB.Topic({
		ros: ros,
		name: '/cmd_vel',
		messageType: 'geometry_msgs/Twist'
	});

	var twist = new ROSLIB.Message({
		linear: {
			x: 0.0,
			y: 0.0,
			z: 0.0
		},
		angular: {
			x: -0.0,
			y: -0.0,
			z: -0.15
		}
	});
	var twist2 = new ROSLIB.Message({
		linear: {
			x: 0.0,
			y: 0.0,
			z: 0.0
		},
		angular: {
			x: -0.0,
			y: -0.0,
			z: 0.15
		}
	});
	var cancel = new ROSLIB.Message({
		linear: {
			x: 0.0,
			y: 0.0,
			z: 0.0
		},
		angular: {
			x: -0.0,
			y: -0.0,
			z: -0.0
		}
	});

	//TODO: setTimeout Promise Delay
	//Publishing velocity commands for initial Twist with IIFE
	(function publishTwist() {
		cmdVel.publish(twist);
		setTimeout(() => cmdVel.publish(twist2), 15000);
		setTimeout(() => cmdVel.publish(cancel), 30000);
	})();
};
const initialPose = {
	position: {
		x: 100.0,
		y: 100.0,
		z: 100.0
	},
	orientation: {
		x: 0.0,
		y: 0.0,
		z: 0.0,
		w: 0.0
	}
};

function calculateEuler(qw, qx, qy, qz) {
	var x = 0;
	var y = 0;
	var z = 0;
	var qw2 = qw * qw;
	var qx2 = qx * qx;
	var qy2 = qy * qy;
	var qz2 = qz * qz;
	var test = qx * qy + qz * qw;
	if (test > 0.499) {
		y = (360 / Math.PI) * Math.atan2(qx, qw);
		z = 90;
		x = 0;
		const res = { x, y, z };

		return res;
	}
	if (test < -0.499) {
		y = (-360 / Math.PI) * Math.atan2(qx, qw);
		z = -90;
		x = 0;
		const res = { x, y, z };
		return res;
	}
	var h = Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy2 - 2 * qz2);
	var a = Math.asin(2 * qx * qy + 2 * qz * qw);
	var b = Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx2 - 2 * qz2);
	y = Math.round((h * 180) / Math.PI);
	z = Math.round((a * 180) / Math.PI);
	x = Math.round((b * 180) / Math.PI);
	const res = { x, y, z };
	return res;
}

//create instances
//const ros1 = rosConnect('ws://192.168.168.200:9090');
const ros1 = rosConnect('ws://192.168.168.200:9090');
const ros2 = rosConnect('ws://192.168.1.201:9090');


export {
	makeGoal,
	rosPoseListener,
	rosBatteryListener,
	rosMoveBaseStatusListener,
	rosConnect,
	rosInitialPose,
	rosInitialTwist,
	calculateEuler,
	initialPose,
	ros1,
	ros2
};
