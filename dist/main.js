function ainit(){console.log("ainit"),hello3()}function hello(){console.log("hello2"),ainit()}function hello3(){console.log("hello3")}hello(),console.log("hello"),hello();const BlockListeners={create:(e,t)=>{let r;hasAttributes(t,["block-mouse-drag","block-touch","block-touch-unlockable","block-scrollwheel"])&&(r=t.insertBefore(document.createElement("div"),t.firstChild),r.classList.add("event-blocker"),r.setAttribute("slot","hotspot-blocker")),null!=r&&(blockMouseDrag(t,r),blockScrollWheel(t,r),blockTouch(t,r))},blockMouseDrag:(e,t)=>{e.hasAttribute("block-mouse-drag")||(redirectEvent("mousedown",t,e.shadowRoot.querySelector(".userInput"),()=>!0),redirectEvent("mousemove",t,e.shadowRoot.querySelector(".userInput")))},blockScrollWheel:(e,t)=>{e.hasAttribute("block-scrollwheel")||redirectEvent("wheel",t,e.shadowRoot.querySelector(".userInput"))},blockTouch:(e,t)=>{if(e.hasAttribute("block-touch")||e.hasAttribute("block-touch-unlockable")){if(e.hasAttribute("block-touch-unlockable")){let r,n;redirectEvent("touchstart",t,e.shadowRoot.querySelector(".userInput"),o=>(clearTimeout(n),!!e.hasAttribute("touch-unlocked")||(r=setTimeout(()=>{e.setAttribute("touch-unlocked",!0);const r=new o.constructor(o.type,o);t.dispatchEvent(r)},200),!1))),redirectEvent("touchmove",t,e.shadowRoot.querySelector(".userInput"),t=>!!e.hasAttribute("touch-unlocked")||(clearTimeout(r),!1)),window.addEventListener("touchend",t=>{clearTimeout(r),e.hasAttribute("touch-unlocked")&&(n=setTimeout(()=>{e.removeAttribute("touch-unlocked")},500))})}}else redirectEvent("touchstart",t,e.shadowRoot.querySelector(".userInput")),redirectEvent("touchmove",t,e.shadowRoot.querySelector(".userInput"))},hasAttributes:(e,t)=>{for(let r=0;r<t.length;r++)if(e.hasAttribute(t[r]))return!0;return!1},redirectEvent:(e,t,r,n=(e=>!0))=>{t.addEventListener(e,e=>{if(n(e)){const t=new e.constructor(e.type,e);r.dispatchEvent(t)}})}},Helpers={RGBToHex:(e,t,r)=>(e=e.toString(16),t=t.toString(16),r=r.toString(16),1==e.length&&(e="0"+e),1==t.length&&(t="0"+t),1==r.length&&(r="0"+r),"#"+e+t+r),hexToRGB:e=>{var t=(e=e.substring(1)).match(/.{1,2}/g);return[parseInt(t[0],16)/255,parseInt(t[1],16)/255,parseInt(t[2],16)/255]}},MarkupAttributes={create:(e,t)=>{const r=MarkupMethods.createContainer(e,"fieldset","attributes"),n=Array.from(r.querySelectorAll("input"));if(null!=t.pbrMetallicRoughness&&null!=t.pbrMetallicRoughness){const e=MarkupMethods.addRemoveElement("color","input",n,r,!1);e.type="color";const o=t.pbrMetallicRoughness.baseColorFactor,a=Helpers.RGBToHex(Math.round(255*o[0]),Math.round(255*o[1]),Math.round(255*o[2]));e.value=a,e.addEventListener("input",e=>{Helpers.hexToRGB(e.target.value).push(1)});const s=MarkupMethods.addRemoveElement("roughness","input",n,r,!1);s.type="range",s.min="0",s.max="1",s.step="0.01",s.generated&&(s.value=t.pbrMetallicRoughness.roughnessFactor),s.addEventListener("input",e=>{t.pbrMetallicRoughness.setRoughnessFactor(e.target.value)}),t.pbrMetallicRoughness.setRoughnessFactor(s.value);const l=MarkupMethods.addRemoveElement("metalness","input",n,r,!1);l.type="range",l.min="0",l.max="1",l.step="0.01",l.generated&&(l.value=t.pbrMetallicRoughness.metallicFactor),l.addEventListener("input",e=>{t.pbrMetallicRoughness.setMetallicFactor(e.target.value)}),t.pbrMetallicRoughness.setMetallicFactor(l.value)}else MarkupMethods.addRemoveElement("roughness","input",n,r,!0),MarkupMethods.addRemoveElement("metalness","input",n,r,!0)}},MarkupCamera={create:(e,t)=>{const r=MarkupMethods.createContainer(e,"fieldset","camera"),n=Array.from(r.querySelectorAll("input")),o=Array.from(r.querySelectorAll("select")),a=MarkupMethods.addRemoveElement("camera-controls","input",n,r,!1);a.type="checkbox",a.checked=t.cameraControls,a.addEventListener("input",e=>{e.target.checked?t.setAttribute("camera-controls",e.target.checked):t.removeAttribute("camera-controls")});const s=MarkupMethods.addRemoveElement("auto-rotate","input",n,r,!1);s.type="checkbox",s.checked=t.autoRotate,s.addEventListener("input",e=>{e.target.checked?t.setAttribute("auto-rotate",e.target.checked):t.removeAttribute("auto-rotate")});const l=MarkupMethods.addRemoveElement("orbit-scroll-position","input",n,r,!1);l.type="checkbox",l.checked=t.orbitScrollPosition,l.addEventListener("input",e=>{e.target.checked?t.setAttribute("orbit-scroll-position",e.target.checked):t.removeAttribute("orbit-scroll-position")});const i=MarkupMethods.addRemoveElement("camera-orbit","select",o,r,!1);addCameraOptions(i,t,"camera-orbit");const d=t.getAttribute("camera-orbit").split(" "),c=MarkupMethods.addRemoveElement("orbit-x","input",n,r,!1);c.type="range",c.min="-180",c.max="180",c.step="0.01",c.generated&&(c.value=d[0].replace("deg","")),c.addEventListener("input",e=>{console.log("yo");const r=t.getAttribute("camera-orbit").split(" ");t.setAttribute("camera-orbit",e.target.value+"deg "+r[1]+" "+r[2])});const u=MarkupMethods.addRemoveElement("orbit-y","input",n,r,!1);u.type="range",u.min="0",u.max="180",u.step="0.01",u.generated&&(u.value=d[1].replace("deg","")),u.addEventListener("input",e=>{const r=t.getAttribute("camera-orbit").split(" ");t.setAttribute("camera-orbit",r[0]+" "+e.target.value+"deg "+r[2])});const m=MarkupMethods.addRemoveElement("orbit-distance","input",n,r,!1);m.type="range",m.min="40",m.max="105",m.step="0.01",m.generated&&(m.value=d[2].replace("%","")),m.addEventListener("input",e=>{const r=t.getAttribute("camera-orbit").split(" ");t.setAttribute("camera-orbit",r[0]+" "+r[1]+" "+e.target.value+"%")});const p=MarkupMethods.addRemoveElement("field-of-view","input",n,r,!1);p.type="range",p.min="25",p.max="45",p.step="0.01",p.generated&&(p.value=t.getAttribute("field-of-view")),p.addEventListener("input",e=>{});const h=MarkupMethods.addRemoveElement("camera-target","select",o,r,!1);addCameraOptions(h,t,"camera-target");const g=MarkupMethods.addRemoveElement("target-scroll-position","input",n,r,!1);g.type="checkbox",g.checked=t.targetScrollPosition,g.addEventListener("input",e=>{e.target.checked?t.setAttribute("target-scroll-position",e.target.checked):t.removeAttribute("target-scroll-position")})},addCameraOptions:(e,t,r)=>{let n=Array.from(e.querySelectorAll("option"));n.forEach(e=>{const t=e.value;e.text=t,e.label=t});n.filter(e=>e.hasAttribute("selected")).length;if(0==n.length){const r=e.insertBefore(document.createElement("option"),e.firstChild),n=t.cameraOrbit;r.value=n,r.text=n,r.label=n,r.setAttribute("selected",!0)}e.addEventListener("input",e=>{t.setAttribute(r,e.target.value)}),n=Array.from(e.querySelectorAll("option"));const o=n.filter(e=>e.selected)[0];t.setAttribute(r,o.value)}},MarkupHotspots={create:(e,t)=>{t.querySelectorAll("*[animation]").forEach(e=>{e.addEventListener("click",r=>{const n=e.getAttribute("animation");t.animationName==n?t.removeAttribute("autoplay"):(t.setAttribute("autoplay",!0),t.setAttribute("animation-name",n))})})}},MarkupLighting={create:(e,t)=>{const r=MarkupMethods.createContainer(e,"fieldset","lighting"),n=Array.from(r.querySelectorAll("select")),o=MarkupMethods.addRemoveElement("skybox","select",n,r,!1);o.setAttribute("required",!0),addLightingOptions(o,t,"skybox");Array.from(t.querySelectorAll("[select][skybox]")).forEach(e=>e.addEventListener("click",()=>{MarkupMethods.select(o,e.getAttribute("select"))}));const a=MarkupMethods.addRemoveElement("environment","select",n,r,!1);a.setAttribute("required",!0),addLightingOptions(a,t,"environment");Array.from(t.querySelectorAll("[select][environment]")).forEach(e=>e.addEventListener("click",()=>{MarkupMethods.select(a,e.getAttribute("select"))}));const s=Array.from(r.querySelectorAll("input")),l=MarkupMethods.addRemoveElement("exposure","input",s,r,!1);l.type="range",l.min="0",l.max="2",l.step="0.01",l.generated&&(l.value=t.exposure),l.addEventListener("input",e=>{t.setAttribute("exposure",e.target.value)}),t.setAttribute("exposure",l.value);const i=MarkupMethods.addRemoveElement("shadow-intensity","input",s,r,!1);i.type="range",i.min="0",i.max="10",i.step="0.01",i.generated&&(i.value=t.shadowIntensity),i.addEventListener("input",e=>{t.setAttribute("shadow-intensity",e.target.value)}),t.setAttribute("shadow-intensity",i.value);const d=MarkupMethods.addRemoveElement("shadow-softness","input",s,r,!1);d.type="range",d.min="0",d.max="2",d.step="0.01",d.generated&&(d.value=t.shadowSoftness),d.addEventListener("input",e=>{t.setAttribute("shadow-softness",e.target.value)}),t.setAttribute("shadow-softness",d.value)},addLightingOptions:(e,t,r)=>{let n=Array.from(e.querySelectorAll("option"));n.forEach(e=>{const t=MarkupMethods.getFileName(e.value);e.text=t,e.label=t});const o=n.filter(e=>e.hasAttribute("selected")).length>0,a=e.insertBefore(document.createElement("option"),e.firstChild);a.value=null,a.text="none",a.label="none",o||(a.selected=!0);const s=Array.from(t.querySelectorAll('[get="name"]['+r+"]")),l=Array.from(t.querySelectorAll('[get="texture"]['+r+"]")),i=r+"-image";e.addEventListener("input",e=>{t.setAttribute(i,e.target.value),MarkupMethods.setStyledMarkup(e.target,s,l)}),n=Array.from(e.querySelectorAll("option"));const d=n.filter(e=>e.selected)[0];t.setAttribute(i,d.value),MarkupMethods.setStyledMarkup(d,s,l)}},MarkupMethods={createContainer:(e,t,r)=>{let n=e.querySelector('fieldset[name="'+r+'"]');return null==n&&(n=e.appendChild(document.createElement(t),e.lastChild),n.name=r),n},addRemoveElement:(e,t,r,n,o,a=(e=>{}))=>{let s=r.find(t=>t.name==e);if(void 0===s)o||(s=n.appendChild(document.createElement(t)),s.name=e,s.generated=!0,a(s));else if(o)s.parentNode.removeChild(s);else{const e=s.cloneNode(!0);s.parentNode.removeChild(s),s=n.appendChild(e)}return s},getFileName:e=>e.split(/(\\|\/)/g).pop(),select:(e,t)=>{if(isNaN(t)){let r;"next"==t?r=1:"previous"==t&&(r=-1);const n=e.options.length;e.selectedIndex=((e.selectedIndex+r)%n+n)%n}else{const r=parseInt(t);e.selectedIndex=Math.min(Math.max(r,0),e.options.length-1)}e.options[e.selectedIndex].setAttribute("selected",!0),e.dispatchEvent(new Event("input"))},setStyledMarkup:(e,t,r)=>{r.forEach(t=>{t.src=e.value});let n=e.value.replace(/^.*[\\\/]/,"");""==n&&(n="Default"),t.forEach(e=>{e.innerHTML=n})}},MarkupTexture={create:(e,t,r)=>{const n=MarkupMethods.createContainer(e,"fieldset","textures"),o=Array.from(n.querySelectorAll("select"));if(null!=r.pbrMetallicRoughness&&null!=r.pbrMetallicRoughness.baseColorTexture){const e=MarkupMethods.addRemoveElement("diffuse","select",o,n,!1);addOptions(e,t,r.pbrMetallicRoughness.baseColorTexture,"diffuse");Array.from(t.querySelectorAll("[select][diffuse]")).forEach(t=>t.addEventListener("click",()=>{MarkupMethods.select(e,t.getAttribute("select"))}))}else MarkupMethods.addRemoveElement("diffuse","select",o,n,!0);if(null!=r.emissiveTexture){const e=MarkupMethods.addRemoveElement("emissive","select",o,n,!1);addOptions(e,t,r.emissiveTexture,"emissive")}else MarkupMethods.addRemoveElement("emissive","select",o,n,!0);if(null!=r.occlusionTexture){const e=MarkupMethods.addRemoveElement("ao","select",o,n,!1);addOptions(e,t,r.occlusionTexture,"ao")}else MarkupMethods.addRemoveElement("ao","select",o,n,!0);if(null!=r.pbrMetallicRoughness&&null!=r.pbrMetallicRoughness.metallicRoughnessTexture){const e=MarkupMethods.addRemoveElement("metal-roughness","select",o,n,!1);addOptions(e,t,r.pbrMetallicRoughness.metallicRoughnessTexture,"metal-roughness")}else MarkupMethods.addRemoveElement("metal-roughness","select",o,n,!0);if(null!=r.normalTexture){const e=MarkupMethods.addRemoveElement("normal","select",o,n,!1);addOptions(e,t,r.normalTexture,"normal");Array.from(t.querySelectorAll("[select][normal]")).forEach(t=>t.addEventListener("click",()=>{MarkupMethods.select(e,t.getAttribute("select"))}))}else MarkupMethods.addRemoveElement("normal","select",o,n,!0)},addOptions:(e,t,r,n)=>{let o=Array.from(e.querySelectorAll("option"));o.forEach(e=>{const t=MarkupMethods.getFileName(e.value);e.text=t,e.label=t});const a=o.filter(e=>e.hasAttribute("selected")).length>0,s=e.insertBefore(document.createElement("option"),e.firstChild);if(s.value="",null!=r.texture.source.name){const e=r.texture.source.name;s.text=e,s.label=e}else{const e="Default";s.text=e,s.label=e}a||(s.selected=!0);const l=Array.from(t.querySelectorAll('[get="name"]['+n+"]")),i=Array.from(t.querySelectorAll('[get="texture"]['+n+"]"));e.addEventListener("input",e=>{applyTexture(r,e.target.value),MarkupMethods.setStyledMarkup(e.target,l,i)}),o=Array.from(e.querySelectorAll("option"));const d=o.filter(e=>e.selected)[0];applyTexture(r,d.value),MarkupMethods.setStyledMarkup(d,l,i)},applyTexture:(e,t)=>{""==t?e.texture.source.setURI(null):e.texture.source.setURI(t)}},mutationObserver=new MutationObserver(e=>{e.forEach(e=>{console.log(e)})});let focusedForm;console.log("ModelViewerExtended");const init=()=>{document.addEventListener("keyup",e=>{"q"==e.key&&null!=focusedForm&&focusedForm.classList.toggle("show")});const e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=Styles.set(),document.head.appendChild(e);document.querySelectorAll("model-viewer").forEach(e=>{e.addEventListener("scene-graph-ready",t=>{const r=e.model.materials[0];let n=e.querySelector("form");null==n&&(n=e.insertBefore(document.createElement("form"),e.firstChild)),MarkupTexture.create(n,e,r),MarkupAttributes.create(n,r),MarkupLighting.create(n,e),MarkupCamera.create(n,e),MarkupHotspots.create(n,e),EventListeners.create(n,e),e.addEventListener("mousedown",e=>{focusedForm=n}),e.setAttribute("scene-graph-ready",!0)})})},set=()=>"\n    model-viewer > form{\n      display: none;\n      max-width: 370px;\n      background-color: rgba(255,255,255,0.5);\n      max-height: 100%;\n      overflow-y: auto;\n      z-index: 1;\n    }\n    model-viewer > form:before{\n      content: \"\";\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 70px;\n      height: 100%;\n    }\n    \n    model-viewer > form.show{\n      display: block;\n    }\n    \n    model-viewer > form *:before{\n      font-size: 11px;\n      font-family: Verdana, Geneva, sans-serif;\n      padding-bottom: 5px;\n    }\n    \n    \n    model-viewer > form > fieldset{\n      border-width: 1px;\n      margin: 0;\n    }\n    model-viewer > form > fieldset:not(:last-of-type){\n      border-bottom-width: 0px;\n    }\n    model-viewer > form > fieldset:before{\n      display: block;\n      content: attr(name);\n    }\n    model-viewer > form > fieldset >*{\n    }\n    \n    model-viewer .event-blocker{\n      display: block;\n      left: 0;\n      top: 0;\n      width: 2000px;\n      height: 2000px;\n      pointer-events: all;\n    }\n    \n    model-viewer:not([block-mouse-drag]) .event-blocker:hover{\n      cursor: grab;\n    }\n    model-viewer:not([block-mouse-drag]) .event-blocker:active{\n      cursor: grabbing;\n    }\n    \n    model-viewer > form > fieldset input[type=\"checkbox\"]{\n      display: block;\n      position: relative;\n    }\n    model-viewer > form > fieldset input[type=\"checkbox\"]:before{\n      content: attr(name);\n      white-space: nowrap;\n      padding-left: 20px;\n      transform: translateY(-4%);\n      display: block;\n    }\n    \n    model-viewer > form > fieldset input[type=\"color\"]{\n      position: relative;\n      height: 20px;\n      margin-right: 10px;\n    }\n    \n    model-viewer > form > fieldset input[type=\"range\"]{\n      position: relative;\n      margin: 0px;\n      margin-top: 20px;\n      margin-right: 10px;\n      transform: translateY(9px);\n      margin-bottom: 15px;\n    }\n    \n    model-viewer > form > fieldset input[type=\"range\"]:before{\n      content: attr(name);\n      white-space: nowrap;\n      position: absolute;\n      margin-top: -15px;\n    }\n    \n    model-viewer > form > fieldset select{\n      position: relative;\n      display: block;\n      width: 100%;\n      text-align: right;\n      background-position: right 20px top 1px;\n      background-size: contain;\n      background-repeat: no-repeat;\n      font-size: 11px;\n    }\n    \n    /*\n    Using this converter to convert this: https://css-tricks.com/using-svg/#data-urls-for-svg\n    <svg width=\"100\" height=\"20\" viewBox=\"0 0 100 20\">\n      <text dominant-baseline=\"middle\" text-anchor=\"end\" x=\"100%\" y=\"50%\">Test Text</text>\n    </svg>\n    */\n    model-viewer > form > fieldset select[name=\"diffuse\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EDiffuse%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"ao\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EAO%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"metal-roughness\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EMetal/Roughness%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"normal\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ENormal%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"emissive\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EEmissive%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"skybox\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ESkybox%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"environment\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EEnvironment%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"camera-orbit\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ECameraOrbit%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n    model-viewer > form > fieldset select[name=\"camera-target\"]{\n      --svg: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ECameraTarget%3C/text%3E%3C/svg%3E\");\n      background-image: var(--svg);\n    }\n  ";hello(),init();