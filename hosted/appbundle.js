(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,n,r)=>{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),d=await a.json();document.getElementById("domoMessage").classList.add("hidden"),d.redirect&&(window.location=d.redirect),d.error&&t(d.error),r&&r(d)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var d=t[r]={exports:{}};return e[r](d,d.exports,n),d.exports}(()=>{const e=n(603),t=t=>{t.preventDefault(),e.hideError();const n=t.target.querySelector("#friendName").value,r=t.target.querySelector("#_csrf").value;return n?(e.sendPost(t.target.action,{name:n,_csrf:r},s),!1):(e.handleError("All fields are required!"),!1)},r=t=>{t.preventDefault(),e.hideError();const n=t.target.querySelector("#funds").value,r=t.target.querySelector("#_csrf").value;return n<0?(e.handleError("Enter valid amount!"),!1):(e.sendPost(t.target.action,{amount:n,_csrf:r}),!1)},a=e=>React.createElement("form",{id:"findFriends",onSubmit:t,name:"findFriends",action:"/maker",method:"GET",className:"findFriends"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"friendName",type:"text",name:"name",placeholder:"Friend Name"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"findFriends",type:"submit",value:"Find Friend"})),d=e=>React.createElement("form",{id:"addFunds",name:"addFunds",onSubmit:r,action:"/funds",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"funds"},"Add Funds: "),React.createElement("input",{id:"funds",type:"number",name:"funds",placeholder:"$$$"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Add Funds"})),c=e=>{if(0===e.friends.length)return React.createElement("div",{className:"friendsList"},React.createElement("h3",{className:"noFriends"},"No Friends Yet!"));const t=e.friends.map((e=>React.createElement("div",{key:e._id,className:"friend"},React.createElement("img",{src:"/assets/img/domoface.jpeg",alt:"domo face",className:"domoFace"}),React.createElement("h3",{className:"friendName"},"Name: ",e.name),React.createElement("input",{id:"inputFunds",type:"number",placeholder:"$$$"}),React.createElement("button",{id:"transfer"},"Transfer"))));return React.createElement("div",{className:"friendsList"},t)},s=async()=>{const e=await fetch("/getFriends"),t=await e.json();ReactDOM.render(React.createElement(c,{friends:t.friends}),document.getElementById("friends"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),n=document.getElementById("fundsButton"),r=document.getElementById("friendsButton");document.getElementById("transfer"),n.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(d,{csrf:t.csrfToken}),document.getElementById("addFunds")),ReactDOM.unmountComponentAtNode(document.getElementById("findFriends")),ReactDOM.unmountComponentAtNode(document.getElementById("friends")),!1))),r.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(a,{csrf:t.csrfToken}),document.getElementById("findFriends")),ReactDOM.render(React.createElement(c,{friends:[]}),document.getElementById("friends")),ReactDOM.unmountComponentAtNode(document.getElementById("addFunds")),s(),!1))),ReactDOM.render(React.createElement(a,{csrf:t.csrfToken}),document.getElementById("findFriends")),ReactDOM.render(React.createElement(c,{friends:[]}),document.getElementById("friends")),s()}})()})();