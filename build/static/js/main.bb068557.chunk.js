(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),l=t(13),r=t.n(l),c=(t(19),t(2)),u=t(3),i=t.n(u),s="/api/persons",d=function(e,n,t){console.log("getAll called"),i.a.get(s).then(function(t){console.log("promise fullfilled"),""===e&&(console.log("empty persons"),n(t.data))}).catch(function(e){console.log(e),t("get all failed")})},f=function(e,n,t,a,o,l){var r="success "+e.name+" added";i.a.post(s,e).then(function(e){var c=n.concat(e.data);t(c),a(""),o(""),l(r)}).catch(function(e){console.log(e),l("add failed")})},m=function(e,n,t,a){var o=function(){var o=n.filter(function(n){return n.id!==e.id});t(o),setTimeout(function(){a(null)},5e3)};i.a.delete(s+"/"+e.id).then(function(e){console.log(e),o()}).catch(function(n){console.log(n),a(e.name+" is already deleted"),o()})},h=function(e,n,t,a,o,l){var r=n.filter(function(n){return n.name===e.name}),c=r[0],u=n.filter(function(e){return e.id!==r[0].id});u=u.concat(c),console.log(e,"-----"),console.log(c),t(u),a(""),o(""),i.a.put(s+"/"+c.id,c).then(function(e){console.log(e),l("success "+r[0].name+" updated")}).catch(function(e){console.log(e),l("update failed")})},g=function(e){return null===e.error?null:"string"===typeof e.error&&e.error.includes("success")?o.a.createElement("li",{className:"success"},e.error):o.a.createElement("li",{className:"error"},"'person all ready deleted'")},p=function(e){var n=e.persons,t=e.filter.toLowerCase();if(Array.isArray(n)){console.log(n),console.log(typeof n[0].name);var a=n.filter(function(e){return e.name.toLowerCase().includes(t)});return a.map(function(n){return o.a.createElement("li",{key:n.id},n.name," ",n.phonenumber," ",o.a.createElement("button",{id:n.id,onClick:e.onClick},"delete"))})}return""},b=function(e){return o.a.createElement(o.a.Fragment,null,"filter showen with: ",o.a.createElement("input",{value:e.filterName,onChange:e.handleFilterChange}))},v=function(e){return o.a.createElement("form",{onSubmit:e.addName},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.newName,onChange:e.handlePersonChange}),o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:e.newPhone,onChange:e.handlePhoneChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(){var e=Object(a.useState)(""),n=Object(c.a)(e,2),t=n[0],l=n[1],r=Object(a.useState)(""),u=Object(c.a)(r,2),i=u[0],s=u[1],E=Object(a.useState)(""),w=Object(c.a)(E,2),C=w[0],y=w[1],j=Object(a.useState)(""),N=Object(c.a)(j,2),O=N[0],k=N[1],A=Object(a.useState)(null),P=Object(c.a)(A,2),S=P[0],F=P[1];Object(a.useEffect)(function(){console.log("effect called"),d(t,l,F)},[t]);return o.a.createElement("div",{className:"App"},o.a.createElement(g,{error:S}),o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{filterName:O,handleFilterChange:function(e){k(e.target.value)}}),o.a.createElement("h2",null,"Add a new "),o.a.createElement(v,{addName:function(e){console.log("add Name Called "),e.preventDefault();var n={name:C,id:Math.floor(4e9*Math.random()),phonenumber:i};console.log(n);var a=t.findIndex(function(e){return e.name===n.name});if(console.log(a),a>=0){var o="".concat(C," update phone number?");window.confirm(o)&&h(n,t,l,y,s,F)}else f(n,t,l,y,s,F)},newName:C,newPhone:i,handlePersonChange:function(e){y(e.target.value)},handlePhoneChange:function(e){s(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(p,{persons:t,filter:O,onClick:function(e){var n=e.target.id;if(console.log(n,"  ",typeof n),window.confirm("do you want to delete")&&Array.isArray(t)){var a=t.filter(function(e){return e.id===n});console.log("delete",a),m(a[0],t,l,F)}}}))};r.a.render(o.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.bb068557.chunk.js.map