import{r,h as t,a as o,g as a}from"./p-7c16486e.js";import{c as i}from"./p-c608c6dc.js";import{h as s,i as n}from"./p-3bc9966d.js";const e={small:16},c=class{constructor(t){r(this,t),this.size="large",this.variant="primary",this.disabled=!1,this.iconOnly=!1,this.iconPosition="before",this.target="_self",this.handleClick=r=>{if(s(this.hostElement)){const t=this.hostElement.closest("form");if(t){r.preventDefault();const o=document.createElement("button");this.type&&(o.type=this.type),o.style.display="none",t.appendChild(o),o.click(),o.remove()}}}}handleHostClick(r){!0===this.disabled&&r.stopImmediatePropagation()}async setFocus(){this.focusableElement.focus()}connectedCallback(){this.setIconPositionProp()}componentDidLoad(){this.setChildrenIconSize()}setIconPositionProp(){const r=Array.from(this.hostElement.childNodes).filter((r=>!(3===r.nodeType&&""===r.nodeValue.trim()))),t=r.length>1?r[r.length-1]:null;!this.iconOnly&&t&&n(t)&&(this.iconPosition="after")}setChildrenIconSize(){null!=this.size&&null!=e[this.size]&&Array.from(this.hostElement.children).filter(n).forEach((r=>{24===r.size&&(r.size=e[this.size])}))}render(){const r=i("base",this.variant&&`variant-${this.variant}`,this.iconOnly&&"icon-only",!this.iconOnly&&this.iconPosition,this.disabled&&"disabled");return t(o,null,this.styles&&t("style",null,this.styles),this.href?t("a",{ref:r=>this.focusableElement=r,class:this.getCssClassMap(),href:this.href,download:this.download,target:this.target,rel:"_blank"===this.target?"noopener noreferrer":void 0,part:r,tabIndex:this.innerTabindex},t("slot",null)):t("button",{ref:r=>this.focusableElement=r,class:this.getCssClassMap(),onClick:this.handleClick,disabled:this.disabled,type:this.type,part:r,tabIndex:this.innerTabindex},t("slot",null)))}getCssClassMap(){return i("button",this.size&&`button--size-${this.size}`,this.variant&&`button--variant-${this.variant}`,this.iconOnly&&"button--icon-only",!this.iconOnly&&this.iconPosition&&`button--icon-${this.iconPosition}`,this.disabled&&!this.href&&"button--disabled")}get hostElement(){return a(this)}};c.style=":host{--width:auto;--spacing-x:var(--scl-spacing-24);--spacing-x-icon-only:var(--scl-spacing-8);--min-height:var(--scl-spacing-40);--radius:var(--scl-radius-8);--transition:all var(--scl-motion-duration-fast)\n    var(--scl-motion-easing-standard);--box-shadow-focus:0 0 0 var(--scl-spacing-2) var(--scl-color-focus);--font-weight:var(--scl-font-weight-bold);--font-size:var(--scl-font-size-16);--line-height:var(--scl-font-line-height-150);--spacing-icon-x:var(--scl-spacing-8);--vertical-align:middle;--font-size-small:var(--scl-font-size-12);--line-height-small:var(--scl-font-line-height-133);--min-height-small:var(--scl-spacing-32);--radius-primary:var(--radius);--background-primary:var(--scl-color-primary);--background-primary-hover:var(--scl-color-primary-hover);--background-primary-active:var(--scl-color-primary-active);--background-primary-disabled:var(--scl-color-background-disabled);--color-primary:var(--scl-color-white);--color-primary-disabled:var(--scl-color-grey-40);--radius-secondary:var(--radius);--border-width-secondary:var(--scl-spacing-1);--background-secondary:transparent;--color-secondary:var(--scl-color-text-standard);--color-secondary-hover:var(--scl-color-primary-hover);--color-secondary-active:var(--scl-color-primary-active);--color-secondary-disabled:var(--scl-color-background-disabled);--radius-ghost:var(--radius);--border-width-ghost:var(--scl-spacing-1);--spacing-x-ghost:var(--scl-spacing-8);--color-ghost:var(--scl-color-primary);--color-ghost-hover:var(--scl-color-primary-hover);--color-ghost-active:var(--scl-color-primary-active);--color-ghost-disabled:var(--scl-color-text-disabled)}.button{box-sizing:border-box;display:inline-flex;align-items:center;position:relative;border:0;outline:none;cursor:pointer;user-select:none;font-family:inherit;word-spacing:inherit;letter-spacing:inherit;justify-content:center;text-decoration:none;font-weight:var(--font-weight);font-size:var(--font-size);line-height:var(--line-height);min-height:var(--min-height);width:var(--width);padding-left:var(--spacing-x);padding-right:var(--spacing-x);vertical-align:var(--vertical-align);transition:var(--transition)}.button:not(.button--disabled):focus{box-shadow:var(--box-shadow-focus)}.button.button--icon-before ::slotted(*){margin-right:var(--spacing-icon-x)}.button.button--icon-after ::slotted(*){margin-left:var(--spacing-icon-x)}.button:after{top:0;left:0;width:100%;border:var(--scl-spacing-1) solid transparent;height:100%;content:'';display:block;position:absolute;box-sizing:border-box;pointer-events:none;border-radius:var(--radius)}.button--size-small{font-size:var(--font-size-small);line-height:var(--line-height-small);min-height:var(--min-height-small)}.button--icon-only{padding-left:var(--spacing-x-icon-only);padding-right:var(--spacing-x-icon-only)}.button--disabled{cursor:not-allowed}.button--variant-primary{text-align:center;border-radius:var(--radius);background:var(--background-primary);color:var(--color-primary)}.button--variant-primary:not(.button--disabled):hover{background:var(--background-primary-hover)}.button--variant-primary:not(.button--disabled):active{background:var(--background-primary-active)}.button--disabled.button--variant-primary{background:var(--background-primary-disabled);color:var(--color-primary-disabled)}.button--variant-secondary{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary)}.button--variant-secondary:not(.button--disabled):hover{color:var(--color-secondary-hover)}.button--variant-secondary:not(.button--disabled):active{color:var(--color-secondary-active)}.button--disabled.button--variant-secondary{color:var(--color-secondary-disabled)}.button--variant-ghost{background:transparent;text-align:center;border-radius:var(--radius-ghost);border:var(--border-width-ghost) solid transparent;color:var(--color-ghost);padding-left:var(--spacing-x-ghost);padding-right:var(--spacing-x-ghost)}.button--variant-ghost:not(.button--disabled):hover{color:var(--color-ghost-hover)}.button--variant-ghost:not(.button--disabled):active{color:var(--color-ghost-active)}.button--disabled.button--variant-ghost{color:var(--color-ghost-disabled)}";export{c as scale_button}