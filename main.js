/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function r(e,r,n){return(r=function(e){var r=function(e){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=t(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}var n={authorization:"82365ee2-2b03-4795-adca-78c4dec38143","Content-Type":"application/json"},o=function(t){return t.ok?t.json():Promise.reject("".concat("Что-то пошло не так:"," ").concat(t.status))},i=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch("".concat("https://nomoreparties.co/v1","/").concat("wff-cohort-22","/").concat(t),function(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({headers:n},i)).then(o)},a=function(t){return i(t)},c=function(t,e){return i(t,{method:"PATCH",body:JSON.stringify(e)})},u=function(t){return i(t,{method:"DELETE"})};var l="popup_is-opened",s="Escape",f="click",p="keydown",d=null;function y(t){t.classList.add(l),d=t,document.addEventListener(p,h),t.addEventListener(f,m)}function v(t){t.classList.remove(l),d=null,document.removeEventListener(p,h),t.removeEventListener(f,m)}function h(t){t.key===s&&d&&v(d)}function m(t){t.target.classList.contains(l)&&v(t.target)}function g(t,e){t.style.backgroundImage="url(".concat(e.avatar,")")}function b(t,e,r){t.textContent=r.name,e.textContent=r.about}function _(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none",o=e.querySelector(".".concat(t.name,"-input-error"));t.validity.patternMismatch?w(o,t.dataset.errorMessage,r):n?t.validity.valid?k(o,r):w(o,t.validationMessage,r):w(o,"Введите корректную ссылку на картинку.",r),S(e,r)}function w(t,e,r){t.textContent=e,t.classList.add(r.errorClass)}function S(t,e){var r=t.querySelector(e.submitButtonSelector),n=t.checkValidity();r.disabled=!n,r.classList.toggle(e.inactiveButton,!n)}function k(t,e){t.textContent="",t.classList.remove(e.errorClass)}function L(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(r){k(t.querySelector(".".concat(r.name,"-input-error")),e)})),S(t,e)}var E={cardElement:".places__item",cardTemplate:"#card-template",cardImage:".card__image",cardTitle:".card__title",deleteCardButton:".card__delete-button",likeCount:".card__like-count",likeCardButton:".card__like-button"},x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButton:"popup__button_disabled",inputErrorClass:"popup__input-error",errorClass:"popup__input-error_active"},C={avatar:document.forms["new-avatar"],profile:document.forms["edit-profile"],card:document.forms["new-place"]},O={avatar:{url:C.avatar.elements["avatar-link"]},profile:{name:C.profile.elements.name,description:C.profile.elements.description},card:{placeName:C.card.elements["place-name"],link:document.querySelector('input[name="link"]')}},j=document.querySelector(".places__list"),q=document.querySelector(".profile__image"),P=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),A=document.querySelector(".profile__edit-button"),I=document.querySelector(".profile__image-edit-button"),N=document.querySelector(".profile__add-button"),B=document.querySelector(".popup_type_edit"),D=document.querySelector(".popup_type_new-card"),G=document.querySelector(".popup_type_image"),U=document.querySelector(".popup_type_card-delete"),F=document.querySelector(".popup_type_new-avatar"),M=document.querySelectorAll(".popup__close");function J(t){"Tab"===t.key&&(document.body.classList.add("focus-visible"),window.removeEventListener("keydown",J))}function R(){document.body.classList.remove("focus-visible"),window.addEventListener("keydown",J)}function Y(t){return Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y(t)}function z(){z=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var i=e&&e.prototype instanceof m?e:m,a=Object.create(i.prototype),c=new q(n||[]);return o(a,"_invoke",{value:x(t,r,c)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var p="suspendedStart",d="suspendedYield",y="executing",v="completed",h={};function m(){}function g(){}function b(){}var _={};l(_,a,(function(){return this}));var w=Object.getPrototypeOf,S=w&&w(w(P([])));S&&S!==r&&n.call(S,a)&&(_=S);var k=b.prototype=m.prototype=Object.create(_);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var u=f(t[o],t,i);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==Y(s)&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(s).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function x(e,r,n){var o=p;return function(i,a){if(o===y)throw Error("Generator is already running");if(o===v){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=C(c,n);if(u){if(u===h)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var l=f(e,r,n);if("normal"===l.type){if(o=n.done?v:d,l.arg===h)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=v,n.method="throw",n.arg=l.arg)}}}function C(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,C(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),h;var i=f(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,h;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,h):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,h)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function q(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(Y(e)+" is not iterable")}return g.prototype=b,o(k,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:g,configurable:!0}),g.displayName=l(b,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,l(t,u,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},L(E.prototype),l(E.prototype,c,(function(){return this})),e.AsyncIterator=E,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new E(s(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(k),l(k,u,"Generator"),l(k,a,(function(){return this})),l(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,q.prototype={constructor:q,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(j),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),h}},e}function H(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function V(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function $(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){V(i,n,o,a,c,"next",t)}function c(t){V(i,n,o,a,c,"throw",t)}a(void 0)}))}}document.querySelector(".popup__image"),document.querySelector(".popup__caption"),function(){var t,e,r;function n(t){var e=t.querySelector(x.submitButtonSelector);r=e.textContent,e.textContent="Сохранение...",e.disabled=!0}function o(t){var e=t.querySelector(x.submitButtonSelector);e.textContent=r,e.disabled=!1}e=x,document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("input",(function(r){var n=r.target;n.matches(e.inputSelector)&&(_(n,t,e),S(t,e))})),S(t,e)})),function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach((function(t){return t.classList.add("popup_is-animated")}))}(F,G,B,D,U);var l=function(t){console.error("Ошибка:"+t)};function s(t,e){var r=e.querySelector(E.likeCardButton),n=e.querySelector(E.likeCount),o="card__like-button_is-active",a=function(t,e){r.classList.toggle(o,t),n.textContent=e};r.classList.contains(o)?function(t){return u("cards/likes/".concat(t))}(t).then((function(t){a(!1,t.likes.length)})).catch(l):function(t){return e="cards/likes/".concat(t),i(e,{method:"PUT"});var e}(t).then((function(t){a(!0,t.likes.length)})).catch(l)}var f=null,p=null;function d(t){return t.replace(/ё/g,"е").replace(/Ё/g,"Е")}function h(){return(h=$(z().mark((function t(e){var r,i,a;return z().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),n(F),r=O.avatar.url.value,!(i="true")){t.next=22;break}return t.prev=5,t.next=8,c("users/me/avatar",{avatar:r});case 8:a=t.sent,g(q,a),v(F),e.target.reset(),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(5),l(t.t0);case 17:return t.prev=17,o(F),t.finish(17);case 20:t.next=24;break;case 22:_(O.avatar.url,C.avatar,x,i),o(F);case 24:case"end":return t.stop()}}),t,null,[[5,14,17,20]])})))).apply(this,arguments)}function m(e,r){var n=function(t,e){var r=e.cardConfig,n=e.loggedInUserId,o=e.deleteCallback,i=e.likeCallback,a=e.imageClickCallback,c=function(t){return document.querySelector(t.cardTemplate).content.querySelector(t.cardElement).cloneNode(!0)}(r),u=c.querySelector(r.cardImage),l=c.querySelector(r.cardTitle),s=c.querySelector(r.deleteCardButton),f=c.querySelector(r.likeCardButton),p=c.querySelector(r.likeCount);return function(t,e,r){t.src=r.link,t.alt=r.name,e.textContent=r.name}(u,l,t),function(t,e){t.style.display=e?"block":"none"}(s,t.owner._id===n),function(t,e){t.textContent=e}(p,t.likes.length),function(t,e,r){var n=e.likes.some((function(t){return t._id===r}));t.classList.toggle("card__like-button_is-active",n)}(f,t,n),function(t,e,r,n,o,i){t.addEventListener("click",n),e.addEventListener("click",o),r.addEventListener("click",i)}(s,f,u,o,i,a),c}(e,{cardConfig:E,loggedInUserId:t,deleteCallback:function(){return t=e._id,f=t,p=n,void y(U);var t},likeCallback:function(){return s(e._id,n)},imageClickCallback:function(){return t=e.name,r=e.link,n=G.querySelector(".popup__image"),o=G.querySelector(".popup__caption"),n.src=r,n.alt=t,o.textContent=t,void y(G);var t,r,n,o}});j[r](n)}function w(){return(w=$(z().mark((function t(e,r){var a,c;return z().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),n(D),a=r(O.card.placeName.value),c=O.card.link.value,"true"?(u=a,s=c,f=void 0,f={name:u,link:s},i("cards",{method:"POST",body:JSON.stringify(f)})).then((function(t){m(t,"prepend"),v(D),e.target.reset()})).catch(l).finally((function(){o(D)})):(_(O.card.link,C.card,x,"true"),o(D));case 6:case"end":return t.stop()}var u,s,f}),t)})))).apply(this,arguments)}U.querySelector(x.submitButtonSelector).addEventListener("click",(function(){var t;f&&p&&(n(U),(t=f,u("cards/".concat(t))).then((function(){p.remove(),v(U)})).catch(l).finally((function(){o(U)})))})),I.addEventListener("click",(function(){C.avatar.reset(),L(C.avatar,x),y(F)})),A.addEventListener("click",(function(){O.profile.name.value=P.textContent,O.profile.description.value=T.textContent,L(C.profile,x),y(B)})),N.addEventListener("click",(function(){C.card.reset(),L(C.card,x),y(D)})),C.avatar.addEventListener("submit",(function(t){return h.apply(this,arguments)})),C.profile.addEventListener("submit",(function(t){!function(t,e){var r,i;t.preventDefault(),n(B),(r=e(O.profile.name.value),i=e(O.profile.description.value),c("users/me",{name:r,about:i})).then((function(e){b(P,T,e),v(B),t.target.reset()})).catch(l).finally((function(){o(B)}))}(t,d)})),C.card.addEventListener("submit",(function(t){!function(t,e){w.apply(this,arguments)}(t,d)})),M.forEach((function(t){t.addEventListener("click",(function(){v(document.querySelector(".popup_is-opened"))}))})),Promise.all([a("users/me"),a("cards")]).then((function(e){var r,n,o=(n=2,function(t){if(Array.isArray(t))return t}(r=e)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(r,n)||function(t,e){if(t){if("string"==typeof t)return H(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?H(t,e):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1];t=i._id,g(q,i),b(P,T,i),a.forEach((function(t){(function(t){var e,r,n=t.name,o=t.link;return!(!n||!o)&&!!function(t){try{return new URL(t),!0}catch(t){return!1}}(o)&&(e=new URL(o).pathname,r=e.split(".").pop().toLowerCase(),["jpg","jpeg","png","gif","webp"].includes(r))})(t)&&m(t,"append")}))})).catch(l),window.addEventListener("keydown",J),window.addEventListener("mousedown",R)}()})();