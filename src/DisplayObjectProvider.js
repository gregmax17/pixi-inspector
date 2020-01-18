import React from 'react';
import DisplayObjectContext from './DisplayObjectContext.js';

class DisplayObjectProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayObject: null
		};
	}

	render() {
		return (
			<DisplayObjectContext.Provider value={{
				displayObject: this.state.displayObject,
				selectedDisplayObject: (displayObject) => {
					// console.log('do: ', displayObject);
					this.setState({ 
						displayObject: displayObject
					});
				}
			}}>
				{this.props.children}
			</DisplayObjectContext.Provider>
		);
	}
}

export default DisplayObjectProvider;