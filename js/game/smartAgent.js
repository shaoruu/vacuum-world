class SmartAgent extends Agent {
  constructor(world) {
    super(world)

    this.prefix = 'Smart: '

    this.firstPos.z = PLATFORM_HEIGHT + PLATFORM_MARGIN
    this.secondPos.z = PLATFORM_HEIGHT + PLATFORM_MARGIN

    this.meshes.position.copy(this.firstPos)
    this.agentBody.rotation.y = this.firstRot

    this.changeText()
  }

  decide(data) {
    return this.rationallyDecide(data)
  }
}
