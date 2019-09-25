class AvgAgent extends Agent {
  constructor(world) {
    super(world)

    this.prefix = 'Average: '

    this.meshes.position.copy(this.firstPos)
    this.agentBody.rotation.y = this.firstRot

    this.changeText()
  }

  decide(data) {
    const randomDouble = Math.random()

    if (randomDouble > 0.5) {
      return this.irrationallyDecide()
    } else {
      return this.rationallyDecide(data)
    }
  }
}
