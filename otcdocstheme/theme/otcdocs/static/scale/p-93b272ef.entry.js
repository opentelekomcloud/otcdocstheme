import{r as s,c as r,h as i,a as t,g as e}from"./p-7c16486e.js";import{c as a}from"./p-c608c6dc.js";import{e as l}from"./p-3bc9966d.js";import{s as o}from"./p-bf956c1d.js";let h=0;const d=class{constructor(i){s(this,i),this.scaleChange=r(this,"scale-change",7),this.scaleChangeLegacy=r(this,"scaleChange",7),this.scaleInput=r(this,"scale-input",7),this.scaleInputLegacy=r(this,"scaleInput",7),this.min=0,this.max=100,this.step=1,this.showValue=!0,this.unit="%",this.decimals=0,this.disabled=!1,this.trackSmall=!1,this.thumbLarge=!1,this.onButtonDown=()=>{this.disabled||(this.onDragStart(),this.addGlobalListeners())},this.onKeyDown=s=>{let r=0;["ArrowRight","ArrowLeft"].includes(s.key)&&(r="ArrowRight"===s.key?this.step:-this.step),["ArrowUp","ArrowDown"].includes(s.key)&&(r="ArrowUp"===s.key?10*this.step:10*-this.step),this.setValue(this.value+r)},this.onDragStart=()=>{this.dragging=!0,this.offsetLeft=this.sliderTrack.getBoundingClientRect().left},this.onDragging=s=>{const{dragging:r,offsetLeft:i}=this;if(r){const r=this.handleTouchEvent(s).clientX,t=Math.ceil(((r-i)/this.sliderTrack.offsetWidth*100*(this.max-this.min)/100+this.min)/this.step)*this.step;this.setValue(t)}},this.onDragEnd=()=>{this.dragging=!1,l(this,"scaleChange",this.value),this.removeGlobalListeners()},this.setValue=s=>{this.value=this.clamp(s),l(this,"scaleInput",this.value)},this.setPosition=()=>{if(!this.value)return void(this.position=0);const s=this.clamp(this.value);this.position=100*(s-this.min)/(this.max-this.min)},this.clamp=s=>Math.min(Math.max(s,this.min),this.max),this.onDragging=this.onDragging.bind(this),this.onDragEnd=this.onDragEnd.bind(this)}componentWillLoad(){null==this.sliderId&&(this.sliderId="slider-"+h++),this.setPosition()}disconnectedCallback(){this.removeGlobalListeners()}componentDidLoad(){void 0!==this.customColor&&o({tag:"deprecated",message:'Property "customColor" is deprecated. \n          Please use css variable "--background-bar" to set the slider-bar color;\n          e.g. <scale-slider value="20" style="--background-bar: green"></scale-slider>',type:"warn",source:this.hostElement})}handleTouchEvent(s){return 0===s.type.indexOf("touch")?s.touches[0]:s}handleValueChange(){this.setPosition()}addGlobalListeners(){window.addEventListener("mousemove",this.onDragging.bind(this)),window.addEventListener("mouseup",this.onDragEnd.bind(this)),window.addEventListener("touchmove",this.onDragging.bind(this)),window.addEventListener("touchend",this.onDragEnd.bind(this))}removeGlobalListeners(){window.removeEventListener("mousemove",this.onDragging),window.removeEventListener("mouseup",this.onDragEnd),window.removeEventListener("touchmove",this.onDragging),window.removeEventListener("touchend",this.onDragEnd)}render(){return i(t,null,this.styles&&i("style",null,this.styles),i("div",{part:this.getBasePartMap(),class:this.getCssClassMap()},!!this.label&&i("label",{part:"label",class:"slider__label",id:`${this.sliderId}-label`,htmlFor:this.sliderId},this.label),i("div",{part:"track-wrapper",class:"slider__track-wrapper"},i("div",{part:"track",class:"slider__track",ref:s=>this.sliderTrack=s},i("div",{part:"bar",class:"slider__bar",style:{width:`${this.position}%`,backgroundColor:this.customColor?this.customColor:this.disabled?"var(--background-bar-disabled)":"var(--background-bar)"}}),i("div",{part:"thumb-wrapper",class:"slider__thumb-wrapper",style:{left:`${this.position}%`},onMouseDown:this.onButtonDown,onTouchStart:this.onButtonDown},i("div",{part:"thumb",class:"slider__thumb",tabindex:"0",role:"slider",id:this.sliderId,"aria-valuemin":this.min,"aria-valuenow":this.value,"aria-valuemax":this.max,"aria-valuetext":`${this.value}`,"aria-labelledby":`${this.sliderId}-label`,"aria-orientation":"horizontal","aria-disabled":this.disabled,onKeyDown:this.onKeyDown}))),this.showValue&&i("div",{part:"display-value",class:"slider__display-value"},null!=this.value&&this.value.toFixed(this.decimals),null!=this.value&&this.unit))))}getBasePartMap(){return this.getCssOrBasePartMap("basePart")}getCssClassMap(){return this.getCssOrBasePartMap("css")}getCssOrBasePartMap(s){const r="basePart"===s?"":"slider--";return a("slider",this.disabled&&`${r}disabled`,this.trackSmall&&`${r}track-small`,this.thumbLarge&&`${r}thumb-large`)}get hostElement(){return e(this)}static get watchers(){return{value:["handleValueChange"]}}};d.style=":host{--border:1px solid var(--scl-color-grey-60);--background-bar:var(--scl-color-primary);--border-color-thumb:var(--scl-color-grey-60);--box-shadow-thumb:var(--scl-shadow-level-0);--border-color-thumb-hover:var(--scl-color-primary-hover);--border-color-thumb-active:var(--scl-color-primary-active);--box-shadow-thumb-focus:0 0 0 var(--scl-spacing-2) var(--scl-color-focus);--color-display-value:var(--scl-color-grey-60);--font-weight-display-value:var(--scl-font-weight-bold);--font-size-display-value:var(--scl-font-size-12);--background-track:var(--scl-color-grey-50);--background-bar-disabled:var(--scl-color-grey-50);--color-label-disabled:var(--scl-color-grey-50)}.slider{width:100%;display:block;align-items:center}.slider .slider__track-wrapper{display:flex;align-items:center}.slider .slider__track{width:303px;border:var(--border);height:6px;margin:16px 0;display:flex;position:relative;box-sizing:border-box;align-items:center;border-radius:100px}.slider .slider__bar{height:6px;z-index:-1;position:absolute;border-radius:100px;background-color:var(--background-bar)}.slider .slider__thumb-wrapper{width:32px;height:32px;display:flex;z-index:1;position:absolute;text-align:center;align-items:center;margin-left:-16px;justify-content:center;background-color:transparent}.slider .slider__thumb{width:16px;border:1px solid;height:16px;outline:none;box-sizing:border-box;border-color:var(--border-color-thumb);border-radius:50%;background-color:#fff;box-shadow:var(--scl-shadow-level-0)}.slider .slider__display-value{color:var(--color-display-value);margin-left:24px;font-weight:var(--font-weight-display-value);font-size:var(--font-size-display-value)}.slider .slider__thumb:hover{border-color:var(--border-color-thumb-hover)}.slider .slider__thumb:active{border-color:var(--border-color-thumb-active)}.slider .slider__thumb:focus{box-shadow:var(--box-shadow-thumb-focus)}.slider .slider__thumb-wrapper:hover{cursor:grab}.slider .slider__thumb-wrapper:active{cursor:grabbing}.slider--track-small .slider__track{border:none;height:1px;border-top:1px solid transparent;background-color:var(--background-track)}.slider--track-small .slider__bar{border:1px solid transparent;height:3px;z-index:1;box-sizing:border-box}.slider--thumb-large .slider__thumb{width:24px;height:24px}.slider--disabled .slider__track-wrapper{cursor:not-allowed}.slider--disabled .slider__bar{background-color:var(--background-bar-disabled)}.slider--disabled .slider__thumb{display:none}.slider--disabled .slider__label{color:var(--color-label-disabled)}.slider--disabled .slider__thumb-wrapper:hover{cursor:not-allowed}";export{d as scale_slider}