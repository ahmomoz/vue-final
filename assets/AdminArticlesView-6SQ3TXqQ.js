import{C as y}from"./CardPagination-ZXptYOdk.js";import{L as w}from"./index-T4iu_HKs.js";import{h as x}from"./moment-WSJ9un1t.js";import{_ as L,r as u,o as a,c,a as t,v as C,x as S,b as h,w as m,s as k,t as I,F as p,q as B,e as g,u as d}from"./index-AmqyvTUw.js";var V={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:f,VITE_APIPATH:b}=V,E={data(){return{allArticles:[],articles:[],searchInput:"",pagination:{},isLoading:!0}},methods:{getArticlesList(i=1){this.isLoading=!0,this.$axios.get(`${f}/api/${b}/admin/articles?page=${i}`).then(s=>{const{articles:o,pagination:l}=s.data;this.allArticles=o,this.articles=o,this.pagination=l}).catch(s=>{this.$Swal.fire({icon:"error",title:s.response.data.message})}).finally(()=>{this.isLoading=!1})},deleteArticle(i,s){this.$Swal.fire({title:"即將刪除文章",text:`確定要刪除「${i}」嗎？`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#eb5a68",cancelButtonColor:"#8bafd7",confirmButtonText:"確定刪除",cancelButtonText:"取消"}).then(o=>{o.isConfirmed&&this.$axios.delete(`${f}/api/${b}/admin/article/${s}`).then(l=>{this.$Swal.fire({position:"top-end",icon:"success",title:"已刪除",showConfirmButton:!1,timer:700}),this.getArticlesList()}).catch(l=>{this.$Swal.fire({icon:"error",title:l.response.data.message})})})},articleSearch(){this.articles=this.articleFilteredResults},formatDateString(i){return x.unix(i).format("YYYY-MM-DD HH:mm:ss")}},computed:{articleFilteredResults(){return this.allArticles.filter(s=>s.title.toLowerCase().includes(this.searchInput.toLowerCase()))}},mounted(){this.getArticlesList()},components:{CardPagination:y,Loading:w}},T={class:"card mt-lg-3 shadow-sm"},D={class:"navbar navbar-light bg-light"},P={class:"container-fluid"},R={class:"row g-2 align-items-center"},$={class:"col-auto"},F={class:"col-auto"},H={class:"card my-1 my-lg-4 shadow-sm"},M={class:"card-header"},N={class:"text-end py-2"},U=t("span",{class:"bi bi-plus"},null,-1),Y={class:"card-body"},G={class:"table table-hover"},O=t("thead",{class:"bg-light"},[t("tr",{class:"align-middle"},[t("th",null,"標籤"),t("th",null,"標題"),t("th",null,"作者"),t("th",null,"狀態"),t("th",null,"建立時間"),t("th",null,"操作")])],-1),j={key:0,class:"text-primary"},q={key:1},z={class:"btn-group"},J=["onClick"],K={class:"card-footer d-flex justify-content-center"};function Q(i,s,o,l,n,r){const _=u("router-link"),v=u("loading"),A=u("card-pagination");return a(),c(p,null,[t("div",T,[t("nav",D,[t("div",P,[t("form",R,[t("div",$,[C(t("input",{class:"form-control",type:"search",placeholder:"搜尋文章名稱","aria-label":"Search","onUpdate:modelValue":s[0]||(s[0]=e=>n.searchInput=e)},null,512),[[S,n.searchInput]])]),t("div",F,[t("button",{class:"btn btn-outline-primary",type:"button",onClick:s[1]||(s[1]=(...e)=>r.articleSearch&&r.articleSearch(...e))},"搜尋")])])])])]),t("div",H,[t("div",M,[t("div",N,[h(_,{class:"btn btn-primary text-light",to:"article/add"},{default:m(()=>[U,g(" 建立新的文章 ")]),_:1})])]),t("div",Y,[t("table",G,[O,t("tbody",null,[n.isLoading?(a(),k(v,{key:0,active:n.isLoading,"can-cancel":!1},null,8,["active"])):I("",!0),(a(!0),c(p,null,B(n.articles,e=>(a(),c("tr",{key:e.id},[t("td",null,d(e.tag),1),t("td",null,d(e.title),1),t("td",null,d(e.author),1),t("td",null,[e.isPublic?(a(),c("span",j,"公開")):(a(),c("span",q,"未公開"))]),t("td",null,d(r.formatDateString(e.create_at)),1),t("td",null,[t("div",z,[h(_,{class:"btn btn-outline-primary btn-sm",to:"article/edit/"+e.id},{default:m(()=>[g("詳細")]),_:2},1032,["to"]),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:W=>r.deleteArticle(e.title,e.id)}," 刪除 ",8,J)])])]))),128))])])]),t("div",K,[h(A,{pagination:n.pagination,onEmitGetlist:r.getArticlesList},null,8,["pagination","onEmitGetlist"])])])],64)}const st=L(E,[["render",Q]]);export{st as default};
