/**
 * Internal block libraries
 */
import { Component } from '@wordpress/element';

import { BlockControls } from '@wordpress/block-editor';
import { alignLeft } from '@wordpress/icons';

import { Toolbar, ToolbarButton } from '@wordpress/components';

// beautify code
import Beautify from 'ace-builds/src-min-noconflict/ext-beautify';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class CustomToolbar extends Component {

	constructor() {
		super(...arguments);
	}

	render() {

		const { setAttributes, editor } = this.props;

		return (
			<BlockControls>
				<Toolbar>
					<ToolbarButton
						label={"Beautify"}
						icon={alignLeft}
						onClick={() => setAttributes(Beautify.beautify(editor.session))}
					/>
					</Toolbar>
			</BlockControls>
		);
	}
}
