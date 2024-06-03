import{r as t,h as s,a,g as e}from"./p-d52b3602.js";import{c as r}from"./p-c608c6dc.js";import{s as i}from"./p-c5a89792.js";import{r as n,a as o,t as h,b as l,d as u,c as d,l as c,g as p}from"./p-a8cfd704.js";function f(t,s){n(2,arguments);var a=h(s);return o(t,1e3*a)}function v(t,s){n(2,arguments);var a=l(t),e=l(s),r=a.getTime()-e.getTime();return r<0?-1:r>0?1:r}function m(t,s){n(2,arguments);var a=l(t),e=l(s),r=a.getFullYear()-e.getFullYear(),i=a.getMonth()-e.getMonth();return 12*r+i}function g(t,s){return n(2,arguments),l(t).getTime()-l(s).getTime()}var b={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(t){return t<0?Math.ceil(t):Math.floor(t)}};function x(t){return t?b[t]:b.trunc}function y(t){n(1,arguments);var s=l(t);return s.setHours(23,59,59,999),s}function M(t){n(1,arguments);var s=l(t),a=s.getMonth();return s.setFullYear(s.getFullYear(),a+1,0),s.setHours(23,59,59,999),s}function w(t){n(1,arguments);var s=l(t);return y(s).getTime()===M(s).getTime()}function $(t,s){n(2,arguments);var a,e=l(t),r=l(s),i=v(e,r),o=Math.abs(m(e,r));if(o<1)a=0;else{1===e.getMonth()&&e.getDate()>27&&e.setDate(30),e.setMonth(e.getMonth()-i*o);var h=v(e,r)===-i;w(l(t))&&1===o&&1===v(t,r)&&(h=!1),a=i*(o-Number(h))}return 0===a?0:a}function k(t,s,a){n(2,arguments);var e=g(t,s)/1e3;return x(null==a?void 0:a.roundingMethod)(e)}function _(t){return u({},t)}const X=class{constructor(s){t(this,s),this.size="",this.variant="",this.autoHide=!1,this.animated=!0,this.positionTop=12,this.positionRight=12,this.fadeDuration=500,this.progress=0,this.toastHeightWithOffset=0,this.hideToast=!1,this.timerId=null,this.close=()=>{clearInterval(this.timerId),this.hideToast=!0,setTimeout((()=>{this.timerId=null,this.opened=!1,this.progress=0}),this.fadeDuration)},this.getTime=()=>this.time&&function(t,s,a){var e,r;n(2,arguments);var i=p(),o=null!==(e=null!==(r=null==a?void 0:a.locale)&&void 0!==r?r:i.locale)&&void 0!==e?e:c;if(!o.formatDistance)throw new RangeError("locale must contain formatDistance property");var h=v(t,s);if(isNaN(h))throw new RangeError("Invalid time value");var f,m,g=u(_(a),{addSuffix:Boolean(null==a?void 0:a.addSuffix),comparison:h});h>0?(f=l(s),m=l(t)):(f=l(t),m=l(s));var b,x=k(m,f),y=(d(m)-d(f))/1e3,M=Math.round((x-y)/60);if(M<2)return null!=a&&a.includeSeconds?x<5?o.formatDistance("lessThanXSeconds",5,g):x<10?o.formatDistance("lessThanXSeconds",10,g):x<20?o.formatDistance("lessThanXSeconds",20,g):x<40?o.formatDistance("halfAMinute",0,g):o.formatDistance(x<60?"lessThanXMinutes":"xMinutes",1,g):0===M?o.formatDistance("lessThanXMinutes",1,g):o.formatDistance("xMinutes",M,g);if(M<45)return o.formatDistance("xMinutes",M,g);if(M<90)return o.formatDistance("aboutXHours",1,g);if(M<1440){var w=Math.round(M/60);return o.formatDistance("aboutXHours",w,g)}if(M<2520)return o.formatDistance("xDays",1,g);if(M<43200){var X=Math.round(M/1440);return o.formatDistance("xDays",X,g)}if(M<86400)return b=Math.round(M/43200),o.formatDistance("aboutXMonths",b,g);if((b=$(m,f))<12){var z=Math.round(M/43200);return o.formatDistance("xMonths",z,g)}var T=b%12,j=Math.floor(b/12);return T<3?o.formatDistance("aboutXYears",j,g):T<9?o.formatDistance("overXYears",j,g):o.formatDistance("almostXYears",j+1,g)}(function(t,s){n(2,arguments);var a=h(s);return f(t,-a)}(this.time,3),new Date,{addSuffix:!0}),this.setToastTimeout=()=>{this.opened&&!1!==this.autoHide&&!this.timerId&&(this.timerId=setInterval((()=>{this.progress+=1/(this.getAutoHide()/1e3),this.progress>=100&&this.close()}),10))},this.transitions=t=>`\n    @keyframes fadeIn {\n      from {\n        opacity: 0;\n        top: -${t}px;\n      }\n      to {\n        opacity: 1;\n        top: ${this.positionTop}px;\n      }\n    }\n\n    @keyframes fadeOut {\n      from {\n        opacity: 1;\n        top: ${this.positionTop}px;\n      }\n      to {\n        opacity: 0;\n        top: -${t}px;\n      }\n    }\n  `,this.animationStyle=t=>`\n      .toast--show {\n        right: ${this.positionRight}px;\n        animation: fadeIn ${this.fadeDuration/1e3}s ease-in-out;\n        top: ${this.positionTop}px;\n        opacity: 1;\n      },\n      .toast--show {\n        right: ${this.positionRight}px;\n        animation: fadeOut ${this.fadeDuration/1e3}s ease-in-out;\n        top: -${t}px;\n        opacity: 0;\n      }\n    `}connectedCallback(){i({source:this.element,type:"warn"})}disconnectedCallback(){this.timerId&&(clearTimeout(this.timerId),this.timerId=null,this.opened=!1,this.progress=0)}async open(){this.opened=!0,this.hideToast=!1}render(){return this.setToastTimeout(),s(a,null,this.styles&&s("style",null,this.styles),s("style",null,this.transitions(this.toastHeightWithOffset)),s("style",null,this.animationStyle(this.toastHeightWithOffset)),s("div",{class:this.getCssClassMap(),part:this.getBasePartMap()},s("div",{part:"header",class:"toast__header"},s("slot",{name:"header"}),s("small",null,this.getTime()),s("a",{onClick:this.close},s("span",{"aria-hidden":"true"},"×"))),this.autoHide&&s("div",{part:"progress",class:"toast__progress",style:{width:`${this.progress}%`}}," "),s("div",{part:"body",class:"toast__body"},s("slot",null))))}getToastHeightWithOffset(){const t=this.element.shadowRoot.querySelector(".toast").scrollHeight;this.toastHeightWithOffset=t+this.positionTop}getAutoHide(){return"number"==typeof this.autoHide||"string"==typeof this.autoHide?Number(this.autoHide):0}getBasePartMap(){return this.getCssOrBasePartMap("basePart")}getCssClassMap(){return this.getCssOrBasePartMap("css")}getCssOrBasePartMap(t){const s="basePart"===t?"":"toast";return r("basePart"===t?"base":"toast",this.size&&`${s}--size-${this.size}`,this.variant&&`${s}--variant-${this.variant}`,!!this.opened&&`${s}--opened`,!this.hideToast&&`${s}--show`,!!this.hideToast&&`${s}--hide`)}get element(){return e(this)}};X.style=":host{--width:400px;--radius:var(--telekom-radius-small);--background:var(--scl-color-background-standard);--box-shadow:var(--telekom-shadow-app-bar-top-raised);--spacing:var(--telekom-spacing-composition-space-06);--border-header:1px solid var(--scl-color-grey-20);--font-size-header:var(--telekom-text-style-heading-4);--font-size-header-small:var(--telekom-typography-font-size-small);--height-progress:var(--telekom-spacing-composition-space-02)}.toast{width:var(--width);display:flex;opacity:0;z-index:1;position:fixed;background:var(--background);box-shadow:var(--box-shadow);box-sizing:border-box;border-radius:var(--radius);flex-direction:column;justify-content:space-between}.toast__body{padding:var(--spacing)}.toast__header{margin:0;display:flex;padding:var(--spacing);border-bottom:var(--border-header);justify-content:space-between;font:var(--font-size-header)}.toast__header a{cursor:pointer}.toast__header small{margin-top:5px;margin-left:120px;font-size:var(--font-size-header-small)}.toast__progress{left:0;bottom:0;height:var(--height-progress);display:block;overflow:hidden;position:absolute;background:red}";export{X as scale_toast}