import{L as h}from"./index-v_09iHwz.js";import{C as f}from"./ckeditor-Q97MQudJ.js";import{C as b}from"./main-ln_zCXx1.js";import{_ as p,r as a,o as n,c as g,b as e,g as v,h as k,k as l,v as r,d,q as V}from"./index-IkRGDjhC.js";var P={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:x,VITE_APIPATH:L}=P,A={data(){return{drag:!1,article:{},editor:f,editorData:"",editorConfig:{toolbar:{items:["heading","|","bold","italic","link","bulletedList","numberedList","|","outdent","indent","|","blockQuote","insertTable","mediaEmbed","undo","redo"]},dataProcessor:{writer:{enter:"<br>"}}},isLoading:!0,currentDate:new Date}},methods:{addArticle(){this.article.create_at=Math.floor(this.currentDate.getTime()/1e3),this.article.isPublic=this.article.isPublic||!1;const c=this.article;this.isLoading=!0,this.$axios.post(`${x}/api/${L}/admin/article`,{data:c}).then(t=>{this.isLoading=!1,this.$Swal.fire({position:"top-end",icon:"success",title:"新增成功",showConfirmButton:!1,timer:700}),this.$router.push("/dashboard/articles")}).catch(t=>{this.isLoading=!1,this.$Swal.fire({icon:"error",title:t.response.data.message})})},goBack(){this.$router.go(-1)}},mounted(){this.isLoading=!1},components:{Loading:h,VueDatePicker:b}},D={class:"container"},C=e("h1",{class:"fs-3 mt-3"},"新增文章",-1),y={class:"mx-auto"},E={class:"card mt-4 shadow-sm"},w=e("div",{class:"card-header"},[e("h5",{class:"my-1"},"基本資訊")],-1),B={class:"card-body"},T={class:"mb-3"},U=e("label",{for:"title",class:"form-label"},"*文章名稱",-1),I={class:"row"},R={class:"mb-3 col-md-4"},S=e("label",{for:"tag",class:"form-label"},"*標籤",-1),M={class:"mb-3 col-md-4"},N=e("label",{for:"author",class:"form-label"},"*作者",-1),H={class:"mb-3 col-md-4"},O=e("label",{for:"create_at",class:"form-label"},"*建立時間",-1),q={class:"mb-3"},z=e("label",{for:"content",class:"form-label"},"*文章內容",-1),Q={class:"mb-3"},j={class:"form-check"},F=e("label",{class:"form-check-label",for:"isPublic"},"是否公開",-1),G={class:"text-end mt-3 mb-5"};function J(c,t,K,W,o,i){const u=a("loading"),m=a("VueDatePicker"),_=a("ckeditor");return n(),g("div",D,[C,e("div",y,[o.isLoading?(n(),v(u,{key:0,active:o.isLoading,"can-cancel":!1},null,8,["active"])):k("",!0),e("div",E,[w,e("div",B,[e("div",T,[U,l(e("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入文章名稱","onUpdate:modelValue":t[0]||(t[0]=s=>o.article.title=s)},null,512),[[r,o.article.title]])]),e("div",I,[e("div",R,[S,l(e("input",{id:"tag",type:"text",class:"form-control",placeholder:"請輸入標籤","onUpdate:modelValue":t[1]||(t[1]=s=>o.article.tag=s)},null,512),[[r,o.article.tag]])]),e("div",M,[N,l(e("input",{id:"author",type:"text",class:"form-control",placeholder:"請輸入文章作者","onUpdate:modelValue":t[2]||(t[2]=s=>o.article.author=s)},null,512),[[r,o.article.author]])]),e("div",H,[O,d(m,{modelValue:o.currentDate,"onUpdate:modelValue":t[3]||(t[3]=s=>o.currentDate=s)},null,8,["modelValue"])])]),e("div",q,[z,d(_,{editor:o.editor,modelValue:o.article.content,"onUpdate:modelValue":t[4]||(t[4]=s=>o.article.content=s),config:o.editorConfig},null,8,["editor","modelValue","config"])]),e("div",Q,[e("div",j,[l(e("input",{id:"isPublic",class:"form-check-input",type:"checkbox","true-value":!0,"false-value":!1,"onUpdate:modelValue":t[5]||(t[5]=s=>o.article.isPublic=s)},null,512),[[V,o.article.isPublic]]),F])])])])]),e("div",G,[e("button",{type:"button",class:"btn btn-outline-secondary mx-2",onClick:t[6]||(t[6]=(...s)=>i.goBack&&i.goBack(...s))}," 取消 "),e("button",{type:"button",class:"btn btn-primary text-light",onClick:t[7]||(t[7]=(...s)=>i.addArticle&&i.addArticle(...s))}," 新增 ")])])}const ee=p(A,[["render",J]]);export{ee as default};