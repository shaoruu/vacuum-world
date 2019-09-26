/**
 * type:
 *  1 - dumb
 *  2 - average
 *  3 - smart
 */
function PlatformProto(type, gridData) {
  this.type = type

  this.grid = JSON.parse(JSON.stringify(gridData))
  this.init()
}

PlatformProto.prototype.init = function() {
  /* -------------------------------------------------------------------------- */
  /*                                  INIT MESH                                 */
  /* -------------------------------------------------------------------------- */
  this.platform = platformMesh.clone()

  switch (this.type) {
    case DUMB_TYPE:
      this.platform.position.z = -PLATFORM_HEIGHT - PLATFORM_MARGIN
      this.agent = new DumbAgent(this)
      break
    case AVG_TYPE:
      this.agent = new AvgAgent(this)
      break
    case SMART_TYPE:
      this.platform.position.z = PLATFORM_HEIGHT + PLATFORM_MARGIN
      this.agent = new SmartAgent(this)
      break
  }

  scene.add(this.platform)

  /* -------------------------------------------------------------------------- */
  /*                                INIT GARBAGE                                */
  /* -------------------------------------------------------------------------- */
  this.treatMeshes = new THREE.Group()
  this.treatMeshes.position.y = TREAT_Y_OFFSET

  this.drawGrid()

  scene.add(this.treatMeshes)
}

PlatformProto.prototype.drawGrid = function() {
  // remove all children
  while (this.treatMeshes.children.length) {
    this.treatMeshes.remove(this.treatMeshes.children[0])
  }

  if (this.grid[0]) {
    const newTreat = treatMesh.clone()
    newTreat.position.copy(this.agent.firstPos)
    this.treatMeshes.add(newTreat)
  }
  if (this.grid[1]) {
    const newTreat = treatMesh.clone()
    newTreat.position.copy(this.agent.secondPos)
    this.treatMeshes.add(newTreat)
  }
}

PlatformProto.prototype.update = function() {
  if (this.grid[0] || this.grid[1]) {
    this.agent.update()
  }
}

const Platforms = (function() {
  let instances = new Map()

  let grid = [Number(Math.random() > 0.5)]
  grid.push(grid[0] ? Number(Math.random() > 0.5) : 1)

  return {
    getInstances() {
      return instances
    },
    getInstanceByType(type) {
      return instances.get(type)
    },
    addInstance(type) {
      const newInstance = new PlatformProto(type, grid)

      instances.set(type, newInstance)

      return newInstance
    },
    update() {
      instances.forEach(m => m.update())
    },
    restart() {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0])
      }
      instances.forEach((_, k) => instances.delete(k))

      addLights()

      grid = [Number(Math.random() > 0.5)]
      grid.push(grid[0] ? Number(Math.random() > 0.5) : 1)

      this.addInstance(DUMB_TYPE)
      this.addInstance(AVG_TYPE)
      this.addInstance(SMART_TYPE)
    }
  }
})()
