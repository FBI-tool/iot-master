import{c as Y,e as Z,f as ee,g as te,h as ne,i as ie,j as ae}from"./chunk-EXT7S62Z.js";import{Ba as R,Gb as H,Pb as K,Rb as U,Tb as W,Ub as X,c as O,e as B,g as A,lb as j,nb as $,o as L,tb as q,vb as J,xb as Q}from"./chunk-FZUU2ZSO.js";import{Ca as l,Da as C,Kb as F,La as s,Lb as N,Sa as d,Sb as D,Ta as o,Tb as V,Ua as a,Va as f,Wa as I,Xa as T,Za as g,a as S,b as w,ba as E,bb as z,db as p,ga as u,gb as h,ha as _,hb as m,hc as k,ib as x,ic as M,lb as P,qb as b,rb as G,yb as v}from"./chunk-Q2QJEMPV.js";function oe(e,r){if(e&1){let t=g();o(0,"button",10),z("click",function(){u(t);let n=p();return _(n.refresh())}),f(1,"span",11),m(2," \u5237\u65B0 "),a()}}function re(e,r){if(e&1){let t=g();o(0,"button",16),z("click",function(){u(t);let n=p(2);return _(n.search())}),m(1,"\u641C\u7D22"),a()}}function le(e,r){if(e&1){let t=g();o(0,"div",12)(1,"nz-input-group",13)(2,"input",14),z("ngModelChange",function(n){u(t);let c=p();return _(c.value=n)}),a()(),d(3,re,2,0,"ng-template",null,15,v),a()}if(e&2){let t=h(4),i=p();l(1),s("nzAddOnAfter",t),l(1),s("ngModel",i.value)}}function me(e,r){e&1&&(o(0,"div")(1,"button",17),f(2,"span",18),m(3," \u65B0\u5EFA "),a()())}function ce(e,r){if(e&1&&(o(0,"div"),d(1,me,4,0,"div",5),a()),e&2){let t=p();l(1),s("ngIf",!t.ref)}}function pe(e,r){e&1&&f(0,"div")}function se(e,r){if(e&1&&(o(0,"a",25),f(1,"i",26),a()),e&2){let t=p(2).$implicit;s("routerLink",t.id+"/edit")}}function de(e,r){if(e&1){let t=g();o(0,"a",27),z("nzOnConfirm",function(){u(t);let n=p(2).$implicit,c=p();return _(c.delete(n.id))}),f(1,"i",28),a()}}function ue(e,r){e&1&&(I(0),o(1,"nz-space"),d(2,se,2,1,"a",23)(3,de,2,0,"a",24),a(),T())}function _e(e,r){if(e&1){let t=g();o(0,"a",29),z("click",function(){u(t);let n=p().$implicit,c=p();return _(c.select(n.id))}),m(1,"\u9009\u62E9 "),a()}}function fe(e,r){if(e&1&&(o(0,"tr")(1,"td")(2,"a",19),m(3),a()(),o(4,"td"),m(5),a(),o(6,"td"),m(7),a(),o(8,"td"),m(9),a(),o(10,"td",20),m(11),b(12,"date"),a(),o(13,"td"),d(14,ue,4,0,"ng-container",21)(15,_e,2,0,"ng-template",null,22,v),a()()),e&2){let t=r.$implicit,i=h(16),n=p();l(2),s("routerLink",t.id),l(1),x(t.id),l(2),x(t.name),l(2),x(t.username),l(2),x(t.password),l(1),s("title",t.online),l(1),x(G(12,9,t.online)),l(3),s("ngIf",!n.ref)("ngIfElse",i)}}function ge(e,r){if(e&1){let t=g();o(0,"div",30)(1,"nz-pagination",31),z("nzPageIndexChange",function(n){u(t);let c=p();return _(c.nzPageIndexChange(n))})("nzPageSizeChange",function(n){u(t);let c=p();return _(c.nzPageSizeChange(n))}),a()()}if(e&2){let t=p();l(1),s("nzPageIndex",t.nzPageIndex)("nzPageSize",t.nzPageSize)("nzTotal",t.total)}}var ke=(()=>{let r=class r{constructor(i,n,c,y){this.ref=i,this.route=n,this.rs=c,this.msg=y,this.chooseGateway=!1,this.total=0,this.nzPageIndex=1,this.nzPageSize=10,this.value="",this.gateways=[]}ngOnInit(){this.load()}refresh(){this.nzPageIndex=1,this.load()}select(i){this.ref&&this.ref.close(i)}search(){console.log(this.value),this.load()}delete(i){this.rs.get(`gateway/${i}/delete`,{}).subscribe(n=>{this.msg.success("\u5220\u9664\u6210\u529F"),this.load()},n=>{console.log("err:",n)}),this.load()}nzPageSizeChange(i){this.nzPageSize=i,this.load()}nzPageIndexChange(i){this.nzPageIndex=i,this.load()}load(){let i;i={limit:this.nzPageSize,skip:(this.nzPageIndex-1)*this.nzPageSize},this.value&&(i=w(S({},i),{keyword:{username:this.value}})),this.ref&&(i.limit=9999),this.rs.post("gateway/search",i).subscribe(n=>{this.gateways=n.data,this.total=n.total},n=>{console.log("err:",n)})}};r.\u0275fac=function(n){return new(n||r)(C(H,8),C(k),C(Q),C(J))},r.\u0275cmp=E({type:r,selectors:[["app-gateway"]],inputs:{chooseGateway:"chooseGateway"},standalone:!0,features:[P],decls:26,vars:5,consts:[[1,"toolbar"],["nz-button","","nzType","primary",3,"click",4,"nzSpaceItem"],["class","search",4,"nzSpaceItem"],[4,"nzSpaceItem"],[1,"fill"],[4,"ngIf"],[3,"nzData","nzFrontPagination"],["table",""],[4,"ngFor","ngForOf"],["class","pages",4,"ngIf"],["nz-button","","nzType","primary",3,"click"],["nz-icon","","nzType","reload"],[1,"search"],["nzSearch","",3,"nzAddOnAfter"],["type","text","nz-input","","placeholder","\u8BF7\u8F93\u5165\u5173\u952E\u5B57",3,"ngModel","ngModelChange"],["suffixButton",""],["nz-button","","nzType","primary","nzSearch","",3,"click"],["nz-button","","nzType","primary","nzShape","round","routerLink","create"],["nz-icon","","nzType","plus"],[3,"routerLink"],[3,"title"],[4,"ngIf","ngIfElse"],["elseTemplate",""],["title","\u7F16\u8F91",3,"routerLink",4,"nzSpaceItem"],["title","\u5220\u9664","nz-popconfirm","","nzPopconfirmTitle","\u786E\u8BA4\u89E3\u7ED1",3,"nzOnConfirm",4,"nzSpaceItem"],["title","\u7F16\u8F91",3,"routerLink"],["nz-icon","","nzType","edit"],["title","\u5220\u9664","nz-popconfirm","","nzPopconfirmTitle","\u786E\u8BA4\u89E3\u7ED1",3,"nzOnConfirm"],["nz-icon","","nzType","delete"],["title","\u9009\u62E9",3,"click"],[1,"pages"],["nzShowSizeChanger","","nzShowQuickJumper","",3,"nzPageIndex","nzPageSize","nzTotal","nzPageIndexChange","nzPageSizeChange"]],template:function(n,c){if(n&1&&(o(0,"div",0)(1,"nz-space"),d(2,oe,3,0,"button",1)(3,le,5,2,"div",2)(4,ce,2,1,"div",3),a(),f(5,"div",4),d(6,pe,1,0,"div",5),a(),o(7,"nz-table",6,7)(9,"thead")(10,"tr")(11,"th"),m(12,"ID"),a(),o(13,"th"),m(14,"\u540D\u79F0"),a(),o(15,"th"),m(16,"\u7528\u6237\u540D"),a(),o(17,"th"),m(18,"\u5BC6\u7801"),a(),o(19,"th"),m(20,"\u4E0A\u7EBF\u65F6\u95F4"),a(),o(21,"th"),m(22,"\u64CD\u4F5C"),a()()(),o(23,"tbody"),d(24,fe,17,11,"tr",8),a()(),d(25,ge,2,3,"div",9)),n&2){let y=h(8);l(6),s("ngIf",!c.ref),l(1),s("nzData",c.gateways)("nzFrontPagination",!1),l(17),s("ngForOf",y.data),l(1),s("ngIf",!c.ref)}},dependencies:[V,F,N,D,L,O,B,A,X,q,R,j,$,M,K,W,ae,ee,Y,Z,ie,te,ne,U],styles:[".toolbar[_ngcontent-%COMP%]{padding:10px 0;display:flex}.toolbar[_ngcontent-%COMP%]   .fill[_ngcontent-%COMP%]{flex:1}.pages[_ngcontent-%COMP%]{padding:10px 0;display:flex;justify-content:center}"]});let e=r;return e})();export{ke as a};
