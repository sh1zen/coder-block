ace.define("ace/ext/static-css",["require","exports","module"],(function(e,t,n){n.exports=".ace_static_highlight {\n    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', 'Droid Sans Mono', monospace;\n    font-size: 12px;\n    white-space: pre-wrap\n}\n\n.ace_static_highlight .ace_gutter {\n    width: 2em;\n    text-align: right;\n    padding: 0 3px 0 0;\n    margin-right: 3px;\n    contain: none;\n}\n\n.ace_static_highlight.ace_show_gutter .ace_line {\n    padding-left: 2.6em;\n}\n\n.ace_static_highlight .ace_line { position: relative; }\n\n.ace_static_highlight .ace_gutter-cell {\n    -moz-user-select: -moz-none;\n    -khtml-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    position: absolute;\n}\n\n\n.ace_static_highlight .ace_gutter-cell:before {\n    content: counter(ace_line, decimal);\n    counter-increment: ace_line;\n}\n.ace_static_highlight {\n    counter-reset: ace_line;\n}\n"})),ace.define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text","ace/ext/static-css","ace/config","ace/lib/dom","ace/lib/lang"],(function(e,t,n){"use strict";var i=e("../edit_session").EditSession,s=e("../layer/text").Text,o=e("./static-css"),r=e("../config"),a=e("../lib/dom"),c=e("../lib/lang").escapeHTML,l=function(){function e(e){this.className,this.type=e,this.style={},this.textContent=""}return e.prototype.cloneNode=function(){return this},e.prototype.appendChild=function(e){this.textContent+=e.toString()},e.prototype.toString=function(){var e=[];if("fragment"!=this.type){e.push("<",this.type),this.className&&e.push(" class='",this.className,"'");var t=[];for(var n in this.style)t.push(n,":",this.style[n]);t.length&&e.push(" style='",t.join(""),"'"),e.push(">")}return this.textContent&&e.push(this.textContent),"fragment"!=this.type&&e.push("</",this.type,">"),e.join("")},e}(),h={createTextNode:function(e,t){return c(e)},createElement:function(e){return new l(e)},createFragment:function(){return new l("fragment")}},u=function(){this.config={},this.dom=h};u.prototype=s.prototype;var p=function(e,t,n){var i=e.className.match(/lang-(\w+)/),s=t.mode||i&&"ace/mode/"+i[1];if(!s)return!1;var o=t.theme||"ace/theme/textmate",r="",c=[];if(e.firstElementChild)for(var l=0,h=0;h<e.childNodes.length;h++){var u=e.childNodes[h];3==u.nodeType?(l+=u.data.length,r+=u.data):c.push(l,u)}else r=e.textContent,t.trim&&(r=r.trim());p.render(r,s,o,t.firstLineNumber,!t.showGutter,(function(t){a.importCssString(t.css,"ace_highlight",!0),e.innerHTML=t.html;for(var i=e.firstChild.firstChild,s=0;s<c.length;s+=2){var o=t.session.doc.indexToPosition(c[s]),r=c[s+1],l=i.children[o.row];l&&l.appendChild(r)}n&&n()}))};p.render=function(e,t,n,s,o,a){var c,l=1,h=i.prototype.$modes;function u(){var i=p.renderSync(e,t,n,s,o);return a?a(i):i}return"string"==typeof n&&(l++,r.loadModule(["theme",n],(function(e){n=e,--l||u()}))),t&&"object"==typeof t&&!t.getTokenizer&&(t=(c=t).path),"string"==typeof t&&(l++,r.loadModule(["mode",t],(function(e){h[t]&&!c||(h[t]=new e.Mode(c)),t=h[t],--l||u()}))),--l||u()},p.renderSync=function(e,t,n,s,r){s=parseInt(s||1,10);var a=new i("");a.setUseWorker(!1),a.setMode(t);var c=new u;c.setSession(a),Object.keys(c.$tabStrings).forEach((function(e){if("string"==typeof c.$tabStrings[e]){var t=h.createFragment();t.textContent=c.$tabStrings[e],c.$tabStrings[e]=t}})),a.setValue(e);var l=a.getLength(),p=h.createElement("div");p.className=n.cssClass;var g=h.createElement("div");g.className="ace_static_highlight"+(r?"":" ace_show_gutter"),g.style["counter-reset"]="ace_line "+(s-1);for(var d=0;d<l;d++){var f=h.createElement("div");if(f.className="ace_line",!r){var m=h.createElement("span");m.className="ace_gutter ace_gutter-cell",m.textContent="",f.appendChild(m)}c.$renderLine(f,d,!1),f.textContent+="\n",g.appendChild(f)}return p.appendChild(g),{css:o+n.cssText,html:p.toString(),session:a}},n.exports=p,n.exports.highlight=p})),ace.require(["ace/ext/static_highlight"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));