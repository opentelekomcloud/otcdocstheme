/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const t=t=>!!t.shadowRoot&&!!t.attachShadow,n=t=>{let n=document.styleSheets[0];if(!n){const t=document.createElement("style");document.head.appendChild(t),n=document.styleSheets[0],document.head.removeChild(t)}return function(){try{return/^:/.test(t)||(t=":"+t),n.insertRule("html"+t+"{}",0),n.deleteRule(0),!0}catch(t){return!1}}()};function e(t,n,e){const c=n+"Legacy",o=[];return void 0!==t[c]&&o.push(t[c].emit(e)),o.push(t[n].emit(e)),o}function c(t,n){let e=t.target;const c=null!=e.shadowRoot,o=c?t.composedPath():[];do{if(e===n)return!1;e=c?o.shift():e.parentNode}while(e);return!0}const o=t=>null!=t&&1===t.nodeType&&"SCALE-ICON"===t.nodeName.toUpperCase().substring(0,10);let u=0;function r(){return u++}const s=t=>Promise.all(t.getAnimations({subtree:!0}).map((t=>t.finished)));export{s as a,c as b,n as c,e,r as g,t as h,o as i}