import{L as h}from"./index-jRP1il9b.js";import{h as p}from"./moment-WSJ9un1t.js";import{_ as u}from"./loading-img2-JPOuMyya.js";import{_ as f}from"./leaf-primary-geahJmbm.js";import{_ as g,r as l,o as _,c as x,g as b,w as o,h as L,b as t,d as n,t as i,f as c,F as v}from"./index-wczSaofn.js";var y={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:A,VITE_APIPATH:V}=y,k={data(){return{article:[],pagination:{},isLoading:!0}},methods:{getArticleList(){const{id:s}=this.$route.params;this.isLoading=!0,this.$axios.get(`${A}/api/${V}/article/${s}`).then(a=>{this.article=a.data.article}).catch(a=>{this.$Swal.fire({icon:"error",title:a.response.data.message})}).finally(()=>{this.isLoading=!1})},formatDateString(s){return p.unix(s).format("YYYY-MM-DD")}},mounted(){this.getArticleList()},components:{Loading:h}},T=t("img",{style:{width:"200px"},src:u,alt:"to-top-btn"},null,-1),D={class:"bg-white py-8 px-3 px-xl-10"},E={class:"mb-xl-5","aria-label":"breadcrumb"},I={class:"breadcrumb"},w={class:"breadcrumb-item"},P={class:"breadcrumb-item active","aria-current":"page"},R={class:"breadcrumb-item active","aria-current":"page"},S={class:"lh-base fs-xl-1 text-gray"},B=t("img",{src:f,alt:"logo",class:"img-fluid"},null,-1),M={class:"bg-gray lh-lg fs-5 text-light opacity-50 px-2"},H={class:"my-5 my-lg-0"},N={class:"lh-lg fs-5 text-gray opacity-75 pe-3"},U=["innerHTML"],Y={class:"d-flex align-items-center justify-content-end"},C=t("p",{class:"text-dark my-3 link-hover"},[c(" 回上頁 "),t("i",{class:"bi bi-arrow-left-short"})],-1);function F(s,a,O,$,e,d){const m=l("loading"),r=l("RouterLink");return _(),x(v,null,[e.isLoading?(_(),b(m,{key:0,active:e.isLoading,"can-cancel":!1},{default:o(()=>[T]),_:1},8,["active"])):L("",!0),t("main",D,[t("nav",E,[t("ol",I,[t("li",w,[n(r,{class:"text-decoration-none",to:"/",exact:""},{default:o(()=>[c("首頁")]),_:1})]),t("li",P,[n(r,{class:"text-decoration-none",to:"/articles",exact:""},{default:o(()=>[c("所有消息")]),_:1})]),t("li",R,i(e.article.title),1)])]),t("section",null,[t("h2",S,[B,c(" "+i(e.article.title)+" ",1),t("span",M,i(e.article.tag),1)]),t("div",H,[t("span",N,i(d.formatDateString(e.article.create_at)),1),t("div",{class:"fs-4 mt-5",innerHTML:e.article.content},null,8,U)]),t("div",Y,[n(r,{class:"text-decoration-none",to:"/articles"},{default:o(()=>[C]),_:1})])])])],64)}const K=g(k,[["render",F]]);export{K as default};
