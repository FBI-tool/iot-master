import{H as a,J as s,K as t,B as i,o as e,c as o,w as l,a as n,k as r,C as u,F as d,r as m,g as c,e as p}from"./index.945c150b.js";import{_ as f,a as h}from"./uni-fab.247e7e89.js";import{_ as k,a as j}from"./uni-list.e8258a94.js";import{r as b}from"./const.427faa2a.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.a2708d34.js";var C=_({data:()=>({skip:0,datum:[]}),onPullDownRefresh(){this.skip=0},onReachBottom(){this.load()},onReady(){this.load()},methods:{load(){a({}),b({url:"project/list",data:{skip:this.skip},success:a=>{this.datum=a},complete(){s(),t()}})},create(){i({url:"./edit"})}}},[["render",function(a,s,t,i,b,_){const C=m(c("uni-search-bar"),f),x=m(c("uni-fab"),h),F=m(c("uni-list-item"),k),R=m(c("uni-list"),j),g=p;return e(),o(g,null,{default:l((()=>[n(C,{onConfirm:s[0]||(s[0]=()=>{}),onInput:s[1]||(s[1]=()=>{}),placeholder:"名称,ID"}),n(x,{onFabClick:_.create},null,8,["onFabClick"]),n(R,null,{default:l((()=>[(e(!0),r(d,null,u(b.datum,((a,s)=>(e(),o(F,{key:s,title:a.name,link:"",to:"./detail?id="+a.id},null,8,["title","to"])))),128))])),_:1})])),_:1})}]]);export{C as default};
