/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
 import './editor.scss';

import { useState } from 'react';

import { useBlockProps } from '@wordpress/block-editor';

import classnames from 'classnames';
import AceEditor from 'react-ace';
import Inspector from './extra/inspector';
import CustomToolbar from './extra/toolbar';


// import "ace-builds/webpack-resolver" to dynamically load modes,
// you need to install file-loader for this to work!
import "ace-builds/webpack-resolver";

// enable autocomplete
import "ace-builds/src-min-noconflict/ext-language_tools";


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

    const { attributes, className, setAttributes } = props;
    const { mode, theme, code, fontsize, showLinesNumber, autocompletion } = attributes;

    const blockProps = useBlockProps( {
        className: classnames(className),
    } );

    const [editor, setEditor] = useState(null);

    return (
        <div {...blockProps}>

            <Inspector {...{ setAttributes, ...props }} />

            <CustomToolbar {...{ setAttributes, ...props, editor }} />

            <AceEditor
                width="100%"
                height="250px"
                minLines={10}
                maxLines={Infinity}
                fontSize={parseInt(fontsize)}
                mode={mode}
                theme={theme}
                onChange={(code) => setAttributes({ code })}
                name="ace-code"
                editorProps={{ $blockScrolling: Infinity }}
                value={code}
                onLoad={(editor) => {
                    setEditor(editor);
                    editor.setOptions({
                        firstLineNumber: 1,
                        useWorker: false,
                        mode: 'ace/mode/' + mode,
                        tabSize: 4,
                        showPrintMargin: false,
                    });
                    let session = editor.getSession();
                    session.on("changeAnnotation", function () {
                        let annotations = session.getAnnotations() || []
                        let i = annotations.length;
                        let len = annotations.length;
                        while (i--) {
                            if (/doctype first\. Expected/.test(annotations[i].text)) {
                                annotations.splice(i, 1);
                            }
                            else if (/Unexpected End of file\. Expected/.test(annotations[i].text)) {
                                annotations.splice(i, 1);
                            }
                        }
                        if (len > annotations.length) {
                            session.setAnnotations(annotations);
                        }
                    });
                }}
                wrapEnabled={true}
                navigateToFileEnd={true}
                enableSnippets={false}
                enableBasicAutocompletion={autocompletion}
                enableLiveAutocompletion={autocompletion}
                highlightActiveLine={true}
                showGutter={showLinesNumber}
                showLineNumbers={showLinesNumber}
            />
        </div>
    );
}
