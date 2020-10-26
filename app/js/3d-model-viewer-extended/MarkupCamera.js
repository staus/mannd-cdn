const MarkupCamera = {

  create: (container, viewer) => {
    const cameraContainer = MarkupMethods.createContainer(container, 'fieldset', 'camera')

    const inputs = Array.from(cameraContainer.querySelectorAll('input'))
    const selectors = Array.from(cameraContainer.querySelectorAll('select'))

    /// Create the camera-controls checkbox
    const cameraControls = MarkupMethods.addRemoveElement("camera-controls", 'input', inputs, cameraContainer, false)
    cameraControls.type = "checkbox"
    cameraControls.checked = viewer.cameraControls
    cameraControls.addEventListener('input', (e) => {
      if (e.target.checked) {
        viewer.setAttribute('camera-controls', e.target.checked)
      }
      else {
        viewer.removeAttribute('camera-controls')
      }
    })

    /// Create the auto-rotate checkbox
    const autoRotate = MarkupMethods.addRemoveElement("auto-rotate", 'input', inputs, cameraContainer, false)
    autoRotate.type = "checkbox"
    autoRotate.checked = viewer.autoRotate
    autoRotate.addEventListener('input', (e) => {
      if (e.target.checked) {
        viewer.setAttribute('auto-rotate', e.target.checked)
      }
      else {
        viewer.removeAttribute('auto-rotate')
      }
    })

    /// Create the orbit-scroll-position checkbox
    const orbitScrollPosition = MarkupMethods.addRemoveElement("orbit-scroll-position", 'input', inputs, cameraContainer, false)
    orbitScrollPosition.type = "checkbox"
    orbitScrollPosition.checked = viewer.orbitScrollPosition
    orbitScrollPosition.addEventListener('input', (e) => {
      if (e.target.checked) {
        viewer.setAttribute('orbit-scroll-position', e.target.checked)
      }
      else {
        viewer.removeAttribute('orbit-scroll-position')
      }
    })

    const cameraOrbit = MarkupMethods.addRemoveElement("camera-orbit", 'select', selectors, cameraContainer, false)
    addCameraOptions(cameraOrbit, viewer, 'camera-orbit')

    const orbit = viewer.getAttribute('camera-orbit').split(" ")

    /// Create the orbit-x picker
    const orbitX = MarkupMethods.addRemoveElement("orbit-x", 'input', inputs, cameraContainer, false)
    orbitX.type = "range"
    orbitX.min = "-180"
    orbitX.max = "180"
    orbitX.step = "0.01"
    if (orbitX.generated) {
      orbitX.value = orbit[0].replace("deg", "")
    }
    orbitX.addEventListener('input', (e) => {
      console.log("yo")
      const orbit = viewer.getAttribute('camera-orbit').split(" ")
      viewer.setAttribute('camera-orbit', e.target.value + "deg " + orbit[1] + " " + orbit[2])
    })
    //viewer.setAttribute('camera-orbit', orbitX.value + "deg")

    /// Create the orbit-y picker
    const orbitY = MarkupMethods.addRemoveElement("orbit-y", 'input', inputs, cameraContainer, false)
    orbitY.type = "range"
    orbitY.min = "0"
    orbitY.max = "180"
    orbitY.step = "0.01"
    if (orbitY.generated) {
      orbitY.value = orbit[1].replace("deg", "")
    }
    orbitY.addEventListener('input', (e) => {
      const orbit = viewer.getAttribute('camera-orbit').split(" ")
      viewer.setAttribute('camera-orbit', orbit[0] + " " + e.target.value + "deg " + orbit[2])
    })
    //viewer.setAttribute('camera-orbit', orbitX.value + "deg")

    /// Create the orbit-distance picker
    const orbitDistance = MarkupMethods.addRemoveElement("orbit-distance", 'input', inputs, cameraContainer, false)
    orbitDistance.type = "range"
    orbitDistance.min = "40"
    orbitDistance.max = "105"
    orbitDistance.step = "0.01"
    if (orbitDistance.generated) {
      orbitDistance.value = orbit[2].replace("%", "")
    }
    orbitDistance.addEventListener('input', (e) => {
      const orbit = viewer.getAttribute('camera-orbit').split(" ")
      viewer.setAttribute('camera-orbit',  orbit[0] + " " + orbit[1] + " " + e.target.value + "%")
    })
    //viewer.setAttribute('camera-orbit', orbitX.value + "deg")

    /// Create the field-of-view picker
    const fieldOfView = MarkupMethods.addRemoveElement("field-of-view", 'input', inputs, cameraContainer, false)
    fieldOfView.type = "range"
    fieldOfView.min = "25"
    fieldOfView.max = "45"
    fieldOfView.step = "0.01"
    if (fieldOfView.generated) {
      fieldOfView.value = viewer.getAttribute('field-of-view')
    }
    fieldOfView.addEventListener('input', (e) => {
      //viewer.setAttribute('field-of-view', e.target.value + "deg")
    })
    //viewer.setAttribute('field-of-view', fieldOfView.value + "deg")

    const cameraTarget = MarkupMethods.addRemoveElement("camera-target", 'select', selectors, cameraContainer, false)
    addCameraOptions(cameraTarget, viewer, 'camera-target')

    /// Create the target-scroll-position checkbox
    const targetScrollPosition = MarkupMethods.addRemoveElement("target-scroll-position", 'input', inputs, cameraContainer, false)
    targetScrollPosition.type = "checkbox"
    targetScrollPosition.checked = viewer.targetScrollPosition
    targetScrollPosition.addEventListener('input', (e) => {
      if (e.target.checked) {
        viewer.setAttribute('target-scroll-position', e.target.checked)
      }
      else {
        viewer.removeAttribute('target-scroll-position')
      }
    })
  },

  addCameraOptions: (container, viewer, channel) => {
    /// Maybe the dom has some custom texture options already added
    let existingOptions = Array.from(container.querySelectorAll('option'))
    existingOptions.forEach((option) => {
      const string = option.value
      option.text = string
      option.label = string
    })

    /// Maybe one of these options have been selected as the new default
    const defaultExist = existingOptions.filter((option) => option.hasAttribute('selected')).length > 0
    
    if (existingOptions.length == 0) {
      /// Add this texture as the first option in the selector list
      const optionChannel = container.insertBefore(document.createElement('option'), container.firstChild)
      const string = viewer.cameraOrbit
      optionChannel.value = string
      optionChannel.text = string
      optionChannel.label = string
      optionChannel.setAttribute('selected', true)
    }

    /// If no other option is already set as selected, make this texture the default selected one
    //if (!defaultExist) {
      //optionChannel[0] = true
    //}
    

    /// Listen for changes to the selected options and apply the source
    container.addEventListener('input', (event) => {
      viewer.setAttribute(channel, event.target.value)
    })

    /// Refresh the list of options and find the selected one
    existingOptions = Array.from(container.querySelectorAll('option'))
    const selected = existingOptions.filter((option) => option.selected)[0]
    /// Apply source once
    viewer.setAttribute(channel, selected.value)
  }

}