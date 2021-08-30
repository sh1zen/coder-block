/**
 * @author    sh1zen
 * @copyright Copyright (C)  2021
 * @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
 */

(function ($) {
    'use strict';

    function copyToClipboard(text) {
        let dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    $(window).load(function () {

        let CoderBlock = $('pre.im-coder-block');

        if (!CoderBlock.length > 0) return;

        CoderBlock.each(function (index) {

            let codeElement = $(this),
                editor = ace.edit(codeElement[0]),
                showLines = codeElement.data('showlines');

            let copyButton = codeElement.parent().children()[0];

            showLines = 'undefined' === typeof (showLines) || showLines;

            editor.setTheme('ace/theme/' + codeElement.data('theme'));
            editor.session.setMode({path: 'ace/mode/' + codeElement.data('mode'), inline: true});
            editor.setFontSize(codeElement.data('fontsize'));
            editor.setOptions({
                readOnly: true,
                useWorker: false,
                showPrintMargin: false,
                autoScrollEditorIntoView: true,
                maxLines: codeElement.data('lines'),
                highlightActiveLine: false,
                highlightGutterLine: false,
                showLineNumbers: showLines,
                showGutter: showLines
            });
            editor.renderer.$cursorLayer.element.style.opacity = 0;

            editor.renderer.on('afterRender', function () {
                if (codeElement.parent().hasClass('im-coder-block')) {
                    codeElement.parent().css('height', editor.renderer.layerConfig.height);
                }
            });

            copyButton.addEventListener('dblclick', function () {
                let button = $(this);
                button.css('transform', 'scale(1.1)');
                setTimeout(function () {
                    button.css('transform', 'scale(1)');
                }, 200);
                copyToClipboard(editor.getValue());
            });
        });
    });
})(jQuery);