import{r as t,h as s,a as i,g as a}from"./p-7c16486e.js";const e=class{constructor(s){t(this,s),this.size=24,this.fill="currentColor",this.color="currentColor",this.selected=!1,this.decorative=!1}connectedCallback(){this.hostElement.hasAttribute("styles")||(this.hostElement.style.display="inline-flex")}render(){return s(i,null,s("svg",Object.assign({class:"scale-icon",xmlns:"http://www.w3.org/2000/svg",width:this.size,height:this.size,viewBox:"0 0 24 24"},this.decorative?{"aria-hidden":"true"}:{}),this.accessibilityTitle&&s("title",null,this.accessibilityTitle),s("g",{fill:"currentColor"===this.fill?this.color:this.fill},s("g",null,s("path",this.selected?{"fill-rule":"evenodd",d:"M10.255 7.045l6.715 6.72-7.6 7.6a4.745 4.745 0 01-6.715 0l-.173-.182a4.745 4.745 0 01.173-6.533l7.6-7.605zM9 15a1 1 0 10-1.403 1.425A1 1 0 009 15zm2.43-2.43a1 1 0 00-1.405 0 1 1 0 101.415 0zM13.06 1A10 10 0 0123 10.96h-1.5a8.5 8.5 0 00-8.44-8.46zm0 3.425a6.54 6.54 0 016.535 6.535h-1.5a5.04 5.04 0 00-5.035-5.035z"}:{d:"M10.255 5.985l7.78 7.785-8.13 8.13a5.46 5.46 0 01-3.89 1.61 5.46 5.46 0 01-3.89-1.61 5.507 5.507 0 010-7.78zM10.25 8.11l-7.07 7.07a4.002 4.002 0 000 5.655 3.974 3.974 0 002.83 1.17c1.07 0 2.075-.415 2.83-1.17l7.065-7.07zm-2.675 6.9c.39-.39 1.025-.39 1.415 0s.39 1.025 0 1.415-1.025.39-1.415 0a1.002 1.002 0 010-1.415zm2.44-2.44c.39-.39 1.025-.39 1.415 0s.39 1.025 0 1.415-1.025.39-1.415 0a1.002 1.002 0 010-1.415zm3.045-8.145a6.54 6.54 0 016.535 6.535h-1.5a5.042 5.042 0 00-5.035-5.035zm0-3.43c5.49 0 9.96 4.47 9.96 9.96h-1.5c0-4.665-3.795-8.46-8.46-8.46z","fill-rule":"evenodd"})))))}get hostElement(){return a(this)}};e.style="scale-icon{--display:inline-flex;--transition:all var(--scl-motion-duration-fast)\n    var(--scl-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{e as scale_icon_device_remote_controller}