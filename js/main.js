Platforms.addInstance(DUMB_TYPE)
Platforms.addInstance(AVG_TYPE)
Platforms.addInstance(SMART_TYPE)

function render() {
  renderer.render(scene, camera)
}

function animate() {
  stats.begin()

  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  TWEEN.update()

  shaderTime.value = performance.now() / 1000

  render()

  stats.end()

  requestAnimationFrame(animate)
}

animate()

function decisionLoop() {
  Platforms.update()
  window.setTimeout(decisionLoop, params.decisionInterval)
}

decisionLoop()
