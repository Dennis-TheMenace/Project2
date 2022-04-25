(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const s=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await s.json();document.getElementById("domoMessage").classList.add("hidden"),n.redirect&&(window.location=n.redirect),n.error&&t(n.error),r&&r(n)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#_csrf").value;return a&&r?(e.sendPost(t.target.action,{username:a,pass:r,_csrf:s}),!1):(e.handleError("Username or password is empty!"),!1)},r=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r&&s?r!==s?(e.handleError("Passwords do not match"),!1):(e.sendPost(t.target.action,{username:a,pass:r,pass2:s,_csrf:n}),!1):(e.handleError("All feilds required!"),!1)},s=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r&&s?r!==s?(e.handleError("Passwords do not match"),!1):(e.sendPost(t.target.action,{username:a,pass:r,pass2:s,_csrf:n}),!1):(e.handleError("All feilds required!"),!1)},n=e=>React.createElement("form",{id:"loginForm",name:"loginForm",onSubmit:t,action:"/login",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"})),c=e=>React.createElement("form",{id:"signupForm",name:"signupForm",onSubmit:r,action:"/signup",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"})),o=e=>React.createElement("form",{id:"newPassFrom",name:"newPassFrom",onSubmit:s,action:"/newPass",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"new password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Update Password"}));window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json(),a=document.getElementById("loginButton"),r=document.getElementById("signupButton"),s=document.getElementById("newPassButton");a.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("content")),!1))),r.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(c,{csrf:t.csrfToken}),document.getElementById("content")),!1))),s.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(o,{csrf:t.csrfToken}),document.getElementById("content")),!1))),ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("content"))}})()})();