import{M as C,f as y,u as z,g as B,h as o,r as N,a as S,b as T,d as s,e as l,N as U,n,O as $,P as q,l as E,Q as c,R as F,s as M,t as p,S as P,G as f,T as D,L as r}from"./index-fb57e085.js";import{b as v}from"./route-block-83d24a4e.js";const L=f("p",null,[n("С "),f("a",{target:"_blank",href:"#"},"правилами"),n(" согласен ")],-1),R={class:"text-center"},j={__name:"register",setup(A){C({title:"sign_in"});const h=y(),w=z(),k=B().appContext.app.config.globalProperties.$snackbar,V=o(),g=o(!0),i=o(""),d=o(""),m=o(""),_=o(!1),u={email:[e=>!!e||r("enter_Email"),e=>e&&/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(e)||r("email_rules")],password:[e=>!!e||r("enter_Pass"),e=>e&&e.length>=6&&e.length<=32||r("pass_rules")],name:[e=>!!e||r("message_EnterName"),e=>e&&e.length>=3&&e.length<=20||r("name_rules")],agree:[e=>!!e||r("agree_rules")]},x=async()=>{const{valid:e}=await V.value.validate();if(e){const a={email:i.value,password:d.value,name:m.value};try{await w.dispatch("auth/register",a),k.showMessage(r("sign_in_success")),h.push("/")}catch{}}};return(e,a)=>{const b=N("router-link");return S(),T(D,{width:"100%","max-width":"450",class:"pa-3"},{default:s(()=>[l(U,{class:"mb-2 text-center"},{default:s(()=>[n("Домашняя бухгалтерия")]),_:1}),l($,null,{default:s(()=>[l(q,{class:"card-content",ref_key:"form",ref:V,modelValue:g.value,"onUpdate:modelValue":a[4]||(a[4]=t=>g.value=t),onSubmit:E(x,["prevent"])},{default:s(()=>[l(c,{modelValue:i.value,"onUpdate:modelValue":a[0]||(a[0]=t=>i.value=t),rules:u.email,variant:"underlined",label:"Email",required:""},null,8,["modelValue","rules"]),l(c,{modelValue:d.value,"onUpdate:modelValue":a[1]||(a[1]=t=>d.value=t),rules:u.password,variant:"underlined",label:"Пароль",class:"mt-5",required:""},null,8,["modelValue","rules"]),l(c,{modelValue:m.value,"onUpdate:modelValue":a[2]||(a[2]=t=>m.value=t),rules:u.name,variant:"underlined",counter:20,label:"Имя",class:"mt-5",required:""},null,8,["modelValue","rules"]),l(F,{modelValue:_.value,"onUpdate:modelValue":a[3]||(a[3]=t=>_.value=t),rules:u.agree,class:"mt-5",required:""},{label:s(()=>[L]),_:1},8,["modelValue","rules"]),l(M,{type:"submit","append-icon":"mdi-send",color:"teal-lighten-1",width:"100%",class:"mt-7"},{default:s(()=>[n(p(e.$filters.localize("sign_in")),1)]),_:1})]),_:1},8,["modelValue","onSubmit"])]),_:1}),l(P,{class:"justify-center text-subtitle-1"},{default:s(()=>[f("p",R,[n(p(e.$filters.localize("have_account")+"? ")+" ",1),l(b,{to:"/login",tag:"a"},{default:s(()=>[n(p(e.$filters.localize("login")+"!"),1)]),_:1})])]),_:1})]),_:1})}}};typeof v=="function"&&v(j);export{j as default};
