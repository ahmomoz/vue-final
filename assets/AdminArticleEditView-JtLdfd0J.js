import{L as g}from"./index-03zXLd8E.js";import{C as v,a as V}from"./main-_WdY9gam.js";import{_ as k,r,o as m,c as x,a as t,s as A,t as P,v as l,x as c,b as u,A as L}from"./index-gfXPBhzS.js";var y={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:_,VITE_APIPATH:h}=y,C={data(){return{drag:!1,article:{},editor:v,editorData:"",editorConfig:{dataProcessor:{writer:{enter:"<br>"}}},isLoading:!1}},methods:{getArticlesList(){this.isLoading=!0;const{id:a}=this.$route.params;this.$axios.get(`${_}/api/${h}/admin/article/${a}`).then(e=>{this.article=e.data.article}).catch(e=>{alert(e.response.data.message)}).finally(()=>{this.isLoading=!1})},updateArticle(){const e=Math.floor(new Date().getTime()/1e3);this.article.create_at=e;const{id:n}=this.$route.params,d=this.article;this.isLoading=!0,this.$axios.put(`${_}/api/${h}/admin/article/${n}`,{data:d}).then(o=>{this.$Swal.fire({position:"top-end",icon:"success",title:"更新成功",showConfirmButton:!1,timer:700}),this.$router.push("/dashboard/articles")}).catch(o=>{this.$Swal.fire({icon:"error",title:o.response.data.message})}).finally(()=>{this.isLoading=!1})},goBack(){this.$router.go(-1)}},mounted(){this.getArticlesList()},components:{Loading:g,VueDatePicker:V}},T={class:"container"},E=t("h1",{class:"fs-3 mt-3"},"編輯文章",-1),w={class:"mx-auto"},B={class:"card mt-4 shadow-sm"},D=t("div",{class:"card-header"},[t("h5",{class:"my-1"},"基本資訊")],-1),I={class:"card-body"},U={class:"mb-3"},S=t("label",{for:"title",class:"form-label"},"*文章名稱",-1),R={class:"row"},M={class:"mb-3 col-md-4"},N=t("label",{for:"tag",class:"form-label"},"*標籤",-1),H={class:"mb-3 col-md-4"},O=t("label",{for:"author",class:"form-label"},"*作者",-1),z={class:"mb-3 col-md-4"},j=t("label",{for:"create_at",class:"form-label"},"*建立時間",-1),q={class:"mb-3"},F=t("label",{for:"content",class:"form-label"},"*文章內容",-1),G={class:"mb-3"},J={class:"form-check"},K=t("label",{class:"form-check-label",for:"isPublic"},"是否公開",-1),Q={class:"text-end mt-3 mb-5"};function W(a,e,n,d,o,i){const f=r("loading"),p=r("VueDatePicker"),b=r("ckeditor");return m(),x("div",T,[E,t("div",w,[o.isLoading?(m(),A(f,{key:0,active:o.isLoading,"can-cancel":!1},null,8,["active"])):P("",!0),t("div",B,[D,t("div",I,[t("div",U,[S,l(t("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入文章名稱","onUpdate:modelValue":e[0]||(e[0]=s=>o.article.title=s)},null,512),[[c,o.article.title]])]),t("div",R,[t("div",M,[N,l(t("input",{id:"tag",type:"text",class:"form-control",placeholder:"請輸入標籤","onUpdate:modelValue":e[1]||(e[1]=s=>o.article.tag=s)},null,512),[[c,o.article.tag]])]),t("div",H,[O,l(t("input",{id:"author",type:"text",class:"form-control",placeholder:"請輸入文章作者","onUpdate:modelValue":e[2]||(e[2]=s=>o.article.author=s)},null,512),[[c,o.article.author]])]),t("div",z,[j,u(p,{modelValue:o.article.create_at,"onUpdate:modelValue":e[3]||(e[3]=s=>o.article.create_at=s)},null,8,["modelValue"])])]),t("div",q,[F,u(b,{editor:o.editor,modelValue:o.article.content,"onUpdate:modelValue":e[4]||(e[4]=s=>o.article.content=s),config:o.editorConfig},null,8,["editor","modelValue","config"])]),t("div",G,[t("div",J,[l(t("input",{id:"isPublic",class:"form-check-input",type:"checkbox","true-value":!0,"false-value":!1,"onUpdate:modelValue":e[5]||(e[5]=s=>o.article.isPublic=s)},null,512),[[L,o.article.isPublic]]),K])])])])]),t("div",Q,[t("button",{type:"button",class:"btn btn-outline-secondary mx-2",onClick:e[6]||(e[6]=(...s)=>i.goBack&&i.goBack(...s))}," 取消 "),t("button",{type:"button",class:"btn btn-primary text-light",onClick:e[7]||(e[7]=(...s)=>i.updateArticle&&i.updateArticle(...s))}," 更新 ")])])}const $=k(C,[["render",W]]);export{$ as default};