import{r as t,h as i,a as s,g as e}from"./p-d52b3602.js";const l=class{constructor(i){t(this,i),this.size=24,this.fill="currentColor",this.color="currentColor",this.selected=!1,this.decorative=!1,this.focusable=!1}connectedCallback(){this.hostElement.hasAttribute("styles")||(this.hostElement.style.display="inline-flex")}render(){return i(s,null,i("svg",Object.assign({class:"scale-icon",xmlns:"http://www.w3.org/2000/svg",width:this.size,height:this.size,viewBox:"0 0 24 24"},this.decorative?{"aria-hidden":"true"}:{},this.focusable?{tabindex:0}:{}),this.accessibilityTitle&&i("title",null,this.accessibilityTitle),i("g",{fill:"currentColor"===this.fill?this.color:this.fill},i("g",null,i("path",this.selected?{d:"M12.483 6.263H10.5V3.352l-6.75 4.4 6.75 4.4v-2.89h1.982c3.033 0 5.5 2.469 5.5 5.5v4.288a1.5 1.5 0 003 0v-4.287c0-4.687-3.813-8.5-8.5-8.5","fill-rule":"evenodd"}:{d:"M10.5 8.513h2.239a6.257 6.257 0 016.25 6.25v4.987a.75.75 0 001.5 0v-4.987c0-4.273-3.477-7.75-7.75-7.75H10.5V3.352l-6.75 4.4 6.75 4.4v-3.64z","fill-rule":"evenodd"})))))}get hostElement(){return e(this)}};l.style="scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{l as scale_icon_action_reply}