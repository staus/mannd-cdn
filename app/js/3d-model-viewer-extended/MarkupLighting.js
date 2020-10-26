const MarkupLighting = {
  create: (container, viewer) => {
    const lightingContainer = MarkupMethods.createContainer(container, 'fieldset', 'lighting')

    const selectors = Array.from(lightingContainer.querySelectorAll('select'))
    
    const skybox = MarkupMethods.addRemoveElement("skybox", 'select', selectors, lightingContainer, false)
    skybox.setAttribute('required', true)
    addLightingOptions(skybox, viewer, 'skybox')

    const skyboxTriggers = Array.from(viewer.querySelectorAll('[select][skybox]'))
    skyboxTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      MarkupMethods.select(skybox, trigger.getAttribute("select"))
    }))

    const environment = MarkupMethods.addRemoveElement("environment", 'select', selectors, lightingContainer, false)
    environment.setAttribute('required', true)
    addLightingOptions(environment, viewer, 'environment')

    // Now that the selector is created, let's find all elements inside this viewer that targets it and listen for clicks on them
    const environmentTriggers = Array.from(viewer.querySelectorAll('[select][environment]'))
    environmentTriggers.forEach(trigger => trigger.addEventListener('click', () => {
      MarkupMethods.select(environment, trigger.getAttribute("select"))
    }))

    const inputs = Array.from(lightingContainer.querySelectorAll('input'))

    /// Create the exposure picker
    const exposure = MarkupMethods.addRemoveElement("exposure", 'input', inputs, lightingContainer, false)
    exposure.type = "range"
    exposure.min = "0"
    exposure.max = "2"
    exposure.step = "0.01"
    if (exposure.generated) {
      exposure.value = viewer.exposure
    }
    exposure.addEventListener('input', (e) => {
      viewer.setAttribute('exposure', e.target.value)
    })
    viewer.setAttribute('exposure', exposure.value)

    /// Create the shadow intensity picker
    const shadowIntensity = MarkupMethods.addRemoveElement('shadow-intensity', 'input', inputs, lightingContainer, false)
    shadowIntensity.type = "range"
    shadowIntensity.min = "0"
    shadowIntensity.max = "10"
    shadowIntensity.step = "0.01"
    if (shadowIntensity.generated) {
      shadowIntensity.value = viewer.shadowIntensity
    }
    shadowIntensity.addEventListener('input', (e) => {
      viewer.setAttribute('shadow-intensity', e.target.value)
    })
    viewer.setAttribute('shadow-intensity', shadowIntensity.value)

    /// Create the exposure picker
    const shadowSoftness = MarkupMethods.addRemoveElement('shadow-softness', 'input', inputs, lightingContainer, false)
    shadowSoftness.type = "range"
    shadowSoftness.min = "0"
    shadowSoftness.max = "2"
    shadowSoftness.step = "0.01"
    if (shadowSoftness.generated) {
      shadowSoftness.value = viewer.shadowSoftness
    }
    shadowSoftness.addEventListener('input', (e) => {
      viewer.setAttribute('shadow-softness', e.target.value)
    })
    viewer.setAttribute('shadow-softness', shadowSoftness.value)
  },

  addLightingOptions: (container, viewer, channel) => {
    
    /// Maybe the dom has some custom texture options already added
    let existingOptions = Array.from(container.querySelectorAll('option'))
    existingOptions.forEach((option) => {
      const string = MarkupMethods.getFileName(option.value)
      option.text = string
      option.label = string
    })

    /// Maybe one of these options have been selected as the new default
    const defaultExist = existingOptions.filter((option) => option.hasAttribute('selected')).length > 0

    /// Add this texture as the first option in the selector list
    const optionChannel = container.insertBefore(document.createElement('option'), container.firstChild)
    const string = "none"
    optionChannel.value = null
    optionChannel.text = string
    optionChannel.label = string

    /// If no other option is already set as selected, make this texture the default selected one
    if (!defaultExist) {
      optionChannel['selected'] = true
    }
    const getNames = Array.from(viewer.querySelectorAll('[get="name"][' + channel + ']'))
    const getTextures = Array.from(viewer.querySelectorAll('[get="texture"][' + channel + ']'))

    const channelName = channel + "-image"

    /// Listen for changes to the selected options and apply the source
    container.addEventListener('input', (event) => {
      viewer.setAttribute(channelName, event.target.value)

      MarkupMethods.setStyledMarkup(event.target, getNames, getTextures)
    })

    /// Refresh the list of options and find the selected one
    existingOptions = Array.from(container.querySelectorAll('option'))
    const selected = existingOptions.filter((option) => option.selected)[0]
    /// Apply source once
    viewer.setAttribute(channelName, selected.value)
    MarkupMethods.setStyledMarkup(selected, getNames, getTextures)
  }

}