import{h as t,r as e,c as i,a as s,g as o}from"./p-d52b3602.js";import{c as l}from"./p-c608c6dc.js";import{e as a}from"./p-086c9d13.js";const n={checkbox:{defaults:{sortBy:"number"},getLongestContent:({rows:t,columnIndex:e})=>t[0][e],render:({field:e,content:i,component:s,rowIndex:o,columnIndex:l})=>{const{style:a="checkbox",editable:n=!1,label:r}=e,d={checked:i,disabled:!n,label:r};switch(n&&(d.onScaleChange=t=>{const{value:e}=t.detail;s.rows[o][l]=e,s.triggerEditEvent(e,o,l)}),a){case"switch":return t("scale-switch",Object.assign({size:"small"},d));default:return t("scale-checkbox",Object.assign({},d))}}},date:{defaults:{sortBy:"text"},render:({content:e,isAutoWidthCheck:i})=>{let s=e;return i&&(s=s.replace(/[0-9]/g,"8")),t("p",{class:"scl-body"},s)}},email:{defaults:{sortBy:"text"},render:({content:e})=>{const i=e.replace(/^mailto:/i,"");return t("scale-link",{href:e},i)}},graph:{defaults:{sortBy:"number"},render:({field:e,content:i})=>{const{style:s="progress",min:o=0,max:l=100}=e,a=parseFloat(((i-o)/(l-o)*100).toPrecision(String(i).replace(".","").length));switch(s){case"bar":return t("div",{class:"tbody__bar-cell"},t("scale-progress-bar",{class:"data-grid-progress-bar","aria-hidden":"true",percentage:a,mute:!0}),t("p",{class:"scl-body"},i));default:return t("scale-progress-bar",{class:"data-grid-progress-bar",percentage:a,showStatus:!0,mute:!0})}}},html:{defaults:{},getLongestContent:({rows:t,columnIndex:e})=>t[0][e],render:({content:e,component:i})=>e&&t("scale-button",{variant:"secondary",size:"small","icon-only":!0,"inner-aria-label":`Activate to ${e.isExpanded?"collapse":"expand"} content`,onClick:()=>{e.isExpanded=!e.isExpanded,i.forceRender++}},t(e.isExpanded?"scale-icon-navigation-collapse-up":"scale-icon-navigation-collapse-down",{size:14}))},link:{defaults:{sortBy:"text"},render:({content:e})=>{const i=e.replace(/^https?\:\/\//i,"");return t("scale-link",{href:e,target:"_blank"},i)}},number:{defaults:{textAlign:"right",sortBy:"number"},render:({field:e,content:i,isAutoWidthCheck:s})=>{const{precision:o=1/0,decimalSymbol:l=".",groupSymbol:a="",prefix:n="",suffix:r=""}=e;let d=i;if(s&&(d=Number(d.toString().replace(/[0-9]/g,"8"))),d=o<100?Number(d).toFixed(o):d.toString(),a||"."!==l){const t=d.split(".");a&&(t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,a)),d=t.join(l)}return(n||r)&&(d=n+d+r),t("p",{class:"scl-body",style:{textAlign:"right"}},d)}},select:{defaults:{sortBy:"text"},render:({field:e,content:i,component:s,rowIndex:o,columnIndex:l,isAutoWidthCheck:a})=>{const{options:n,editable:r=!1,label:d}=e;if(a)return t("p",{class:"scl-body",style:{paddingRight:"56px"}},i);const c={disabled:!r,value:i,label:d};return r&&(c.onScaleChange=({detail:t})=>{const{value:e}=t;s.rows[o][l]=e,s.triggerEditEvent(e,o,l)}),t("scale-dropdown-select",Object.assign({floatingStrategy:"fixed"},c),n.map((e=>t("scale-dropdown-select-item",{value:e},e))))}},tags:{defaults:{sortBy:"text"},render:({content:e})=>{const i=e.split(",").map((t=>t.trim()));return t("ul",{class:"tbody__tag-list"},i.map((e=>t("li",null,t("scale-tag",{size:"small",type:"strong"},e)))))}},telephone:{defaults:{sortBy:"text"},render:({content:e})=>{const i=e.replace(/^tel:/i,"");return t("scale-link",{href:e},i)}},text:{defaults:{sortBy:"text"},render:({field:e,content:i,component:s,rowIndex:o,columnIndex:l,isAutoWidthCheck:a})=>{const{variant:n="body",editable:r=!1,iconPrefix:d,iconSuffix:c,label:h}=e;if(a&&r)return t("p",{class:"scl-body",style:{paddingRight:"26px"}},i);if(r){return t("scale-text-field",Object.assign({},{type:"text",value:i,label:h,onScaleChange:({detail:t})=>{const{value:e}=t;s.rows[o][l]=e,s.triggerEditEvent(e,o,l)}}))}{let e=i;return a&&(e+="w"),t("div",{class:"tbody__text-cell"},d&&t("span",{class:"tbody__text-cell-prefix"},t(`scale-icon-${d}`)),t("p",{class:`scl-${n}`},e),c&&t("span",{class:"tbody__text-cell-suffix"},t(`scale-icon-${c}`)))}}},actions:{defaults:{},render:({content:e})=>t("div",{class:"tbody__actions"},e.map((e=>{const{label:i}=e,s=function(t,e){var i={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(i[s]=t[s]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(t);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(t,s[o])&&(i[s[o]]=t[s[o]])}return i}(e,["label"]);return"object"==typeof i&&"__html"in i?t("scale-button",Object.assign({size:"small",innerHTML:i.__html},s)):t("scale-button",Object.assign({size:"small"},s),i)})))}},r={maxWidth:1/0,minWidth:20,resizable:!0,sortable:!1,sortBy:"text",textAlign:"left",visible:!0,width:"auto"};
/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */let d;const c="data-grid",h=class{constructor(t){e(this,t),this.scaleEdit=i(this,"scale-edit",7),this.scaleEditLegacy=i(this,"scaleEdit",7),this.scaleSort=i(this,"scale-sort",7),this.scaleSortLegacy=i(this,"scaleSort",7),this.forceRender=0,this.paginationStart=0,this.scrollY=0,this.freezeHeader=!1,this.heading="",this.hideBorder=!1,this.hideHeader=!1,this.hideInfo=!1,this.hideMenu=!1,this.numbered=!1,this.pageSize=1/0,this.selectable=!1,this.selection=[],this.shadeAlternate=!0,this.visible=!0,this.activeSortingIndex=-1,this.contentWidth=100,this.dataNeedsCheck=!0,this.hasData=!1,this.isMobile=!1,this.isPagination=!1,this.isSortable=!1,this.lastContainerWidth=100,this.mobileTitleIndex=-1,this.needsAutoWidthParse=!1,this.needsColumnResize=!1,this.numberColumnWidth=0,this.selectionColumnWidth=22,this.handleMenuListClick=t=>{const e=["sortBy","toggleVisibility"],i=e.indexOf(t.target.id);if(i>-1){const t=this.hostElement.shadowRoot.querySelector(`#${e[1-i]}List`);t&&t.setAttribute("opened","false")}},this.onDividerMove=this.onDividerMove.bind(this),this.onDividerUp=this.onDividerUp.bind(this),this.applyResponsiveClasses=this.applyResponsiveClasses.bind(this),this.updateColumnStretching=this.updateColumnStretching.bind(this)}componentWillLoad(){this.fieldsHandler(),this.rowsHandler()}componentWillUpdate(){}componentDidRender(){this.needsAutoWidthParse&&this.calculateAutoWidths(),setTimeout((()=>{this.needsColumnResize&&this.updateColumnStretching()}))}componentDidLoad(){this.addResizeObserver()}componentDidUpdate(){}disconnectedCallback(){this.removeResizeObserver()}fieldsHandler(){this.parseFields(),this.checkForMobileTitle(),this.checkForSortableFields(),this.dataNeedsCheck=!0}rowsHandler(){this.paginationStart>this.rows.length&&(this.paginationStart=this.rows.length-this.rows.length%this.pageSize),this.parseRows(),this.setInitialRowProps(),this.resetSortingToggle(),this.dataNeedsCheck=!0,this.needsAutoWidthParse=!0,this.needsColumnResize=!0,this.rows.length<=this.paginationStart&&this.paginationStart-this.pageSize>-1&&(this.paginationStart=this.paginationStart-this.pageSize)}parseFields(){this.fields&&"string"==typeof this.fields&&(this.fields=JSON.parse(this.fields))}parseRows(){this.rows&&"string"==typeof this.rows&&(this.rows=JSON.parse(this.rows))}setInitialRowProps(){this.rows&&this.rows.length&&(this.rows.forEach(((t,e)=>{t.initialIndex=e,t.selected=!1})),this.isPagination=this.pageSize<=this.rows.length-1)}checkHasData(){if(!this.fields)return!1;for(let t=0;t<this.fields.length;t++)if(this.fields[t].type||(this.fields[t].type="text"),!n[this.fields[t].type])return console.warn(`Unrecognised field type: "${this.fields[t].type}"`),!1;if(!this.rows||!this.rows.length)return!1;for(let t=0;t<this.rows.length;t++)if(this.rows[t].length!==this.fields.length)return console.warn(`Unable to render ${this.heading&&`"${this.heading}" `}table: row data length not equal to supplied fields.`),!1;return!0}checkForMobileTitle(){this.mobileTitleIndex=-1,this.fields&&this.fields.every((({mobileTitle:t},e)=>!t||(this.mobileTitleIndex=e,!1)))}checkForSortableFields(){this.isSortable=!1,this.fields&&this.fields.forEach((({sortable:t})=>{t&&(this.isSortable=!0)}))}getCssClassMap(){return l(c,!this.isMobile&&`${c}--desktop`,this.isMobile&&`${c}--mobile`,this.shadeAlternate&&`${c}--shade-alternate`,this.freezeHeader&&`${c}--freeze-header`,this.hideBorder&&`${c}--hide-border`,this.hideMenu&&`${c}--hide-menu`)}polyfillMousePosition(t){t.changedTouches&&t.changedTouches.length&&(t.x=t.changedTouches[0].pageX,t.y=t.changedTouches[0].pageY),void 0===t.x&&(t.x=t.clientX,t.y=t.clientY)}getDefaultLongestContent({rows:t,columnIndex:e}){let i,s=0;return t.forEach((t=>{const o=t[e].toString().length;o>s&&(i=t[e],s=o)})),i}toggleSelectAll(){this.elToggleSelectAll&&(this.rows.forEach((t=>t.selected=this.elToggleSelectAll.checked)),this.updateReadableSelection(),this.forceRender++)}toggleRowSelect({target:t},e){this.rows[e].selected=t.checked,this.updateReadableSelection(),this.forceRender++}updateReadableSelection(){this.selection.length=0,this.rows.forEach((t=>t.selected&&this.selection.push(t))),this.hostElement.shadowRoot.querySelector(".thead__cell--selection scale-checkbox").checked=!!this.selection.length}toggleTableSorting(t,e,i){this.activeSortingIndex>-1&&this.activeSortingIndex!==e&&(this.fields[this.activeSortingIndex].sortDirection="none"),this.activeSortingIndex=e;const s="none"===t?"ascending":"ascending"===t?"descending":"none";this.fields[e].sortDirection=s,this.sortTable(s,i,e)}sortTable(t,e,i){if("none"===t)this.rows.sort(((t,e)=>t.initialIndex-e.initialIndex));else switch(n[e]&&n[e].defaults&&n[e].defaults.sortBy||r.sortBy){case"text":this.rows.sort("ascending"===t?(t,e)=>{const s=t[i].toLowerCase(),o=e[i].toLowerCase();return s<o?-1:s>o?1:0}:(t,e)=>{const s=t[i].toLowerCase(),o=e[i].toLowerCase();return s>o?-1:s<o?1:0});break;case"number":this.rows.sort("ascending"===t?(t,e)=>Number(t[i])-Number(e[i]):(t,e)=>Number(e[i])-Number(t[i]))}this.forceRender++,this.triggerSortEvent(t,e,i)}resetSortingToggle(){this.activeSortingIndex>-1&&(this.fields[this.activeSortingIndex].sortDirection="none"),this.activeSortingIndex=-1}onDividerDown(t){this.polyfillMousePosition(t),t.preventDefault(),this.activeDivider=t.target,t.target.downX=t.x,this.activeDivider.interactiveWidth=0,window.addEventListener("mousemove",this.onDividerMove),window.addEventListener("touchmove",this.onDividerMove),window.addEventListener("mouseup",this.onDividerUp),window.addEventListener("touchend",this.onDividerUp)}onDividerMove(t){this.polyfillMousePosition(t);const{width:e,min:i,max:s}=this.activeDivider.dataset,o=t.x-this.activeDivider.downX,l=Math.min(Number(s),Math.max(Number(i),Number(e)+o)),a=l-Number(e);this.activeDivider.interactiveWidth=l,this.activeDivider.style.transform=`translateX(${a}px)`}onDividerUp(){const{index:t}=this.activeDivider.dataset;this.activeDivider.interactiveWidth&&(this.fields[Number(t)].width=this.activeDivider.interactiveWidth),this.activeDivider.style.transform="translateX(0px)",window.removeEventListener("mousemove",this.onDividerMove),window.removeEventListener("touchmove",this.onDividerMove),window.removeEventListener("mouseup",this.onDividerUp),window.removeEventListener("touchend",this.onDividerUp),this.needsColumnResize=!0,this.updateColumnStretching(),this.forceRender++}toggleVisibilityMenu(t){t.preventDefault();const e=this.hostElement.shadowRoot.querySelector(".visibility-toggle"),i=e.children[1];"none"===e.style.display?(e.style.display="block",i.style.transform=`translate(${t.clientX}px, ${t.clientY}px)`):e.style.display="none"}toggleColumnVisibility(t,e){this.fields[e].visible=t,this.forceRender++,this.needsColumnResize=!0,this.updateColumnStretching()}addResizeObserver(){d||(d=new ResizeObserver((t=>{for(const e of t){if(null===e.target.offsetParent)return;e.target.applyResponsiveClasses(e),e.target.updateColumnStretching()}}))),this.elMmainContainer=this.hostElement.shadowRoot.querySelector(`.${c}`),this.elMmainContainer.applyResponsiveClasses=this.applyResponsiveClasses,this.elMmainContainer.updateColumnStretching=this.updateColumnStretching,d.observe(this.elMmainContainer)}removeResizeObserver(){this.elMmainContainer&&d.unobserve(this.elMmainContainer)}applyResponsiveClasses(){const t=this.elMmainContainer.offsetWidth<=500;this.isMobile!==t&&this.forceRender++,this.isMobile=t}updateColumnStretching(){if(this.needsAutoWidthParse)return;const t=this.elMmainContainer,e=t.offsetWidth-2;if(this.lastContainerWidth===e&&!this.needsColumnResize)return;if(this.needsColumnResize=!1,this.lastContainerWidth=e,t.offsetWidth<=500)return;const i=(()=>{let t=0;return t+=8,this.numbered&&(t+=this.numberColumnWidth+32),this.selectable&&(t+=this.selectionColumnWidth+32,this.numbered&&(t-=16)),this.fields.forEach((({visible:e=!0,width:i})=>{e&&(t+=i+32)})),t})();this.contentWidth=Math.max(i,e);const s=e-i;if(s<=0)this.fields.forEach((t=>t.stretchWidth=0));else{let t=0,e=0;this.fields.forEach((({visible:i=!0,stretchWeight:s})=>{i&&("number"==typeof s?t+=s:e++)}));const i=Math.max(0,1-t);t=Math.max(1,t),this.fields.forEach((o=>{const{visible:l=!0,stretchWeight:a}=o;if(!l)return;let n=0;"number"==typeof a?n=a/t:i>0&&(n=i/e),o.stretchWidth=s*n}))}this.forceRender++}calculateAutoWidths(){let t=!1;this.hostElement.shadowRoot.querySelectorAll(`.${c}__auto-width-check td`).forEach((e=>{t||null===e.offsetParent||(t=!0),t&&(this.fields[e.dataset.columnindex].width=e.clientWidth)})),t&&setTimeout((()=>{this.needsAutoWidthParse=!1,this.forceRender++}))}triggerSortEvent(t,e,i){a(this,"scaleSort",{rows:this.rows,type:e,sortDirection:t,columnIndex:i})}triggerEditEvent(t,e,i){a(this,"scaleEdit",{rows:this.rows,rowIndex:e,columnIndex:i,value:t}),this.forceRender++}onTableScroll(){this.freezeHeader&&!this.hideHeader&&(this.elTableHead.style.transform=`translateY(${this.elScrollContainer.scrollTop}px)`)}renderSettingsMenu(){var e,i,s;return t("scale-menu-flyout",{class:`${c}__settings-menu`},t("scale-button",{slot:"trigger",variant:"secondary","icon-only":!0,"data-sortable":this.isSortable},t("scale-icon-service-settings",{accessibilityTitle:"Table options"})),t("scale-menu-flyout-list",null,this.isSortable&&t("scale-menu-flyout-item",{id:"sortBy",onClick:this.handleMenuListClick},t("scale-icon-action-sort",{slot:"prefix"}),(null===(e=this.localization)||void 0===e?void 0:e.sortBy)||"Sort By",t("scale-menu-flyout-list",{slot:"sublist",id:"sortByList"},this.fields.map((({label:e,type:i,sortable:s,sortDirection:o="none"},l)=>s?t("scale-menu-flyout-item",{"onScale-select":()=>this.toggleTableSorting(o,l,i)},"ascending"===o&&t("scale-icon-navigation-collapse-up",{size:16,slot:"prefix"}),"descending"===o&&t("scale-icon-navigation-collapse-down",{size:16,slot:"prefix"}),"none"===o&&t("scale-icon-navigation-collapse-up",{size:16,slot:"prefix",style:{opacity:"0"}}),e||i):"")))),t("scale-menu-flyout-item",{id:"toggleVisibility",onClick:this.handleMenuListClick},t("scale-icon-action-hide-password",{slot:"prefix"}),(null===(i=this.localization)||void 0===i?void 0:i.toggle)||"Toggle Visibility",t("scale-menu-flyout-list",{slot:"sublist","close-on-select":"false",id:"toggleVisibilityList"},this.fields.map((({label:e,type:i,visible:s=(void 0!==n[i].defaults.visible?n[i].defaults.visible:r.visible)},o)=>t("scale-menu-flyout-item",{checkable:"checkbox",checked:!!s,"onScale-select":()=>this.toggleColumnVisibility(!s,o)},e||i))))),this.selectable&&t("scale-menu-flyout-item",{"onScale-select":()=>{this.elToggleSelectAll.checked=!this.elToggleSelectAll.checked,this.toggleSelectAll()}},t("scale-icon",{slot:"prefix",path:"M20.9328 10.6668C20.5132 10.6668 20.1731 11.0069 20.1731 11.4265V20.3269H1.5194V1.67309H16.5049C16.9245 1.67309 17.2646 1.33292 17.2646 0.913386C17.2646 0.49385 16.9245 0.153687 16.5049 0.153687H0.759699C0.340163 0.153687 0 0.49385 0 0.913386V21.0866C0 21.5062 0.340163 21.8463 0.759699 21.8463H20.9328C21.3523 21.8463 21.6925 21.5062 21.6925 21.0866V11.4265C21.6925 11.0069 21.3524 10.6668 20.9328 10.6668ZM23.7774 0.653387C23.4807 0.356739 22.9997 0.356739 22.703 0.653387L10.3293 13.0272L7.25501 9.9529C6.9583 9.65625 6.47732 9.65625 6.18061 9.9529C5.88396 10.2496 5.88396 10.7306 6.18061 11.0273L9.7921 14.6388C9.94045 14.7871 10.1349 14.8613 10.3293 14.8613C10.5237 14.8613 10.7181 14.7871 10.8665 14.6388L23.7774 1.72778C24.0741 1.43108 24.0741 0.950095 23.7774 0.653387Z"}),(null===(s=this.localization)||void 0===s?void 0:s.select)||"Select / Deselect All"),t("slot",{name:"menu"})))}renderTable(){return this.needsAutoWidthParse?this.renderAutoWidthCheck():t("div",{ref:t=>this.elScrollContainer=t,class:`${c}__scroll-container`,style:{height:this.height||"auto"},onScroll:()=>this.onTableScroll()},t("table",{class:`${c}__table`},this.renderTableHead(),this.renderTableBody()))}renderAutoWidthCheck(){this.numberColumnWidth=9*this.rows.length.toString().length;const e=[];return this.fields.forEach((({type:t,width:i=n[t].defaults.width||r.width},s)=>{"auto"===i&&e.push(s)})),e.length?t("table",{class:`${c}__auto-width-check ${c}__table`},t("tr",{class:"tbody__row"},e.map((e=>{const i=this.fields[e],{type:s,cell:o=n[s]}=i,l=(o.getLongestContent||this.getDefaultLongestContent)({rows:this.rows,columnIndex:e,field:i});return t("td",{class:"tbody__cell",style:{width:"auto"},"data-columnindex":e},o.render({field:i,content:l,component:this,isAutoWidthCheck:!0}))})))):(this.needsAutoWidthParse=!1,this.renderTable())}renderTableHead(){return t("thead",{ref:t=>this.elTableHead=t,class:"thead "+(this.hideHeader?"sr-only":"")},t("tr",{class:"thead__row"},this.numbered&&this.renderTableHeadNumberedCell(),this.selectable&&this.renderTableHeadSelectableCell(),this.fields.map((({type:e,label:i="",visible:s=(void 0!==n[e].defaults.visible?n[e].defaults.visible:r.visible),sortable:o,sortDirection:l="none",resizable:a=(void 0!==n[e].defaults.resizable?n[e].defaults.resizable:r.resizable),width:d=n[e].defaults.width||r.width,minWidth:c=n[e].defaults.minWidth||r.minWidth,maxWidth:h=n[e].defaults.maxWidth||r.maxWidth,textAlign:p=n[e].defaults.textAlign||r.textAlign,stretchWidth:b=0},g)=>{if(!s)return;const m={class:"thead__cell",style:{width:`calc(${d}px + ${b}px)`,"justify-content":p},"data-type":e};return o&&(m["aria-sort"]=l),t("th",Object.assign({title:"Activate to sort column"},m,o?{onKeyDown:t=>{["Enter"," "].includes(t.key)&&this.toggleTableSorting(l,g,e)},onClick:()=>{this.toggleTableSorting(l,g,e)},tabindex:0,class:`${m.class} thead-sortable`}:{}),t("div",{class:"thead__title"},t("span",{class:"thead__text"},o&&t("scale-icon-content-sort-indicator-up",{size:16,class:"thead__arrow-top"}),o&&t("scale-icon-content-sort-indicator-down",{size:16,class:"thead__arrow-bottom"}),i)),a&&t("div",{class:"thead__divider","data-index":g,"data-width":d,"data-min":c,"data-max":h,onMouseDown:t=>this.onDividerDown(t),onTouchStart:t=>this.onDividerDown(t),"aria-hidden":"true"},t("div",{class:"thead__divider-line"})))}))))}renderTableHeadNumberedCell(){return t("th",{class:"thead__cell  thead__cell--numbered",style:{width:this.numberColumnWidth+"px"}},t("span",{class:"scl-body"},"#"))}renderTableHeadSelectableCell(){const e={width:this.selectionColumnWidth+"px"};return this.numbered&&(e.paddingLeft="0px"),t("th",{class:"thead__cell thead__cell--selection",style:e,title:"Select"},t("scale-checkbox",{ref:t=>this.elToggleSelectAll=t,onScaleChange:()=>this.toggleSelectAll(),hideLabel:!0,"aria-label":"Select"}))}renderTableBody(){return t("tbody",{class:"tbody"},(()=>{const e=[],i=this.paginationStart,s=Math.min(this.rows.length,this.paginationStart+this.pageSize);for(let o=i;o<s;o++){const i=this.rows[o],s=[];let l=!1;e.push(t("tr",{class:"tbody__row"},this.renderMobileTitle(i),this.numbered&&this.renderTableBodyNumberedCell(o),this.selectable&&this.renderTableBodySelectableCell(o),i.map(((t,e)=>{const i=this.fields[e];if(void 0!==i.visible?i.visible:void 0!==n[i.type].defaults.visible?n[i.type].defaults.visible:r.visible){if("html"===i.type){if(!t)return this.renderTableCell(i,null,o,e);t.isExpanded&&(l=!0),s.push({content:t})}return this.renderTableCell(i,t,o,e)}})))),s.length&&e.push(t("div",{class:"tbody__nested",style:{width:this.contentWidth+"px",display:l?"block":"none"}},t("td",{class:"tbody__nested-cell"},s.map((({content:e})=>e&&t("div",{ref:t=>{if(t){let i=t.lastElementChild;for(;i;)t.removeChild(i),i=t.lastElementChild;t.appendChild(e)}}}))))))}return e})())}renderMobileTitle(e){return t("h5",{class:"tbody__mobile-title scl-h5"},-1===this.mobileTitleIndex?" ":e[this.mobileTitleIndex])}renderTableBodyNumberedCell(e){return t("td",{class:"tbody__cell tbody__cell--numbered",style:{width:this.numberColumnWidth+"px"}},t("p",{class:"scl-body"},e+1))}renderTableBodySelectableCell(e){const i={width:this.selectionColumnWidth+"px"};return this.numbered&&(i.marginLeft="0px",i.paddingLeft="0px"),t("td",{title:this.rows[e][0],class:"tbody__cell tbody__cell--selection",style:i},t("scale-checkbox",{checked:this.rows[e].selected,onScaleChange:t=>this.toggleRowSelect(t,e),hideLabel:!0}))}renderTableCell(e,i,s,o){const l=n[e.type],{label:a,width:d=l.defaults.width||r.width,stretchWidth:c=0,mobileTitle:h}=e;return t("td",{class:"tbody__cell"+(h?" tbody__cell--used-as-mobile-title":""),style:{width:`calc(${d}px + ${c}px)`}},t("div",{class:"tbody__mobile-label"},a),l.render({field:e,content:i,component:this,rowIndex:s,columnIndex:o}))}renderTableInfo(){return t("div",{class:"info"},this.selectable&&!!this.selection.length&&t("div",{class:"info__selection"},`${this.selection.length} row${this.selection.length>1?"s":""} selected`),this.isPagination&&t("scale-pagination",{class:"info__pagination",hideBorder:!this.isMobile,startElement:this.paginationStart,totalElements:this.rows.length,pageSize:this.pageSize,onScalePagination:({detail:t})=>this.paginationStart=t.startElement}))}render(){return this.dataNeedsCheck&&(this.hasData=this.checkHasData()),t(s,{style:{display:this.visible?"block":"none"}},this.styles&&t("style",null,this.styles),t("div",{class:this.getCssClassMap()},t("div",{class:`${c}__title-block`},this.heading&&t("h4",{class:`${c}__heading scl-h5`},this.heading),t("div",null,t("slot",null)),this.hasData&&this.renderSettingsMenu()),this.hasData&&this.renderTable(),this.hasData&&!this.hideInfo&&!this.needsAutoWidthParse&&(this.selectable||this.isPagination)&&this.renderTableInfo()))}get hostElement(){return o(this)}static get watchers(){return{fields:["fieldsHandler"],rows:["rowsHandler"]}}};h.style=".scl-body{margin:0;font:var(--telekom-text-style-body)}.scl-label{margin:0;font:var(--telekom-text-style-small)}.scl-h1{margin:0;font:var(--telekom-text-style-heading-1)}.scl-h2{margin:0;font:var(--telekom-text-style-heading-2)}.scl-h3{margin:0;font:var(--telekom-text-style-heading-3)}.scl-h4{margin:0;font:var(--telekom-text-style-heading-4)}.scl-h5{margin:0;font:var(--telekom-text-style-heading-5)}.scl-h6{margin:0;font:var(--telekom-text-style-heading-6)}:host{font-family:var(--telekom-typography-font-family-sans);font-size:var(--telekom-typography-font-size-body);font-weight:var(--telekom-typography-font-weight-regular);line-height:var(--telekom-typography-line-spacing-standard);color:var(--telekom-color-text-and-icon-standard)}.data-grid input,.data-grid select{letter-spacing:inherit;font-weight:inherit;font-family:inherit;line-height:inherit}.data-grid{position:relative;display:block;background:var(--telekom-color-ui-state-fill-standard);border-radius:var(--telekom-radius-large);border:1px solid var(--telekom-color-ui-faint);overflow:hidden}.data-grid--hide-border{border:none}.data-grid__auto-width-check{opacity:0}.data-grid__title-block{display:flex;align-items:center;justify-content:flex-end;padding-right:var(--telekom-spacing-composition-space-06);padding-left:var(--telekom-spacing-composition-space-08)}.data-grid__heading{flex-grow:1}.data-grid__title-block ::slotted(*){margin-left:var(--telekom-spacing-composition-space-04)}.data-grid__settings-menu{margin-left:var(--telekom-spacing-composition-space-04)}.data-grid__scroll-container{overflow:auto;overflow-x:overlay;overflow-y:overlay;ms-overflow-style:-ms-autohiding-scrollbar;scrollbar-gutter:stable}.data-grid__table{border-spacing:0;border-collapse:collapse;overflow:hidden}.data-grid--hide-menu .data-grid__settings-menu{display:none}.data-grid:not(.data-grid--hide-menu) .data-grid__title-block{min-height:72px}.data-grid--hide-menu .data-grid__title-block{padding-right:var(--telekom-spacing-composition-space-06)}.thead{display:block;white-space:nowrap;border-bottom:1px solid var(--telekom-color-ui-faint);position:relative;background:var(--telekom-color-ui-state-fill-standard);z-index:1}.data-grid--freeze-header .thead{z-index:30;background-color:var(--telekom-color-background-canvas)}.thead-sortable{cursor:pointer}.thead-sortable:focus{box-shadow:inset 0 0 0 var(--telekom-spacing-composition-space-02)\n    var(--telekom-color-functional-focus-standard)}.thead__cell{display:inline-flex;align-items:center;height:var(--telekom-spacing-composition-space-10);text-align:left;user-select:none;position:relative;padding:0 var(--telekom-spacing-composition-space-06);color:var(--telekom-color-text-and-icon-additional)}.thead__cell--numbered{text-align:right;justify-content:flex-end}.thead__cell--selection{justify-content:center;text-align:center}.thead__cell--selection xds-checkbox::part(container){justify-content:center}.thead__title{color:var(--telekom-color-text-and-icon-standard)}.thead__text{font-size:var(--telekom-typography-font-size-small);line-height:var(--telekom-typography-line-spacing-standard);position:relative}.thead__arrow-top,.thead__arrow-bottom{position:absolute;display:none !important;top:-2px;left:-16px}.thead__sort-prompt{position:absolute;top:0;left:0;width:100%;height:100%;margin:0;background:none;border:0;opacity:1;cursor:pointer}.thead__divider{position:absolute;right:calc(-1 * var(--telekom-spacing-composition-space-04));bottom:0px;height:100%;padding:19px var(--telekom-spacing-composition-space-04) 0px;box-sizing:border-box;cursor:col-resize;z-index:1}.thead__divider-line{pointer-events:none;height:100%;width:1px;background:var(--telekom-color-ui-faint)}.thead__cell:first-child{padding-left:var(--telekom-spacing-composition-space-08)}.thead__cell:focus{outline:none}.thead__cell[aria-sort='ascending'] .thead__arrow-top{display:inline-flex !important}.thead__cell[aria-sort='descending'] .thead__arrow-bottom{display:inline-flex !important}.thead__cell[aria-sort]:hover{color:var(--telekom-color-text-and-icon-primary-hovered)}.thead__cell[aria-sort='none']:hover .thead__arrow-top,.thead__cell[aria-sort='none']:hover .thead__arrow-bottom{display:none !important}.thead__cell[aria-sort='ascending']:hover .thead__arrow-top{color:var(--telekom-color-text-and-icon-primary-hovered)}.thead__cell[aria-sort='descending']:hover .thead__arrow-bottom{color:var(--telekom-color-text-and-icon-primary-hovered)}.tbody{display:block}.tbody__row{display:block;white-space:nowrap}.tbody__mobile-title{display:none}.tbody__mobile-label{display:none}.tbody__cell{display:inline-block;margin:8px;padding:8px;overflow:hidden;}.tbody__cell--numbered{text-align:right}.tbody__cell--selection{justify-content:center;text-align:center}.tbody__cell--selection scale-checkbox::part(container),.tbody__cell--selection scale-checkbox [part='container']{justify-content:center}.tbody__cell scale-checkbox{width:auto}.tbody__nested{white-space:nowrap;padding:0px;margin:0px}.tbody__nested-cell{display:block;padding:var(--telekom-spacing-composition-space-06);margin:0px}.tbody__cell:first-of-type{margin-left:var(--telekom-spacing-composition-space-06);}.tbody__nested-cell:first-child{margin-left:0px}.data-grid--shade-alternate .tbody__row:nth-of-type(even),.data-grid--shade-alternate .tbody__nested:nth-of-type(even){background:var(--telekom-color-background-surface-subtle)}.data-grid__auto-width-check .tbody__cell{padding:0}.tbody__tag-list{list-style:none;padding:0;margin:0}.tbody__tag-list li{display:inline-block;margin-right:8px}.tbody__tag-list li:last-child{margin-right:0}.data-grid input[type='checkbox']{display:block;height:14px;margin:5px 4px}.tbody__text-cell{display:flex;align-items:center}.tbody__text-cell-prefix{display:inline-flex;align-items:center;margin-right:0.5em}.tbody__text-cell-suffix{display:inline-flex;align-items:center;margin-left:0.5em}.tbody__cell p{overflow:hidden;text-overflow:ellipsis}.tbody__cell scale-link{overflow:hidden;text-overflow:ellipsis}.tbody__bar-cell{display:inline-flex;width:100%}.tbody__cell scale-progress-bar{flex-grow:1}.tbody__actions scale-button{margin-right:var(--telekom-spacing-composition-space-04)}.data-grid-progress-bar::part(progress-bar){min-width:50px;max-width:200px}.data-grid-progress-bar::part(status){padding-top:0}.info{height:44px;position:relative;border-top:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-subtle);display:flex;justify-content:center}.info__selection{position:absolute;bottom:0;line-height:54px;left:var(--telekom-spacing-composition-space-08)}.data-grid--hide-border:not(.data-grid--mobile) .info__pagination{border-bottom:1px solid var(--telekom-color-ui-subtle);border-right:1px solid var(--telekom-color-ui-subtle)}.data-grid--mobile{border:none;background:none}.data-grid--mobile .data-grid__title-block{padding-left:0;padding-right:0}.data-grid--hide-menu.data-grid--mobile .data-grid__title-block{padding-right:0}.data-grid--mobile .data-grid__settings-menu{right:0}.data-grid--mobile .data-grid__scroll-container{height:auto !important}.data-grid--mobile .data-grid__table{display:block;height:auto !important}.data-grid--mobile .thead{display:none}.data-grid--mobile .tbody{display:block}.data-grid--mobile .tbody__row{display:block;position:relative;white-space:initial;margin:0 0 var(--telekom-spacing-composition-space-04);padding:var(--telekom-spacing-composition-space-08);border-radius:var(--telekom-radius-standard);background:var(--telekom-color-background-surface);border:1px solid var(--telekom-color-ui-faint)}.data-grid--mobile .tbody__row:hover{background:var(--telekom-color-background-surface)}.data-grid--mobile .tbody__mobile-title{display:block;margin-bottom:var(--telekom-spacing-composition-space-04)}.data-grid--mobile .tbody__mobile-label{display:block}.data-grid--mobile .tbody__cell{display:flex;align-items:center;width:auto !important;padding:5px 0;margin:0;min-height:var(--telekom-spacing-composition-space-08);line-height:var(--telekom-spacing-composition-space-08);overflow:auto;overflow-x:hidden}.data-grid--mobile .tbody__cell--used-as-mobile-title{display:none}.data-grid--mobile .tbody__mobile-label{display:block;width:100px;flex-shrink:0;color:var(--telekom-color-text-and-icon-additional);font-size:var(--telekom-typography-font-size-small);font-weight:var(--telekom-typography-font-weight-medium)}.data-grid--mobile .tbody__cell:first-child{margin-left:0px}.data-grid--mobile .tbody__cell--selection{position:absolute;top:19px;right:12px}.data-grid--mobile .tbody__cell--numbered{position:absolute;top:19px;right:56px}.data-grid--mobile .tbody__cell scale-text-field,.data-grid--mobile .tbody__cell scale-dropdown{width:100%}.data-grid--mobile .tbody__nested{width:auto !important}.data-grid--mobile .tbody__nested-cell{padding:0;margin-bottom:var(--telekom-spacing-composition-space-04)}.data-grid--mobile.data-grid--shade-alternate .tbody__row:nth-of-type(even){background:var(--telekom-color-background-surface)}.data-grid--mobile .info{height:auto;border-top:none;text-align:center}.data-grid--mobile .info__selection{position:relative;left:0}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}";export{h as scale_data_grid}