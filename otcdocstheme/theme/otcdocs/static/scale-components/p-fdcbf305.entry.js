import{r as t,c as i,h as o,a as n,g as a}from"./p-d52b3602.js";import{c as s}from"./p-c608c6dc.js";import{s as r}from"./p-c5a89792.js";import{e as c}from"./p-086c9d13.js";const e=class{constructor(o){t(this,o),this.scaleClosing=i(this,"scale-closing",7),this.scaleClose=i(this,"scale-close",7),this.variant="informational",this.animated=!0,this.alignment="top-right",this.positionVertical=12,this.positionHorizontal=12,this.autoHide=!1,this.autoHideDuration=3e3,this.fadeDuration=500,this.closeButtonLabel="close",this.closeButtonTitle="close",this.toastHeightWithOffset=0,this.hideToast=!1,this.close=()=>{c(this,"scaleClosing"),this.hideToast=!0,setTimeout((()=>{this.opened=!1,c(this,"scaleClose")}),this.fadeDuration)},this.transitions=t=>`\n      @keyframes fadeIn {\n        from {\n          opacity: 0;\n          ${this.alignmentVertical}: -${t}px;\n        }\n        to {\n          opacity: 1;\n          ${this.alignmentVertical}: ${this.positionVertical}px;\n        }\n      }\n  \n      @keyframes fadeOut {\n        from {\n          opacity: 1;\n          ${this.alignmentVertical}: ${this.positionVertical}px;\n        }\n        to {\n          opacity: 0;\n          ${this.alignmentVertical}: -${t}px;\n        }\n      }\n    `,this.animationStyle=t=>this.animated?`\n        .notification-toast--show {\n          ${this.alignmentHorizontal}: ${this.positionHorizontal}px;\n          animation: fadeIn ${this.fadeDuration/1e3}s ease-in-out;\n          ${this.alignmentVertical}: ${this.positionVertical}px;\n          opacity: 1;\n        },\n        .notification-toast--show {\n          ${this.alignmentHorizontal}: ${this.positionHorizontal}px;\n          animation: fadeOut ${this.fadeDuration/1e3}s ease-in-out;\n          ${this.alignmentVertical}: -${t}px;\n          opacity: 0;\n        }\n      `:`\n    .notification-toast--show {\n      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;\n      ${this.alignmentVertical}: ${this.positionVertical}px;\n      opacity: 1;\n    },\n    .notification-toast--show {\n      ${this.alignmentHorizontal}: ${this.positionHorizontal}px;\n      ${this.alignmentVertical}: -${t}px;\n      opacity: 0;\n    }\n  `}connectedCallback(){r({source:this.element,type:"warn"})}componentWillLoad(){const t=this.alignment.split("-");this.alignmentVertical=t[0],this.alignmentHorizontal=t[1]}componentDidRender(){!0===this.autoHide&&setTimeout(this.close,this.autoHideDuration)}handleIcons(){if(this.variant)switch(this.variant){case"success":return o("scale-icon-action-success",{class:"notification-toast__icon",size:20,color:"#ffffff",selected:!0,"aria-hidden":"true"});case"informational":return o("scale-icon-alert-information",{class:"notification-toast__icon",size:20,selected:!0,color:"#ffffff","aria-hidden":"true"});case"error":return o("scale-icon-alert-error",{class:"notification-toast__icon",size:20,selected:!0,color:"#ffffff","aria-hidden":"true"});case"warning":return o("scale-icon-alert-warning",{class:"notification-toast__icon",color:"#ffff",size:20,selected:!0,"aria-hidden":"true"})}}async open(){this.opened=!0,this.hideToast=!1}render(){if(this.opened)return o(n,null,this.styles&&o("style",null,this.styles),o("style",null,this.transitions(this.toastHeightWithOffset)),o("style",null,this.animationStyle(this.toastHeightWithOffset)),o("div",{role:"alert",style:{display:this.opened?"":"none"},class:this.getCssClassMap(),part:this.getBasePartMap(),tabindex:"0"},o("div",{class:"notification-toast__icon-container"},this.handleIcons()),o("div",{class:"notification-toast__text-container"},o("slot",{name:"header"}),o("slot",{name:"body"}),o("scale-link",{href:this.href,class:"notification-toast__link",role:"link"},o("slot",{name:"link"}))),o("button",{part:"button-dismissable",type:"button",class:"notification-toast__button-close",onClick:()=>this.close(),tabindex:0,"aria-label":this.closeButtonLabel,title:this.closeButtonTitle,onKeyDown:t=>{"Enter"===t.key&&this.close()}},o("scale-icon-action-circle-close",null))))}getToastHeightWithOffset(){const t=this.element.shadowRoot.querySelector(".toast").scrollHeight;this.toastHeightWithOffset=t+this.positionVertical}getBasePartMap(){return this.getCssOrBasePartMap("basePart")}getCssClassMap(){return this.getCssOrBasePartMap("css")}getCssOrBasePartMap(t){const i="notification-toast",o="basePart"===t?"":`${i}`;return s("basePart"===t?"base":i,this.variant&&`${o}--variant-${this.variant}`,!!this.opened&&`${o}--opened`,!this.hideToast&&`${o}--show`,!!this.hideToast&&`${o}--hide`,this.story&&`${o}--story`)}get element(){return a(this)}};e.style=":host{--width:366px;--width-icon-container:48px;--radius:var(--telekom-radius-standard);--background:var(--telekom-color-background-surface);--z-index:100;--box-shadow:var(--telekom-shadow-raised-standard);--background-success-icon-container:var(\n    --telekom-color-functional-success-standard\n  );--background-warning-icon-container:var(\n    --telekom-color-functional-warning-standard\n  );--background-error-icon-container:var(\n    --telekom-color-functional-danger-standard\n  );--background-informational-icon-container:var(\n    --telekom-color-functional-informational-standard\n  );--background-success-text-container:var(\n    --telekom-color-functional-success-subtle\n  );--background-warning-text-container:var(\n    --telekom-color-functional-warning-subtle\n  );--background-error-text-container:var(\n    --telekom-color-functional-danger-subtle\n  );--background-informational-text-container:var(\n    --telekom-color-functional-informational-subtle\n  )}.notification-toast{width:calc(var(--width) - var(--width-icon-container));opacity:1;z-index:var(--z-index);position:fixed;background:var(--background);box-shadow:var(--box-shadow);box-sizing:border-box;border-radius:0 var(--radius) var(--radius) 0;flex-direction:column;justify-content:space-between}.notification-toast.notification-toast--story{position:absolute}.notification-toast.notification-toast--story.notification-toast--hide{opacity:0}.notification-toast.notification-toast--story.notification-toast--opened{opacity:1}.notification-toast.notification-toast--variant-success{background:var(--background-success-text-container)}.notification-toast.notification-toast--variant-warning{background:var(--background-warning-text-container)}.notification-toast.notification-toast--variant-error{background:var(--background-error-text-container)}.notification-toast.notification-toast--variant-informational{background:var(--background-informational-text-container)}.notification-toast__icon{position:absolute;top:50%;left:50%;margin:-10px 0 0 -10px}.notification-toast__icon-container{height:100%;width:var(--width-icon-container);position:absolute;left:calc(var(--width-icon-container) * -1 + 1px);top:0;float:left;border-radius:var(--radius) 0 0 var(--radius)}.notification-toast.notification-toast--variant-success .notification-toast__icon-container{background:var(--background-success-icon-container)}.notification-toast.notification-toast--variant-warning .notification-toast__icon-container{background:var(--background-warning-icon-container)}.notification-toast.notification-toast--variant-error .notification-toast__icon-container{background:var(--background-error-icon-container)}.notification-toast.notification-toast--variant-informational .notification-toast__icon-container{background:var(--background-informational-icon-container)}::slotted([slot='header']){margin:0;padding:3px var(--width-icon-container) 0 10px;font-weight:bold;font-size:16px}::slotted([slot='body']){padding:3px 0 0 10px;margin:0}::slotted([slot='link']){padding:10px 0 15px 10px;margin:0}.notification-toast__text-container{width:calc(var(--width) - calc(var(--width-icon-container) * 1));min-height:33px;float:left;position:relative;margin:0 0 0 1px;padding:15px 0 0 0}.notification-toast__button-close{position:absolute;top:10px;right:7.5px;color:#191919;border:none;cursor:pointer;margin:0;padding:0;background:transparent}.notification-toast__button-close svg{height:19px;width:19px;padding:7.5px 6.5px 6.5px 6.5px;border-radius:20%;color:var(--telekom-color-text-and-icon-standard)}.notification-toast__button-close:hover svg{background-color:white;color:var(--telekom-color-text-and-icon-primary-hovered)}@media screen and (forced-colors: active), (-ms-high-contrast: active){.notification-toast__button-close svg{color:hsl(0, 0%, 100%)}.notification-toast{border:1px solid hsl(0, 0%, 100%)}.notification-toast__icon-container{border:1px solid hsl(0, 0%, 100%);margin-top:-1px}}";export{e as scale_notification_toast}