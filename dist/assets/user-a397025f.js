import{a as i,a7 as u,a8 as r,a9 as n,aa as o,O as c,ab as d}from"./index-906b0197.js";import{g as f}from"./auth-7a072a28.js";const b=async()=>{try{const{setInfo:a}=i(),s=await f();if(s)return u(r(n(o,"users"),s),t=>{var e;t.exists()&&Object.keys((e=t.data())==null?void 0:e.info).length&&a(t.data().info)})}catch(a){c(a)}},m=async a=>{try{const s=await f();await d(r(n(o,"users"),s),Object.assign({},...Object.keys(a).map(t=>({[`info.${t}`]:a[t]}))))}catch(s){c(s)}};export{b as f,m as u};
