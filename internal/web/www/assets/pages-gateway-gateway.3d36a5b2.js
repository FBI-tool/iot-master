import{H as a,J as t,K as s,B as e,o as i,c as o,w as l,a as n,k as r,C as d,F as u,r as m,g as c,e as p,b as f}from"./index.945c150b.js";import{_ as h,a as k}from"./uni-fab.247e7e89.js";import{_ as b,a as _}from"./uni-list.e8258a94.js";import{r as j}from"./const.427faa2a.js";import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.a2708d34.js";var x=g({data:()=>({skip:0,datum:[]}),onPullDownRefresh(){this.skip=0},onReachBottom(){this.load()},onReady(){this.load()},methods:{load(){a({}),j({url:"gateway/list",data:{skip:this.skip},success:a=>{this.datum=a},complete(){t(),s()}})},create(){e({url:"./edit"})}}},[["render",function(a,t,s,e,j,g){const x=m(c("uni-search-bar"),h),C=m(c("uni-fab"),k),w=m(c("uni-list-item"),b),y=m(c("uni-list"),_),F=p;return i(),o(F,null,{default:l((()=>[n(x,{onConfirm:t[0]||(t[0]=()=>{}),onInput:t[1]||(t[1]=()=>{}),placeholder:"名称,ID"}),n(C,{onFabClick:g.create},null,8,["onFabClick"]),n(y,null,{default:l((()=>[(i(!0),r(u,null,d(j.datum,((a,t)=>(i(),o(w,{key:t,title:a.name,note:a.id,link:"",to:"./detail?id="+a.id,rightText:a.addr},{default:l((()=>[f("123")])),_:2},1032,["title","note","to","rightText"])))),128))])),_:1})])),_:1})}]]);export{x as default};
