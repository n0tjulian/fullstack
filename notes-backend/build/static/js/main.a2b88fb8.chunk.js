(this.webpackJsonpexample_test=this.webpackJsonpexample_test||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var o=n(16),c=n.n(o),r=n(7),a=n(3),i=n(2),u=n(0),l=function(t){var e=t.note,n=t.toggleImportance,o=e.important?"make not important":"make important";return Object(u.jsx)("div",{children:Object(u.jsxs)("li",{className:"note",children:[e.content," ",Object(u.jsx)("button",{onClick:n,children:o})," "]})})},s=function(t){var e=t.addNote,n=t.updateTextField,o=t.text;return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:e,children:[Object(u.jsx)("input",{value:o,onChange:n}),Object(u.jsx)("button",{type:"submit",children:"save"})]})})},d=function(t){var e=t.message;return null===e?null:Object(u.jsx)("div",{className:"error",children:e})},f=n(4),j=n.n(f),b="/api/notes",p=function(){return j.a.get(b).then((function(t){return t.data}))},m=function(t){return j.a.post(b,t).then((function(t){return t.data}))},h=function(t,e){return j.a.put("".concat(b,"/").concat(t),e).then((function(t){return t.data}))},O=function(){var t=Object(i.useState)([]),e=Object(a.a)(t,2),n=e[0],o=e[1],c=Object(i.useState)(""),f=Object(a.a)(c,2),j=f[0],b=f[1],O=Object(i.useState)(!0),g=Object(a.a)(O,2),x=g[0],v=g[1],S=Object(i.useState)(null),k=Object(a.a)(S,2),w=k[0],N=k[1];Object(i.useEffect)((function(){console.log("effect"),p().then((function(t){console.log("promise fulfilled, notes retrieved"),o(t)})).catch((function(t){console.log("error in getAll call in APP",t)}))}),[]);var A=function(){v(!x)},I=x?n:n.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(d,{message:w}),Object(u.jsx)("ul",{children:I.map((function(t){return Object(u.jsx)(l,{note:t,toggleImportance:function(){return function(t){console.log("importance of "+t+" needs to be toggled");var e=n.find((function(e){return e.id===t})),c=Object(r.a)(Object(r.a)({},e),{},{important:!e.important});h(t,c).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){N("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){N(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsx)(s,{addNote:function(t){t.preventDefault(),console.log("button cicked",t.target);var e={content:j,date:(new Date).toISOString(),important:Math.random()<.5};m(e).then((function(t){console.log(t);var e=n.concat(t);o(e),b("")})).catch((function(t){console.log("error in create in App add note",t)}))},updateTextField:function(t){t.preventDefault(),b(t.target.value)},updateShowAll:A,notesToShow:I,showAll:x,text:j}),Object(u.jsx)("button",{onClick:A,children:x?"important":"all"})]})};n(41);c.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.a2b88fb8.chunk.js.map