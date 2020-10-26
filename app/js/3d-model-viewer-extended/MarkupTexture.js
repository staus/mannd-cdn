const MarkupTexture = {
  create: (container, viewer, material) => {
    const textureContainer = MarkupMethods.createContainer(container, 'fieldset', 'textures')

    const selectors = Array.from(textureContainer.querySelectorAll('select'))
    
    if (material.pbrMetallicRoughness != null && material.pbrMetallicRoughness.baseColorTexture != null) {
      const diffuse = MarkupMethods.addRemoveElement("diffuse", 'select', selectors, textureContainer, false)
      addOptions(diffuse, viewer, material.pbrMetallicRoughness.baseColorTexture, "diffuse")
      const diffuseTriggers = Array.from(viewer.querySelectorAll('[select][diffuse]'))
      diffuseTriggers.forEach(trigger => trigger.addEventListener('click', () => {
        MarkupMethods.select(diffuse, trigger.getAttribute("select"))
      }))
    }
    else {
      MarkupMethods.addRemoveElement("diffuse", 'select', selectors, textureContainer, true)
    }
    if (material.emissiveTexture != null) {
      const emissive = MarkupMethods.addRemoveElement("emissive", 'select', selectors, textureContainer, false)
      addOptions(emissive, viewer, material.emissiveTexture, "emissive")
    }
    else {
      MarkupMethods.addRemoveElement("emissive", 'select', selectors, textureContainer, true)
    }
    if (material.occlusionTexture != null) {
      const ao = MarkupMethods.addRemoveElement("ao", 'select', selectors, textureContainer, false)
      addOptions(ao, viewer, material.occlusionTexture, "ao")
    }
    else {
      MarkupMethods.addRemoveElement("ao", 'select', selectors, textureContainer, true)
    }
    if (material.pbrMetallicRoughness != null && material.pbrMetallicRoughness.metallicRoughnessTexture != null) {
      const metalRoughness = MarkupMethods.addRemoveElement("metal-roughness", 'select', selectors, textureContainer, false)
      addOptions(metalRoughness, viewer, material.pbrMetallicRoughness.metallicRoughnessTexture, "metal-roughness")
    }
    else {
      MarkupMethods.addRemoveElement("metal-roughness", 'select', selectors, textureContainer, true)
    }
    if (material.normalTexture != null) {
      const normal = MarkupMethods.addRemoveElement("normal", 'select', selectors, textureContainer, false)
      addOptions(normal, viewer, material.normalTexture, "normal")
      const normalTriggers = Array.from(viewer.querySelectorAll('[select][normal]'))
      normalTriggers.forEach(trigger => trigger.addEventListener('click', () => {
        MarkupMethods.select(normal, trigger.getAttribute("select"))
      }))
    }
    else {
      MarkupMethods.addRemoveElement("normal", 'select', selectors, textureContainer, true)
    }
  },

  addOptions: (container, viewer, channel, channelName) => {
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
    optionChannel.value = ""

    if (channel.texture.source.name != null) {
      const string = channel.texture.source.name
      optionChannel.text = string
      optionChannel.label = string
    }
    else {
      const string = "Default"
      optionChannel.text = string
      optionChannel.label = string
    }

    /// If no other option is already set as selected, make this texture the default selected one
    if (!defaultExist) {
      optionChannel['selected'] = true
    }

    const getNames = Array.from(viewer.querySelectorAll('[get="name"][' + channelName + ']'))
    const getTextures = Array.from(viewer.querySelectorAll('[get="texture"][' + channelName + ']'))

    /// Listen for changes to the selected options and apply the source
    container.addEventListener('input', (event) => {
      applyTexture(channel, event.target.value)
      MarkupMethods.setStyledMarkup(event.target, getNames, getTextures)
    })

    /// Refresh the list of options and find the selected one
    existingOptions = Array.from(container.querySelectorAll('option'))
    const selected = existingOptions.filter((option) => option.selected)[0]
    /// Apply source once
    applyTexture(channel, selected.value)

    MarkupMethods.setStyledMarkup(selected, getNames, getTextures)
  },

  applyTexture: (channel, sourcePath) => {
    if (sourcePath == "") {
      channel.texture.source.setURI(null)
    }
    else {
      channel.texture.source.setURI(sourcePath)
    }
  }

}