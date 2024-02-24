import{L as y}from"./index-2DP29vLu.js";import{d as x}from"./vuedraggable.umd-W7LN8_a4.js";import{_ as U,r as b,o as a,c as u,a as t,t as V,m as k,i as p,b as w,w as C,j as i,v as d,s as I}from"./index-qs2BhPg8.js";var P={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:m,VITE_APIPATH:_}=P,A={data(){return{drag:!1,product:{},isLoading:!0}},methods:{getProductData(){this.isLoading=!0;const{id:l}=this.$route.params;this.$axios.get(`${m}/api/${_}/admin/products/all`).then(e=>{const n=e.data.products;this.product=n[l]}).catch(e=>{this.$Swal.fire({icon:"error",title:e.response.data.message})}).finally(()=>{this.isLoading=!1})},updateProduct(){const l=this.product;this.$axios.put(`${m}/api/${_}/admin/product/${this.product.id}`,{data:l}).then(e=>{this.$Swal.fire({position:"top-end",icon:"success",title:"更新成功",showConfirmButton:!1,timer:700}),this.$router.push("/dashboard/products")}).catch(e=>{this.$Swal.fire({icon:"error",title:e.response.data.message})})},deleteAllImg(l){this.product.imagesUrl=[""]},deleteImg(l){this.product.imagesUrl.splice(l,1)},imgUrlUpdate(l){this.product.imagesUrl[0]===""?this.product.imagesUrl[0]=l:this.product.imagesUrl.push(l)},imgUpload(l){const e=l.target.files[0],n=new FormData;n.append("file-to-upload",e),this.$axios.post(`${m}/api/${_}/admin/upload`,n).then(c=>{const s=c.data.imageUrl;this.imgUrlUpdate(s)}).catch(c=>{this.$Swal.fire({icon:"error",title:c.response.data.message})})},changeCursor(l){const e=document.querySelector(".row.align-items-center");e&&(e.style.cursor=l?"move":"auto")},goBack(){this.$router.go(-1)}},created(){this.getProductData()},components:{Loading:y,draggable:x}},E={class:"container"},L={class:"fs-3 mt-3"},S={class:"mx-auto"},B={class:"card mt-4 shadow-sm"},D=t("div",{class:"card-header"},[t("h5",{class:"my-1"},"圖片資訊")],-1),T={class:"card-body"},M={class:"mb-3"},R=t("p",null,"上傳圖片",-1),N={class:"border-dashed-blue mb-3"},j=t("p",{class:"m-0 text-primary px-2"},"*第一張圖為商品主圖",-1),H={key:0,class:"py-5 bg-light"},O=t("p",{class:"px-2"},"請上傳圖片",-1),q=[O],z={class:"mb-3",style:{"max-width":"160px"}},F=["onClick"],K=t("span",{class:"bi bi-dash-circle-fill",style:{color:"rgb(180, 81, 81)"}},null,-1),G=[K],J=["src"],Q={class:"card mt-4 shadow-sm"},W=t("div",{class:"card-header"},[t("h5",{class:"my-1"},"基本資訊")],-1),X={class:"card-body"},Y={class:"mb-3"},Z=t("label",{for:"title",class:"form-label"},"*標題",-1),$={class:"mb-3"},tt=t("label",{for:"feature",class:"form-label"},"*特色標語",-1),et={class:"row"},ot={class:"mb-3 col-md-6"},st=t("label",{for:"nation",class:"form-label"},"*地區",-1),lt={class:"mb-3 col-md-6"},it=t("label",{for:"area",class:"form-label"},"*縣市",-1),rt={class:"row"},dt={class:"mb-3 col-md-6"},nt=t("label",{for:"category",class:"form-label"},"*分類",-1),ct={class:"mb-3 col-md-6"},at=t("label",{for:"price",class:"form-label"},"*單位",-1),ut={class:"row"},pt={class:"mb-3 col-md-6"},mt=t("label",{for:"origin_price",class:"form-label"},"*原價",-1),_t={class:"mb-3 col-md-6"},ht=t("label",{for:"price",class:"form-label"},"*售價",-1),bt=t("hr",null,null,-1),ft={class:"mb-3"},gt=t("label",{for:"description",class:"form-label"},"*產品描述",-1),vt={class:"mb-3"},yt=t("label",{for:"content",class:"form-label"},"*說明內容",-1),xt={class:"mb-3"},Ut={class:"form-check"},Vt=t("label",{class:"form-check-label",for:"is_enabled"},"是否上架",-1),kt={class:"text-end mt-3 mb-5"};function wt(l,e,n,c,s,r){const f=b("loading"),g=b("draggable");return a(),u("div",E,[t("h1",L,"編輯產品 - "+V(s.product.title),1),t("div",S,[t("div",B,[D,t("div",T,[s.isLoading?(a(),k(f,{key:0,active:s.isLoading,"can-cancel":!1},null,8,["active"])):p("",!0),t("div",M,[R,t("input",{type:"file",id:"file",placeholder:"請輸入圖片連結",onChange:e[0]||(e[0]=o=>r.imgUpload(o))},null,32)]),t("div",N,[j,s.product.imagesUrl[0]?p("",!0):(a(),u("div",H,q)),w(g,{class:"row px-2",modelValue:s.product.imagesUrl,"onUpdate:modelValue":e[3]||(e[3]=o=>s.product.imagesUrl=o),group:"images",itemKey:"index",onStart:e[4]||(e[4]=o=>s.drag=!0),onEnd:e[5]||(e[5]=o=>s.drag=!1)},{item:C(({element:o,index:v})=>[t("div",z,[s.product.imagesUrl[0]?(a(),u("div",{key:0,class:"text-end",onClick:h=>r.deleteImg(v)},G,8,F)):p("",!0),t("img",{class:"object-fit-cover",src:o,alt:"商品圖片",style:{height:"100px"},onMouseover:e[1]||(e[1]=h=>r.changeCursor(!0)),onMouseleave:e[2]||(e[2]=h=>r.changeCursor(!1))},null,40,J)])]),_:1},8,["modelValue"])]),t("button",{class:"btn btn-outline-primary btn-sm d-block w-100 mb-2",onClick:e[6]||(e[6]=(...o)=>r.deleteAllImg&&r.deleteAllImg(...o))}," 刪除所有圖片 ")])]),t("div",Q,[W,t("div",X,[t("div",Y,[Z,i(t("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":e[7]||(e[7]=o=>s.product.title=o)},null,512),[[d,s.product.title]])]),t("div",$,[tt,i(t("input",{id:"feature",type:"text",class:"form-control",placeholder:"請輸入特色標語","onUpdate:modelValue":e[8]||(e[8]=o=>s.product.feature=o)},null,512),[[d,s.product.feature]])]),t("div",et,[t("div",ot,[st,i(t("input",{id:"nation",type:"text",class:"form-control",placeholder:"請輸入地區","onUpdate:modelValue":e[9]||(e[9]=o=>s.product.nation=o)},null,512),[[d,s.product.nation]])]),t("div",lt,[it,i(t("input",{id:"area",type:"text",class:"form-control",placeholder:"請輸入縣市","onUpdate:modelValue":e[10]||(e[10]=o=>s.product.area=o)},null,512),[[d,s.product.area]])])]),t("div",rt,[t("div",dt,[nt,i(t("input",{id:"category",type:"text",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":e[11]||(e[11]=o=>s.product.category=o)},null,512),[[d,s.product.category]])]),t("div",ct,[at,i(t("input",{id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":e[12]||(e[12]=o=>s.product.unit=o)},null,512),[[d,s.product.unit]])])]),t("div",ut,[t("div",pt,[mt,i(t("input",{id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":e[13]||(e[13]=o=>s.product.origin_price=o)},null,512),[[d,s.product.origin_price,void 0,{number:!0}]])]),t("div",_t,[ht,i(t("input",{id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":e[14]||(e[14]=o=>s.product.price=o)},null,512),[[d,s.product.price,void 0,{number:!0}]])])]),bt,t("div",ft,[gt,i(t("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入產品描述",rows:"16","onUpdate:modelValue":e[15]||(e[15]=o=>s.product.description=o)},`
              `,512),[[d,s.product.description]])]),t("div",vt,[yt,i(t("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入說明內容","onUpdate:modelValue":e[16]||(e[16]=o=>s.product.content=o)},`
              `,512),[[d,s.product.content]])]),t("div",xt,[t("div",Ut,[i(t("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":e[17]||(e[17]=o=>s.product.is_enabled=o)},null,512),[[I,s.product.is_enabled]]),Vt])])])])]),t("div",kt,[t("button",{type:"button",class:"btn btn-outline-secondary mx-2",onClick:e[18]||(e[18]=(...o)=>r.goBack&&r.goBack(...o))}," 取消 "),t("button",{type:"button",class:"btn btn-primary text-light",onClick:e[19]||(e[19]=(...o)=>r.updateProduct&&r.updateProduct(...o))}," 確認 ")])])}const At=U(A,[["render",wt]]);export{At as default};
