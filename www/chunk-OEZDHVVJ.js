import{g as q,h as H}from"./chunk-IT2U3YUS.js";import{Tb as I,Ub as A,Vb as E,c as P,e as j,g as W,lb as G,nb as R,o as B,pb as b,qb as y,rb as T,tb as v,ub as M,vb as $}from"./chunk-FZUU2ZSO.js";import{Ca as m,Da as D,Ga as f,La as c,Lb as U,Sa as d,Ta as r,Tb as L,Ua as p,Va as S,Wa as g,Xa as x,Za as _,ba as C,bb as z,db as a,ga as s,gb as V,ha as u,hb as h,jb as F,lb as w,mb as k,va as N,yb as O}from"./chunk-Q2QJEMPV.js";var Z=()=>({standalone:!0});function tt(t,e){if(t&1){let i=_();r(0,"nz-input-group",3)(1,"input",4),z("ngModelChange",function(n){s(i);let l=a();return u(l.text=n)}),p()()}if(t&2){let i=a(),o=V(3);c("nzAddOnAfter",o),m(1),c("placeholder",i.placeholder)("ngModel",i.text)("ngModelOptions",k(4,Z))}}function et(t,e){if(t&1){let i=_();r(0,"button",5),z("click",function(){s(i);let n=a();return u(n.onSearch.emit(n.text))}),h(1),p()}if(t&2){let i=a();m(1),F(" ",i.searchText," ")}}function nt(t,e){if(t&1){let i=_();r(0,"button",6),z("click",function(){s(i);let n=a();return u(n.handleClear())}),h(1," \u6E05\u7A7A\u641C\u7D22\u6761\u4EF6 "),p()}}var St=(()=>{let e=class e{constructor(){this.searchText="\u641C\u7D22",this.placeholder="\u5173\u952E\u5B57",this.onSearch=new f,this.text=""}handleClear(){this.text="",this.onSearch.emit("")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=C({type:e,selectors:[["app-search-form"]],inputs:{searchText:"searchText",placeholder:"placeholder"},outputs:{onSearch:"onSearch"},standalone:!0,features:[w],decls:5,vars:0,consts:[["nzSize","large","nzSearch","",3,"nzAddOnAfter",4,"nzSpaceItem"],["suffixButton",""],["nzSize","large","nz-button","","nzType","default",3,"click",4,"nzSpaceItem"],["nzSize","large","nzSearch","",3,"nzAddOnAfter"],["type","text","nz-input","",3,"placeholder","ngModel","ngModelOptions","ngModelChange"],["nz-button","","nzType","primary","nzSearch","",3,"click"],["nzSize","large","nz-button","","nzType","default",3,"click"]],template:function(n,l){n&1&&(r(0,"nz-space"),d(1,tt,2,5,"nz-input-group",0)(2,et,2,1,"ng-template",null,1,O)(4,nt,2,0,"button",2),p())},dependencies:[E,A,I,b,G,R,B,P,j,W,M,v,y,T],styles:["[_nghost-%COMP%]{margin-right:8px}"]});let t=e;return t})();function it(t,e){if(t&1){let i=_();r(0,"button",2),z("click",function(){s(i);let n=a(2);return u(n.add.emit())}),S(1,"i",3),h(2," \u65B0\u589E "),p()}}function ot(t,e){t&1&&(g(0),d(1,it,3,0,"button",1),x())}function rt(t,e){if(t&1&&(r(0,"button",5),S(1,"span",6),r(2,"a",7),h(3,"\u5BFC\u51FA"),p()()),t&2){let i=a(2);m(2),c("href",i.downloadApi,N)}}function at(t,e){t&1&&(g(0),d(1,rt,4,1,"button",4),x())}function pt(t,e){if(t&1){let i=_();r(0,"nz-upload",9),z("nzChange",function(n){s(i);let l=a(2);return u(l.handleUpload(n))}),r(1,"button",10),S(2,"span",11),h(3," \u5BFC\u5165 "),p()()}if(t&2){let i=a(2);c("nzAction",i.uploadApi)("nzShowUploadList",!1)}}function ct(t,e){t&1&&(g(0),d(1,pt,4,2,"nz-upload",8),x())}function lt(t,e){if(t&1){let i=_();r(0,"button",13),z("click",function(){s(i);let n=a(2);return u(n.batchDel.emit())}),h(1," \u6279\u91CF\u5220\u9664 "),p()}}function mt(t,e){t&1&&(g(0),d(1,lt,2,0,"button",12),x())}var kt=(()=>{let e=class e{constructor(o){this.msg=o,this.uploadApi="",this.downloadApi="",this.showAddBtn=!0,this.showExportBtn=!0,this.showImportBtn=!0,this.showDelBtn=!0,this.onLoad=new f,this.add=new f,this.batchDel=new f}handleUpload(o){if(o.type==="error"){this.msg.error("\u4E0A\u4F20\u5931\u8D25");return}if(o.file&&o.file.response){let n=o.file.response;n.error?this.msg.error(`${n.error}`):(this.msg.success("\u5BFC\u5165\u6210\u529F!"),this.onLoad.emit())}}};e.\u0275fac=function(n){return new(n||e)(D($))},e.\u0275cmp=C({type:e,selectors:[["app-batch-btn"]],inputs:{uploadApi:"uploadApi",downloadApi:"downloadApi",showAddBtn:"showAddBtn",showExportBtn:"showExportBtn",showImportBtn:"showImportBtn",showDelBtn:"showDelBtn"},outputs:{onLoad:"onLoad",add:"add",batchDel:"batchDel"},standalone:!0,features:[w],decls:5,vars:4,consts:[[4,"ngIf"],["nzSize","large","nz-button","","nzType","primary",3,"click",4,"nzSpaceItem"],["nzSize","large","nz-button","","nzType","primary",3,"click"],["nz-icon","","nzType","plus"],["nzSize","large","nz-button","","nzType","primary","class","btn",4,"nzSpaceItem"],["nzSize","large","nz-button","","nzType","primary",1,"btn"],["nz-icon","","nzType","cloud-download","nzTheme","outline"],["download","filename","styl","",3,"href"],["nzSize","large",3,"nzAction","nzShowUploadList","nzChange",4,"nzSpaceItem"],["nzSize","large",3,"nzAction","nzShowUploadList","nzChange"],["nz-button","","nzSize","large","nzType","primary"],["nz-icon","","nzType","cloud-upload"],["nzSize","large","nz-button","","nzType","primary","nzDanger","",3,"click",4,"nzSpaceItem"],["nzSize","large","nz-button","","nzType","primary","nzDanger","",3,"click"]],template:function(n,l){n&1&&(r(0,"nz-space"),d(1,ot,2,0,"ng-container",0)(2,at,2,0,"ng-container",0)(3,ct,2,0,"ng-container",0)(4,mt,2,0,"ng-container",0),p()),n&2&&(m(1),c("ngIf",l.showAddBtn),m(1),c("ngIf",l.showExportBtn),m(1),c("ngIf",l.showImportBtn),m(1),c("ngIf",l.showDelBtn))},dependencies:[L,U,E,A,I,b,B,M,v,y,T,H,q],styles:[".btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:82px;height:40px;border-radius:3px}.btn[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;margin-left:5px;font-size:14px}"]});let t=e;return t})();export{kt as a,St as b};
