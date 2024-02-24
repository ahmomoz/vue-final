import{x as q,e as G,g as W}from"./index-qs2BhPg8.js";var C={exports:{}};(function(S,K){(function(v,u){S.exports=u(q)})(G,b=>(()=>{var v={657:(t,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.default=(o,h)=>{const d=o.__vccOpts||o;for(const[_,f]of h)d[_]=f;return d}},976:t=>{t.exports=b}},u={};function r(t){var i=u[t];if(i!==void 0)return i.exports;var o=u[t]={exports:{}};return v[t](o,o.exports,r),o.exports}r.d=(t,i)=>{for(var o in i)r.o(i,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:i[o]})},r.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),r.r=t=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var m={};return(()=>{r.r(m),r.d(m,{Component:()=>g,LoadingPlugin:()=>I,default:()=>H,useLoading:()=>y});var t=r(976);function i(e){var n;typeof e.remove<"u"?e.remove():(n=e.parentNode)==null||n.removeChild(e)}function o(e,n,l){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const c=(0,t.h)(e,n,s),a=document.createElement("div");return a.classList.add("vld-container"),l.appendChild(a),(0,t.render)(c,a),c.component}function h(){return typeof window<"u"}const d=h()?window.HTMLElement:Object,_=["aria-busy"],f={class:"vl-icon"};function k(e,n,l,s,c,a){return(0,t.openBlock)(),(0,t.createBlock)(t.Transition,{name:e.transition},{default:(0,t.withCtx)(()=>[(0,t.withDirectives)((0,t.createElementVNode)("div",{tabindex:"0",class:(0,t.normalizeClass)(["vl-overlay vl-active",{"vl-full-page":e.isFullPage}]),"aria-busy":e.isActive,"aria-label":"Loading",style:(0,t.normalizeStyle)({zIndex:e.zIndex})},[(0,t.createElementVNode)("div",{class:"vl-background",onClick:n[0]||(n[0]=(0,t.withModifiers)(function(){return e.cancel&&e.cancel(...arguments)},["prevent"])),style:(0,t.normalizeStyle)(e.bgStyle)},null,4),(0,t.createElementVNode)("div",f,[(0,t.renderSlot)(e.$slots,"before"),(0,t.renderSlot)(e.$slots,"default",{},()=>[((0,t.openBlock)(),(0,t.createBlock)((0,t.resolveDynamicComponent)(e.loader),{color:e.color,width:e.width,height:e.height},null,8,["color","width","height"]))]),(0,t.renderSlot)(e.$slots,"after")])],14,_),[[t.vShow,e.isActive]])]),_:3},8,["name"])}const N={mounted(){this.enforceFocus&&document.addEventListener("focusin",this.focusIn)},methods:{focusIn(e){if(!this.isActive||e.target===this.$el||this.$el.contains(e.target))return;let n=this.container?this.container:this.isFullPage?null:this.$el.parentElement;(this.isFullPage||n&&n.contains(e.target))&&(e.preventDefault(),this.$el.focus())}},beforeUnmount(){document.removeEventListener("focusin",this.focusIn)}},$=["width","height","stroke"],L=[(0,t.createStaticVNode)('<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite"></animateTransform></path></g></g>',1)];function M(e,n,l,s,c,a){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{viewBox:"0 0 38 38",xmlns:"http://www.w3.org/2000/svg",width:e.width,height:e.height,stroke:e.color},L,8,$)}const x=(0,t.defineComponent)({name:"spinner",props:{color:{type:String,default:"#000"},height:{type:Number,default:64},width:{type:Number,default:64}}});var p=r(657);const P=(0,p.default)(x,[["render",M]]),B=["fill","width","height"],E=[(0,t.createStaticVNode)('<circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle>',3)];function j(e,n,l,s,c,a){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg",fill:e.color,width:e.width,height:e.height},E,8,B)}const F=(0,t.defineComponent)({name:"dots",props:{color:{type:String,default:"#000"},height:{type:Number,default:240},width:{type:Number,default:60}}}),T=(0,p.default)(F,[["render",j]]),O=["height","width","fill"],A=[(0,t.createStaticVNode)('<rect x="0" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="13" width="4" height="5"><animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>',3)];function V(e,n,l,s,c,a){return(0,t.openBlock)(),(0,t.createElementBlock)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 30 30",height:e.height,width:e.width,fill:e.color},A,8,O)}const D=(0,t.defineComponent)({name:"bars",props:{color:{type:String,default:"#000"},height:{type:Number,default:40},width:{type:Number,default:40}}}),z={Spinner:P,Dots:T,Bars:(0,p.default)(D,[["render",V]])},X=(0,t.defineComponent)({name:"VueLoading",mixins:[N],props:{active:Boolean,programmatic:Boolean,container:[Object,Function,d],isFullPage:{type:Boolean,default:!0},enforceFocus:{type:Boolean,default:!0},lockScroll:Boolean,transition:{type:String,default:"fade"},canCancel:Boolean,onCancel:{type:Function,default:()=>{}},color:String,backgroundColor:String,opacity:Number,width:Number,height:Number,zIndex:Number,loader:{type:String,default:"spinner"}},components:z,emits:["hide","update:active"],data(){return{isActive:this.active}},mounted(){document.addEventListener("keyup",this.keyPress)},methods:{cancel(){!this.canCancel||!this.isActive||(this.hide(),this.onCancel.apply(null,arguments))},hide(){this.$emit("hide"),this.$emit("update:active",!1),this.programmatic&&(this.isActive=!1,setTimeout(()=>{const e=this.$el.parentElement;(0,t.render)(null,e),i(e)},150))},disableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.add("vl-shown")},enableScroll(){this.isFullPage&&this.lockScroll&&document.body.classList.remove("vl-shown")},keyPress(e){e.keyCode===27&&this.cancel()}},watch:{active(e){this.isActive=e},isActive(e){e?this.disableScroll():this.enableScroll()}},computed:{bgStyle(){return{background:this.backgroundColor,opacity:this.opacity}}},beforeUnmount(){document.removeEventListener("keyup",this.keyPress)}}),g=(0,p.default)(X,[["render",k]]);function y(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return{show(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:n;const a={...e,...l,...{programmatic:!0,lockScroll:!0,isFullPage:!1,active:!0}};let w=a.container;a.container||(w=document.body,a.isFullPage=!0);const U={...n,...s};return{hide:o(g,a,w,U).ctx.hide}}}}const I=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=y(n,l);e.config.globalProperties.$loading=s,e.provide("$loading",s)},H=g})(),m})())})(C);var J=C.exports;const re=W(J);export{re as L};
