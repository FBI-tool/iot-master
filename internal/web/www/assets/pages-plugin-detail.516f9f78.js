import{_ as t,a}from"./uni-list.e8258a94.js";import{o as e,c as i,w as l,a as s,r,g as d,e as n}from"./index.945c150b.js";import{_ as o}from"./uni-card.2a70e0c0.js";import{r as u}from"./const.427faa2a.js";import{_ as m}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.a2708d34.js";var c=m({data:()=>({data:{}}),onLoad(t){this.id=t.id,this.load()},methods:{load(){u({url:"plugin/"+this.id,success:t=>{this.data=t}})}}},[["render",function(u,m,c,p,g,f){const h=r(d("uni-list-item"),t),x=r(d("uni-list"),a),_=r(d("uni-card"),o),j=n;return e(),i(j,null,{default:l((()=>[s(_,{title:g.data.name},{default:l((()=>[s(x,{border:!1},{default:l((()=>[s(h,{title:"账号",rightText:g.data.username},null,8,["rightText"]),s(h,{title:"密码",rightText:g.data.password},null,8,["rightText"]),s(h,{title:"创建时间",rightText:g.data.created},null,8,["rightText"])])),_:1})])),_:1},8,["title"]),s(x,null,{default:l((()=>[s(h,{title:"通道",link:"",to:"/pages/tunnel/tunnel?gateway="+u.id},null,8,["to"]),s(h,{title:"服务器",link:"",to:"/pages/server/server?gateway="+u.id},null,8,["to"]),s(h,{title:"编辑",link:"",to:"./edit?id="+u.id},null,8,["to"]),s(h,{title:"配置文件",link:"",disabled:""})])),_:1})])),_:1})}]]);export{c as default};
