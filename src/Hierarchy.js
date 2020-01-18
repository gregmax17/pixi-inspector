import React from 'react';
import Draggable from 'react-draggable';
import SortableTree, { walk } from "react-sortable-tree";
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import DisplayObjectContext from './DisplayObjectContext';
import { getDisplayObjectById, isNumber, updateProperty } from './utils.js';

let uid = 1;

class Hierarchy extends React.Component {
	constructor(props) {
		super(props);

		this.wasShowing = null;

		this.state = {
			show: false,
			data: this.getHierarchy(this.props.stage)
		};
	}

	getHierarchy(parent) {
		let kids = [];
		if (parent.children) {
			parent.children.forEach(kid => {

				// apply our own property to the display object (sorry!)
				if (!kid.__inspectorId) {
					kid.__inspectorId = uid++;
				}

				// add to the array
				kids.push({
					children: this.getHierarchy(kid),
					inspectorId: kid.__inspectorId,
					title: (
						<span>{kid.name || kid.toString()}</span>
					)
				});
			});
		}
		return kids;
	}

	// update the list
	refresh = () => {
		this.setState({
			data: this.getHierarchy(this.props.stage)
		});
	}

	// called when opening/collapsed item
	onSortChange = (newData) => {
		// console.log('sort change');
		this.setState({ 
			data: newData 
		});
	}

	// // when rendering the node
	// onGeneratedNode = ({ node }) => {
	// 	return {
	// 		onClick: () => {
	// 			let displayObject = getDisplayObjectById(node.inspectorId, this.props.stage);
	// 			console.log(displayObject);
	// 			// this.props.onSelectedDisplayObject(displayObject);
	// 		}
	// 	};
	// }

	// // after drag and drop of the display object, to find its new parent
	// onSortStateChanged = (node) => {
	// 	if (node.isDragging) {
	// 		this.draggedNode = node.draggedNode;
	// 	}
	// 	else {
	// 		console.log('new position', this.draggedNode, this.draggedNode.inspectorId);

	// 		walk({ 
	// 			treeData: this.state.data, 
	// 			callback: ({node}) => { console.log('hello', node.inspectorId); },
	// 			getNodeKey: ({ node, treeIndex }) => { console.log(node, treeIndex); },
	// 			ignoreCollapsed: false
	// 		});

	// 		this.draggedNode = null;
	// 	}
	// }

	// after change
	onMoveNode = ({ node, nextParentNode }) => {
		let stage = this.props.stage;
		let displayObject = getDisplayObjectById(node.inspectorId, stage);
		let newParent = nextParentNode ? getDisplayObjectById(nextParentNode.inspectorId, stage) : stage;
		// let pt = newParent.toLocal(displayObject);
		// console.log(pt);
		newParent.addChild(displayObject);
	}

	// seemed glitchy when dragging while open, so I'm doing this
	onDragDrag = () => {
		if (this.wasShowing === null) {
			this.wasShowing = this.state.show;
		}
		if (this.state.show) {
			this.setState({ show: false });
		}
	}

	onDragStop = () => {
		if (this.wasShowing) {
			this.setState({ show: true });
		}
		this.wasShowing = null;
	}

	render() {
		// onDragStateChanged={this.onSortStateChanged}

		return (
			<Draggable handle="h4" onDrag={this.onDragDrag} onStop={this.onDragStop}>
				<div className="inspector-box" style={{ left: 0 }}>
					<h4 onDoubleClick={() => this.setState({ show: !this.state.show })}>Hierarchy</h4>
					<div style={{ display: this.state.show ? '' : 'none' }}>
						<div style={{ width: '100%', height: 400, overflow: 'auto' }}>
							<DisplayObjectContext.Consumer>
								{context => (
									<SortableTree
										className="sortable-tree"
										treeData={this.state.data}
										onChange={this.onSortChange}
										generateNodeProps={({ node }) => {
											return {
												onClick: () => {
													// console.log(context.displayObject);
													let displayObject = getDisplayObjectById(node.inspectorId, this.props.stage);
													context.selectedDisplayObject(displayObject);
												}
											}
										}}
										onMoveNode={this.onMoveNode}
										theme={FileExplorerTheme}
										rowHeight={24}
										scaffoldBlockPxWidth={12} />
								)}
							</DisplayObjectContext.Consumer>
						</div>
						<button onClick={this.refresh} style={{ float: 'right' }}>Refresh</button>
					</div>
				</div>
			</Draggable>
		);
	}
}

export default Hierarchy;