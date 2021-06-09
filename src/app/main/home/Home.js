import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DemoContent from './DemoContent';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function ExamplePage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-12">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			contentToolbar={<div className="px-24" />}
			content={
				<div className="p-24">
					<DemoContent />
				</div>
			}
		/>
	);
}

export default ExamplePage;
