import{_ as J,m as N,a as V,r as O,o as g,c as I,g as R,w as x,h as X,b as s,d as C,t as l,k as Y,v as K,s as $,F as D,i as z,e as G,f as E,p as W,j as Z}from"./index-wczSaofn.js";import{g as ee,i as te,f as se,n as F,h as Q,E as ie,N as oe,S as ae,d as re,p as L}from"./effect-fade-dGz1uHT_.js";import{c as q}from"./cartStore-GiIWaOIC.js";import{L as ne}from"./index-jRP1il9b.js";import{_ as le}from"./loading-img2-JPOuMyya.js";function de(i){let{swiper:e,extendParams:T,on:b}=i;T({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let h=!1,y=!1;e.thumbs={swiper:null};function S(){const o=e.thumbs.swiper;if(!o||o.destroyed)return;const t=o.clickedIndex,d=o.clickedSlide;if(d&&d.classList.contains(e.params.thumbs.slideThumbActiveClass)||typeof t>"u"||t===null)return;let c;o.params.loop?c=parseInt(o.clickedSlide.getAttribute("data-swiper-slide-index"),10):c=t,e.params.loop?e.slideToLoop(c):e.slideTo(c)}function v(){const{thumbs:o}=e.params;if(h)return!1;h=!0;const t=e.constructor;if(o.swiper instanceof t)e.thumbs.swiper=o.swiper,Object.assign(e.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(e.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper.update();else if(te(o.swiper)){const d=Object.assign({},o.swiper);Object.assign(d,{watchSlidesProgress:!0,slideToClickedSlide:!1}),e.thumbs.swiper=new t(d),y=!0}return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),e.thumbs.swiper.on("tap",S),!0}function u(o){const t=e.thumbs.swiper;if(!t||t.destroyed)return;const d=t.params.slidesPerView==="auto"?t.slidesPerViewDynamic():t.params.slidesPerView;let c=1;const n=e.params.thumbs.slideThumbActiveClass;if(e.params.slidesPerView>1&&!e.params.centeredSlides&&(c=e.params.slidesPerView),e.params.thumbs.multipleActiveThumbs||(c=1),c=Math.floor(c),t.slides.forEach(p=>p.classList.remove(n)),t.params.loop||t.params.virtual&&t.params.virtual.enabled)for(let p=0;p<c;p+=1)se(t.slidesEl,`[data-swiper-slide-index="${e.realIndex+p}"]`).forEach(r=>{r.classList.add(n)});else for(let p=0;p<c;p+=1)t.slides[e.realIndex+p]&&t.slides[e.realIndex+p].classList.add(n);const m=e.params.thumbs.autoScrollOffset,M=m&&!t.params.loop;if(e.realIndex!==t.realIndex||M){const p=t.activeIndex;let r,k;if(t.params.loop){const a=t.slides.filter(P=>P.getAttribute("data-swiper-slide-index")===`${e.realIndex}`)[0];r=t.slides.indexOf(a),k=e.activeIndex>e.previousIndex?"next":"prev"}else r=e.realIndex,k=r>e.previousIndex?"next":"prev";M&&(r+=k==="next"?m:-1*m),t.visibleSlidesIndexes&&t.visibleSlidesIndexes.indexOf(r)<0&&(t.params.centeredSlides?r>p?r=r-Math.floor(d/2)+1:r=r+Math.floor(d/2)-1:r>p&&t.params.slidesPerGroup,t.slideTo(r,o?0:void 0))}}b("beforeInit",()=>{const{thumbs:o}=e.params;if(!(!o||!o.swiper))if(typeof o.swiper=="string"||o.swiper instanceof HTMLElement){const t=ee(),d=()=>{const n=typeof o.swiper=="string"?t.querySelector(o.swiper):o.swiper;if(n&&n.swiper)o.swiper=n.swiper,v(),u(!0);else if(n){const m=M=>{o.swiper=M.detail[0],n.removeEventListener("init",m),v(),u(!0),o.swiper.update(),e.update()};n.addEventListener("init",m)}return n},c=()=>{if(e.destroyed)return;d()||requestAnimationFrame(c)};requestAnimationFrame(c)}else v(),u(!0)}),b("slideChange update resize observerUpdate",()=>{u()}),b("setTransition",(o,t)=>{const d=e.thumbs.swiper;!d||d.destroyed||d.setTransition(t)}),b("beforeDestroy",()=>{const o=e.thumbs.swiper;!o||o.destroyed||y&&o.destroy()}),Object.assign(e.thumbs,{init:v,update:u})}function ce(i){let{swiper:e,extendParams:T,emit:b,once:h}=i;T({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}});function y(){if(e.params.cssMode)return;const u=e.getTranslate();e.setTranslate(u),e.setTransition(0),e.touchEventsData.velocities.length=0,e.freeMode.onTouchEnd({currentPos:e.rtl?e.translate:-e.translate})}function S(){if(e.params.cssMode)return;const{touchEventsData:u,touches:o}=e;u.velocities.length===0&&u.velocities.push({position:o[e.isHorizontal()?"startX":"startY"],time:u.touchStartTime}),u.velocities.push({position:o[e.isHorizontal()?"currentX":"currentY"],time:F()})}function v(u){let{currentPos:o}=u;if(e.params.cssMode)return;const{params:t,wrapperEl:d,rtlTranslate:c,snapGrid:n,touchEventsData:m}=e,p=F()-m.touchStartTime;if(o<-e.minTranslate()){e.slideTo(e.activeIndex);return}if(o>-e.maxTranslate()){e.slides.length<n.length?e.slideTo(n.length-1):e.slideTo(e.slides.length-1);return}if(t.freeMode.momentum){if(m.velocities.length>1){const f=m.velocities.pop(),w=m.velocities.pop(),H=f.position-w.position,U=f.time-w.time;e.velocity=H/U,e.velocity/=2,Math.abs(e.velocity)<t.freeMode.minimumVelocity&&(e.velocity=0),(U>150||F()-f.time>300)&&(e.velocity=0)}else e.velocity=0;e.velocity*=t.freeMode.momentumVelocityRatio,m.velocities.length=0;let r=1e3*t.freeMode.momentumRatio;const k=e.velocity*r;let a=e.translate+k;c&&(a=-a);let P=!1,A;const B=Math.abs(e.velocity)*20*t.freeMode.momentumBounceRatio;let j;if(a<e.maxTranslate())t.freeMode.momentumBounce?(a+e.maxTranslate()<-B&&(a=e.maxTranslate()-B),A=e.maxTranslate(),P=!0,m.allowMomentumBounce=!0):a=e.maxTranslate(),t.loop&&t.centeredSlides&&(j=!0);else if(a>e.minTranslate())t.freeMode.momentumBounce?(a-e.minTranslate()>B&&(a=e.minTranslate()+B),A=e.minTranslate(),P=!0,m.allowMomentumBounce=!0):a=e.minTranslate(),t.loop&&t.centeredSlides&&(j=!0);else if(t.freeMode.sticky){let f;for(let w=0;w<n.length;w+=1)if(n[w]>-a){f=w;break}Math.abs(n[f]-a)<Math.abs(n[f-1]-a)||e.swipeDirection==="next"?a=n[f]:a=n[f-1],a=-a}if(j&&h("transitionEnd",()=>{e.loopFix()}),e.velocity!==0){if(c?r=Math.abs((-a-e.translate)/e.velocity):r=Math.abs((a-e.translate)/e.velocity),t.freeMode.sticky){const f=Math.abs((c?-a:a)-e.translate),w=e.slidesSizesGrid[e.activeIndex];f<w?r=t.speed:f<2*w?r=t.speed*1.5:r=t.speed*2.5}}else if(t.freeMode.sticky){e.slideToClosest();return}t.freeMode.momentumBounce&&P?(e.updateProgress(A),e.setTransition(r),e.setTranslate(a),e.transitionStart(!0,e.swipeDirection),e.animating=!0,Q(d,()=>{!e||e.destroyed||!m.allowMomentumBounce||(b("momentumBounce"),e.setTransition(t.speed),setTimeout(()=>{e.setTranslate(A),Q(d,()=>{!e||e.destroyed||e.transitionEnd()})},0))})):e.velocity?(b("_freeModeNoMomentumRelease"),e.updateProgress(a),e.setTransition(r),e.setTranslate(a),e.transitionStart(!0,e.swipeDirection),e.animating||(e.animating=!0,Q(d,()=>{!e||e.destroyed||e.transitionEnd()}))):e.updateProgress(a),e.updateActiveIndex(),e.updateSlidesClasses()}else if(t.freeMode.sticky){e.slideToClosest();return}else t.freeMode&&b("_freeModeNoMomentumRelease");(!t.freeMode.momentum||p>=t.longSwipesMs)&&(b("_freeModeStaticRelease"),e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses())}Object.assign(e,{freeMode:{onTouchStart:y,onTouchMove:S,onTouchEnd:v}})}const ue={data(){return{prodctQty:1,dataLoaded:!1,thumbsSwiper:null,modules:[ie,ce,oe,de]}},computed:{...N(L,["products"]),...N(L,["product"]),...N(L,["isLoading"]),items(){return["Slide 1","Slide 2","Slide 3"]},randomProducts(){if(!this.dataLoaded)return[];const i=JSON.parse(JSON.stringify(this.products));for(let e=i.length-1;e>0;e--){const T=Math.floor(Math.random()*(e+1));[i[e],i[T]]=[i[T],i[e]]}return i.slice(0,3)}},methods:{...V(q,["addToCart"]),...V(q,["updateQty"]),...V(L,["getAllProductsList"]),...V(L,["getProductList"]),setThumbsSwiper(i){this.thumbsSwiper=i},toOrder(i,e){this.addToCart(i,e),this.$router.push("/cart")}},components:{Swiper:ae,SwiperSlide:re,Loading:ne},mounted(){const{id:i}=this.$route.params;this.getAllProductsList(),this.getProductList(i),this.dataLoaded=!0}},_=i=>(W("data-v-da2806f8"),i=i(),Z(),i),me=_(()=>s("img",{style:{width:"200px"},src:le,alt:"to-top-btn"},null,-1)),pe={class:"container-fluid pt-6 pb-5 py-xl-6 px-3 px-xl-10"},fe={class:"mb-3 mb-xl-4","aria-label":"breadcrumb"},he={class:"breadcrumb"},be={class:"breadcrumb-item"},ve={class:"breadcrumb-item active","aria-current":"page"},we={class:"breadcrumb-item active","aria-current":"page"},_e={class:"row mt-3"},ye={class:"col-xl-12"},ge={class:"mb-2"},xe={class:"d-flex justify-content-between my-3 my-xl-4"},Te={class:"fs-lg-5 bg-primary text-light rounded rounded-pill px-2 py-2 me-3"},Se=_(()=>s("i",{class:"fs-lg-4 bi bi-geo-alt"},null,-1)),Me={class:"fs-lg-4"},ke={class:"d-flex align-items-end"},Pe={class:"d-none d-lg-block"},Ie={class:"mb-3"},Ce={class:"swiper-img-container"},Ee=["src"],Le={class:"swiper-img-container"},Ae=["src"],Be={class:"row flex-column-reverse flex-xl-row"},Ve={class:"col-12 col-xl-8 mt-xl-3"},Oe=G('<div class="d-xl-flex ps-1 py-3 mb-xl-3" data-v-da2806f8><div class="mx-xl-3 me-xl-5" data-v-da2806f8><i class="bi bi-coin" data-v-da2806f8></i> 時限內可免費取消 </div><div class="mt-2 mt-sm-0" data-v-da2806f8><i class="bi bi-qr-code-scan" data-v-da2806f8></i> 票券類商品請現場出示QRcode </div></div><hr data-v-da2806f8>',2),De={class:"py-3"},je={class:"white-space-pre-line my-auto"},Ne=_(()=>s("hr",null,null,-1)),Re={class:"my-3"},ze=_(()=>s("div",{class:"d-flex my-4"},[s("i",{class:"fs-4 text-primary me-2 bi bi-stars"}),s("h2",{class:"fs-4 my-auto fw-bolder"},"商品介紹")],-1)),Fe={class:"lh-lg white-space-pre-line"},Qe={class:"my-3"},Ue=_(()=>s("div",{class:"d-flex my-4"},[s("i",{class:"fs-4 text-primary me-2 bi bi-stars"}),s("h2",{class:"fs-4 my-auto fw-bolder"},"使用地點")],-1)),$e={style:{position:"relative","padding-bottom":"56.25%",height:"0"}},qe=["src"],Ge=G('<hr data-v-da2806f8><div class="bg-light mt-4 px-3 px-xl-5 py-4 rounded-5" data-v-da2806f8><div class="d-flex my-xl-4" data-v-da2806f8><i class="fs-5 text-gray me-2 bi bi-pin-fill" data-v-da2806f8></i><h2 class="fs-5 my-auto" data-v-da2806f8>注意事項</h2></div><ul class="lh-lg white-space-pre-line" data-v-da2806f8> ‧若購買商品為票券時 <li data-v-da2806f8>請於進入園區時，使用入口處的自動驗票閘門掃描您的QR code，以完成入園手續。</li><li data-v-da2806f8> 已購買本電子票券的遊客，請務必攜帶智慧型手機，並出示您的二維碼進行掃描， 以確保順利進入園區。請不要印製電子票券。 </li><li data-v-da2806f8>如需在同一天內多次進出園區，請至出口處取得再入園手章。</li><li data-v-da2806f8>請留意，園區內的所有設施與表演活動可能因天候等因素而有所更改或暫停營運，故無法提前通知。</li><li data-v-da2806f8>此票券僅適用於園區的一般營業日，不適用於特別營業時間。</li><li data-v-da2806f8>旅客必須在電子券所指定的日期前往指定的園區參觀，無法自行更改入園日期或園區。</li><li data-v-da2806f8> 若您在訂購後在票券有效期內需要取消訂單或變更人數、票種、園區或入園日期等資訊， 請透過電話或電子郵件聯繫客服人員。 </li></ul></div>',2),He={class:"col-12 col-xl-4 my-3 mt-xl-3"},Je={class:"card position-sticky shadow-sm p-5",style:{top:"5rem"}},Xe={class:"mb-3 text-end"},Ye={class:"fs-3"},Ke={class:"input-group mb-3 border mt-3"},We={class:"d-flex justify-content-end mt-xl-3"},Ze={class:"row mt-5"},et=_(()=>s("div",{class:"d-flex my-4"},[s("i",{class:"fs-4 text-primary me-2 bi bi-stars"}),s("h2",{class:"fs-4 my-auto fw-bolder"},"其他推薦商品")],-1)),tt={class:"card h-100 mb-4 border-0 shadow-sm product-card-hover"},st={style:{position:"relative"}},it={class:"fs-5 text-dark bg-white ps-2 opacity-75",style:{position:"absolute",top:"15px","z-index":"2"}},ot=_(()=>s("i",{class:"bi bi-geo-alt-fill"},null,-1)),at=["src"],rt={class:"card-body"},nt={class:"fs-5 text-primary"},lt=_(()=>s("i",{class:"bi bi-play-fill"},null,-1)),dt={class:"card-text text-dark my-2 link-hover"},ct={class:"fs-5 text-primary fw-bolder"},ut={style:{color:"rgb(196, 196, 196)"}},mt=_(()=>s("br",null,null,-1));function pt(i,e,T,b,h,y){const S=O("loading"),v=O("RouterLink"),u=O("swiper-slide"),o=O("swiper");return g(),I(D,null,[i.isLoading?(g(),R(S,{key:0,active:i.isLoading,"can-cancel":!1},{default:x(()=>[me]),_:1},8,["active"])):X("",!0),s("main",pe,[s("nav",fe,[s("ol",he,[s("li",be,[C(v,{class:"text-decoration-none",to:"/",exact:""},{default:x(()=>[E("首頁")]),_:1})]),s("li",ve,[C(v,{class:"text-decoration-none",to:"/products",exact:""},{default:x(()=>[E("所有商品")]),_:1})]),s("li",we,l(i.product.title),1)])]),s("section",_e,[s("div",ye,[s("div",ge,[s("h1",null,l(i.product.nation)+"｜"+l(i.product.title),1),s("div",xe,[s("div",null,[s("span",Te,l(i.product.category),1),Se,s("span",Me,l(i.product.nation)+" "+l(i.product.area),1)]),s("div",ke,[s("span",Pe," 商品ID "+l(i.product.id),1)])])]),s("div",Ie,[C(o,{style:{"--swiper-navigation-color":"#fff","--swiper-pagination-color":"#fff"},effect:"fade",spaceBetween:10,loop:!0,navigation:!0,thumbs:{swiper:this.thumbsSwiper},modules:h.modules,class:"mySwiper2"},{default:x(()=>[(g(!0),I(D,null,z(i.product.imagesUrl.slice(0,5),t=>(g(),R(u,{class:"product-first-swiper w-100",key:t},{default:x(()=>[s("div",Ce,[s("img",{style:{width:"100%"},class:"object-fit",src:t,alt:"product-img"},null,8,Ee)])]),_:2},1024))),128))]),_:1},8,["thumbs","modules"]),C(o,{onSwiper:y.setThumbsSwiper,spaceBetween:10,slidesPerView:3,freeMode:!0,watchSlidesProgress:!0,modules:h.modules,class:"mySwiper mt-2"},{default:x(()=>[(g(!0),I(D,null,z(i.product.imagesUrl.slice(0,5),t=>(g(),R(u,{class:"product-second-swiper",key:t},{default:x(()=>[s("div",Le,[s("img",{style:{width:"100%"},class:"object-fit",src:t,alt:"product-img"},null,8,Ae)])]),_:2},1024))),128))]),_:1},8,["onSwiper","modules"])])])]),s("section",Be,[s("div",Ve,[Oe,s("div",De,[s("p",je,l(i.product.content),1)]),Ne,s("div",Re,[ze,s("p",Fe,l(i.product.description),1)]),s("div",Qe,[Ue,s("div",$e,[s("iframe",{src:i.product.addressEmbedCode,width:"800",height:"400",style:{border:"0",position:"absolute",top:"0",left:"0",width:"100%",height:"100%"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"},null,8,qe)])]),Ge]),s("div",He,[s("div",Je,[s("div",Xe,[s("span",null,[s("del",null," NT$"+l(i.product.origin_price),1)]),s("span",Ye," NT$"+l(i.product.price)+"元 ",1),s("span",null," /"+l(i.product.unit),1)]),s("div",Ke,[Y(s("input",{class:"form-control border-0 text-center my-auto shadow-none",type:"number",min:1,value:"1","onUpdate:modelValue":e[0]||(e[0]=t=>h.prodctQty=t)},null,512),[[K,h.prodctQty]])]),s("div",We,[s("a",{href:"#",class:"btn btn-primary btn-block text-white rounded-0 py-2 ms-2",onClick:e[1]||(e[1]=$(t=>i.addToCart(i.product,h.prodctQty),["prevent"]))},"加入購物車 "),s("a",{href:"#",class:"btn btn-primary btn-block text-white rounded-0 py-2 ms-2",onClick:e[2]||(e[2]=$(t=>y.toOrder(i.product,h.prodctQty),["prevent"]))}," 立即訂購 ")])])])]),s("section",Ze,[et,(g(!0),I(D,null,z(y.randomProducts,t=>(g(),I("div",{class:"col-md-4 col-sm-6",key:t.id},[C(v,{class:"text-decoration-none",to:`/product/${t.id}`},{default:x(()=>[s("div",tt,[s("div",st,[s("div",null,[s("span",it,[ot,E(" "+l(t.nation)+l(t.area),1)]),s("img",{src:t.imagesUrl[0],style:{height:"200px","z-index":"1"},class:"card-img-top object-fit-cover",alt:"product-img"},null,8,at)])]),s("div",rt,[s("span",nt,[lt,E(" "+l(t.category),1)]),s("h4",dt,l(t.title),1),s("p",null,l(t.feature),1),s("p",ct,[s("del",ut," NT$"+l(t.origin_price),1),mt,E(" NT$"+l(t.price),1)])])])]),_:2},1032,["to"])]))),128))])])],64)}const _t=J(ue,[["render",pt],["__scopeId","data-v-da2806f8"]]);export{_t as default};
