import './styles.scss';

import React from 'react';
import DisplayObjectProvider from './DisplayObjectProvider';
import Hierarchy from './Hierarchy';
import Properties from './Properties';

class Inspector extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayObject: null
		};

		this.props.pixi.Ticker.shared.add(this.update, this);
	}

	update(event) {
		// this.hierarchy.refresh();
		// this.forceUpdate();
	}

	// onSelectedDisplayObject = (displayObject) => {
	// 	this.setState({ 
	// 		displayObject: displayObject
	// 	});
	// }

	render() {
		return (
			<DisplayObjectProvider>
				<Hierarchy stage={this.props.stage} />
				<Properties />
			</DisplayObjectProvider>
		);
	}
}

export default Inspector;