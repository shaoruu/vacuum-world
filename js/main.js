function render() {
  renderer.render(scene, camera)
}

function animate() {
  stats.begin()

  controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
  TWEEN.update()

  render()

  stats.end()

  requestAnimationFrame(animate)
}

animate()
