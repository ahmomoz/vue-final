import{_ as g,m as d,r as n,o as r,c,g as v,w as _,h as w,b as s,F as h,i as x,t as o,d as y,f as L}from"./index-IkRGDjhC.js";import{c as m}from"./cartStore-RXNSCH78.js";import{L as k}from"./index-v_09iHwz.js";import{_ as P}from"./loading-img2-JPOuMyya.js";import{_ as S}from"./step2-4FqYNh2q.js";var V={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"ahmomoz",BASE_URL:"/vue-final/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:f,VITE_APIPATH:p}=V,$={data(){return{order:[],orderList:[],total:0,final_total:0,isLoading:!0}},computed:{...d(m,["cart"]),...d(m,["cartList"])},methods:{getOrderList(i){this.isLoading=!0,this.$axios.get(`${f}/api/${p}/order/${i}`).then(e=>{this.total=e.data.order.total,this.order=e.data.order.user,this.orderList=e.data.order.products}).catch(()=>{this.$Swal.fire({icon:"error",title:"查不到此訂單，將跳轉回購物車"}),this.$router.push("/cart")}).finally(()=>{this.isLoading=!1})},addPay(i){this.isLoading=!0,this.$axios.post(`${f}/api/${p}/pay/${i}`).then(e=>{this.$Swal.fire({position:"top-end",icon:"success",title:"結帳成功",showConfirmButton:!1,timer:700}),this.$router.push("/checkout-success")}).catch(e=>{this.$Swal.fire({icon:"error",title:e.response}),this.$router.push("/cart")}).finally(()=>{this.isLoading=!1})},formatPrice(i){return i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},mounted(){this.getOrderList(this.$route.params.id)},components:{Loading:k}},E=s("img",{style:{width:"200px"},src:P,alt:"to-top-btn"},null,-1),T={class:"container-fluid cart-bg pt-lg-6 pb-5 py-xl-6 px-3 px-xl-10"},I=s("div",{class:"text-center mt-5"},[s("img",{class:"img-fluid",src:S,alt:"step-img"})],-1),A={class:"row justify-content-center pb-5","data-aos":"fade-up"},B={class:"col-md-4"},R={class:"card bg-white p-4 mb-4"},C=["src"],N={class:"w-100"},j={class:"d-flex justify-content-between"},U={class:"mb-0 fw-bold"},D={class:"mb-0"},O={class:"mb-0 fw-bold"},F=s("hr",null,null,-1),H={class:"d-flex justify-content-between mt-4"},q=s("p",{class:"mb-0 h4 fw-bold"},"總計金額",-1),z={class:"mb-0 h4 fw-bold"},M={class:"col-md-8 card"},G=s("div",{class:"card-header bg-white"},[s("h5",{class:"my-1"},"收件人資訊")],-1),J={class:"card-body"},K={class:"mb-3"},Q=s("label",{for:"name",class:"form-label fw-bold"},"姓名",-1),W={class:"fs-5"},X={class:"mb-3"},Y=s("label",{for:"tel",class:"form-label fw-bold"},"電話",-1),Z={class:"fs-5"},ss={class:"mb-3"},ts=s("label",{for:"address",class:"form-label fw-bold"},"地址",-1),es={class:"fs-5"},os={class:"mb-3"},is=s("label",{for:"email",class:"form-label fw-bold"},"E-mail",-1),as={class:"fs-5"},rs={class:"mb-3"},cs=s("label",{for:"message",class:"form-label fw-bold"},"備註",-1),ls={key:0,class:"fs-5"},ds={key:1,class:"fs-5"},ns={class:"d-flex justify-content-end my-4"},_s=s("i",{class:"bi bi-chevron-double-right"},null,-1);function hs(i,e,ms,fs,t,l){const u=n("loading"),b=n("RouterLink");return r(),c(h,null,[t.isLoading?(r(),v(u,{key:0,active:t.isLoading,"can-cancel":!1},{default:_(()=>[E]),_:1},8,["active"])):w("",!0),s("main",T,[I,s("div",A,[s("div",B,[s("div",R,[(r(!0),c(h,null,x(t.orderList,a=>(r(),c("div",{class:"d-flex mt-2",key:a.id},[s("img",{src:a.product.imagesUrl[0],alt:"product-img",class:"me-2",style:{width:"48px",height:"48px","object-fit":"cover"}},null,8,C),s("div",N,[s("div",j,[s("p",U,o(a.product.title),1),s("p",D,"NT$"+o(l.formatPrice(a.product.price)),1)]),s("p",O,"x"+o(a.qty),1)])]))),128)),F,s("div",H,[q,s("p",z,"NT$"+o(l.formatPrice(t.total.toFixed(0))),1)])]),s("button",{type:"button",class:"btn btn-primary py-3 px-5 w-100 rounded-0",onClick:e[0]||(e[0]=a=>l.addPay(this.$route.params.id))}," 送出結帳 ")]),s("div",M,[G,s("div",J,[s("div",K,[Q,s("p",W,o(t.order.name),1)]),s("div",X,[Y,s("p",Z,o(t.order.tel),1)]),s("div",ss,[ts,s("p",es,o(t.order.address),1)]),s("div",os,[is,s("p",as,o(t.order.email),1)]),s("div",rs,[cs,t.order.message?(r(),c("p",ls,o(t.order.message),1)):(r(),c("p",ds,"無填寫備註"))])])])]),s("div",ns,[y(b,{to:"/booking",class:"fs-5 text-decoration-none link-hover"},{default:_(()=>[L(" 返回前一頁 "),_s]),_:1})])])],64)}const ws=g($,[["render",hs]]);export{ws as default};
