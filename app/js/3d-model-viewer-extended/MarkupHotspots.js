const MarkupHotspots = {
  create: (container, viewer) => {
    // Get all hotspots that also has an animation tag
    const hotspotAnimations = viewer.querySelectorAll('*[animation]')

    hotspotAnimations.forEach((hotspot) => {
      hotspot.addEventListener("click", (e) => {
        const animationName = hotspot.getAttribute('animation')
        if (viewer.animationName == animationName) {
          viewer.removeAttribute('autoplay')
        }
        else {
          viewer.setAttribute('autoplay', true)
          viewer.setAttribute('animation-name', animationName)
        }
      })
    })
  }
}