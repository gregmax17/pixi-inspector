export function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getDisplayObjectById(id, parent) {
	let displayObject = null;
	if (parent.children) {
		for (let i = 0; i < parent.children.length && !displayObject; i++) {
			let kid = parent.children[i];
			if (kid.__inspectorId === id) {
				displayObject = kid;
			}
			else {
				displayObject = getDisplayObjectById(id, kid);
			}
		}
	}
	return displayObject;
};

export function getDisplayObjectType(displayObject) {
	
}

export function updateProperty(context, property, value) {
	let object = context.displayObject;

	if (/visible/.test(property)) {
		value = event.target.checked || object.visible;
	}
	else if (/scale|anchor|pivot|skew/.test(property)) {
		let n = property.split('.');
		object = object[n[0]];
		property = n[1];
	}

	object[property] = value;

	context.selectedDisplayObject(context.displayObject);
}