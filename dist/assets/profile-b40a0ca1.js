import{d as b,U as S,a as g,u as h,c as k,j as x,W as y,Q as w,b as B,y as U,M as m,t as c,p as l,i as s,g as o,f as d,$ as I,a5 as T,v as E,n as F,B as M,a1 as N,l as j,Z as C}from"./index-396d5d1a.js";import{u as q}from"./userinfo-d267707e.js";import{u as z}from"./validations-8539db78.js";import"./auth-9a94e179.js";const A={class:"title"},D={class:"text-h4 mt-4 ml-2"},R=b({__name:"profile",setup(H){S({title:"pageTitles.profile"});const{showMessage:i}=g(),f=h(),n=k(()=>f.info),r=x(),e=y({name:"",locale:""}),p=[{title:"Русский",value:"ru-RU"},{title:"Українська",value:"uk-UA"},{title:"English",value:"en-US"}],v=()=>{n.value&&Object.keys(n.value).length&&(e.locale=n.value.locale,e.name=n.value.name)};w(()=>{v()});const V=async()=>{var a,t;if((t=await((a=r.value)==null?void 0:a.validate()))==null?void 0:t.valid)try{await q(e),i(s("updateProfile_message"))}catch(u){i(s(u)||u)}};return(_,a)=>(B(),U("div",null,[m("div",A,[m("h3",D,c(l(s)("pageTitles.profile")),1)]),o(l(C),{ref_key:"form",ref:r,onSubmit:j(V,["prevent"]),class:"profile-form mt-8 px-4"},{default:d(()=>[o(I,{modelValue:e.name,"onUpdate:modelValue":a[0]||(a[0]=t=>e.name=t),rules:l(z).name,variant:"underlined",label:l(s)("name"),required:""},null,8,["modelValue","rules","label"]),o(T,{modelValue:e.locale,"onUpdate:modelValue":a[1]||(a[1]=t=>e.locale=t),items:p,label:l(s)("lang"),"item-title":"title","item-value":"value",variant:"underlined",class:"mt-4"},null,8,["modelValue","label"]),o(E,{type:"submit",color:"teal-darken-2",class:"mt-5"},{default:d(()=>[F(c(l(s)("update"))+" ",1),o(M,{icon:l(N),class:"ml-3"},null,8,["icon"])]),_:1})]),_:1},8,["onSubmit"])]))}});export{R as default};
