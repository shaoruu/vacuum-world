function tweenToPosition(mesh, position, delay = 200) {
  return new TWEEN.Tween(mesh.position).to(position, delay).start()
}

function tweenToRotation(mesh, rotation, delay = DEFAULT_DELAY) {
  return new TWEEN.Tween(mesh.rotation).to({ y: rotation }, delay).start()
}

function tweenToDrink(mesh, rotation, totalDelay = DEFAULT_DELAY) {
  const originalY = mesh.rotation.y
  const t0 = new TWEEN.Tween(mesh.rotation)
    .to({ y: originalY - rotation }, totalDelay / 3)
    .easing(TWEEN.Easing.Quadratic.Out)
  const t1 = new TWEEN.Tween(mesh.rotation)
    .to({ y: originalY + rotation }, totalDelay / 3)
    .easing(TWEEN.Easing.Quadratic.Out)
  const t2 = new TWEEN.Tween(mesh.rotation)
    .to({ y: originalY }, totalDelay / 3)
    .easing(TWEEN.Easing.Quadratic.Out)

  t0.chain(t1)
  t1.chain(t2)
  return t0.start()
}
