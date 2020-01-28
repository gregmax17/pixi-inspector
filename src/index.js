import React from 'react';
import ReactDOM from 'react-dom';
import Inspector from './Inspector.js';

const boot = (options = {}) => {

	let pixi = window.PIXI;
	if (!pixi && (options.pixi || options.PIXI)) {
		pixi = options.pixi || options.PIXI;
	}

	if (!pixi) {
		throw 'No PIXI?!';
	}

	ReactDOM.render(<Inspector pixi={pixi} stage={options.stage} />, document.getElementById(options.inspectorId || 'inspector'));
};

export { boot };

// let x = setInterval(function () {
// 	if (window.pixiAPP) {
// 		boot({ stage: window.pixiAPP.stage });
// 		clearInterval(x);
// 	}
// }, 100);