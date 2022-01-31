import{r as e,h as a,a as i,g as r}from"./p-7c16486e.js";import{c as t}from"./p-c608c6dc.js";import{f as n}from"./p-ddf43783.js";import{s}from"./p-bf956c1d.js";const d=e=>{let a;try{a=JSON.parse(e)}catch(i){a=e}return a},o=class{constructor(a){e(this,a),this.portalName="",this.mainNavigation=[],this.iconNavigation=[],this.userNavigation=[],this.sectorNavigation=[],this.addonNavigation=[],this.sticky=!1,this.isMegaMenuVisible=!1,this.megaMenuVisible=!1,this.isMobileMenuVisible=!1,this.mobileMenuVisible=!1,this.activeSegment=d(this.sectorNavigation).find((({id:e})=>e===this.activeSectorId))||d(this.sectorNavigation)[0],this.mobileMenu=!1,this.userMenu=!1,this.userMenuMobile=!1,this.visibleMegaMenu="",this.scrolled=!1}megaMenuVisibleChange(e){this.visibleMegaMenu=e}isMegaMenuVisibleChange(e){this.visibleMegaMenu=e}onScroll(){this.scrolled=window.pageYOffset>2}handleCloseMenu(){this.mobileMenu&&this.mobileMenuToggle.focus(),this.mobileMenu=!1}handleCloseUserMenu(){this.userMenuToggle.focus(),this.userMenu=!1}handleOpenUserMenu(){this.userMenu=!0}handleActiveSegment(e){this.activeSegment=d(this.sectorNavigation).find((({id:a})=>a===e))||{}}componentWillLoad(){this.hasSlotMenuMain=!!this.hostElement.querySelector('[slot="menu-main"]'),this.hasSlotMenuIcon=!!this.hostElement.querySelector('[slot="menu-icon"]'),this.hasSlotMenuSector=!!this.hostElement.querySelector('[slot="menu-sector"]'),this.hasSlotMenuAddon=!!this.hostElement.querySelector('[slot="menu-addon"]'),this.hasSlotMenuMobile=!!this.hostElement.querySelector('[slot="menu-mobile"]'),this.hasSlotLogo=!!this.hostElement.querySelector('[slot="logo"]')}componentDidUpdate(){this.hasSlotMenuMain=!!this.hostElement.querySelector('[slot="menu-main"]'),this.hasSlotMenuIcon=!!this.hostElement.querySelector('[slot="menu-icon"]'),this.hasSlotMenuSector=!!this.hostElement.querySelector('[slot="menu-sector"]'),this.hasSlotMenuAddon=!!this.hostElement.querySelector('[slot="menu-addon"]'),this.hasSlotMenuMobile=!!this.hostElement.querySelector('[slot="menu-mobile"]'),this.hasSlotLogo=!!this.hostElement.querySelector('[slot="logo"]')}componentWillRender(){!1!==this.isMegaMenuVisible&&s({tag:"deprecated",message:'Property "isMegaMenuVisible" is deprecated. Please use the "megaMenuVisible" property!',type:"warn",source:this.hostElement}),!1!==this.isMobileMenuVisible&&s({tag:"deprecated",message:'Property "isMobileMenuVisible" is deprecated. Please use the "mobileMenuVisible" property!',type:"warn",source:this.hostElement})}handleMobileMenu(e){if(e&&e.preventDefault(),e&&"key"in e){if(!["Escape","Enter"].includes(e.key))return;if("Escape"===e.key&&!this.mobileMenu)return;if("Enter"===e.key&&this.mobileMenu)return}this.userMenuMobile=!1,this.mobileMenu=!this.mobileMenu}handleSelectedSegment(e,a){this.activeSegment=a,"function"==typeof a.onClick&&a.onClick(e)}menuMain(){const e=n(d(this.mainNavigation),this.activeRouteId),i=a=>e&&e.id===a.id&&!this.visibleMegaMenu&&null!==this.visibleMegaMenu;return a("ul",{class:"main-navigation",onKeyDown:e=>{"Escape"===e.key&&(this.visibleMegaMenu="")}},this.hasSlotMenuMain?a("slot",{name:"menu-main"}):d(this.mainNavigation).map((e=>a("scale-nav-main",{href:e.href,active:i(e),megaMenuVisible:this.visibleMegaMenu===e.id,onMouseEnter:()=>{this.visibleMegaMenu=e.children?e.id:null},onMouseLeave:()=>{this.visibleMegaMenu=""},clickLink:a=>{e.href&&(this.visibleMegaMenu=""),"function"==typeof e.onClick&&e.onClick(a),this.visibleMegaMenu=e.children?e.id:null},name:e.name},e.children&&e.children.length>0&&a("app-mega-menu",{navigation:e.children,hide:()=>{this.visibleMegaMenu=""},activeRouteId:this.activeRouteId,active:this.visibleMegaMenu===e.id})))))}menuIcon(){const{defaultName:e,openedName:i}=d(this.iconNavigation).find((({id:e})=>"menu"===e))||{defaultName:"Menu",openedName:"Close"},{shortName:r="Login",badge:t,badgeLabel:n}=d(this.userNavigation).find((({type:e})=>"userInfo"===e))||{shortName:"Login"};return a("ul",{class:"meta-navigation"},this.hasSlotMenuIcon?a("slot",{name:"menu-icon"}):d(this.iconNavigation).filter((({id:e})=>"menu"!==e)).map((e=>a("scale-nav-icon",{icon:e.icon,href:e.href,badge:e.badge,badgeLabel:e.badgeLabel,clickLink:a=>{"function"==typeof e.onClick&&e.onClick(a)}},e.name))),d(this.userNavigation).length>0&&a("span",null,a("span",{class:"header__user-menu--desktop"},a("scale-menu-flyout",null,a("scale-nav-icon",{slot:"trigger",active:this.userMenu,icon:"user-file-user",refUserMenuToggle:e=>this.userMenuToggle=e,badge:t,badgeLabel:n},r),a("scale-menu-flyout-list",null,a("app-navigation-user-menu",{hide:()=>{this.userMenu=!1,this.userMenuToggle.focus(),window.document.dispatchEvent(new Event("click"))},navigation:d(this.userNavigation)})))),a("span",{class:"header__user-menu--mobile"},a("scale-nav-icon",{slot:"trigger",active:this.userMenuMobile,icon:"user-file-user",refMobileUserMenuToggle:e=>this.userMenuMobileToggle=e,clickLink:()=>{this.mobileMenu=!1,this.userMenuMobile=!this.userMenuMobile},badge:t,badgeLabel:n},r))),(d(this.mainNavigation).length>0||this.hasSlotMenuMobile)&&a("scale-nav-icon",{mobileMenuOpen:this.mobileMenu,icon:this.mobileMenu?"action-circle-close":"action-menu",clickLink:e=>this.handleMobileMenu(e),refMobileMenuToggle:e=>this.mobileMenuToggle=e,active:this.mobileMenu},this.mobileMenu?i:e))}menuSector(){return a("ul",{class:"sector-navigation"},this.hasSlotMenuSector?a("slot",{name:"menu-sector"}):this.portalName?a("li",{class:"sector-navigation__portal-name"},this.portalName):d(this.sectorNavigation).map((e=>a("scale-nav-segment",{active:this.activeSegment.id===e.id,href:e.href,onClick:a=>this.handleSelectedSegment(a,e),onFocus:()=>{window.scrollTo({top:0})}},e.name))))}menuAddon(){return a("ul",{class:"addon-navigation"},this.hasSlotMenuAddon?a("slot",{name:"menu-addon"}):d(this.addonNavigation).map((e=>a("scale-nav-segment",{href:e.href,onClick:a=>{"function"==typeof e.onClick&&e.onClick(a)},onFocus:()=>{window.scrollTo({top:0})}},e.name))))}render(){return a(i,null,a("header",{class:"header__container"},a("div",{class:this.getCssClassMap()},a("div",{class:"header__brand"},a("span",{class:"header__brand-before"}),a("span",{class:"header__brand-after"}),a("div",{class:"header__brand-content"},a("div",{class:"header__brand-branding"},this.hasSlotLogo?a("slot",{name:"logo"}):a("app-logo",{claim:!0,claimLang:this.claimLang,href:this.logoHref,logoTitle:this.logoTitle,onClick:this.logoClick})),a("div",{class:"header__brand-sector"},this.menuSector()),a("div",{class:"header__brand-meta"},this.menuAddon()))),a("nav",{class:"header__nav","aria-label":"top"},a("span",{class:"header__nav-before"}),a("span",{class:"header__nav-after"}),a("div",{class:"header__nav-content"},a("div",{class:"header__nav-logo"},a("app-logo",{color:"#e20074",href:this.logoHref,logoTitle:this.logoTitle,onClick:this.logoClick,focusable:this.scrolled})),a("div",{class:"header__nav-menu-wrapper"},a("div",{class:"header__nav-menu-main"},this.menuMain()),a("div",{class:"header__nav-menu-icon"},this.menuIcon())))),a("nav",{class:"header__nav__mobile-menu"+(this.mobileMenu?" header__nav__mobile-menu--opened":""),"aria-label":"main"},this.hasSlotMenuMobile?a("slot",{name:"menu-mobile"}):a("div",null,a("app-navigation-sector-mobile",{navigation:d(this.sectorNavigation),activeSectorId:this.activeSectorId,hide:()=>{this.handleMobileMenu(),this.mobileMenuToggle.focus()}}),a("app-navigation-main-mobile",{navigation:d(this.mainNavigation),activeRouteId:this.activeRouteId,hide:()=>{this.handleMobileMenu(),this.mobileMenuToggle.focus()}}))),a("nav",{class:"header__nav__mobile-menu"+(this.userMenuMobile?" header__nav__mobile-menu--opened":""),"aria-label":"main"},a("div",null,this.userMenuMobile&&a("app-navigation-user-menu",{hide:()=>{this.userMenuMobile=!1,this.userMenuMobileToggle.focus()},navigation:d(this.userNavigation)}))))))}getCssClassMap(){return t("header",(this.scrolled||this.sticky)&&"header--sticky",(this.visibleMegaMenu||this.mobileMenu||this.userMenuMobile)&&"menu--open")}get hostElement(){return r(this)}static get watchers(){return{megaMenuVisible:["megaMenuVisibleChange"],isMegaMenuVisible:["isMegaMenuVisibleChange"],activeSectorId:["handleActiveSegment"]}}};o.style="scale-app-header{--header-nav-height:56px;--header-brand-height:72px;--header-border-radius:var(--scl-radius-12);--header-transition-speed:0.3s;--header-brand-collapsed-height:4px;--header-max-width:inherit;--background:var(--scl-color-primary);--font-weight:var(--scl-font-weight-regular);--border:1px solid var(--scl-color-grey-10);--color-brand:var(--scl-color-white);--background-brand:var(--scl-color-primary);--color-nav:var(--scl-color-text-standard);--background-nav:var(--scl-color-background-standard);--spacing-nav:0 var(--scl-spacing-16)}@keyframes keyframes-slideUp{from{top:0}to{top:-56px}}.header__container{width:100%;height:128px}.header__user-menu--desktop{display:block}.header__user-menu--mobile{display:none}@media (max-width: 1023px){.header__container{width:100%;height:66px}.header__user-menu--desktop{display:none}.header__user-menu--mobile{display:block}}.header{width:100%;z-index:99;position:fixed;background:var(--background);font-weight:var(--font-weight)}.header .header__brand{color:var(--color-brand);background:var(--background-brand);display:flex;align-items:center}.header .header__nav{box-sizing:border-box;color:var(--color-nav);background:var(--background-nav);display:flex;align-items:center;border-top-left-radius:var(--header-border-radius);border-top-right-radius:var(--header-border-radius);border-bottom:1px solid transparent}.header.menu--open .header__nav,.header.header--sticky .header__nav{border-bottom:var(--border)}.header .header__nav-content{width:100%;display:flex;align-items:center}.header .header__nav-menu-wrapper{width:100%;display:flex;align-items:center;justify-content:space-between}.header.header--sticky .header__nav-before,.header.header--sticky .header__nav-after,.header.menu--open .header__nav-before,.header.menu--open .header__nav-after{width:var(--header-border-radius);bottom:calc(-2 * var(--header-border-radius));height:calc(2 * var(--header-border-radius));position:absolute;border-top:var(--border);box-shadow:0 calc(-1 * var(--header-border-radius)) 0 0\n    var(--scl-color-background-standard);background-color:transparent}.header.menu--open .header__nav-before,.header.header--sticky .header__nav-before{left:-1px;z-index:97;border-left:var(--border);border-top-left-radius:var(--header-border-radius)}.header.menu--open .header__nav-after,.header.header--sticky .header__nav-after{right:-1px;z-index:98;border-right:var(--border);border-top-right-radius:var(--header-border-radius)}.header *[slot='menu-icon'],.header .meta-navigation{display:flex;padding:0;list-style:none;align-items:center;margin-block-start:0;margin-block-end:0}@media (max-width: 1023px){.header{height:var(--header-nav-height)}.header.menu--open .header__nav-before,.header.header--sticky .header__nav-before,.header.header--sticky .header__nav-after,.header.menu--open .header__nav-after{top:51px}.header .sector-navigation,.header .addon-navigation,.header *[slot='menu-main'],.header .main-navigation{display:none !important}.header .header__brand{width:100%;height:var(--header-nav-height);display:flex;padding:0 var(--scl-spacing-16);z-index:96;position:absolute;transition:height var(--header-transition-speed) ease-in-out;align-items:center;animation-name:keyframes-slideUp;animation-delay:0.5s;justify-content:space-between;animation-duration:0.75s;animation-fill-mode:forwards;animation-timing-function:cubic-bezier(0.42, 0, 0.1, 1)}.header .header__nav{top:4px;width:100%;height:calc(var(--header-nav-height) - 4px);padding:var(--spacing-nav);z-index:95;position:absolute}.header .header__nav__mobile-menu{top:var(--header-nav-height);width:100%;display:none;position:relative}.header .header__nav__mobile-menu--opened{height:calc(100vh - var(--header-nav-height));display:block;overflow-y:auto;background:#fff}.header .header__brand .header__brand-before,.header .header__brand .header__brand-after{width:var(--header-border-radius);bottom:calc(-2 * var(--header-border-radius));height:calc(2 * var(--header-border-radius));position:absolute;border-top:transparent;box-shadow:0 calc(-1 * var(--header-border-radius)) 0 0\n      var(--scl-color-primary);background-color:transparent}.header .header__brand .header__brand-before{left:-1px;z-index:97;border-left:transparent;border-top-left-radius:var(--header-border-radius)}.header .header__brand .header__brand-after{right:-1px;z-index:98;border-right:transparent;border-top-right-radius:var(--header-border-radius)}.header .header__brand .logo svg{width:auto;height:26px}}.header .header__nav .header__nav-logo svg path{fill:var(--scl-color-primary) !important}@media (min-width: 1024px){.header .header__nav-before{top:55px}.header .header__nav-after{top:55px}.header .mobile-menu,.header .header__nav__mobile-menu{display:none}.header .header__brand{height:var(--header-brand-height);padding:0 var(--scl-spacing-24);transition:height var(--header-transition-speed) ease-in-out;justify-content:space-between}.header .header__brand-content{top:0;width:100%;display:flex;opacity:1;position:relative;transition:opacity var(--header-transition-speed) ease-in-out,\n      top var(--header-transition-speed) ease-in-out;align-items:center}.header .header__nav{height:var(--header-nav-height);padding:0 var(--scl-spacing-24);position:relative}.header .header__nav-logo{width:50px;opacity:0;transition:none;font-weight:var(--scl-font-weight-bold);margin-right:var(--scl-spacing-16);pointer-events:none}.header.header--sticky .header__nav-logo{pointer-events:all;margin-right:var(--scl-spacing-32)}.header scale-nav-main:first-child li{padding-left:0}.header *[slot='menu-main'],.header .main-navigation{height:var(--header-nav-height);margin:0;display:flex;padding:0;list-style:none;transition:margin-left var(--header-transition-speed) ease-in-out;align-items:center;margin-left:calc(-50px - var(--scl-spacing-16))}.header *[slot='menu-sector'],.header *[slot='menu-addon'],.header .sector-navigation{display:flex}.header .addon-navigation{display:flex;list-style:none}.header .sector-navigation .segment-navigation__item-link{margin:0 7px}.header .addon-navigation .segment-navigation__item-link{margin:0 0 0 14px}.header.header--sticky{--header-brand-height:4px}.header.header--sticky .header__nav-logo{opacity:1;transition:opacity var(--header-transition-speed) ease-in-out}.header.header--sticky .header__brand-content{top:56px;opacity:0;transition:opacity var(--header-transition-speed) ease-in-out,\n      top var(--header-transition-speed) ease-in-out}.header *[slot='menu-main'],.header.header--sticky .main-navigation{transition:margin-left var(--header-transition-speed) ease-in-out;margin-left:0}.header .sector-navigation .sector-navigation__portal-name{font-weight:var(--scl-font-weight-extrabold);font-size:var(--scl-font-variant-body-large-size);list-style-type:none}.header *[slot='menu-main'],scale-nav-main{height:100%}.header *[slot='logo'],.header .header__brand-content .header__brand-branding{width:100%;display:flex;align-items:center;justify-content:flex-start}.header .header__brand-content .header__brand-sector{width:100%;display:flex;align-items:center;justify-content:center}.header .header__brand-content .header__brand-meta{width:100%;display:flex;align-items:center;justify-content:flex-end}.header .header__brand app-logo{margin-right:var(--scl-spacing-16)}}@media (min-width: 1552px){.header .header__nav-content,.header .header__brand-content{margin:0 auto;max-width:var(--header-max-width)}}";export{o as scale_app_header}