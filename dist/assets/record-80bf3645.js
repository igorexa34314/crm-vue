import{ax as n,a9 as e,aa as r,ab as c,ay as i,az as u,aA as f,aB as h}from"./index-396d5d1a.js";import{g as o}from"./auth-9a94e179.js";const w=a=>new i(a.seconds,a.nanoseconds).toDate(),p=async a=>{try{const t=await o(),s=await u(e(r(),`users/${t}/records`));await f(s,{...a,date:i.now()})}catch(t){c(t)}},R=async()=>{try{const a=await o(),t=(await n(e(r(),`users/${a}/records`))).val()||{};return Object.keys(t).map(s=>({...t[s],date:w(t[s].date),id:s}))}catch(a){c(a)}},g=async a=>{try{const t=await o(),s=await h(e(r(),`users/${t}/records`),a),d=(await n(s)).val()||{};return{...d,date:w(d.date),id:a}}catch(t){c(t)}};export{g as a,p as c,R as f};