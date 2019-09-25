class Agent {
  constructor(world) {
    this.world = world

    this.init()
  }

  init() {
    const agent = agentMesh.clone()

    this.canvas = document.createElement('canvas')
    this.canvas.width = AGENT_TEXT_WIDTH
    this.canvas.height = AGENT_TEXT_HEIGHT

    this.spriteTexture = new THREE.CanvasTexture(this.canvas)
    const textMat = new THREE.SpriteMaterial({ map: this.spriteTexture })
    const textSprite = new THREE.Sprite(textMat)
    textSprite.scale.set(64, 32, 1.0)

    textSprite.position.y = AGENT_RADIUS * 2 + AGENT_TEXT_OFFSET

    this.meshes = new THREE.Group()
    this.meshes.add(agent)
    this.meshes.add(textSprite)

    scene.add(this.meshes)

    this.agentBody = agent

    this.firstPos = new THREE.Vector3(PLATFORM_WIDTH / 4, 0, 0)
    this.firstRot = -Math.PI / 2
    this.secondPos = new THREE.Vector3(-PLATFORM_WIDTH / 4, 0, 0)
    this.secondRot = Math.PI / 2

    this.currPos = FIRST_SLOT
    this.count = 0
  }

  sense() {
    return this.world.grid
  }

  decide() {}

  rationallyDecide(data) {
    if (data[this.currPos]) return VACUUM
    return MOVE_OTHER
  }

  irrationallyDecide() {
    const choices = [MOVE_OTHER, VACUUM]
    return choices[Math.floor(Math.random() * 2)]
  }

  act(decision) {
    switch (decision) {
      case VACUUM:
        tweenToDrink(this.agentBody, AGENT_DRINK_ROTATION).onComplete(() => {
          this.world.grid[this.currPos] = 0
          this.world.drawGrid()
        })
        break
      case MOVE_OTHER:
        if (this.currPos === FIRST_SLOT) this.moveLeft()
        else this.moveRight()
        break
    }

    this.count++

    this.changeText()
  }

  update() {
    this.act(this.decide(this.sense()))
  }

  moveLeft() {
    tweenToPosition(this.meshes, this.secondPos).onComplete(() =>
      tweenToRotation(this.agentBody, this.secondRot)
    )
    this.currPos = SECOND_SLOT
  }

  moveRight() {
    tweenToPosition(this.meshes, this.firstPos).onComplete(() =>
      tweenToRotation(this.agentBody, this.firstRot)
    )
    this.currPos = FIRST_SLOT
  }

  changeText(t) {
    const text = t || this.prefix + this.count
    const ctx = this.canvas.getContext('2d')
    ctx.font = '40px Comic Sans MS'
    ctx.fillStyle = CANVAS_BORDER_COLOR
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR
    ctx.fillRect(10, 10, this.canvas.width - 20, this.canvas.height - 20)
    ctx.fillStyle = CANVAS_TEXT_COLOR
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2)
    this.spriteTexture.needsUpdate = true
  }
}
