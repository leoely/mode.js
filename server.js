"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CommonHttp=void 0,exports.default=readCookie,exports.filterNamespace=filterNamespace,exports.formateHttpDate=formateHttpDate,exports.formateHttpKey=formateHttpKey,exports.parseOption=parseOption;function isOption(a){let b=!0;if("string"==typeof a){let c=0;for(c=0;1>c&&!("-"===a.charAt(c));c+=1);0==c&&(b=!1)}else b=!1;return b}function transformOption(a){let b;const c=a.split("-");return b=1<=c.length?c.map((a,b)=>0===b?a:a.charAt(0).toUpperCase()+a.substring(1,a.length)):a,b.join("")}function parseOption(...a){const b={};for(let c=0;c<a.length;c+=1){const d=a[c];if("-"===d.charAt(0)){const e=/^\-([a-z])$/;if(e.test(d)){const[f,g]=d.match(e);isOption(a[c+1])?(b[g]=a[c+1],c+=1):b[g]=!0}if("-"===d.charAt(1)){const e=/^\-\-([a-z\-]+)$/;if(e.test(d)){const[f,g]=d.match(e);isOption(a[c+1])?(b[transformOption(g)]=a[c+1],c+=1):b[g]=!0}}}}return b}function filterNamespace(a){const b={};return"object"==typeof a&&Object.keys(a).forEach(c=>{"expires"!==c&&(b[c]=a[c])}),b}function readCookie(a){const b={};"string"==typeof a&&a.split(";").forEach(a=>{const[c,d]=a.split("=");b[c.trim()]=d});const c={};return Object.keys(b).forEach(a=>{const d=a.split("_");if(2===d.length){const[e,f]=d;void 0===c[e]&&(c[e]={}),c[e][f]=b[a]}}),c}function formateHttpDate(a){let[b,c,d,e,f,g]=a.toString().split(" ");return g=g.split("+")[0],c+", "+d+" "+c+" "+e+" "+f+" "+g}function formateHttpKey(a){return a.split("-").map(a=>a.substring(0,1).toUpperCase()+a.substring(1,a.length)).join("-")}function getLists(a){return a.join("|")}class CommonHttp{constructor(a){this.time=new Date().getTime();const{fonts:b}=a;a.fonts===void 0&&(a.fonts=[]),this.options=a,this.regexp=new RegExp(`\.(${getLists(a.fonts.concat(["html, ico","js"]))})$`)}async process(a,b){try{const{url:c}=a;if("/update/time"===c){const{time:a}=this;b.end(a)}else if(this.regexp.test(c))cacheOutput(a,b,restPath,fs.readFileSync(path.resolve("static",restPath)),parseInt(fs.statSync(path.resolve("static",restPath)).mtimeMs));else if("/api"===c.substring(0,4)){const d=await new Promise(b=>{a.on("data",a=>{b(a.toString())})}),{location:e}=this.options,f=await fetch(e+c,{method:"POST",body:d});for(const a of f.headers.keys())b.setHeader(formateHttpKey(a),f.headers.get(a));const g=await f.text();b.end(JSON.stringify(g))}}catch(a){const{develope:c}=this.options;if(!0===c)throw a;else b.writeHead(500),b.end()}}}exports.CommonHttp=CommonHttp;