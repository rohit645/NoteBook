(this.webpackJsonppart2c=this.webpackJsonppart2c||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),u=n(15),l=n(3),s=n.n(l),i=n(2),m=n(4),f=n.n(m),p=function(){console.log("Just now sent a GET request to server");var e=f.a.get("/api/notes");return console.log("fetching data from server"),e.then((function(e){return e.data}))},d=function(e){return console.log("creating new object in server at ".concat("/api/notes")),f.a.post("/api/notes",e).then((function(e){return e.data}))},g=function(e,t){console.log("Sent the put request");var n=f.a.put("".concat("/api/notes","/").concat(e),t);return console.log("successfully made the put request!!"),n.then((function(e){return e.data}))},v=function(e){var t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(f.a.post("/api/login/",e));case 2:return t=n.sent,n.abrupt("return",t.data);case 4:case"end":return n.stop()}}))},h=function(e,t,n){t(e),n(""),setTimeout((function(){t(null)}),3e3)},b=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),l=Object(i.a)(c,2),m=l[0],f=l[1],b=Object(a.useState)(""),E=Object(i.a)(b,2),w=E[0],j=E[1],O=Object(a.useState)(!0),S=Object(i.a)(O,2),y=S[0],k=(S[1],Object(a.useState)("")),x=Object(i.a)(k,2),C=x[0],q=x[1],D=Object(a.useState)(""),J=Object(i.a)(D,2),N=J[0],T=J[1],A=Object(a.useState)(null),I=Object(i.a)(A,2),L=I[0],B=I[1];Object(a.useEffect)((function(){console.log("inside fetch Data"),p().then((function(e){console.log("fetcing is finaly complete ugh!!"),r(e)}))}),[]);var G=function(e){console.log("handle note change",m),f(e.target.value)},M=function(e){console.log("handle username",C),q(e.target.value)},z=function(e){console.log("handle password",N),T(e.target.value)},F=function(e){if(e.preventDefault(),function(e,t){console.log("value",e);var n=!1;return t.forEach((function(t){console.log("ele.content",t.content),t.content.toLowerCase()===e.toLowerCase()&&(n=!0)})),n}(m,n)){var t='note with content "'.concat(m,'" is duplicate');h(t,j,f)}else{var a={content:m,important:Math.random()>.5,date:(new Date).toISOString()};console.log(a),d(a).then((function(e){console.log("post request has been made to server"),r(n.concat(e)),f("")}))}},H=function(e){var t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),console.log("started login process"),n.prev=2,n.next=5,s.a.awrap(v({username:C,password:N}));case 5:t=n.sent,B(t),q(""),T(""),n.next=15;break;case 11:n.prev=11,n.t0=n.catch(2),j("wrong credentials!"),setTimeout((function(){j(null)}),3e3);case 15:case"end":return n.stop()}}),null,null,[[2,11]])},K=function(e){var t=e.note,a=t.important?"make not important":"make important";return y||t.important?o.a.createElement("li",{className:"note"},t.content,o.a.createElement("button",{onClick:function(){return function(e){console.log("id is",e);var t=n.find((function(t){return t.id===e})),a=Object(u.a)({},t,{important:!t.important});g(e,a).then((function(t){console.log("now updating in frontend server has responded usually!!"),r(n.map((function(n){return n.id===e?t:n})))})).catch((function(e){var n='note with content "'.concat(t.content,'" not found in our database');h(n,j,f)})),r(n.filter((function(t){return t.id!==e})))}(t.id)}}," ",a," ")):null};return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement((function(e){var t=e.message;return o.a.createElement("div",{className:"error"},t)}),{message:w}),o.a.createElement("h2",null,"login"),null===L?o.a.createElement("form",{onSubmit:H},o.a.createElement("div",null,"username",o.a.createElement("input",{type:"text",value:C,name:"username",onChange:M})),o.a.createElement("div",null,"password",o.a.createElement("input",{type:"password",value:N,name:"password",onChange:z})),o.a.createElement("button",{type:"submit"},"login")):o.a.createElement("div",null,"hello ",L.username,o.a.createElement("form",{onSubmit:F},o.a.createElement("h1",null,"Add new notes here!"),o.a.createElement("input",{value:m,onChange:G,id:"first"}),o.a.createElement("button",{type:"submit"},"Add"))),o.a.createElement("ul",null,n.map((function(e){return o.a.createElement(K,{note:e,key:e.id})}))))};n(39);c.a.render(o.a.createElement(b,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.f7a8e49c.chunk.js.map