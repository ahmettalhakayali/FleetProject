import React from 'react';
import { Button } from '@material-ui/core';
import {rosInitialPose,rosInitialTwist} from '../Home/ROS';
import {Link} from 'react-router-dom'
function Admin({ ros1 }) {
	function handleClick() {
		rosInitialPose(ros1);
        rosInitialTwist(ros1);        
	}
	return (
		<div>
			<Button
				variant="contained"
				onClick={handleClick}
				className="w-full pt-36 pb-36"
				style={{ backgroundColor: '#20D703' }}
			>
				Set Initial Pose
			</Button>
			<Button
					component={Link}
					to="/app-2"
					className="whitespace-nowrap mt-12"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Manage Stations</span>
				</Button>
		</div>
	);
}
export default React.memo(Admin);
