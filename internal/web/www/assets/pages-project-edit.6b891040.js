import{v as a,H as e,N as t,J as s,o as d,c as i,w as l,a as o,b as r,r as n,g as u,h as m,e as c}from"./index.945c150b.js";import{_ as p,a as f,b as h}from"./uni-forms.82256a5d.js";import{r as _}from"./const.427faa2a.js";import{_ as j}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.a2708d34.js";var v=j({data:()=>({id:"",data:{name:"",interface_id:""}}),onLoad(a){this.id=a.id,this.id&&this.load()},methods:{load(){_({url:"project/"+this.id,success:a=>{this.data=a}})},save(){a("log","at pages/project/edit.vue:44",this.id),e({}),_({url:"project/"+(this.id||"create"),method:"POST",data:this.data,success(){t()},complete(){s()}})}}},[["render",function(a,e,t,s,_,j){const v=n(u("uni-easyinput"),p),V=n(u("uni-forms-item"),f),b=n(u("uni-forms"),h),g=m,x=c;return d(),i(x,{class:"p10"},{default:l((()=>[o(b,null,{default:l((()=>[o(V,{label:"名称",name:"name"},{default:l((()=>[o(v,{modelValue:_.data.name,"onUpdate:modelValue":e[0]||(e[0]=a=>_.data.name=a),placeholder:""},null,8,["modelValue"])])),_:1}),o(V,{label:"组态",name:"interface_id"},{default:l((()=>[o(v,{modelValue:_.data.interface_id,"onUpdate:modelValue":e[1]||(e[1]=a=>_.data.interface_id=a),placeholder:"选择"},null,8,["modelValue"])])),_:1}),r(" TODO：编辑项目的设备 ")])),_:1}),o(g,{type:"primary",onClick:j.save},{default:l((()=>[r("保存")])),_:1},8,["onClick"])])),_:1})}]]);export{v as default};
