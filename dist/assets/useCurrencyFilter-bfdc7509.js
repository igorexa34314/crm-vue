import{aw as y,a7 as c,a8 as o,ay as f,az as w,aA as g,a9 as l,a5 as h,P as v,a as C,c as p}from"./index-0f7889a6.js";import{g as n,e as i}from"./auth-e8c2f44c.js";const $=async()=>{try{const a=await n(),t=(await y(c(o(),`users/${a}/categories`))).val()||{};return Object.keys(t).map(e=>({...t[e],id:e}))}catch(a){i(a)}},j=async({title:a,limit:t})=>{try{const e=await n(),s=await f(c(o(),`users/${e}/categories`));return await w(s,{title:a,limit:t}),{title:a,limit:t,id:s.key}}catch(e){i(e)}},m=async(a,{title:t,limit:e})=>{try{const s=await n(),r=await g(c(o(),`users/${s}/categories`),a);await l(r,{title:t,limit:e})}catch(s){i(s)}},I=async a=>{try{const t=await n(),e=await g(c(o(),`users/${t}/categories`),a);return{...(await y(e)).val()||{},id:a}}catch(t){i(t)}},R=()=>{const{currency:a}=h(v),t=C();return{currencyFilter:p(()=>(s,r,d="direct")=>{var u;return r||(r=((u=t.info)==null?void 0:u.currency)||"USD"),a.value&&Object.keys(a.value).length?+(d==="direct"?s*a.value.rates[r]:s/a.value.rates[r]).toFixed(2):s})}};export{m as a,I as b,j as c,$ as f,R as u};
