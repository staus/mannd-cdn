/// Author: Nikolaj Stausbøl
// This article might be useful for cleaning up events:
// https://stackoverflow.com/questions/28366849/chrome-dev-tools-view-all-event-listeners-used-in-the-page/45842339#45842339

//import * as MarkupMethods from './MarkupMethods.js'
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation)
  })
})

let focusedForm

const init = () => {
  document.addEventListener("keyup", (e) => {
    if (e.key == "q" && focusedForm != null) {
      focusedForm.classList.toggle("show")
    }
  })

  const style = document.createElement('style')
  style.setAttribute("type", "text/css")
  style.innerHTML = Styles.set()
  document.head.appendChild(style)

  const modelViewers = document.querySelectorAll('model-viewer')
  modelViewers.forEach((viewer) => {
  
    viewer.addEventListener("scene-graph-ready", (e) => {
      const material = viewer.model.materials[0]
      
      let form = viewer.querySelector('form')
      if (form == null) {
        form = viewer.insertBefore(document.createElement('form'), viewer.firstChild)
      }
      
      // Make the viewer selectable (even if a block :after is used to fx block events)
      //viewer.setAttribute('tabindex', 0)
      // If key is pressed while viewer is selected
      

      MarkupTexture.create(form, viewer, material)
      MarkupAttributes.create(form, material)
      MarkupLighting.create(form, viewer)
      MarkupCamera.create(form, viewer)
      MarkupHotspots.create(form, viewer)
      
      EventListeners.create(form, viewer)

      viewer.addEventListener("mousedown", (e) => {
        focusedForm = form
      })
      viewer.setAttribute("scene-graph-ready", true)
      /// For some reason diffuse and metalRoughness is grouped inside pbrMetallicRoughness

      /*mutationObserver.observe(textures, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: false,
        attributeOldValue: true,
        characterDataOldValue: true .setURI(event.target.value)
      })*/
    })

  })
}







/*export const name = 'square';

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, length, length)

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}*/

