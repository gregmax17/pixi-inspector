import React from 'react';
import DisplayObjectContext from './DisplayObjectContext';

class Input extends React.Component {
	static contextType = DisplayObjectContext;

	constructor(props) {
		super(props);

		this.state = {
			value: props.value
		};
	}

	onChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	componentDidUpdate(prevProps, prevState) {
		this.context.displayObject[this.props.name] = this.state.value;
		// this.props.displayObject[this.props.name] = this.state.value;
	}

	render() {
		return (
			<div>
				<input type={this.props.type} name={this.props.name} value={this.state.value} onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Input;