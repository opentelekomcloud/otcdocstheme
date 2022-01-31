import{r as a,c as s,h as t,a as o,g as i}from"./p-7c16486e.js";import{c as e}from"./p-c608c6dc.js";import{e as n}from"./p-3bc9966d.js";function r(a,s,t,o=20,i=0){const e=[];if(i>=o)return e;const n=a=>{const e=a.assignedNodes().filter((a=>1===a.nodeType));return e.length>0?r(e[0].parentElement,s,t,o,i+1):[]},l=Array.from(a.children||[]);for(const a of l)s(a)||(t(a)&&e.push(a),null!=a.shadowRoot?e.push(...r(a.shadowRoot,s,t,o,i+1)):"SLOT"===a.tagName?e.push(...n(a)):e.push(...r(a,s,t,o,i+1)));return e}function l(a){return a.hasAttribute("hidden")||a.hasAttribute("aria-hidden")&&"false"!==a.getAttribute("aria-hidden")||"none"===a.style.display||"0"===a.style.opacity||"hidden"===a.style.visibility||"collapse"===a.style.visibility}function c(a){return"-1"!==a.getAttribute("tabindex")&&!l(a)&&!function(a){return a.hasAttribute("disabled")||a.hasAttribute("aria-disabled")&&"false"!==a.getAttribute("aria-disabled")}(a)&&(a.hasAttribute("tabindex")||(a instanceof HTMLAnchorElement||a instanceof HTMLAreaElement)&&a.hasAttribute("href")||a instanceof HTMLButtonElement||a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a instanceof HTMLSelectElement||a instanceof HTMLIFrameElement)}
/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */function d(a,s,t){const o=a.animate(s,Object.assign(Object.assign({},t),{fill:"both"}));return o.addEventListener("finish",(()=>{o.commitStyles(),o.cancel()})),o}const h={easing:"cubic-bezier(0.390, 0.575, 0.565, 1.000)"},p={fadeIn:[Object.assign(Object.assign({offset:0},h),{opacity:0}),Object.assign(Object.assign({offset:1},h),{opacity:1})],fadeOut:[Object.assign(Object.assign({offset:0},h),{opacity:1}),Object.assign(Object.assign({offset:1},h),{opacity:0})],fadeInTop:[Object.assign(Object.assign({offset:0},h),{opacity:0,transform:"translateY(-3rem)"}),Object.assign(Object.assign({offset:1},h),{opacity:1,transform:"translateY(0)"})]},g="ResizeObserver"in window,b=class{constructor(t){a(this,t),this.scaleOpen=s(this,"scale-open",7),this.scaleOpenLegacy=s(this,"scaleOpen",7),this.scaleBeforeClose=s(this,"scale-before-close",7),this.scaleBeforeCloseLegacy=s(this,"scaleBeforeClose",7),this.scaleClose=s(this,"scale-close",7),this.scaleCloseLegacy=s(this,"scaleClose",7),this.customClass="",this.size="default",this.opened=!1,this.duration=200,this.closeButtonLabel="Close Pop-up",this.alignActions="right",this.isOpen=this.opened||!1,this.hasActionsSlot=!1,this.hasBody=!1,this.hasScroll=!1,this.focusableElements=[],this.handleTopFocus=()=>{this.attemptFocus(this.getLastFocusableElement())},this.handleBottomFocus=()=>{this.attemptFocus(this.getFirstFocusableElement())}}handleKeypress(a){this.isOpen&&"Escape"===a.key&&this.emitBeforeClose("ESCAPE_KEY")}disconnectedCallback(){this.resizeObserver&&this.resizeObserver.disconnect()}componentWillRender(){const a=this.hostElement.querySelectorAll('[slot="action"]'),s=Array.from(this.hostElement.shadowRoot.querySelectorAll("slot")).find((a=>!a.name));this.hasActionsSlot=a.length>0,null!=s&&(this.hasBody=s.assignedElements().length>0)}emitBeforeClose(a){n(this,"scaleBeforeClose",{trigger:a}).some((a=>a.defaultPrevented))||(this.opened=!1)}componentDidLoad(){this.focusableElements=r(this.hostElement.shadowRoot,(a=>l(a)||a.matches("[data-focus-trap-edge]")),c),g&&(this.resizeObserver=new ResizeObserver((()=>{this.setHasScroll()})),this.resizeObserver.observe(this.modalBody)),this.setHasScroll()}setHasScroll(){const a=this.modalBody;this.hasScroll=a.scrollHeight>a.clientHeight}getFirstFocusableElement(){return this.focusableElements[0]}getLastFocusableElement(){return this.focusableElements[this.focusableElements.length-1]}attemptFocus(a){null!=a?a.focus():this.closeButton.focus()}openedChanged(a){!0===a?this.open():this.close()}open(){this.isOpen=!0;try{d(this.modalWindow,p.fadeInTop,{duration:this.duration,delay:.5*this.duration}),d(this.modalContainer,p.fadeIn,{duration:this.duration}).addEventListener("finish",(()=>{this.attemptFocus(this.getFirstFocusableElement()),n(this,"scaleOpen")}))}catch(a){n(this,"scaleOpen")}}close(){try{d(this.modalContainer,p.fadeOut,{duration:this.duration}).addEventListener("finish",(()=>{this.isOpen=!1,n(this,"scaleClose")}))}catch(a){this.isOpen=!1,n(this,"scaleClose")}}render(){return t(o,null,this.styles&&t("style",null,this.styles),t("div",{ref:a=>this.modalContainer=a,class:this.getCssClassMap(),part:e("base",this.isOpen&&"open")},t("div",{class:"modal__backdrop",part:"backdrop",onClick:()=>this.emitBeforeClose("BACKDROP")}),t("div",{"data-focus-trap-edge":!0,onFocus:this.handleTopFocus,tabindex:"0"}),t("div",{class:"modal__window",part:e("window",this.size&&`size-${this.size}`),ref:a=>this.modalWindow=a,role:"dialog","aria-modal":"true","aria-label":this.heading,title:this.heading},t("div",{class:"modal__header",part:e("header",this.hasScroll&&"has-scroll")},t("h2",{class:"modal__heading",part:"heading"},this.heading),t("button",{ref:a=>this.closeButton=a,class:"modal__close-button",part:"close-button",onClick:()=>this.emitBeforeClose("CLOSE_BUTTON"),"aria-label":this.closeButtonLabel},t("slot",{name:"close-icon"},t("scale-icon-action-circle-close",{decorative:!0})))),t("div",{ref:a=>this.modalBody=a,class:"modal__body-wrapper",part:e("body-wrapper",this.hasBody&&"has-body")},t("div",{class:"modal__body",part:e("body",this.hasBody&&"has-body")},t("slot",null))),t("div",{class:"modal__actions",part:e("actions",`align-${this.alignActions}`,this.hasActionsSlot&&"has-actions",this.hasScroll&&"has-scroll")},t("slot",{name:"action"}))),t("div",{"data-focus-trap-edge":!0,onFocus:this.handleBottomFocus,tabindex:"0"})))}getCssClassMap(){return e("modal",this.isOpen&&"modal--is-open",this.hasActionsSlot&&"modal--has-actions",`modal--align-actions-${this.alignActions}`,this.hasScroll&&"modal--has-scroll",this.hasBody&&"modal--has-body",this.size&&`modal--size-${this.size}`)}get hostElement(){return i(this)}static get watchers(){return{opened:["openedChanged"]}}};b.style=":host{--spacing-x:var(--scl-spacing-16);--background-overlay:var(\n    --scl-color-background-overlay,\n    rgba(108, 108, 108, 0.7)\n  );--max-height-window:calc(100vh - (2 * var(--scl-spacing-80)));--radius-window:var(--scl-radius-12);--box-shadow-window:var(--scl-shadow-level-5);--size-window-small:calc(\n    (6 * var(--scl-spacing-56, 3.5rem)) + (5 * var(--scl-spacing-32))\n  );--size-window-default:calc(\n    (8 * var(--scl-spacing-56, 3.5rem)) + (7 * var(--scl-spacing-32))\n  );--size-window-large:calc(\n    (12 * var(--scl-spacing-56, 3.5rem)) + (11 * var(--scl-spacing-32))\n  );--spacing-x-header:var(--scl-spacing-24);--spacing-y-header:var(--scl-spacing-24);--border-bottom-header-has-scroll:var(--scl-spacing-1) solid\n    var(--scl-color-grey-20);--font-family-heading:var(--scl-font-family-sans);--font-size-heading:var(--scl-font-size-20);--font-weight-heading:var(--scl-font-weight-extrabold);--spacing-close-button:var(--scl-spacing-8);--radius-close-button:var(--scl-radius-8);--transition-close-button:all var(--scl-motion-duration-fast)\n    var(--scl-motion-easing-standard);--box-shadow-close-button-focus:0 0 0 var(--scl-spacing-2)\n    var(--scl-color-focus);--color-close-button-hover:var(--scl-color-primary-hover);--color-close-button-active:var(--scl-color-primary-active);--spacing-x-body-wrapper:var(--scl-spacing-24);--spacing-y-body:var(--scl-spacing-24);--spacing-actions:var(--scl-spacing-24);--spacing-x-actions-slotted:var(--scl-spacing-8);--background-actions-has-scroll:var(--scl-color-background-light)}.modal{top:0;left:0;width:100%;bottom:0;display:none;z-index:100;position:fixed;background:var(--background-overlay);box-sizing:border-box;align-items:center;justify-content:center;padding-left:var(--spacing-x);padding-right:var(--spacing-x)}.modal.modal--is-open{display:flex}.modal__backdrop{top:0;left:0;width:100%;height:100%;z-index:0;position:absolute}.modal__window{width:100%;height:auto;display:flex;z-index:1;position:relative;overflow-y:auto;flex-direction:column;background-color:var(--scl-color-background-standard);max-height:var(--max-height-window);border-radius:var(--radius-window);box-shadow:var(--box-shadow-window)}.modal__window .modal__body-wrapper{overflow-y:auto;flex-shrink:1}.modal--size-small .modal__window{max-width:var(--size-window-small)}.modal--size-default .modal__window{max-width:var(--size-window-default)}.modal--size-large .modal__window{max-width:var(--size-window-large)}@media (max-height: 30em){.modal__window{max-height:calc(100vh - var(--scl-spacing-24))}}.modal__window:after{top:0;left:0;width:100%;border:1px solid transparent;height:100%;content:'';display:block;position:absolute;box-sizing:border-box;pointer-events:none;border-radius:var(--radius-window)}.modal__header{display:flex;align-items:flex-start;flex-shrink:0;justify-content:space-between;margin-left:var(--spacing-x-header);margin-right:var(--spacing-x-header);padding-top:var(--spacing-y-header);padding-bottom:var(--spacing-y-header)}.modal--has-scroll .modal__header{border-bottom:var(--border-bottom-header-has-scroll)}.modal__heading{margin:0;font-family:var(--font-family-heading);font-size:var(--font-size-heading);font-weight:var(--font-weight-heading)}.modal__close-button{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;padding:var(--spacing-close-button);margin-bottom:calc(-2 * var(--spacing-close-button));border:0;border-radius:var(--radius-close-button);outline:none;background:transparent;transition:var(--transition-close-button);transform:translate(\n    var(--spacing-close-button),\n    calc(-1 * var(--spacing-close-button))\n  );appearance:none;cursor:pointer;user-select:none;color:var(--scl-color-text-standard)}.modal__close-button:focus{box-shadow:var(--box-shadow-close-button-focus)}.modal__close-button:hover{color:var(--color-close-button-hover)}.modal__close-button:active{color:var(--color-close-button-active)}.modal__body-wrapper{padding-left:var(--spacing-x-body-wrapper);padding-right:var(--spacing-x-body-wrapper)}.modal--has-body .modal__body-wrapper{min-height:var(--scl-spacing-48)}.modal--has-body .modal__body{margin-top:var(--spacing-y-body);margin-bottom:var(--spacing-y-body)}.modal__actions{display:none;flex-shrink:0;justify-content:flex-end;padding:var(--spacing-actions)}.modal__actions ::slotted(*){margin-left:var(--spacing-x-actions-slotted)}.modal--has-actions .modal__actions{display:flex}.modal--align-actions-left .modal__actions{justify-content:flex-start}.modal--has-scroll .modal__actions{background-color:var(--background-actions-has-scroll)}";export{b as scale_modal}