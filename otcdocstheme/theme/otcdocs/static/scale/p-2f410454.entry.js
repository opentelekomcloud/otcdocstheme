import{r as s,h as t,a as i,g as e}from"./p-7c16486e.js";const a=class{constructor(t){s(this,t),this.size=24,this.fill="currentColor",this.color="currentColor",this.selected=!1,this.decorative=!1}connectedCallback(){this.hostElement.hasAttribute("styles")||(this.hostElement.style.display="inline-flex")}render(){return t(i,null,t("svg",Object.assign({class:"scale-icon",xmlns:"http://www.w3.org/2000/svg",width:this.size,height:this.size,viewBox:"0 0 24 24"},this.decorative?{"aria-hidden":"true"}:{}),this.accessibilityTitle&&t("title",null,this.accessibilityTitle),t("g",{fill:"currentColor"===this.fill?this.color:this.fill},t("g",null,t("path",this.selected?{"fill-rule":"evenodd",d:"M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11A11 11 0 0012 1zm5 11.75h-4.25V17a.75.75 0 11-1.5 0v-4.25H7a.75.75 0 110-1.5h4.25V7a.75.75 0 111.5 0v4.25H17a.75.75 0 110 1.5z"}:{"fill-rule":"evenodd",d:"M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm0 3.75c.4 0 .75.35.75.75v4.25H17c.4 0 .75.35.75.75s-.35.75-.75.75h-4.25V17c0 .4-.35.75-.75.75s-.75-.35-.75-.75v-4.25H7c-.4 0-.75-.35-.75-.75s.35-.75.75-.75h4.25V7c0-.4.35-.75.75-.75z"})))))}get hostElement(){return e(this)}};a.style="scale-icon{--display:inline-flex;--transition:all var(--scl-motion-duration-fast)\n    var(--scl-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{a as scale_icon_action_circle_add}