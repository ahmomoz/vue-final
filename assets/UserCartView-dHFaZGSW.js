import{_ as v,r as p,o as n,c as d,a as e,t as g,F as x,q as y,u as m,b as a,w as C,z as _,v as w,x as L}from"./index-gfXPBhzS.js";const V={data(){return{cartList:[],tempProduct:[],tempCartList:[],totalPrice:0,isLoading:!0,form:{user:{email:"",name:"",tel:"",address:"",date:""},message:""},createOrder:{}}},methods:{getCartList(){this.isLoading=!0,this.$axios.get("https://vue3-course-api.hexschool.io/v2/api/ahmomoz/cart").then(l=>{this.cartList=l.data.data.carts,this.totalPrice=l.data.data.total}).catch(l=>{this.$Swal.fire({icon:"error",title:l})}).finally(()=>{this.isLoading=!1})},updateQty(l,t){const u=parseInt(t.target.value,10),c={data:{product_id:l.id,qty:u}};this.$axios.put(`https://vue3-course-api.hexschool.io/v2/api/ahmomoz/cart/${l.id}`,c).then(s=>{this.getCartList()}).catch(s=>{this.$Swal.fire({icon:"error",title:s.response.data.message})})},deleteProduct(l){this.isLoading=!0,this.$axios.delete(`https://vue3-course-api.hexschool.io/v2/api/ahmomoz/cart/${l.id}`).then(t=>{this.$Swal.fire({position:"top-end",icon:"success",title:"已刪除",showConfirmButton:!1,timer:700}),this.getCartList()}).catch(t=>{this.$Swal.fire({icon:"error",title:t.response.data.message})}).finally(()=>{this.isLoading=!1})},deleteCart(){this.$Swal.fire({title:"確定要清空購物車嗎？",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(l=>{l.isConfirmed&&this.$axios.delete("https://vue3-course-api.hexschool.io/v2/api/ahmomoz/carts").then(t=>{this.$Swal.fire({title:"已清空購物車",icon:"success"}),this.getCartList()}).catch(t=>{this.$Swal.fire({icon:"error",title:t.response.data.message})})})},addOrder(){if(this.cartList.length>0){const t=new Date().toISOString();this.form.user.date=t;const u=this.form;this.isLoading=!0,this.$axios.post("https://vue3-course-api.hexschool.io/v2/api/ahmomoz/order",{data:u}).then(c=>{this.$Swal.fire({title:"訂單送出成功",icon:"success"}),this.getCartList(),this.cartList="",this.form={user:{email:"",name:"",tel:"",address:""},message:""}}).catch(c=>{this.$Swal.fire({icon:"error",title:c.response.data.message})}).finally(()=>{this.isLoading=!1})}else this.$Swal.fire({icon:"error",title:"購物車不得為空"})}},mounted(){this.getCartList()}},k={class:"row mt-5"},S={class:"col-md-5"},$=e("h2",null,"商品購物車",-1),B={key:0,class:"mb-2"},z={class:"table"},q=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",null,"數量/單位"),e("th",{class:"text-end"},"單價"),e("th",{class:"text-end"},"小計")])],-1),F=["onClick"],P={class:"w-25"},U={class:"input-group input-group-sm"},O=["value","onBlur"],T={class:"input-group-text",id:"basic-addon2"},D={class:"text-end"},E={class:"text-end"},N={key:0},Q=e("td",{colspan:"4",class:"text-end"},"總計",-1),I={class:"text-end"},j={key:1,class:"text-white d-flex align-items-center justify-content-center",style:{height:"300px","background-color":"rgba(94, 94, 94, 0.65)","z-index":"100"}},M={class:"col-md-6 mb-5"},X=e("h2",null,"建立訂單",-1),Y={class:"mb-3"},A=e("label",{for:"email",class:"form-label"},"*Email",-1),G={class:"mb-3"},H=e("label",{for:"name",class:"form-label"},"*收件人姓名",-1),J={class:"mb-3"},K=e("label",{for:"tel",class:"form-label"},"*收件人電話",-1),R={class:"mb-3"},W=e("label",{for:"address",class:"form-label"},"*收件人地址",-1),Z={class:"mb-3"},ee=e("label",{for:"message",class:"form-label"},"留言",-1),te={class:"text-end"};function se(l,t,u,c,s,r){const h=p("VeeField"),f=p("error-message"),b=p("VeeForm");return n(),d("div",k,[e("div",S,[$,s.cartList.length>0?(n(),d("div",B,[e("button",{class:"btn btn-outline-danger",type:"button",onClick:t[0]||(t[0]=(...o)=>r.deleteCart&&r.deleteCart(...o))},"清空購物車")])):g("",!0),e("table",z,[q,e("tbody",null,[(n(!0),d(x,null,y(s.cartList,o=>(n(),d("tr",{key:o.id},[e("td",null,[e("button",{class:"btn btn-sm btn-outline-danger text-end",type:"button",onClick:i=>r.deleteProduct(o)},"X",8,F)]),e("td",null,m(o.product.title),1),e("td",P,[e("div",U,[e("input",{min:1,type:"number",class:"form-control",value:o.qty,onBlur:i=>r.updateQty(o,i)},null,40,O),e("span",T,m(o.product.unit),1)])]),e("td",D,m(o.product.price),1),e("td",E,m(o.final_total),1)]))),128))]),s.cartList.length>0?(n(),d("tfoot",N,[e("tr",null,[Q,e("td",I,m(s.totalPrice),1)])])):g("",!0)]),s.cartList.length===0?(n(),d("div",j,"購物車目前沒有商品")):g("",!0)]),e("div",M,[X,a(b,{ref:"form",onSubmit:o=>""},{default:C(({errors:o})=>[e("div",Y,[A,a(h,{id:"email",name:"email",type:"email",class:_(["form-control",{"is-invalid":o.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:s.form.user.email,"onUpdate:modelValue":t[1]||(t[1]=i=>s.form.user.email=i)},null,8,["class","modelValue"]),a(f,{name:"email",class:"invalid-feedback"})]),e("div",G,[H,a(h,{id:"name",name:"姓名",type:"text",class:_(["form-control",{"is-invalid":o.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:s.form.user.name,"onUpdate:modelValue":t[2]||(t[2]=i=>s.form.user.name=i)},null,8,["class","modelValue"]),a(f,{name:"姓名",class:"invalid-feedback"})]),e("div",J,[K,a(h,{id:"tel",name:"電話",type:"text",class:_(["form-control",{"is-invalid":o.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:s.form.user.tel,"onUpdate:modelValue":t[3]||(t[3]=i=>s.form.user.tel=i)},null,8,["class","modelValue"]),a(f,{name:"電話",class:"invalid-feedback"})]),e("div",R,[W,a(h,{id:"address",name:"地址",type:"text",class:_(["form-control",{"is-invalid":o.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:s.form.user.address,"onUpdate:modelValue":t[4]||(t[4]=i=>s.form.user.address=i)},null,8,["class","modelValue"]),a(f,{name:"地址",class:"invalid-feedback"})]),e("div",Z,[ee,w(e("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[5]||(t[5]=i=>s.form.message=i)},null,512),[[L,s.form.message]])]),e("div",te,[e("button",{type:"submit",class:"btn btn-danger",onClick:t[6]||(t[6]=(...i)=>r.addOrder&&r.addOrder(...i))},"送出訂單")])]),_:1},512)])])}const ie=v(V,[["render",se]]);export{ie as default};