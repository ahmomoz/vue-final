import{_ as p,r,o as _,c as u,a as e,b as a,w as n,n as v,F as g,d as s}from"./index-UcymovWQ.js";const m={data(){return{isMenuOpen:!1}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen}}},b={class:"container-fluid"},h=e("span",{class:"navbar-toggler-icon"},null,-1),f=[h],k={class:"navbar-collapse collapse",id:"navbarSupportedContent",style:{}},x={class:"navbar-nav mb-2 mb-lg-0"},M={class:"nav-item mx-3"},C={class:"nav-item mx-3"},V={class:"nav-item mx-3"},w={class:"nav-item mx-3"};function O(y,o,R,B,l,i){const t=r("RouterLink"),c=r("RouterView");return _(),u(g,null,[e("nav",{class:v(["navbar navbar-expand-lg navbar-light fixed-top ps-lg-7 pt-4",{"bg-light opacity-75":l.isMenuOpen,"bg-transparent":!l.isMenuOpen}])},[e("div",b,[e("button",{class:"navbar-toggler collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",onClick:o[0]||(o[0]=(...d)=>i.toggleMenu&&i.toggleMenu(...d))},f),e("div",k,[e("ul",x,[e("li",M,[a(t,{to:"/home",class:"nav-link fs-5 header-nav-link",exact:""},{default:n(()=>[s("首頁")]),_:1})]),e("li",C,[a(t,{to:"/dashboard/home",class:"nav-link fs-5 header-nav-link"},{default:n(()=>[s("後台")]),_:1})]),e("li",V,[a(t,{to:"/products",class:"nav-link fs-5 header-nav-link"},{default:n(()=>[s("商品列表")]),_:1})]),e("li",w,[a(t,{to:"/cart",class:"nav-link fs-5 header-nav-link"},{default:n(()=>[s("購物車")]),_:1})])])])])],2),a(c)],64)}const N=p(m,[["render",O]]);export{N as default};
