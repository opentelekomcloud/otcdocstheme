import{r as t,h as i,a as s,g as e}from"./p-d52b3602.js";const l=class{constructor(i){t(this,i),this.size=24,this.fill="currentColor",this.color="currentColor",this.selected=!1,this.decorative=!1,this.focusable=!1}connectedCallback(){this.hostElement.hasAttribute("styles")||(this.hostElement.style.display="inline-flex")}render(){return i(s,null,i("svg",Object.assign({class:"scale-icon",xmlns:"http://www.w3.org/2000/svg",width:this.size,height:this.size,viewBox:"0 0 24 24"},this.decorative?{"aria-hidden":"true"}:{},this.focusable?{tabindex:0}:{}),this.accessibilityTitle&&i("title",null,this.accessibilityTitle),i("g",{fill:"currentColor"===this.fill?this.color:this.fill},i("g",null,i("path",this.selected?{d:"M20.25 7.752l-6.75-4.4v2.861h-2.264c-4.687 0-8.5 3.813-8.5 8.5V19a1.5 1.5 0 103 0v-4.287c0-3.032 2.468-5.5 5.5-5.5H13.5v2.938l6.75-4.399z","fill-rule":"evenodd"}:{d:"M13.5 12.151l6.75-4.399-6.75-4.4V7h-2.25C6.979 7 3.5 10.476 3.5 14.75v4.987a.75.75 0 101.5 0V14.75a6.257 6.257 0 016.25-6.25h2.25v3.651z","fill-rule":"evenodd"})))))}get hostElement(){return e(this)}};l.style="scale-icon{--display:inline-flex;--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);display:var(--display)}scale-icon path{transition:var(--transition)}@media screen and (forced-colors: active), (-ms-high-contrast: active){scale-icon svg,.scale-icon{color:white;stroke:white}}";export{l as scale_icon_action_forward}