import React from 'react';

function DemoContent() {
	return (
		<div>
			<img
				src="assets/images/demo-content/morain-lake.jpg"
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-6"
			/>
			<h1 className="py-16">Hoşgeldiniz!</h1>
			<h4 className="pb-12">Menü'den bölge seçiminizi yapın</h4>
		</div>
	);
}

export default React.memo(DemoContent);
