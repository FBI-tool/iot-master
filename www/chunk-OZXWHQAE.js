import{c as Y,e as Z,f as ee,g as te,h as ne,i as ie,j as oe}from"./chunk-EXT7S62Z.js";import{Ba as j,Gb as J,Hb as Q,Pb as H,Rb as K,Tb as W,Ub as X,c as O,e as B,g as A,lb as R,nb as $,o as L,tb as q,vb as U,xb as G}from"./chunk-FZUU2ZSO.js";import{Ca as l,Da as f,Kb as D,La as d,Lb as F,Sa as u,Sb as w,Ta as o,Tb as M,Ua as i,Va as C,Za as g,a as S,b as P,ba as I,bb as s,db as m,ga as _,gb as T,ha as z,hb as p,hc as k,ib as x,ic as V,lb as y,qb as E,rb as N,yb as b}from"./chunk-Q2QJEMPV.js";function re(n,a){if(n&1){let r=g();o(0,"button",9),s("click",function(){_(r);let t=m();return z(t.refresh())}),C(1,"span",10),p(2," \u5237\u65B0 "),i()}}function ae(n,a){if(n&1){let r=g();o(0,"button",15),s("click",function(){_(r);let t=m(2);return z(t.search())}),p(1," \u641C\u7D22 "),i()}}function ce(n,a){if(n&1){let r=g();o(0,"div",11)(1,"nz-input-group",12)(2,"input",13),s("ngModelChange",function(t){_(r);let c=m();return z(c.value=t)}),i()(),u(3,ae,2,0,"ng-template",null,14,b),i()}if(n&2){let r=T(4),e=m();l(1),d("nzAddOnAfter",r),l(1),d("ngModel",e.value)}}function le(n,a){n&1&&(o(0,"div")(1,"button",17),C(2,"span",18),p(3," \u65B0\u5EFA "),i()())}function pe(n,a){if(n&1&&(o(0,"div"),u(1,le,4,0,"div",16),i()),n&2){let r=m();l(1),d("ngIf",!r.ref)}}function me(n,a){if(n&1&&(o(0,"a",22),C(1,"i",23),i()),n&2){let r=m(2).$implicit;d("routerLink",r.id+"/edit")}}function de(n,a){if(n&1){let r=g();o(0,"a",24),s("nzOnConfirm",function(){_(r);let t=m(2).$implicit,c=m();return z(c.delete(t.id))}),C(1,"i",25),i()}}function ue(n,a){n&1&&(o(0,"td")(1,"nz-space"),u(2,me,2,1,"a",20)(3,de,2,0,"a",21),i()())}function se(n,a){if(n&1){let r=g();o(0,"td")(1,"a",26),s("click",function(){_(r);let t=m().$implicit,c=m();return z(c.select(t))}),p(2,"\u9009\u62E9 "),i()()}}function _e(n,a){if(n&1&&(o(0,"tr")(1,"td")(2,"a",19),p(3),i()(),o(4,"td"),p(5),i(),o(6,"td"),p(7),i(),o(8,"td"),p(9),E(10,"date"),i(),u(11,ue,4,0,"td",16)(12,se,3,0,"td",16),i()),n&2){let r=a.$implicit,e=m();l(2),d("routerLink",r.id),l(1),x(r.id),l(2),x(r.name),l(2),x(r.version),l(2),x(N(10,7,r.created)),l(2),d("ngIf",!e.ref),l(1),d("ngIf",e.ref)}}var Me=(()=>{let a=class a{constructor(e,t,c,v,h){this.ms=e,this.route=t,this.rs=c,this.msg=v,this.ref=h,this.products=[],this.total=0,this.nzPageIndex=1,this.nzPageSize=10,this.value=""}ngOnInit(){this.load()}refresh(){this.nzPageIndex=1,this.load()}open(e){this.route.navigateByUrl("admin/product/"+e.id)}edit(e){this.route.navigateByUrl("admin/product/"+e.id+"/edit")}create(){}search(){let e;this.value?e={filter:{name:this.value}}:e={},this.rs.post("product/search",e).subscribe(t=>{this.products=t.data,this.total=t.total},t=>{console.log("err:",t)})}delete(e){this.rs.get(`product/${e}/delete`,{}).subscribe(t=>{this.msg.success("\u5220\u9664\u6210\u529F"),this.load()},t=>{console.log("err:",t)}),this.load()}nzPageSizeChange(e){this.nzPageSize=e,this.load()}nzPageIndexChange(e){this.nzPageIndex=e,this.load()}load(){let e;e={limit:this.nzPageSize,skip:(this.nzPageIndex-1)*this.nzPageSize},this.value&&(e=P(S({},e),{filter:{name:this.value}})),this.rs.post("product/search",e).subscribe(t=>{this.products=t.data,this.total=t.total},t=>{console.log("err:",t)})}select(e){this.ref&&this.ref.close(e)}};a.\u0275fac=function(t){return new(t||a)(f(Q),f(k),f(G),f(U),f(J,8))},a.\u0275cmp=I({type:a,selectors:[["app-product"]],standalone:!0,features:[y],decls:22,vars:6,consts:[[1,"toolbar"],["nz-button","","nzType","primary",3,"click",4,"nzSpaceItem"],["class","search",4,"nzSpaceItem"],[4,"nzSpaceItem"],[3,"nzData","nzFrontPagination"],["table",""],[4,"ngFor","ngForOf"],[1,"pages"],["nzShowSizeChanger","","nzShowQuickJumper","",3,"nzPageIndex","nzPageSize","nzTotal","nzPageIndexChange","nzPageSizeChange"],["nz-button","","nzType","primary",3,"click"],["nz-icon","","nzType","reload"],[1,"search"],["nzSearch","",3,"nzAddOnAfter"],["type","text","nz-input","","placeholder","\u8BF7\u8F93\u5165\u5173\u952E\u5B57",3,"ngModel","ngModelChange"],["suffixButton",""],["nz-button","","nzType","primary","nzSearch","",3,"click"],[4,"ngIf"],["nz-button","","nzType","primary","nzShape","round","routerLink","create"],["nz-icon","","nzType","plus"],[3,"routerLink"],["title","\u7F16\u8F91",3,"routerLink",4,"nzSpaceItem"],["title","\u5220\u9664","nz-popconfirm","","nzPopconfirmTitle","\u786E\u8BA4\u5220\u9664",3,"nzOnConfirm",4,"nzSpaceItem"],["title","\u7F16\u8F91",3,"routerLink"],["nz-icon","","nzType","edit"],["title","\u5220\u9664","nz-popconfirm","","nzPopconfirmTitle","\u786E\u8BA4\u5220\u9664",3,"nzOnConfirm"],["nz-icon","","nzType","delete"],["title","\u9009\u62E9",3,"click"]],template:function(t,c){t&1&&(o(0,"nz-space",0),u(1,re,3,0,"button",1)(2,ce,5,2,"div",2)(3,pe,2,1,"div",3),i(),o(4,"nz-table",4,5)(6,"thead")(7,"tr")(8,"th"),p(9,"ID"),i(),o(10,"th"),p(11,"\u540D\u79F0"),i(),o(12,"th"),p(13,"\u7248\u672C"),i(),o(14,"th"),p(15,"\u521B\u5EFA\u65F6\u95F4"),i(),o(16,"th"),p(17,"\u64CD\u4F5C"),i()()(),o(18,"tbody"),u(19,_e,13,9,"tr",6),i()(),o(20,"div",7)(21,"nz-pagination",8),s("nzPageIndexChange",function(h){return c.nzPageIndexChange(h)})("nzPageSizeChange",function(h){return c.nzPageSizeChange(h)}),i()()),t&2&&(l(4),d("nzData",c.products)("nzFrontPagination",!1),l(15),d("ngForOf",c.products),l(2),d("nzPageIndex",c.nzPageIndex)("nzPageSize",c.nzPageSize)("nzTotal",c.total))},dependencies:[M,D,F,w,oe,ee,Y,Z,ie,te,ne,L,O,B,A,j,H,q,R,$,X,V,W,K],styles:[".toolbar[_ngcontent-%COMP%]{padding:10px 0}.pages[_ngcontent-%COMP%]{padding:10px 0;display:flex;justify-content:center}"]});let n=a;return n})();export{Me as a};
