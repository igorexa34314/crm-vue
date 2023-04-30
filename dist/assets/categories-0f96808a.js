import{d as h,a as x,j as k,W as S,b as m,e as g,f as p,M as d,t as v,p as t,i as n,g as o,Z as B,l as U,$ as b,v as $,n as M,B as q,a1 as E,as as N,Q as T,a5 as F,U as D,a4 as H,r as L,y as w,at as j}from"./index-9175fc32.js";import{c as z,u as A,f as I}from"./category-ce40ea36.js";import{c as V}from"./validations-7b6bca79.js";import"./auth-f7cc9485.js";const Q={class:"subtitle"},R={class:"text-h5 mb-7"},W=h({__name:"CreateCategory",emits:["created"],setup(y,{emit:i}){const{showMessage:u}=x(),c=k(),r=S({title:"",limit:100}),a=async()=>{var l,e,s;if((e=await((l=c.value)==null?void 0:l.validate()))==null?void 0:e.valid)try{const f=await z(r);if(f)i("created",f),(s=c.value)==null||s.reset(),r.limit=100,u("Категория создана");else throw new Error("category undefined")}catch{u("error_create_category")}};return(_,l)=>(m(),g(N,{cols:"6",md:"6",sm:"12"},{default:p(()=>[d("div",null,[d("div",Q,[d("h4",R,v(t(n)("create")),1)]),o(t(B),{ref_key:"form",ref:c,onSubmit:U(a,["prevent"])},{default:p(()=>[o(b,{modelValue:r.title,"onUpdate:modelValue":l[0]||(l[0]=e=>r.title=e),rules:t(V).title,variant:"underlined",label:t(n)("title"),required:""},null,8,["modelValue","rules","label"]),o(b,{modelValue:r.limit,"onUpdate:modelValue":l[1]||(l[1]=e=>r.limit=e),modelModifiers:{number:!0},rules:t(V).limit,variant:"underlined",type:"number",label:t(n)("limit"),class:"mt-6",required:""},null,8,["modelValue","rules","label"]),o($,{color:"green-darken-3",type:"submit",class:"mt-7"},{default:p(()=>[M(v(t(n)("create"))+" ",1),o(q,{icon:t(E),class:"ml-3"},null,8,["icon"])]),_:1})]),_:1},8,["onSubmit"])])]),_:1}))}}),Z={class:"subtitle"},G={class:"text-h5 mb-7"},J=h({__name:"EditCategory",props:{categories:null},emits:["updated"],setup(y,{emit:i}){const u=y,{showMessage:c}=x(),r=k(),a=S({id:u.categories[0].id,title:"",limit:1});T(()=>{const l=u.categories.find(e=>e.id===a.id);l&&(a.title=l.title,a.limit=l.limit)});const _=async()=>{var f,C;const l=(C=await((f=r.value)==null?void 0:f.validate()))==null?void 0:C.valid,{id:e,...s}=a;if(l&&e)try{await A(e,s),c("Категория успешно обновлена"),i("updated",{id:e,...s})}catch{c("error_update_category")}};return(l,e)=>(m(),g(N,{cols:"6",md:"6",sm:"12"},{default:p(()=>[d("div",null,[d("div",Z,[d("h4",G,v(t(n)("edit")),1)]),o(t(B),{ref_key:"form",ref:r,onSubmit:U(_,["prevent"])},{default:p(()=>[o(F,{modelValue:a.id,"onUpdate:modelValue":e[0]||(e[0]=s=>a.id=s),items:y.categories,"item-title":"title","item-value":"id",label:t(n)("select_category"),variant:"underlined"},null,8,["modelValue","items","label"]),o(b,{modelValue:a.title,"onUpdate:modelValue":e[1]||(e[1]=s=>a.title=s),rules:t(V).title,variant:"underlined",label:t(n)("title"),class:"mt-6",required:""},null,8,["modelValue","rules","label"]),o(b,{modelValue:a.limit,"onUpdate:modelValue":e[2]||(e[2]=s=>a.limit=s),rules:t(V).limit,variant:"underlined",type:"number",label:t(n)("limit"),class:"mt-6",required:""},null,8,["modelValue","rules","label"]),o($,{color:"light-green-darken-4",type:"submit",class:"mt-7"},{default:p(()=>[M(v(t(n)("update"))+" ",1),o(q,{icon:t(E),class:"ml-3"},null,8,["icon"])]),_:1})]),_:1},8,["onSubmit"])])]),_:1}))}}),K={class:"title mb-7"},O={class:"text-h4 mt-4 ml-2"},P={class:"mt-10"},X={key:1,class:"text-h5 px-5"},se=h({__name:"categories",setup(y){D({title:"pageTitles.categories"});const{state:i,isLoading:u}=H(I,[]),c=a=>{i.value?i.value=[...i.value,a]:i.value=[a]},r=({id:a,title:_,limit:l})=>{var e;i.value=(e=i.value)==null?void 0:e.map(s=>s.id===a?{id:a,title:_,limit:l}:s)};return(a,_)=>{const l=L("app-loader");return m(),w("div",null,[d("div",K,[d("h3",O,v(t(n)("pageTitles.categories")),1)]),d("section",P,[t(u)?(m(),g(l,{key:0,page:""})):(m(),g(j,{key:1,class:"px-4"},{default:p(()=>{var e;return[o(W,{class:"pr-6",onCreated:c}),(e=t(i))!=null&&e.length?(m(),g(J,{key:0,categories:t(i),onUpdated:r,class:"pl-6"},null,8,["categories"])):(m(),w("div",X,"Категорий пока нет"))]}),_:1}))])])}}});export{se as default};