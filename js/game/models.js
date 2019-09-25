const shaderTime = { value: 0 }

/* -------------------------------------------------------------------------- */
/*                                    PLATFORM                                   */
/* -------------------------------------------------------------------------- */
const platformGeo = new THREE.PlaneBufferGeometry(PLATFORM_WIDTH, PLATFORM_HEIGHT)
const platformMat = new THREE.MeshLambertMaterial({
  color: PLATFORM_COLOR,
  side: THREE.DoubleSide
})
const platformMesh = new THREE.Mesh(platformGeo, platformMat)
platformMesh.rotation.x = -Math.PI / 2

/* -------------------------------------------------------------------------- */
/*                                    AGENT                                   */
/* -------------------------------------------------------------------------- */
const agentGeo = new THREE.IcosahedronBufferGeometry(AGENT_RADIUS)
const agentMat = new THREE.MeshLambertMaterial({ color: AGENT_COLOR })
const agent = new THREE.Mesh(agentGeo, agentMat)

agentMat.onBeforeCompile = shader => {
  shader.uniforms.time = shaderTime
  shader.vertexShader =
    `
         uniform float time;
         ` + shader.vertexShader
  const token = '#include <begin_vertex>'
  const customTransform = `
        vec3 transformed = vec3(position);
        transformed.x = position.x 
             + cos(position.y*10.0 + time*10.0) * 5.0;
    `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}

const agentArrGeo = new THREE.ConeBufferGeometry(AGENT_RADIUS / 4, AGENT_RADIUS / 2, 32)
const agentArrMat = new THREE.MeshLambertMaterial({ color: AGENT_ARROW_COLOR })
const agentArrMesh = new THREE.Mesh(agentArrGeo, agentArrMat)

agentArrMesh.position.set(0, 0, AGENT_RADIUS)
agentArrMesh.rotation.set(Math.PI / 2, 0, 0)

const agentMesh = new THREE.Group()

agentMesh.add(agent)
agentMesh.add(agentArrMesh)
agentMesh.position.y = AGENT_RADIUS

/* -------------------------------------------------------------------------- */
/*                                    TREAT                                   */
/* -------------------------------------------------------------------------- */
const treatGeo = new THREE.CylinderBufferGeometry(
  TREAT_RADIUS,
  TREAT_RADIUS,
  TREAT_HEIGHT,
  16
)
const treatMat = new THREE.MeshLambertMaterial({ color: TREAT_COLOR })
const treatMesh = new THREE.Mesh(treatGeo, treatMat)

treatMat.onBeforeCompile = shader => {
  shader.uniforms.time = shaderTime
  shader.vertexShader =
    `
         uniform float time;
         ` + shader.vertexShader
  const token = '#include <begin_vertex>'
  const customTransform = `
        vec3 transformed = vec3(position);
        transformed.y = position.y
             + cos(position.x + time*5.0) * 3.0;
    `
  shader.vertexShader = shader.vertexShader.replace(token, customTransform)
}
