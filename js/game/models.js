/* -------------------------------------------------------------------------- */
/*                               VACUUM CLEANER                               */
/* -------------------------------------------------------------------------- */
const vacuumCleaner = new THREE.Group()

const vacuumHeadGeo = new THREE.SphereBufferGeometry(
  25,
  32,
  32,
  0,
  Math.PI * 2,
  0,
  Math.PI / 2
)
const vacuumHeadMat = new THREE.MeshLambertMaterial({ color: VACUUM_HEAD_COLOR })
const vacuumHeadMesh = new THREE.Mesh(vacuumHeadGeo, vacuumHeadMat)

vacuumHeadMesh.position.y = 50

const vacuumBodyGeo = new THREE.SphereBufferGeometry(50, 32, 32)
const vacuumBodyMat = new THREE.MeshLambertMaterial({ color: VACUUM_BODY_COLOR })
const vacuumBodyMesh = new THREE.Mesh(vacuumBodyGeo, vacuumBodyMat)

vacuumCleaner.add(vacuumHeadMesh)
vacuumCleaner.add(vacuumBodyMesh)
