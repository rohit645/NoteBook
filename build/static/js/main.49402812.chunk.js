(this.webpackJsonppart2c=this.webpackJsonppart2c||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),c=n(13),r=n.n(c),i=n(14),u=n(3),l=n(2),s=n.n(l),f=function(){var t=s.a.get("/notes"),e={id:56,content:"This data doesnt exist in the database",date:(new Date).toISOString(),important:Math.random()>.5};return console.log("fetching dataa from server"),t.then((function(t){return t.data.concat(e)}))},m=function(t){return console.log("creating new object in server at ".concat("/notes")),s.a.post("/notes",t).then((function(t){return t.data}))},d=function(t,e){return s.a.put("".concat("/notes","/").concat(t),e).then((function(t){return t.data}))},h=function(t,e,n){e(t),n(""),setTimeout((function(){e(null)}),3e3)},p=function(){var t=Object(o.useState)([]),e=Object(u.a)(t,2),n=e[0],c=e[1],r=Object(o.useState)(""),l=Object(u.a)(r,2),s=l[0],p=l[1],g=Object(o.useState)(""),b=Object(u.a)(g,2),v=b[0],E=b[1],w=Object(o.useState)(!0),O=Object(u.a)(w,2),j=O[0],S=O[1];console.log(n);Object(o.useEffect)((function(){console.log("inside fetch Data"),f().then((function(t){console.log("fetcing is finaly complete ugh!!"),c(t)}))}),[]);var k=function(t){var e=t.note,o=e.important?"make not important":"make important";return j||e.important?a.a.createElement("li",{className:"note"},e.content,a.a.createElement("button",{onClick:function(){return function(t){var e=n.find((function(e){return e.id===t})),o=Object(i.a)({},e,{important:!e.important});d(t,o).then((function(e){c(n.map((function(n){return n.id===t?e:n})))})).catch((function(t){var n='note with content "'.concat(e.content,'" not found in our database');h(n,E,p)})),c(n.filter((function(e){return e.id!==t})))}(e.id)}}," ",o," ")):null};return a.a.createElement("div",null,a.a.createElement("h1",null,"Fetched data"),"show important",a.a.createElement("button",{onClick:function(){return S(!j)}},"Show Important"),a.a.createElement("ul",null,n.map((function(t){return a.a.createElement(k,{note:t,key:t.id})}))),a.a.createElement((function(t){var e=t.message;return a.a.createElement("div",{className:"error"},e)}),{message:v}),a.a.createElement("form",{onSubmit:function(t){if(t.preventDefault(),function(t,e){console.log("value",t);var n=!1;return e.forEach((function(e){console.log("ele.content",e.content),e.content.toLowerCase()===t.toLowerCase()&&(n=!0)})),n}(s,n)){var e='note with content "'.concat(s,'" is duplicate');h(e,E,p)}else{var o={id:n.length+1,content:s,important:Math.random()>.5,date:(new Date).toISOString()};console.log(o),m(o).then((function(t){console.log("post request has been made to server"),c(n.concat(t)),p("")}))}}},a.a.createElement("h1",null,"Add new notes here!"),a.a.createElement("input",{value:s,onChange:function(t){console.log("handle note change",s),p(t.target.value)},id:"first"}),a.a.createElement("button",{type:"submit"},"Add")))};n(37);r.a.render(a.a.createElement(p,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.49402812.chunk.js.map