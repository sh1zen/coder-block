import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save(props) {

	const { theme, lines, fontsize, code, showLinesNumber, mode} = props.attributes;

	const blockProps = useBlockProps.save( {
        style: { marginBottom: '50px' },
    } );
	
	return (
		<div {...blockProps}>
			<pre
				className="im-coder-block"
				data-mode={mode}
				data-theme={theme}
				data-fontsize={fontsize}
				data-lines={lines}
				data-showlines={showLinesNumber}
			>
				{code}
			</pre>
		</div>
	);
}
