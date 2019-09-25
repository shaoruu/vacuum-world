function mergeGeometries(geoData) {
  if (!geometries || geometries.length === 0) return null

  const mergedGeometry = new THREE.Geometry()
  const matrix = new THREE.Matrix4()

  geoData.forEach(({ geometry, pos }) => {
    matrix.makeTranslation(pos.x, pos.y, pos.z)
    mergedGeometry.merge(geometry, matrix)
  })

  return new THREE.BufferGeometry().fromGeometry(mergedGeometry)
}
