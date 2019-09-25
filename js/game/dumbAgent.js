class DumbAgent extends Agent {
  constructor(world) {
    super(world)

    this.prefix = 'Dumb: '

    this.firstPos.z = -PLATFORM_HEIGHT - PLATFORM_MARGIN
    this.secondPos.z = -PLATFORM_HEIGHT - PLATFORM_MARGIN

    this.meshes.position.copy(this.firstPos)
    this.agentBody.rotation.y = this.firstRot

    this.changeText()
  }

  decide() {
    return this.irrationallyDecide()
  }
}
