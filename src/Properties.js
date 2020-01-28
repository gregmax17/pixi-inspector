import React, { useContext } from 'react';
import Draggable from 'react-draggable';
import DisplayObjectContext from './DisplayObjectContext';
import { isNumber, updateProperty } from './utils';

let key = {};

class Properties extends React.Component {
	static contextType = DisplayObjectContext;

	constructor(props) {
		super(props);

		this.state = {
			show: false
		};

		window.addEventListener('mousewheel', this.onWheelProperty);
		document.addEventListener('keydown', this.onKeyEvent);
		document.addEventListener('keyup', this.onKeyEvent);
	}

	onKeyEvent = (event) => {
		let displayObject = this.context.displayObject;
		if (!displayObject) {
			return;
		}

		let theKey = event.key.toLowerCase();
		key[theKey] = event.type === 'keydown';
		// console.log(event.type, event.target, key.arrowup, key.arrowdown, event.key.toLowerCase());

		if (event.type === 'keydown' && key.d && event.key.search(/arrow/i) === 0) {
			event.preventDefault();

			if (key.arrowLeft) {
				displayObject.x--;
			}
			if (key.arrowRight) {
				displayObject.x--;
			}
			if (key.arrowUp) {
				displayObject.y--;
			}
			if (key.arrowDown) {
				displayObject.y++;
			}
		}
		else if (event.type === 'keyup' && event.target instanceof HTMLInputElement && /(arrowup|arrowdown)/.test(theKey)) {
			event.preventDefault();

			let dir = /arrowdown/.test(theKey) ? -1 : 1;
			let name = event.target.name;
			let value = parseFloat(event.target.value);

			if (isNumber(value)) {
				let amount = (/scale|alpha/i.test(name) ? 0.1 : 1) * dir;
				updateProperty(this.context, name, value + amount);
			}
		}
	}

	onWheelProperty = (event) => {
		if (document.activeElement !== event.target) {
			return;
		}

		let value = parseFloat(event.target.value);
		if (!isNumber(value)) {
			return;
		}

		let amount = Math.sign(event.deltaY);
		if (event.ctrlKey) {
			amount *= 10;
		}

		updateProperty(this.context, event.target.name, value + amount);
	}

	onChangeProperty = (event) => {
		updateProperty(this.context, event.target.name, event.target.value);
	}

	showProperties(displayObject) {
		return (
			<dl>
				<dt>name</dt>
				<dd>
					<input type="text" name="name" value={displayObject.name || ''} onChange={this.onChangeProperty} />
				</dd>
				<dt>visible</dt>
				<dd>
					<input type="checkbox" name="visible" checked={displayObject.visible ? "checked" : ''} onChange={this.onChangeProperty} />
				</dd>
				<dt>x/y/z</dt>
				<dd>
					<input type="text" name="x" size="4" value={displayObject.x} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="y" size="4" value={displayObject.y} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="zIndex" size="4" value={displayObject.zIndex} onChange={this.onChangeProperty} />
				</dd>
				<dt>scale x/y</dt>
				<dd>
					<input type="text" name="scale.x" size="4" value={displayObject.scale.x} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="scale.y" size="4" value={displayObject.scale.y} onChange={this.onChangeProperty} />
				</dd>
				{displayObject.anchor && <Fragment>
					<dt>anchor x/y</dt>
					<dd>
						<input type="text" name="anchor.x" size="4" value={displayObject.anchor.x} onChange={this.onChangeProperty} /> &nbsp;
						<input type="text" name="anchor.y" size="4" value={displayObject.anchor.y} onChange={this.onChangeProperty} />
					</dd>
				</Fragment>}
				<dt>pivot x/y</dt>
				<dd>
					<input type="text" name="pivot.x" size="4" value={displayObject.pivot.x} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="pivot.y" size="4" value={displayObject.pivot.y} onChange={this.onChangeProperty} />
				</dd>
				<dt>skew x/y</dt>
				<dd>
					<input type="text" name="skew.x" size="4" value={displayObject.skew.x} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="skew.y" size="4" value={displayObject.skew.y} onChange={this.onChangeProperty} />
				</dd>
				<dt>angle/rotation</dt>
				<dd>
					<input type="text" name="angle" size="8" value={displayObject.angle} onChange={this.onChangeProperty} /> &nbsp;
					<input type="text" name="rotation" size="8" value={displayObject.rotation} onChange={this.onChangeProperty} />
				</dd>
			</dl>
		);
	}

	render() {
		return (
			<Draggable handle="h4">
				<div className="inspector-box" style={{ right: 0, left: null }}>
					<h4 onDoubleClick={() => this.setState({ show: !this.state.show })}>Display Object</h4>
					<div style={{ display: this.state.show ? '' : 'none' }}>
						<DisplayObjectContext.Consumer>
							{(context) => {
								// console.log('c', context ? context.displayObject : 'none');
								if (!context || !context.displayObject) {
									return null;
								}
								return this.showProperties(context.displayObject);
							}}
						</DisplayObjectContext.Consumer>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default Properties;