import{r as t,h as o,a as i,g as e,c as s}from"./p-d52b3602.js";import{c as r}from"./p-c608c6dc.js";import{h as a,i as n,b as l,e as c}from"./p-086c9d13.js";const h={small:16,large:20},d=class{constructor(o){t(this,o),this.size="large",this.variant="primary",this.disabled=!1,this.iconOnly=!1,this.iconPosition="before",this.target="_self",this.handleClick=t=>{if(a(this.hostElement)){const o=this.hostElement.closest("form");if(o){t.preventDefault();const i=document.createElement("button");this.type&&(i.type=this.type),i.style.display="none",o.appendChild(i),i.click(),i.remove()}}}}handleHostClick(t){!0===this.disabled&&t.stopImmediatePropagation()}async setFocus(){this.focusableElement.focus()}componentDidLoad(){this.setChildrenIconSize()}connectedCallback(){this.setIconPositionProp(),this.appendEnterKeySubmitFallback()}disconnectedCallback(){this.cleanUpEnterKeySubmitFallback()}appendEnterKeySubmitFallback(){if(a(this.hostElement)){const t=this.hostElement.closest("form");if(null==t)return;if(null!=t.querySelector('input[type="submit"]'))return;this.fallbackSubmitInputElement=document.createElement("input"),this.fallbackSubmitInputElement.type="submit",this.fallbackSubmitInputElement.hidden=!0,t.appendChild(this.fallbackSubmitInputElement)}}cleanUpEnterKeySubmitFallback(){if(null!=this.fallbackSubmitInputElement)try{this.fallbackSubmitInputElement.remove(),this.fallbackSubmitInputElement=null}catch(t){}}setIconPositionProp(){const t=Array.from(this.hostElement.childNodes).filter((t=>!(3===t.nodeType&&""===t.nodeValue.trim()))),o=t.length>1?t[t.length-1]:null;!this.iconOnly&&o&&n(o)&&(this.iconPosition="after")}setChildrenIconSize(){null!=this.size&&null!=h[this.size]&&Array.from(this.hostElement.childNodes).filter(n).forEach((t=>{24===t.size&&(t.size=h[this.size])}))}render(){const t=r("base",this.variant&&`variant-${this.variant}`,this.iconOnly&&"icon-only",!this.iconOnly&&this.iconPosition,this.disabled&&"disabled");return o(i,null,this.styles&&o("style",null,this.styles),this.href?o("a",{ref:t=>this.focusableElement=t,class:this.getCssClassMap(),href:this.disabled?null:this.href,download:this.download,target:this.target,rel:"_blank"===this.target?"noopener noreferrer":void 0,part:t,tabIndex:this.innerTabindex,role:"link","aria-disabled":this.disabled?"true":null,"aria-label":this.innerAriaLabel},o("slot",null)):o("button",{ref:t=>this.focusableElement=t,class:this.getCssClassMap(),onClick:this.handleClick,disabled:this.disabled,type:this.type,part:t,tabIndex:this.innerTabindex,name:this.name,value:this.value,"aria-label":this.innerAriaLabel},o("slot",null)))}getCssClassMap(){return r("button",this.size&&`button--size-${this.size}`,this.variant&&`button--variant-${this.variant}`,this.iconOnly&&"button--icon-only",!this.iconOnly&&this.iconPosition&&`button--icon-${this.iconPosition}`,this.disabled&&"button--disabled")}get hostElement(){return e(this)}};d.style=":host{--width:auto;--spacing-x-right:var(--telekom-spacing-composition-space-07);--spacing-x-left:var(--telekom-spacing-composition-space-07);--spacing-x-icon-only:var(--telekom-spacing-composition-space-05);--min-height:var(--telekom-spacing-composition-space-13);--min-width:var(--telekom-spacing-composition-space-13);--radius:var(--telekom-radius-standard);--transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);--color-focus:var(--telekom-color-functional-focus-standard);--font-weight:var(--telekom-typography-font-weight-bold);--font-size:var(--telekom-typography-font-size-body);--line-height:var(--telekom-typography-line-spacing-tight);--spacing-icon-x:var(--telekom-spacing-composition-space-04);--vertical-align:middle;--font-size-small:var(--telekom-typography-font-size-caption);--line-height-small:1.125rem;--min-height-small:var(--telekom-spacing-composition-space-10);--spacing-x-right-small:var(--telekom-spacing-composition-space-06);--spacing-x-left-small:var(--telekom-spacing-composition-space-06);--spacing-x-icon-only-small:var(--telekom-spacing-composition-space-00);--spacing-icon-x-small:var(--telekom-spacing-composition-space-03);--radius-primary:var(--radius);--background-primary:var(--telekom-color-primary-standard);--background-primary-hover:var(--telekom-color-primary-hovered);--background-primary-active:var(--telekom-color-primary-pressed);--background-primary-disabled:var(--telekom-color-ui-disabled);--color-primary:var(--telekom-color-text-and-icon-white-standard);--color-primary-disabled:var(--telekom-color-text-and-icon-disabled);--radius-secondary:var(--radius);--border-width-secondary:var(--telekom-spacing-composition-space-01);--background-secondary:transparent;--color-secondary:var(--telekom-color-text-and-icon-standard);--color-secondary-hover:var(--telekom-color-text-and-icon-standard);--color-secondary-active:var(--telekom-color-text-and-icon-standard);--color-secondary-disabled:var(--telekom-color-text-and-icon-disabled);--background-secondary:var(--telekom-color-ui-state-fill-standard);--background-secondary-hover:var(--telekom-color-ui-state-fill-hovered);--background-secondary-active:var(--telekom-color-ui-state-fill-pressed);--background-secondary-disabled:none;--border-secondary:var(--telekom-color-ui-border-standard);--border-secondary-hover:var(--telekom-color-ui-border-hovered);--border-secondary-active:var(--telekom-color-ui-border-pressed);--border-secondary-focus:var(--telekom-color-functional-focus-standard);--border-secondary-white:var(--telekom-color-ui-white);--color-secondary-white:var(--telekom-color-ui-white);--background-secondary-white-hover:var(\n    --telekom-color-ui-state-fill-hovered-inverted\n  );--background-secondary-white-active:var(\n    --telekom-color-ui-state-fill-pressed-inverted\n  );--secondary-white-opacity:0.5;--radius-ghost:var(--radius);--border-width-ghost:var(--telekom-spacing-composition-space-01);--spacing-x-ghost:var(--telekom-spacing-composition-space-04);--color-ghost:var(--telekom-color-text-and-icon-primary-standard);--color-ghost-hover:var(--telekom-color-text-and-icon-primary-hovered);--color-ghost-active:var(--telekom-color-text-and-icon-primary-pressed);--color-ghost-disabled:var(--telekom-color-text-and-icon-disabled);--background-ghost-hover:var(--telekom-color-ui-state-fill-hovered);--background-ghost-active:var(--telekom-color-ui-state-fill-pressed);display:inline-block}.button{box-sizing:border-box;display:inline-flex;align-items:center;position:relative;border:0;outline:none;cursor:pointer;user-select:none;font-family:inherit;word-spacing:inherit;letter-spacing:inherit;justify-content:center;text-decoration:none;font-weight:var(--font-weight);font-size:var(--font-size);line-height:var(--line-height);min-height:var(--min-height);min-width:var(--min-width);width:var(--width);padding-left:var(--spacing-x-left);padding-right:var(--spacing-x-right);vertical-align:var(--vertical-align);transition:var(--transition)}.button.button--size-small{font-size:var(--font-size-small);line-height:var(--line-height-small);min-height:var(--min-height-small);padding-left:var(--spacing-x-left-small);padding-right:var(--spacing-x-right-small)}.button:not(.button--disabled):focus{outline:var(--telekom-line-weight-highlight) solid var(--color-focus);outline-offset:var(--telekom-spacing-composition-space-01)}.button.button--icon-before:not(.button--icon-only) ::slotted(*){margin-right:var(--spacing-icon-x);margin-left:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-before:not(.button--icon-only).button--size-small ::slotted(*){margin-right:var(--spacing-icon-x-small);margin-left:calc(var(--spacing-icon-x) * -0.5)}.button.button--icon-after:not(.button--icon-only) ::slotted(*){margin-left:var(--spacing-icon-x);margin-right:calc(var(--spacing-icon-x-small) * -1);margin-top:var(--spacing-icon-x);margin-bottom:var(--spacing-icon-x)}.button.button--icon-after:not(.button--icon-only).button--size-small ::slotted(*){margin-left:var(--spacing-icon-x-small);margin-right:calc(var(--spacing-icon-x) * -0.5)}.button:after{top:0;left:0;width:100%;border:var(--telekom-spacing-composition-space-01) solid transparent;height:100%;content:'';display:block;position:absolute;box-sizing:border-box;pointer-events:none;border-radius:var(--radius)}.button--icon-only{padding-left:var(--spacing-x-icon-only);padding-right:var(--spacing-x-icon-only)}.button--icon-only.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only) - 1px);padding-right:calc(var(--spacing-x-icon-only) - 1px)}.button--icon-only.button--size-small{padding-left:var(--spacing-x-icon-only-small);padding-right:var(--spacing-x-icon-only-small);min-width:32px}.button--icon-only.button--size-small.button--variant-secondary{padding-left:calc(var(--spacing-x-icon-only-small) - 1px);padding-right:calc(var(--spacing-x-icon-only-small) - 1px)}.button--disabled{cursor:not-allowed}.button--variant-primary{text-align:center;border-radius:var(--radius);background:var(--background-primary);color:var(--color-primary)}.button--variant-primary:not(.button--disabled):hover{background:var(--background-primary-hover)}.button--variant-primary:not(.button--disabled):active{background:var(--background-primary-active)}.button--disabled.button--variant-primary{background:var(--background-primary-disabled);color:var(--color-primary-disabled)}.button--variant-secondary{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary);background-color:var(--background-secondary);border-color:var(--border-secondary)}.button--variant-secondary:not(.button--disabled):hover{color:var(--color-secondary-hover);background-color:var(--background-secondary-hover);border-color:var(--border-secondary-hover)}.button--variant-secondary:not(.button--disabled):active{color:var(--color-secondary-active);background-color:var(--background-secondary-active);border-color:var(--border-secondary-active)}.button--disabled.button--variant-secondary{color:var(--color-secondary-disabled);background-color:var(--background-secondary-disabled)}.button--variant-ghost{background:transparent;text-align:center;border-radius:var(--radius-ghost);border:var(--border-width-ghost) solid transparent;color:var(--color-ghost);padding-left:var(--spacing-x-ghost);padding-right:var(--spacing-x-ghost)}.button--variant-ghost:not(.button--disabled):hover{color:var(--color-ghost-hover);background-color:var(--background-ghost-hover)}.button--variant-ghost:not(.button--disabled):active{color:var(--color-ghost-active);background-color:var(--background-ghost-active)}.button--disabled.button--variant-ghost{color:var(--color-ghost-disabled)}.button--variant-secondary-white{background:var(--background-secondary);text-align:center;border-radius:var(--radius-secondary);border:var(--border-width-secondary) solid currentColor;color:var(--color-secondary-white);background-color:var(--background-secondary);border-color:var(--border-secondary-white)}.button--variant-secondary-white:not(.button--disabled):hover{background-color:var(--background-secondary-white-hover)}.button--variant-secondary-white:not(.button--disabled):active{background-color:var(--background-secondary-white-active)}.button--disabled.button--variant-secondary-white{opacity:var(--secondary-white-opacity)}";const u=t=>{if("BUTTON"===t.tagName.toUpperCase()||"A"===t.tagName.toUpperCase()||"button"===t.getAttribute("role"))return t},p=class{constructor(o){t(this,o),this.closeOnSelect=!0,this.direction="bottom-right",this.lists=new Set,this.closeAll=()=>{this.lists.forEach((async t=>{await t.close(),t.active=!1}))},this.toggle=()=>{const t=this.getListElement();t.opened?this.closeAll():(null!=this.direction&&(t.direction=this.direction),t.trigger=()=>this.trigger,t.open())}}async handleScaleOpen({detail:t}){const o=this.getListElement();if(this.activeList&&this.activeList.active&&this.activeList!==o&&this.activeList!==t.list){let t=this.activeList;for(;null!=t&&t!==o;)await t.close(!0),t=t.parentElement.closest('[role="menu"]')}this.activeList=t.list}handleScaleSelect({detail:t}){!1!==t.closeOnSelect&&this.closeOnSelect&&window.requestAnimationFrame((()=>{this.closeAll()}))}handleScaleClose({detail:t}){const o=null!=t.list?t.list.parentNode.closest('[role="menu"]'):null;o&&window.requestAnimationFrame((()=>{o.active=!0,o.setFocus()}))}handleWindowScroll(){this.closeAll()}handleOutsideClick(t){l(t,this.hostElement)&&this.closeAll()}handleKeydown(t){if("Tab"===t.key&&!this.hostElement.querySelector("app-navigation-user-menu"))return"SCALE-TELEKOM-NAV-ITEM"===this.trigger.tagName&&this.trigger.firstElementChild.focus(),void this.closeAll()}componentDidLoad(){const t=this.hostElement.querySelector('[slot="trigger"]'),o=t?t.tagName.toUpperCase():"";this.trigger=t&&"SCALE-BUTTON"===o?t.shadowRoot.querySelector("button"):t&&"SCALE-NAV-ICON"===o?t.querySelector("a"):t,this.lists=new Set(Array.from(this.hostElement.querySelectorAll('[role="menu"]'))),this.setTriggerAttributes()}setTriggerAttributes(){Array.from(this.hostElement.querySelectorAll('[role="menuitem"]')).filter((t=>null!=t.querySelector('[slot="sublist"]'))).concat([u(this.trigger)]).filter((t=>null!=t)).forEach((t=>{t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded","false")}))}getListElement(){return Array.from(this.hostElement.children).find((t=>t.tagName.toUpperCase().startsWith("SCALE-MENU-FLYOUT")))}render(){return o(i,null,this.styles&&o("style",null,this.styles),o("div",{part:"trigger",onClick:this.toggle},o("slot",{name:"trigger"})),o("slot",null))}get hostElement(){return e(this)}};p.style=":host{--spacing-y-list:0;--spacing-x-list:0}";const m=["menuitem","menuitemcheckbox","menuitemradio"],g=class{constructor(o){t(this,o),this.scaleOpen=s(this,"scale-open",7),this.scaleOpenLegacy=s(this,"scaleOpen",7),this.scaleClose=s(this,"scale-close",7),this.scaleCloseLegacy=s(this,"scaleClose",7),this.forceRender=0,this.opened=!1,this.direction="bottom-right",this.active=!1,this.closeOnSelect=!0,this.brandHeaderDropdown=!1,this.canScrollUp=!1,this.canScrollDown=!1,this.flipHorizontal=!1,this.flipVertical=!1,this.needsCheckPlacement=!0,this.handleScroll=()=>{this.updateScrollIndicators()},this.handleWheel=t=>{this.stopWheelPropagation(t)}}get triggerRect(){return this.trigger().getBoundingClientRect()}componentDidRender(){this.opened&&this.needsCheckPlacement&&(this.setSize(),this.checkPlacement())}async open(){this.opened=!0,c(this,"scaleOpen",{list:this.hostElement})}async close(t=!1){this.active&&!0!==t&&c(this,"scaleClose",{list:this.hostElement}),this.opened=!1}async setFocus(){null!=this.focusedItemIndex?this.focusItem():this.setInitialItemsFocus()}handleResize(){this.close()}handleKeydown(t){if(this.active)if(this.hostElement.querySelector("app-navigation-user-menu")||t.preventDefault(),"ArrowDown"!==t.key)if("ArrowUp"!==t.key)if("ArrowLeft"!==t.key&&"Escape"!==t.key){if(" "===t.key||"Enter"===t.key||"ArrowRight"===t.key){const o=this.items[this.focusedItemIndex];null!=o&&o.triggerEvent(t,this.closeOnSelect)}}else this.close();else this.shiftItemsFocus(-1);else this.shiftItemsFocus()}handleClick(t){const o=m.map((t=>`[role="${t}"]`)).join(","),i=t.target.closest(o);null!=i&&(t.stopImmediatePropagation(),i.triggerEvent(t,this.closeOnSelect))}handleScaleSelect({detail:t}){if(this.active&&this.opened){const o=this.items.findIndex((o=>o===t.item));null!=o&&(this.focusedItemIndex=o,this.focusItem())}}handleScaleOpen({detail:t}){t.list!==this.hostElement&&(this.active=!1)}openedChanged(){this.opened||(this.active=!1,this.focusedItemIndex=null,this.needsCheckPlacement=!0,this.flipHorizontal=!1,this.flipVertical=!1,this.hostElement.style.marginLeft="",this.hostElement.style.marginTop="",this.hostElement.style.marginRight="",this.hostElement.style.marginBottom="","SCALE-TELEKOM-NAV-ITEM"===this.trigger().tagName&&(this.trigger().style.color="var(--telekom-color-text-and-icon-standard)")),this.opened&&(this.active=!0,this.setFocus(),this.setWindowSize(),this.setPosition(),this.padForNonOverlayScrollbars(),this.updateScrollIndicators()),this.updateTriggerAttributes()}setInitialItemsFocus(){this.items=this.getListItems(),this.focusedItemIndex=-1,this.items.length>0&&this.shiftItemsFocus()}shiftItemsFocus(t=1){let o=this.focusedItemIndex+t;o===this.items.length?o=0:o<0&&(o=this.items.length-1),this.focusedItemIndex=o,this.focusItem()}focusItem(){window.requestAnimationFrame((()=>{try{this.items[this.focusedItemIndex].focus()}catch(t){}}))}updateTriggerAttributes(){const t=this.trigger();t&&"true"===t.getAttribute("aria-haspopup")&&t.setAttribute("aria-expanded",String(this.opened))}setWindowSize(){this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}setPosition(){const{top:t,left:o}=this.triggerRect;this.hostElement.style.left=this.brandHeaderDropdown?o-4+"px":`${o}px`,"SCALE-TELEKOM-NAV-ITEM"===this.trigger().tagName?(this.hostElement.style.top=t-12+"px",this.hostElement.style.left=o-24+"px",this.trigger().style.color="var(--telekom-color-text-and-icon-primary-standard)"):this.hostElement.style.top=`${t}px`}setSize(){const{width:t,height:o}=this.triggerRect;this.hostElement.style.height=`${o}px`,this.hostElement.style.width=`${t}px`,this.brandHeaderDropdown&&(this.base.style.width="240px")}checkPlacement(){this.needsCheckPlacement=!1;let t=!1;const o=this.base.getBoundingClientRect();o.left<10&&(t=!0,this.direction.includes("left")&&(this.flipHorizontal=!0)),o.right>this.windowWidth-10&&(t=!0,this.direction.includes("right")&&(this.flipHorizontal=!0)),o.top<10&&(t=!0,this.direction.includes("top")&&(this.flipVertical=!0)),o.bottom>this.windowHeight-10&&(t=!0,this.direction.includes("bottom")&&(this.flipVertical=!0)),t&&this.furtherAdjustPlacement()}furtherAdjustPlacement(){this.base.className=this.getCssClassMap(),window.getComputedStyle(this.base);const t=this.base.getBoundingClientRect();let o=0,i=0;t.left<10?o=10-t.left:t.right>this.windowWidth-10&&(o=this.windowWidth-10-t.right),t.top<10?i=10-t.top:t.bottom>this.windowHeight-10&&(i=this.windowHeight-10-t.bottom),this.hostElement.style.marginLeft=`${o}px`,this.hostElement.style.marginTop=`${i}px`,this.hostElement.style.marginRight=-o+"px",this.hostElement.style.marginBottom=-i+"px",setTimeout((()=>this.forceRender++))}padForNonOverlayScrollbars(){this.base.style.paddingRight="0px",this.base.style.paddingRight=this.base.offsetWidth-this.base.clientWidth+"px"}updateScrollIndicators(){this.canScrollDown=!1,this.canScrollUp=!1;const t=this.list.scrollHeight-this.list.clientHeight;t&&(this.list.scrollTop>0&&(this.canScrollUp=!0),this.list.scrollTop<t&&(this.canScrollDown=!0)),this.forceRender++}stopWheelPropagation(t){t.stopPropagation(),this.canScrollDown||this.canScrollUp||t.preventDefault(),t.deltaY>0&&!this.canScrollDown&&t.preventDefault(),t.deltaY<0&&!this.canScrollUp&&t.preventDefault()}getListItems(){return Array.from(this.hostElement.children).filter((t=>m.includes(t.getAttribute("role"))))}getCssClassMap(){return r("menu-flyout-list",`menu-flyout-list--direction-${this.direction}`,this.opened&&"menu-flyout-list--opened",this.canScrollUp&&"menu-flyout-list--can-scroll-up",this.canScrollDown&&"menu-flyout-list--can-scroll-down",this.flipHorizontal&&"menu-flyout-list--flip-horizontal",this.flipVertical&&"menu-flyout-list--flip-vertical",this.brandHeaderDropdown&&"menu-flyout-list--brand-header-dropdown")}render(){return o(i,{role:"menu"},this.styles&&o("style",null,this.styles),o("div",{class:this.getCssClassMap(),ref:t=>this.base=t,part:"base",style:{maxHeight:`calc(${this.windowHeight}px - 20px)`},onWheelCapture:this.handleWheel},o("div",{class:"menu-flyout-list__list",ref:t=>this.list=t,onScroll:this.handleScroll},o("slot",null)),o("div",{"aria-hidden":"true",class:"menu-flyout-list__scroll-up-indicator"}),o("div",{"aria-hidden":"true",class:"menu-flyout-list__scroll-down-indicator"})))}get hostElement(){return e(this)}static get watchers(){return{opened:["openedChanged"]}}};g.style=":host{box-sizing:content-box;position:fixed;z-index:100;pointer-events:none}.menu-flyout-list{display:none;position:absolute;pointer-events:initial;z-index:var(--scl-z-index-20);background:var(--telekom-color-background-surface);border-radius:var(--telekom-radius-standard);box-shadow:var(--telekom-shadow-overlay);overflow-y:hidden;margin-top:var(--spacing-y-list, 0);margin-bottom:var(--spacing-y-list, 0);margin-left:var(--spacing-x-list, 0);margin-right:var(--spacing-x-list, 0)}.menu-flyout-list::after{content:'';display:block;position:absolute;width:calc(100% - 2px);height:calc(100% - 2px);inset:0;border-radius:var(--telekom-radius-standard);border:1px solid transparent;pointer-events:none}.menu-flyout-list--opened{display:flex}.menu-flyout-list__list{padding:20px 0;overflow-y:auto;overflow-y:overlay;overscroll-behavior:contain;width:100%}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--direction-bottom-right{top:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-top-right,.menu-flyout-list--direction-bottom-left{top:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-left,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--direction-top-right{bottom:calc(100% + var(--telekom-spacing-composition-space-03));left:0;right:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-top-right,.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-left,.menu-flyout-list--flip-horizontal.menu-flyout-list--flip-vertical.menu-flyout-list--direction-bottom-right,.menu-flyout-list--direction-top-left{bottom:calc(100% + var(--telekom-spacing-composition-space-03));right:0;left:auto;top:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-left,.menu-flyout-list--direction-right{left:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;right:auto;bottom:auto}.menu-flyout-list--flip-horizontal.menu-flyout-list--direction-right,.menu-flyout-list--direction-left{right:calc(100% - var(--telekom-spacing-composition-space-03));top:-20px;left:auto;bottom:auto}.menu-flyout-list__scroll-up-indicator,.menu-flyout-list__scroll-down-indicator{position:absolute;width:0;border:5px solid transparent;pointer-events:none;opacity:0;left:50%}.menu-flyout-list__scroll-up-indicator{top:var(--telekom-spacing-composition-space-04);border-bottom:5px solid var(--telekom-color-ui-faint);border-top:0}.menu-flyout-list__scroll-down-indicator{bottom:var(--telekom-spacing-composition-space-04);border-top:5px solid var(--telekom-color-ui-faint);border-bottom:0}.menu-flyout-list--can-scroll-up .menu-flyout-list__scroll-up-indicator{opacity:1}.menu-flyout-list--can-scroll-down .menu-flyout-list__scroll-down-indicator{opacity:1}.menu-flyout-list--brand-header-dropdown ::slotted(scale-menu-flyout-item){--_min-width-moz:0;--_min-width:0}";export{d as scale_button,p as scale_menu_flyout,g as scale_menu_flyout_list}