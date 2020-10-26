const MarkupMethods = {

  createContainer: (parentContainer, type, name) => {
    let container = parentContainer.querySelector('fieldset[name="' + name + '"]')
    if (container == null) {
      container = parentContainer.appendChild(document.createElement(type), parentContainer.lastChild)
      container.name = name
    }
    return container
  },

  addRemoveElement: (name, type, childrenArray, container, remove, onCreated = (element) => {}) => {
    let element = childrenArray.find((element) => element.name == name)
    if (element === undefined){
      if (!remove){
        element = container.appendChild(document.createElement(type))
        element.name = name
        element['generated'] = true
        onCreated(element)
      }
    }
    else {
      if (remove) {
        element.parentNode.removeChild(element)
      }
      else {
        // To make sure the order of the elements are always the same in the dom
        // we clone the node, remove it and append it again to the end of the stack
        // That way the stack always has the same order, even if a node was added
        // directly in the dom
        const clone = element.cloneNode(true)
        element.parentNode.removeChild(element)
        element = container.appendChild(clone)
      }
    }
    return element
  },

  getFileName: (path) => {
    return path.split(/(\\|\/)/g).pop()
  },

  select: (obj, task) => {
    // if task is a direct number, we just want to jump to that
    if (!isNaN(task)) {
      const val = parseInt(task)
      obj.selectedIndex = Math.min(Math.max(val, 0), obj.options.length - 1)
    }
    // If task is a "task", then we fulfill that
    else {
      let val
      if (task == "next") {
        val = 1
      }
      else if (task == "previous") {
        val = -1
      }
      const length = obj.options.length
      // Magic solution taken from here: https://stackoverflow.com/a/17323608
      obj.selectedIndex = (((obj.selectedIndex + val) % length) + length) % length
    }
    obj.options[obj.selectedIndex].setAttribute("selected", true)
    obj.dispatchEvent(new Event("input"))
  },

  setStyledMarkup: (selected, getNames, getTextures) => {
    getTextures.forEach((texture) => {
      texture.src = selected.value
    })

    let nameString = selected.value.replace(/^.*[\\\/]/, '')
    if (nameString == "") {
      nameString = "Default"
    }
    // Update all name elements
    getNames.forEach((name) => {
      name.innerHTML = nameString
    })
  }

}