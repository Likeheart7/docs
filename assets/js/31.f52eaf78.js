(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{319:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));n(127);var r=n(0);function i(){const t=Object(r.d)();if(!t)throw new Error("must be called in setup");return(null==t?void 0:t.proxy)||{}}function s(){const t=Object(r.h)(!1);return Object(r.e)(()=>{t.value=!0}),Object(r.f)(()=>{t.value=!1,setTimeout(()=>{t.value=!0},100)}),{recoShowModule:t}}},320:function(t,e,n){"use strict";n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return b}));var r=n(322),i=n.n(r),s=(n(321),n(0)),o=n(1),a=function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o};const l=/^(\w+)\-/,c=s.b.extend({props:{icon:{type:String,default:""},link:{type:String,default:""}}});let u=class extends c{getClass(t){return l.test(t)?t.replace(l,(...t)=>"reco"===t[1]?"iconfont "+t[0]:`${t[1]} ${t[0]}`):t}go(t){""!==t&&window.open(t)}render(){return(0,arguments[0])("i",i()([{},{class:this.getClass(this.icon),on:{click:this.go.bind(this,this.link)}}]),[this.$slots.default])}};u=a([o.b],u);var f=u,p=function(t,e,n,r){var i,s=arguments.length,o=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(s<3?i(o):s>3?i(e,n,o):i(e,n))||o);return s>3&&o&&Object.defineProperty(e,n,o),o};const d=s.b.extend({props:{delay:{type:String,default:"0"},duration:{type:String,default:".25"},transform:{type:Array,default:()=>["translateY(-20px)","translateY(0)"]}}});let y=class extends d{setStyle(t){t.style.transition=`transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`,t.style.transform=this.transform[0],t.style.opacity=0}unsetStyle(t){t.style.transform=this.transform[1],t.style.opacity=1}render(){return(0,arguments[0])("transition",{attrs:{name:"module"},on:{enter:this.setStyle,appear:this.setStyle,"before-leave":this.setStyle,"after-appear":this.unsetStyle,"after-enter":this.unsetStyle}},[this.$slots.default])}};y=p([o.b],y);var b=y},321:function(t,e,n){"use strict";var r=n(21),i=n(4),s=n(323);r({global:!0},{Reflect:{}}),s(i.Reflect,"Reflect",!0)},322:function(t,e,n){"use strict";function r(){return(r=Object.assign?Object.assign.bind():function(t){for(var e,n=1;n<arguments.length;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)}var i=["attrs","props","domProps"],s=["class","style","directives"],o=["on","nativeOn"],a=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=function(t){return t.reduce((function(t,e){for(var n in e)if(t[n])if(-1!==i.indexOf(n))t[n]=r({},t[n],e[n]);else if(-1!==s.indexOf(n)){var l=t[n]instanceof Array?t[n]:[t[n]],c=e[n]instanceof Array?e[n]:[e[n]];t[n]=[].concat(l,c)}else if(-1!==o.indexOf(n))for(var u in e[n])if(t[n][u]){var f=t[n][u]instanceof Array?t[n][u]:[t[n][u]],p=e[n][u]instanceof Array?e[n][u]:[e[n][u]];t[n][u]=[].concat(f,p)}else t[n][u]=e[n][u];else if("hook"===n)for(var d in e[n])t[n][d]=t[n][d]?a(t[n][d],e[n][d]):e[n][d];else t[n]=e[n];else t[n]=e[n];return t}),{})}},323:function(t,e,n){"use strict";var r=n(18).f,i=n(13),s=n(26)("toStringTag");t.exports=function(t,e,n){t&&!n&&(t=t.prototype),t&&!i(t,s)&&r(t,s,{configurable:!0,value:e})}},331:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n(17),s=n(320),o=n(319),a=Object(r.c)({components:{RecoIcon:s.b},props:{item:{required:!0}},setup(t,e){const n=Object(o.a)(),{item:s}=Object(r.i)(t),a=Object(r.a)(()=>Object(i.d)(s.value.link)),l=Object(r.a)(()=>n.$site.locales?Object.keys(n.$site.locales).some(t=>t===a.value):"/"===a.value);return{link:a,exact:l,isExternal:i.f,isMailto:i.g,isTel:i.h}}}),l=n(2),c=Object(l.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return t.isExternal(t.link)?e("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.isMailto(t.link)||t.isTel(t.link)?null:"_blank",rel:t.isMailto(t.link)||t.isTel(t.link)?null:"noopener noreferrer"}},[e("reco-icon",{attrs:{icon:""+t.item.icon}}),t._v("\n  "+t._s(t.item.text)+"\n  "),e("OutboundLink")],1):e("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact}},[e("reco-icon",{attrs:{icon:""+t.item.icon}}),t._v("\n  "+t._s(t.item.text)+"\n")],1)}),[],!1,null,null,null);e.default=c.exports}}]);