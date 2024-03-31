import{L as y}from"./index-LdDh6Nbz.js";import{d as x}from"./vuedraggable.umd-CSocwssN.js";import{_ as U,r as _,o as n,c as a,b as e,g as V,h as u,d as k,w,k as l,v as r,q as C}from"./index-N2OVN5xF.js";var E={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:b,VITE_APIPATH:h}=E,I={data(){return{drag:!1,product:{imagesUrl:[]},isLoading:!0}},methods:{addProduct(){const d=this.product;this.isLoading=!0,this.$axios.post(`${b}/api/${h}/admin/product`,{data:d}).then(o=>{this.isLoading=!1,this.$Swal.fire({position:"top-end",icon:"success",title:"新增成功",showConfirmButton:!1,timer:700}),this.$router.push("/dashboard/products")}).catch(o=>{this.isLoading=!1,this.$Swal.fire({icon:"error",title:o.response.data.message})})},deleteAllImg(d){this.product.imagesUrl=[""]},deleteImg(d){this.product.imagesUrl.splice(d,1)},imgUrlUpdate(d){this.product.imagesUrl[0]===""?this.product.imagesUrl[0]=d:this.product.imagesUrl.push(d)},imgUpload(d){const o=d.target.files[0],m=new FormData;m.append("file-to-upload",o),this.$axios.post(`${b}/api/${h}/admin/upload`,m).then(c=>{const t=c.data.imageUrl;this.imgUrlUpdate(t)}).catch(c=>{this.$Swal.fire({icon:"error",title:c.response.data.message})})},changeCursor(d){const o=document.querySelector(".row.align-items-center");o&&(o.style.cursor=d?"move":"auto")},goBack(){this.$router.go(-1)}},mounted(){this.isLoading=!1},components:{Loading:y,draggable:x}},A={class:"container"},L=e("h1",{class:"fs-3 mt-3"},"新增產品",-1),P={class:"mx-auto"},B={class:"card mt-4 shadow-sm"},S=e("div",{class:"card-header"},[e("h5",{class:"my-1"},"圖片資訊")],-1),T={class:"card-body"},D={class:"mb-3"},M=e("p",null,"上傳圖片",-1),R={class:"border-dashed-blue mb-3"},N=e("p",{class:"m-0 text-primary px-2"},"*第一張圖為商品主圖",-1),q={key:0,class:"py-5 bg-light"},H=e("p",{class:"px-2"},"請上傳圖片",-1),O=[H],z={class:"mb-3",style:{"max-width":"160px"}},F=["onClick"],K=e("span",{class:"bi bi-dash-circle-fill",style:{color:"rgb(180, 81, 81)"}},null,-1),j=[K],G=["src"],J={class:"card mt-4 shadow-sm"},Q=e("div",{class:"card-header"},[e("h5",{class:"my-1"},"基本資訊")],-1),W={class:"card-body"},X={class:"mb-3"},Y=e("label",{for:"title",class:"form-label"},"*標題",-1),Z={class:"mb-3"},$=e("label",{for:"feature",class:"form-label"},"*特色標語",-1),ee={class:"row"},oe={class:"mb-3 col-md-6"},se=e("label",{for:"nation",class:"form-label"},"*地區",-1),te={class:"mb-3 col-md-6"},le=e("label",{for:"area",class:"form-label"},"*縣市",-1),de={class:"row"},re={class:"mb-3 col-md-6"},ie=e("label",{for:"address",class:"form-label"},"*地址",-1),ne={class:"mb-3 col-md-6"},ce=e("label",{for:"addressEmbedCode",class:"form-label"},"*地址嵌入碼",-1),ae={class:"row"},ue={class:"mb-3 col-md-6"},me=e("label",{for:"category",class:"form-label"},"*分類",-1),pe={class:"mb-3 col-md-6"},_e=e("label",{for:"price",class:"form-label"},"*單位",-1),be={class:"row"},he={class:"mb-3 col-md-6"},fe=e("label",{for:"origin_price",class:"form-label"},"*原價",-1),ge={class:"mb-3 col-md-6"},ve=e("label",{for:"price",class:"form-label"},"*售價",-1),ye=e("hr",null,null,-1),xe={class:"mb-3"},Ue=e("label",{for:"description",class:"form-label"},"*產品描述",-1),Ve={class:"mb-3"},ke=e("label",{for:"content",class:"form-label"},"*說明內容",-1),we={class:"mb-3"},Ce={class:"form-check"},Ee=e("label",{class:"form-check-label",for:"is_enabled"},"是否上架",-1),Ie={class:"text-end mt-3 mb-5"};function Ae(d,o,m,c,t,i){const f=_("loading"),g=_("draggable");return n(),a("div",A,[L,e("div",P,[e("div",B,[S,e("div",T,[t.isLoading?(n(),V(f,{key:0,active:t.isLoading,"can-cancel":!1},null,8,["active"])):u("",!0),e("div",D,[M,e("input",{type:"file",id:"file",placeholder:"請輸入圖片連結",onChange:o[0]||(o[0]=s=>i.imgUpload(s))},null,32)]),e("div",R,[N,t.product.imagesUrl[0]?u("",!0):(n(),a("div",q,O)),k(g,{class:"row px-2",modelValue:t.product.imagesUrl,"onUpdate:modelValue":o[3]||(o[3]=s=>t.product.imagesUrl=s),group:"images",itemKey:"index",onStart:o[4]||(o[4]=s=>t.drag=!0),onEnd:o[5]||(o[5]=s=>t.drag=!1)},{item:w(({element:s,index:v})=>[e("div",z,[t.product.imagesUrl[0]?(n(),a("div",{key:0,class:"text-end",onClick:p=>i.deleteImg(v)},j,8,F)):u("",!0),e("img",{class:"img-fluid",src:s,alt:"商品圖片",style:{height:"100px"},onMouseover:o[1]||(o[1]=p=>i.changeCursor(!0)),onMouseleave:o[2]||(o[2]=p=>i.changeCursor(!1))},null,40,G)])]),_:1},8,["modelValue"])]),t.product.imagesUrl[0]?(n(),a("button",{key:1,type:"button",class:"btn btn-outline-primary btn-sm d-block w-100 mb-2",onClick:o[6]||(o[6]=(...s)=>i.deleteAllImg&&i.deleteAllImg(...s))}," 刪除所有圖片 ")):u("",!0)])]),e("div",J,[Q,e("div",W,[e("div",X,[Y,l(e("input",{id:"title",type:"text",class:"form-control",placeholder:"請輸入標題","onUpdate:modelValue":o[7]||(o[7]=s=>t.product.title=s)},null,512),[[r,t.product.title]])]),e("div",Z,[$,l(e("input",{id:"feature",type:"text",class:"form-control",placeholder:"請輸入特色標語","onUpdate:modelValue":o[8]||(o[8]=s=>t.product.feature=s)},null,512),[[r,t.product.feature]])]),e("div",ee,[e("div",oe,[se,l(e("input",{id:"nation",type:"text",class:"form-control",placeholder:"請輸入地區","onUpdate:modelValue":o[9]||(o[9]=s=>t.product.nation=s)},null,512),[[r,t.product.nation]])]),e("div",te,[le,l(e("input",{id:"area",type:"text",class:"form-control",placeholder:"請輸入縣市","onUpdate:modelValue":o[10]||(o[10]=s=>t.product.area=s)},null,512),[[r,t.product.area]])])]),e("div",de,[e("div",re,[ie,l(e("input",{id:"address",type:"text",class:"form-control",placeholder:"請輸入地區","onUpdate:modelValue":o[11]||(o[11]=s=>t.product.address=s)},null,512),[[r,t.product.address]])]),e("div",ne,[ce,l(e("input",{id:"addressEmbedCode",type:"text",class:"form-control",placeholder:"請輸入縣市","onUpdate:modelValue":o[12]||(o[12]=s=>t.product.addressEmbedCode=s)},null,512),[[r,t.product.addressEmbedCode]])])]),e("div",ae,[e("div",ue,[me,l(e("input",{id:"category",type:"text",class:"form-control",placeholder:"請輸入分類","onUpdate:modelValue":o[13]||(o[13]=s=>t.product.category=s)},null,512),[[r,t.product.category]])]),e("div",pe,[_e,l(e("input",{id:"unit",type:"text",class:"form-control",placeholder:"請輸入單位","onUpdate:modelValue":o[14]||(o[14]=s=>t.product.unit=s)},null,512),[[r,t.product.unit]])])]),e("div",be,[e("div",he,[fe,l(e("input",{id:"origin_price",type:"number",min:"0",class:"form-control",placeholder:"請輸入原價","onUpdate:modelValue":o[15]||(o[15]=s=>t.product.origin_price=s)},null,512),[[r,t.product.origin_price,void 0,{number:!0}]])]),e("div",ge,[ve,l(e("input",{id:"price",type:"number",min:"0",class:"form-control",placeholder:"請輸入售價","onUpdate:modelValue":o[16]||(o[16]=s=>t.product.price=s)},null,512),[[r,t.product.price,void 0,{number:!0}]])])]),ye,e("div",xe,[Ue,l(e("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入產品描述",rows:"16","onUpdate:modelValue":o[17]||(o[17]=s=>t.product.description=s)},`
            `,512),[[r,t.product.description]])]),e("div",Ve,[ke,l(e("textarea",{id:"description",type:"text",class:"form-control",placeholder:"請輸入說明內容","onUpdate:modelValue":o[18]||(o[18]=s=>t.product.content=s)},`
            `,512),[[r,t.product.content]])]),e("div",we,[e("div",Ce,[l(e("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":o[19]||(o[19]=s=>t.product.is_enabled=s)},null,512),[[C,t.product.is_enabled]]),Ee])])])])]),e("div",Ie,[e("button",{type:"button",class:"btn btn-outline-secondary mx-2",onClick:o[20]||(o[20]=(...s)=>i.goBack&&i.goBack(...s))}," 取消 "),e("button",{type:"button",class:"btn btn-primary text-light",onClick:o[21]||(o[21]=(...s)=>i.addProduct&&i.addProduct(...s))}," 確認 ")])])}const Se=U(I,[["render",Ae]]);export{Se as default};
