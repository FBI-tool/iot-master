import{H as a,J as s,K as t,B as e,o as i,c as o,w as l,a as n,k as r,C as u,F as d,r as m,g as c,e as p,b as f}from"./index.945c150b.js";import{_ as h,a as k}from"./uni-fab.247e7e89.js";import{_ as b,a as _}from"./uni-list.e8258a94.js";import{r as j}from"./const.427faa2a.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.a2708d34.js";var C=x({data:()=>({skip:0,datum:[]}),onPullDownRefresh(){this.skip=0},onReachBottom(){this.load()},onReady(){this.load()},methods:{load(){a({}),j({url:"device/list",data:{skip:this.skip},success:a=>{this.datum=a},complete(){s(),t()}})},create(){e({url:"./edit"})}}},[["render",function(a,s,t,e,j,x){const C=m(c("uni-search-bar"),h),g=m(c("uni-fab"),k),v=m(c("uni-list-item"),b),F=m(c("uni-list"),_),R=p;return i(),o(R,null,{default:l((()=>[n(C,{onConfirm:s[0]||(s[0]=()=>{}),onInput:s[1]||(s[1]=()=>{}),placeholder:"名称,ID"}),n(g,{onFabClick:x.create},null,8,["onFabClick"]),n(F,null,{default:l((()=>[(i(!0),r(d,null,u(j.datum,((a,s)=>(i(),o(v,{key:s,title:a.name,note:a.id,link:"",to:"./detail?id="+a.id,rightText:"在线"},{default:l((()=>[f("123")])),_:2},1032,["title","note","to"])))),128))])),_:1})])),_:1})}]]);export{C as default};
