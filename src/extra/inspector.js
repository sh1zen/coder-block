/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { cloud } from '@wordpress/icons';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const { attributes, setAttributes, } = this.props;

		const { mode, theme, lines, fontsize, showLinesNumber, autocompletion, evaluate, showSource, doShortCodes , useACE} = attributes;

		const marks = [
			{
				value: 101,
				label: __('All lines', 'coder-block')
			}
		];

		return (
			<Fragment>
				<InspectorControls key='ace-settings'>
					<PanelBody title='IDE Settings'>
						<SelectControl
							label={__('Languages', 'coder-block')}
							value={mode}
							options={[
								{
									value: 'php',
									label: __('PHP', 'coder-block'),
								},
								{
									value: 'css',
									label: __('CSS', 'coder-block'),
								},
								{
									value: 'sass',
									label: __('SASS', 'coder-block'),
								},
								{
									value: 'scss',
									label: __('SCSS', 'coder-block'),
								},
								{
									value: 'less',
									label: __('LESS', 'coder-block'),
								},
								{
									value: 'html',
									label: __('HTML', 'coder-block'),
								},
								{
									value: 'java',
									label: __('JAVA', 'coder-block'),
								},
								{
									value: 'javascript',
									label: __('JAVASCRIPT', 'coder-block'),
								},
								{
									value: 'typescript',
									label: __('TYPESCRIPT', 'coder-block'),
								},
								{
									value: 'tsx',
									label: __('TSX', 'coder-block'),
								},
								{
									value: 'jsx',
									label: __('JSX', 'coder-block'),
								},
								{
									value: 'xml',
									label: __('XML', 'coder-block'),
								},
								{
									value: 'json',
									label: __('JSON', 'coder-block'),
								},
								{
									value: 'text',
									label: __('TEXT', 'coder-block'),
								},
								{
									value: 'plain_text',
									label: __('PLAIN TEXT', 'coder-block'),
								},
								{
									value: 'markdown',
									label: __('MARKDOWN', 'coder-block'),
								},
								{
									value: 'mysql',
									label: __('MYSQL', 'coder-block'),
								},
								{
									value: 'sql',
									label: __('SQL', 'coder-block'),
								},
								{
									value: 'sqlserver',
									label: __('SQLSERVER', 'coder-block'),
								},
								{
									value: 'svg',
									label: __('SVG', 'coder-block'),
								},
								{
									value: 'powershell',
									label: __('POWERSHELL', 'coder-block'),
								},
								{
									value: 'kotlin',
									label: __('KOTLIN', 'coder-block'),
								},
								{
									value: 'swift',
									label: __('SWIFT', 'coder-block'),
								},
								{
									value: 'ruby',
									label: __('RUBY', 'coder-block'),
								},
								{
									value: 'python',
									label: __('PYTHON', 'coder-block'),
								},
								{
									value: 'lua',
									label: __('LUA', 'coder-block'),
								},
								{
									value: 'c_cpp',
									label: __('C++', 'coder-block'),
								},
								{
									value: 'csharp',
									label: __('C#', 'coder-block'),
								},
								{
									value: 'sh',
									label: __('Bash/Shell', 'coder-block'),
								},
							]}
							onChange={(mode) => setAttributes({ mode })}
						/>
						<SelectControl
							label={__('Themes', 'coder-block')}
							value={theme}
							options={[
								{ value: 'monokai', label: __('Monokai', 'coder-block') },
								{ value: 'github', label: __('Github', 'coder-block') },
								{ value: 'cobalt', label: __('Cobalt', 'coder-block') },
								{ value: 'dawn', label: __('Dawn', 'coder-block') },
								{ value: 'dracula', label: __('Dracula', 'coder-block') },
								{ value: 'eclipse', label: __('Eclipse', 'coder-block') },
								{ value: 'tomorrow', label: __('Tomorrow', 'coder-block') },
								{ value: 'tomorrow_night', label: __('Tomorrow Night', 'coder-block') },
								{ value: 'tomorrow_night_blue', label: __('Tomorrow Night Blue', 'coder-block') },
								{ value: 'tomorrow_night_bright', label: __('Tomorrow Night Bright', 'coder-block') },
								{ value: 'tomorrow_night_eighties', label: __('Tomorrow Night Eighties', 'coder-block') },
								{ value: 'twilight', label: __('Twilight', 'coder-block') },
							]}
							onChange={(theme) => setAttributes({ theme })}
						/>
						<RangeControl
							beforeIcon="arrow-left-alt2"
							afterIcon="arrow-right-alt2"
							label={__('Font size px', 'coder-block')}
							value={parseInt(fontsize)}
							onChange={(fontsize) =>
								setAttributes({ fontsize })
							}
							min={8}
							max={28}
						/>
						<RangeControl
							label={__('Lines to show in frontend without scroll', 'coder-block')}
							value={lines === 'Infinity' ? 101 : parseInt(lines)}
							min={5}
							max={101}
							marks={marks}
							onChange={(lines) => {
								if (lines > 100) lines = 'Infinity';
								setAttributes({ lines })
							}}
						/>
						<ToggleControl
							label={__('Show lines number', 'coder-block')}
							checked={showLinesNumber}
							onChange={(showLinesNumber) =>
								setAttributes({ showLinesNumber })
							}
						/>
						<ToggleControl
							label={__('Auto completion?', 'coder-block')}
							checked={autocompletion}
							onChange={(autocompletion) =>
								setAttributes({ autocompletion })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<InspectorControls key='settings'>
					<PanelBody title='Frontend' icon={cloud}>
						<ToggleControl
							label={__(
								'Evaluate the code?',
								'coder-block'
							)}
							checked={evaluate}
							onChange={(evaluate) => setAttributes({ evaluate })}
						/>
						<ToggleControl
							label={__(
								'Display code source?',
								'coder-block'
							)}
							checked={showSource}
							onChange={(showSource) => setAttributes({ showSource })}
						/>
						{showSource && <ToggleControl
							label={__(
								'Use ACE editor?',
								'coder-block'
							)}
							checked={useACE}
							onChange={(useACE) => setAttributes({ useACE })}
						/>}
						<ToggleControl
							label={__(
								'Do shortcodes?',
								'coder-block'
							)}
							checked={doShortCodes}
							onChange={(doShortCodes) => setAttributes({ doShortCodes })}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}
