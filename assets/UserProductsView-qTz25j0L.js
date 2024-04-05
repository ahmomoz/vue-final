import{C as I}from"./CardPagination-JCfJ-hix.js";import{L as O}from"./index-vf2sePQf.js";import{_ as V,r as b,o as a,c as n,g as P,w as u,h as A,b as t,d as p,t as l,f,k as x,v as q,l as R,F as m,i as _,n as g,q as v,s as E}from"./index-NTjvrLLD.js";import{_ as S}from"./loading-img2-JPOuMyya.js";import{_ as T}from"./leaf-primary-geahJmbm.js";var U={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:C,VITE_APIPATH:L}=U,j={data(){return{products:[],allProducts:[],categoryFilterProducts:[],nations:[],taiwanAreas:[],japanAreas:[],selectedOption:"最新上架",options:["最新上架","價格 (從低到高)","價格 (從高到低)"],sortBy:"default",ascending:!0,searchInput:"",filterArea:[],category:"",pagination:{},dataLoading:!1,isLoading:!0}},methods:{getProductsList(r=1){this.isLoading=!0,this.$axios.get(`${C}/api/${L}/products?page=${r}`).then(s=>{const{products:h,pagination:k}=s.data;this.products=h,this.pagination=k,this.sortBy="default",this.selectedOption="最新上架",this.searchInput="",this.$route.query.category&&(this.category=this.$route.query.category,this.productCategoryFilter(this.category))}).catch(s=>{this.$Swal.fire({icon:"error",title:s.response.data.message})}).finally(()=>{this.isLoading=!1})},getAllProductsList(){this.isLoading=!0,this.$axios.get(`${C}/api/${L}/products/all`).then(r=>{this.allProducts=r.data.products,this.getAreas(),this.getProductsList(),this.dataLoading=!0}).catch(r=>{this.$Swal.fire({icon:"error",title:r.response.data.message})}).finally(()=>{this.isLoading=!1})},getAreas(){this.allProducts.forEach(r=>{r.nation==="台灣"&&!this.taiwanAreas.includes(r.area)?this.taiwanAreas.push(r.area):r.nation==="日本"&&!this.japanAreas.includes(r.area)&&this.japanAreas.push(r.area)}),this.taiwanAreas=Array.from(this.taiwanAreas).sort(),this.japanAreas=Array.from(this.japanAreas).sort()},selectOption(r){this.selectedOption=r,this.selectedOption==="價格 (從低到高)"?(this.sortBy="price",this.ascending=!0):this.selectedOption==="價格 (從高到低)"?(this.sortBy="price",this.ascending=!1):this.sortBy="default"},productSearch(){this.searchInput!==""?this.products=this.productsSearchResults:this.getProductsList()},productAreaFilter(){this.filterArea.length!==0?(this.products=this.categoryFilterProducts,this.products=this.productsAreaFilterResults):this.getProductsList()},productCategoryFilter(r){this.isLoading=!0,this.filterArea=[],this.category=r,this.category?(this.products=this.productsCategoryFilterResults,this.categoryFilterProducts=this.productsCategoryFilterResults,this.isLoading=!1):this.getProductsList()},formatPrice(r){return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},computed:{sortProducts(){return[...this.products].sort((s,h)=>this.ascending?s[this.sortBy]-h[this.sortBy]:h[this.sortBy]-s[this.sortBy])},productsSearchResults(){return this.allProducts.filter(s=>s.title.toLowerCase().includes(this.searchInput.toLowerCase()))},productsAreaFilterResults(){return this.sortBy!=="default"||this.searchInput!==""||this.category!==""?this.products.filter(s=>this.filterArea.some(h=>s.area.toLowerCase().includes(h.toLowerCase()))):this.allProducts.filter(s=>this.filterArea.some(h=>s.area.toLowerCase().includes(h.toLowerCase())))},productsCategoryFilterResults(){return this.allProducts.filter(s=>s.category.toLowerCase().includes(this.category.toLowerCase()))}},mounted(){this.getAllProductsList()},components:{CardPagination:I,Loading:O}},N=t("img",{style:{width:"200px"},src:S,alt:"to-top-btn"},null,-1),z={class:"container-fluid bg-light pt-6 pb-5 py-xl-8 px-3 px-xl-10"},M={class:"mb-3 mb-xl-5","aria-label":"breadcrumb"},D={class:"breadcrumb"},G={class:"breadcrumb-item"},H={class:"breadcrumb-item active","aria-current":"page"},K=t("p",{class:"fs-xl-3 text-gray my-0 ms-5"},"Products",-1),J={class:"lh-base fs-xl-1 text-gray"},Q=t("img",{src:T,alt:"logo",class:"img-fluid"},null,-1),W={class:"w-xl-50 d-flex justify-content-between bg-white rounded-pill mt-4 px-3 px-lg-4 py-lg-3 shadow-sm"},X=t("i",{class:"bi bi-search my-auto"},null,-1),Y={class:"container-fluid px-xl-10 mt-4 mt-xl-5"},Z={class:"row"},$={class:"row my-4 my-xl-5"},tt={class:"col-xl-3 border d-none d-xl-block"},et={class:"position-sticky",style:{top:"5rem"}},st={class:"p-4"},ot=t("h3",{class:"fw-500"},"依地區篩選",-1),rt=t("h4",{class:"fw-500 mt-xl-4"},"台灣",-1),it=["value","id"],lt=["for"],at={class:"p-4"},nt=t("h4",{class:"fw-500 mt-xl-4"},"日本",-1),ct=["value","id"],dt=["for"],ut={class:"col-xl-9"},ht={class:"dropdown d-flex justify-content-center justify-content-xl-end"},pt=t("p",{class:"fs-xl-5 my-auto me-3"},"排序方式",-1),ft={class:"btn btn-outline-primary fs-xl-5 py-2 px-4 dropdown-toggle",type:"button",id:"dropdownMenuButton1","data-bs-toggle":"dropdown","aria-expanded":"false",style:{width:"200px"}},mt={class:"dropdown-menu","aria-labelledby":"dropdownMenuButton1"},_t=["onClick"],yt={class:"accordion px-3 mt-3 d-block d-xl-none",id:"accordionExample"},gt={class:"accordion-item"},xt=t("h2",{class:"accordion-header",id:"headingOne"},[t("button",{class:"accordion-button collapsed py-2",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseOne","aria-expanded":"true","aria-controls":"collapseOne"},[t("i",{class:"bi bi-funnel"}),f("地區篩選 ")])],-1),bt={id:"collapseOne",class:"accordion-collapse collapse","aria-labelledby":"headingOne","data-bs-parent":"#accordionExample"},vt={class:"accordion-body d-flex justify-content-around py-4"},wt={class:""},kt=t("h4",{class:"fs-5 fw-500 mt-xl-4"},"台灣",-1),Pt=["value","id"],At=["for"],Ct=t("h4",{class:"fs-5 fw-500 mt-xl-4"},"日本",-1),Lt=["value","id"],Ft=["for"],Bt={key:0,class:"row row-cols-1 row-cols-md-2 row-cols-lg-3","data-aos":"fade-up"},It={class:"card h-100 mb-4 border-0 shadow-sm product-card-hover"},Ot={style:{position:"relative"}},Vt={class:"fs-5 text-dark bg-white ps-2 opacity-75",style:{position:"absolute",top:"15px","z-index":"2"}},qt=t("i",{class:"bi bi-geo-alt-fill"},null,-1),Rt=["src"],Et={class:"card-body"},St={class:"fs-5 text-primary"},Tt=t("i",{class:"bi bi-play-fill"},null,-1),Ut={class:"card-text text-dark my-2 link-hover"},jt={class:"fs-5 text-primary fw-bolder"},Nt={style:{color:"rgb(196, 196, 196)"}},zt=t("br",null,null,-1),Mt={key:1,class:"row","data-aos":"fade-up"},Dt=t("div",{class:"col text-center m-5 py-10 bg-light"},[t("h2",null,"此類別目前無商品")],-1),Gt=[Dt],Ht={key:2,class:"row row-cols-1 row-cols-md-2 row-cols-lg-3","data-aos":"fade-up"},Kt={class:"card h-100 mb-4 border-0 shadow-sm product-card-hover"},Jt={style:{position:"relative"}},Qt={class:"fs-5 text-dark bg-white ps-2 opacity-75",style:{position:"absolute",top:"15px","z-index":"2"}},Wt=t("i",{class:"bi bi-geo-alt-fill"},null,-1),Xt=["src"],Yt={class:"card-body"},Zt={class:"fs-5 text-primary"},$t=t("i",{class:"bi bi-play-fill"},null,-1),te={class:"card-text text-dark my-2 link-hover"},ee={class:"fs-5 text-primary fw-bolder"},se={style:{color:"rgb(196, 196, 196)"}},oe=t("br",null,null,-1),re={class:"d-flex justify-content-center mt-4 mt-xl-6"};function ie(r,s,h,k,o,i){const F=b("loading"),w=b("RouterLink"),y=b("router-link"),B=b("CardPagination");return a(),n(m,null,[o.isLoading?(a(),P(F,{key:0,active:o.isLoading,"can-cancel":!1},{default:u(()=>[N]),_:1},8,["active"])):A("",!0),t("header",z,[t("nav",M,[t("ol",D,[t("li",G,[p(w,{class:"text-decoration-none",to:"/",exact:""},{default:u(()=>[f("首頁")]),_:1})]),t("li",H,l(o.category===""||o.category===void 0?"所有商品":o.category),1)])]),K,t("h2",J,[Q,f(" "+l(o.category===""||o.category===void 0?"所有商品":`${o.category} 所有商品`),1)]),t("div",W,[X,x(t("input",{class:"fs-5 form-control border-0",type:"search",placeholder:"想找些什麼呢？","onUpdate:modelValue":s[0]||(s[0]=e=>o.searchInput=e),onKeyup:s[1]||(s[1]=R((...e)=>i.productSearch&&i.productSearch(...e),["enter"]))},null,544),[[q,o.searchInput]])])]),t("main",Y,[t("section",Z,[p(y,{to:"/products",class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[2]||(s[2]=e=>i.productCategoryFilter(""))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":!r.$route.query.category}])},"所有商品",2)]),_:1}),p(y,{to:{name:"產品列表",query:{category:"動物園"}},class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[3]||(s[3]=e=>i.productCategoryFilter("動物園"))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":r.$route.query.category==="動物園"}])},"動物園",2)]),_:1}),p(y,{to:{name:"產品列表",query:{category:"動物聚落"}},class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[4]||(s[4]=e=>i.productCategoryFilter("動物聚落"))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":r.$route.query.category==="動物聚落"}])},"動物聚落",2)]),_:1}),p(y,{to:{name:"產品列表",query:{category:"農場"}},class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[5]||(s[5]=e=>i.productCategoryFilter("農場"))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":r.$route.query.category==="農場"}])},"動物農場",2)]),_:1}),p(y,{to:{name:"產品列表",query:{category:"水族館"}},class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[6]||(s[6]=e=>i.productCategoryFilter("水族館"))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":r.$route.query.category==="水族館"}])},"水族館",2)]),_:1}),p(y,{to:{name:"產品列表",query:{category:"鳥園"}},class:"col nav-link link-hover border text-center shadow-sm py-3 m-2",onClick:s[7]||(s[7]=e=>i.productCategoryFilter("鳥園"))},{default:u(()=>[t("p",{class:g(["fs-xl-3 my-auto",{"text-primary":r.$route.query.category==="鳥園"}])},"鳥園",2)]),_:1})]),t("section",$,[t("nav",tt,[t("div",et,[t("div",st,[ot,rt,(a(!0),n(m,null,_(o.taiwanAreas,(e,c)=>(a(),n("div",{class:"form-check",key:"taiwanArea"+c},[x(t("input",{class:"form-check-input fs-5 mt-xl-3",type:"checkbox",value:e,id:e+c,"onUpdate:modelValue":s[8]||(s[8]=d=>o.filterArea=d),onChange:s[9]||(s[9]=(...d)=>i.productAreaFilter&&i.productAreaFilter(...d))},null,40,it),[[v,o.filterArea]]),t("label",{class:"form-check-label fs-5 mt-xl-2",for:e+c},l(e),9,lt)]))),128))]),t("div",at,[nt,(a(!0),n(m,null,_(o.japanAreas,(e,c)=>(a(),n("div",{class:"form-check",key:"japanArea"+c},[x(t("input",{class:"form-check-input fs-5 mt-xl-3",type:"checkbox",value:e,id:e+c,"onUpdate:modelValue":s[10]||(s[10]=d=>o.filterArea=d),onChange:s[11]||(s[11]=(...d)=>i.productAreaFilter&&i.productAreaFilter(...d))},null,40,ct),[[v,o.filterArea]]),t("label",{class:"form-check-label fs-5 mt-xl-2",for:e+c},l(e),9,dt)]))),128))])])]),t("main",ut,[t("div",ht,[pt,t("button",ft,l(o.selectedOption),1),t("ul",mt,[(a(!0),n(m,null,_(o.options,(e,c)=>(a(),n("li",{key:c},[t("a",{class:"dropdown-item fs-5",href:"#",onClick:E(d=>i.selectOption(e),["prevent"])},l(e),9,_t)]))),128))])]),t("div",yt,[t("div",gt,[xt,t("div",bt,[t("div",vt,[t("div",wt,[kt,(a(!0),n(m,null,_(o.taiwanAreas,(e,c)=>(a(),n("div",{class:"form-check",key:"taiwanArea"+c},[x(t("input",{class:"form-check-input mt-xl-3",type:"checkbox",value:e,id:e+c,"onUpdate:modelValue":s[12]||(s[12]=d=>o.filterArea=d),onChange:s[13]||(s[13]=(...d)=>i.productAreaFilter&&i.productAreaFilter(...d))},null,40,Pt),[[v,o.filterArea]]),t("label",{class:"form-check-label mt-xl-2",for:e+c},l(e),9,At)]))),128))]),t("div",null,[Ct,(a(!0),n(m,null,_(o.japanAreas,(e,c)=>(a(),n("div",{class:"form-check",key:"japanArea"+c},[x(t("input",{class:"form-check-input mt-xl-3",type:"checkbox",value:e,id:e+c,"onUpdate:modelValue":s[14]||(s[14]=d=>o.filterArea=d),onChange:s[15]||(s[15]=(...d)=>i.productAreaFilter&&i.productAreaFilter(...d))},null,40,Lt),[[v,o.filterArea]]),t("label",{class:"form-check-label mt-xl-2",for:e+c},l(e),9,Ft)]))),128))])])])])]),o.dataLoading&&o.sortBy==="default"&&o.products.length>0?(a(),n("div",Bt,[(a(!0),n(m,null,_(o.products,e=>(a(),n("div",{class:"col mt-4",key:e.id},[p(w,{class:"text-decoration-none",to:`/product/${e.id}`},{default:u(()=>[t("div",It,[t("div",Ot,[t("div",null,[t("span",Vt,[qt,f(" "+l(e.nation)+l(e.area),1)]),t("img",{src:e.imagesUrl[0],style:{height:"240px","z-index":"1"},class:"card-img-top object-fit-cover",alt:"product-img"},null,8,Rt)])]),t("div",Et,[t("span",St,[Tt,f(" "+l(e.category),1)]),t("h4",Ut,l(e.title),1),t("p",null,l(e.feature),1),t("p",jt,[t("del",Nt," NT$"+l(i.formatPrice(e.origin_price)),1),zt,f(" NT$"+l(i.formatPrice(e.price)),1)])])])]),_:2},1032,["to"])]))),128))])):o.dataLoading&&o.products.length===0?(a(),n("div",Mt,Gt)):(a(),n("div",Ht,[(a(!0),n(m,null,_(i.sortProducts,e=>(a(),n("div",{class:"col mt-4",key:e.id},[p(w,{class:"text-decoration-none",to:`/product/${e.id}`},{default:u(()=>[t("div",Kt,[t("div",Jt,[t("div",null,[t("span",Qt,[Wt,f(" "+l(e.nation)+l(e.area),1)]),t("img",{src:e.imagesUrl[0],style:{height:"240px","z-index":"1"},class:"card-img-top object-fit-cover",alt:"product-img"},null,8,Xt)])]),t("div",Yt,[t("span",Zt,[$t,f(" "+l(e.category),1)]),t("h4",te,l(e.title),1),t("p",null,l(e.feature),1),t("p",ee,[t("del",se," NT$"+l(i.formatPrice(e.origin_price)),1),oe,f(" NT$"+l(i.formatPrice(e.price)),1)])])])]),_:2},1032,["to"])]))),128))])),t("div",re,[this.filterArea.length===0&&this.category===""?(a(),P(B,{key:0,pagination:o.pagination,onEmitGetlist:i.getProductsList},null,8,["pagination","onEmitGetlist"])):A("",!0)])])])])],64)}const ue=V(j,[["render",ie]]);export{ue as default};
