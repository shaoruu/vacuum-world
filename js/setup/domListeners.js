function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

window.addEventListener('keydown', e => {
  const { keyCode } = e
  if (keyCode === 65) Platforms.restart()
})
