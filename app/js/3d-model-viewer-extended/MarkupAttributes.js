const MarkupAttributes = {
  
  create: (container, material) => {
    const attributeContainer = MarkupMethods.createContainer(container, 'fieldset', 'attributes')

    const attributesArray = Array.from(attributeContainer.querySelectorAll('input'))

    if (material.pbrMetallicRoughness != null && material.pbrMetallicRoughness != null) {

      /// Create the color picker
      const color = MarkupMethods.addRemoveElement("color", 'input', attributesArray, attributeContainer, false)
      color.type = "color"
      const baseColor = material.pbrMetallicRoughness.baseColorFactor
      const hex = Helpers.RGBToHex(Math.round(baseColor[0] * 255), Math.round(baseColor[1] * 255), Math.round(baseColor[2] * 255))
      color.value = hex
      color.addEventListener('input', (e) => {
        const rgb = Helpers.hexToRGB(e.target.value)
        rgb.push(1)
        //material.pbrMetallicRoughness.setBaseColorFactor(rgb)
      })

      /// Create the roughness picker
      const roughness = MarkupMethods.addRemoveElement("roughness", 'input', attributesArray, attributeContainer, false)
      roughness.type = "range"
      roughness.min = "0"
      roughness.max = "1"
      roughness.step = "0.01"
      if (roughness.generated) {
        roughness.value = material.pbrMetallicRoughness.roughnessFactor
      }
      roughness.addEventListener('input', (e) => {
        material.pbrMetallicRoughness.setRoughnessFactor(e.target.value)
      })
      material.pbrMetallicRoughness.setRoughnessFactor(roughness.value)

      /// Create the metalness picker
      const metalness = MarkupMethods.addRemoveElement("metalness", 'input', attributesArray, attributeContainer, false)
      metalness.type = "range"
      metalness.min = "0"
      metalness.max = "1"
      metalness.step = "0.01"
      if (metalness.generated) {
        metalness.value = material.pbrMetallicRoughness.metallicFactor
      }
      metalness.addEventListener('input', (e) => {
        material.pbrMetallicRoughness.setMetallicFactor(e.target.value)
      })
      material.pbrMetallicRoughness.setMetallicFactor(metalness.value)
    }
    else {
      MarkupMethods.addRemoveElement("roughness", 'input', attributesArray, attributeContainer, true)
      MarkupMethods.addRemoveElement("metalness", 'input', attributesArray, attributeContainer, true)
    }
  }

}