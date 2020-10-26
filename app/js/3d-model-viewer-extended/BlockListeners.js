const BlockListeners = {
  create: (container, viewer) => {
    const blockAttributes = ['block-mouse-drag', 'block-touch', 'block-touch-unlockable', 'block-scrollwheel']

    let eventBlocker
    // The only way to create any of the blocks is to create an element that blocks everything.
    // Therefore we afterwards have to pass the unused blocks into the viewer again
    if (hasAttributes(viewer, blockAttributes)){
      eventBlocker = viewer.insertBefore(document.createElement('div'), viewer.firstChild)
      eventBlocker.classList.add("event-blocker")
      eventBlocker.setAttribute("slot", "hotspot-blocker");
    }
    if (eventBlocker == null) {
      return
    }

    blockMouseDrag(viewer, eventBlocker)

    blockScrollWheel(viewer, eventBlocker)
      
    blockTouch(viewer, eventBlocker)

  },

  blockMouseDrag: (viewer, eventBlocker) => {
    // Mouse dragging isn't blocked so we pass it through
    if (!viewer.hasAttribute('block-mouse-drag')){
      redirectEvent('mousedown', eventBlocker, viewer.shadowRoot.querySelector('.userInput'), () => {
        //// Set the current viewer in focus, so we can show the debug using "q"
        // viewer.focus()
        //focusedViewer = viewer
        
        return true
      })
      redirectEvent('mousemove', eventBlocker, viewer.shadowRoot.querySelector('.userInput'))
    }
  },

  blockScrollWheel: (viewer, eventBlocker) => {
    // Scroll wheel isn't blocked so we pass it through
    if (!viewer.hasAttribute('block-scrollwheel')){
      redirectEvent('wheel', eventBlocker, viewer.shadowRoot.querySelector('.userInput'))
    }
  },

  blockTouch: (viewer, eventBlocker) => {
    // Touch events aren't blocked so we pass them through
    if (!viewer.hasAttribute('block-touch') && !viewer.hasAttribute('block-touch-unlockable')){
      // Just pass the touch event to
      redirectEvent('touchstart', eventBlocker, viewer.shadowRoot.querySelector('.userInput'))
      redirectEvent('touchmove', eventBlocker, viewer.shadowRoot.querySelector('.userInput'))
    }

    // If touch events are blocked, but unlockable, we set up some unique event handlers
    else if (viewer.hasAttribute('block-touch-unlockable')){
      // If touch events require focus, set up extra checks
      let touchUnlock
      let touchLock
      redirectEvent('touchstart', eventBlocker, viewer.shadowRoot.querySelector('.userInput'), (event) => {
        clearTimeout(touchLock)  
        if (!viewer.hasAttribute('touch-unlocked')){
          touchUnlock = setTimeout(()=> {
            viewer.setAttribute('touch-unlocked', true)
            const toEvent = new event.constructor(event.type, event)
            eventBlocker.dispatchEvent(toEvent)
          }, 200)
          return false
        }
        return true
      })
      redirectEvent('touchmove', eventBlocker, viewer.shadowRoot.querySelector('.userInput'), (event) => {
        if (!viewer.hasAttribute('touch-unlocked')){
          clearTimeout(touchUnlock)
          return false
        }
        return true
      })

      window.addEventListener('touchend', (e) => {
        clearTimeout(touchUnlock)
        if (viewer.hasAttribute('touch-unlocked')){
          touchLock = setTimeout(()=> {
            viewer.removeAttribute('touch-unlocked')
          }, 500)
        }
      })
    }
  },

  hasAttributes: (element, attributesArray) => {
    for (let i = 0; i < attributesArray.length; i++) {
      if (element.hasAttribute(attributesArray[i])){
        return true
      }
    }
    return false
  },

  redirectEvent: (eventType, fromElement, toElement, conditionFunction = (event) => {return true}) => {
    fromElement.addEventListener(eventType, (event) => {
      if (conditionFunction(event)) {
        const toEvent = new event.constructor(event.type, event)
        toElement.dispatchEvent(toEvent)
        //event.preventDefault()
        //event.stopPropagation()
      }
    })
  }

}