const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const userBlockWidth =120
const userBlockHeight = 10
const ballDiameter = 20
const boardWidth = 1215
const boardHeight = 540
let xDirection = -2
let yDirection = 2

const userStart = [550, 10]
let currentPosition = userStart

const ballStart = [580, 30]
let ballCurrentPosition = ballStart

let timerId
let score = 0

//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

//all my blocks
const blocks = [
  new Block(10, 510),
  new Block(120, 510),
  new Block(230, 510),
  new Block(340, 510),
  new Block(450, 510),
  new Block(560, 510),
  new Block(670, 510),
  new Block(780, 510),
  new Block(890, 510),
  new Block(1000, 510),
  new Block(1110, 510),
  new Block(10, 480),
  new Block(120, 480),
  new Block(230, 480),
  new Block(340, 480),
  new Block(450, 480),
  new Block(560, 480),
  new Block(670, 480),
  new Block(780, 480),
  new Block(890, 480),
  new Block(1000, 480),
  new Block(1110, 480),
  new Block(10, 450),
  new Block(120, 450),
  new Block(230, 450),
  new Block(340, 450),
  new Block(450, 450),
  new Block(560, 450),
  new Block(670, 450),
  new Block(780, 450),
  new Block(890, 450),
  new Block(1000, 450),
  new Block(1110, 450),
  new Block(10, 420),
  new Block(120, 420),
  new Block(230, 420),
  new Block(340, 420),
  new Block(450, 420),
  new Block(560, 420),
  new Block(670, 420),
  new Block(780, 420),
  new Block(890, 420),
  new Block(1000, 420),
  new Block(1110, 420),
  new Block(10, 390),
  new Block(120, 390),
  new Block(230, 390),
  new Block(340, 390),
  new Block(450, 390),
  new Block(560, 390),
  new Block(670, 390),
  new Block(780, 390),
  new Block(890, 390),
  new Block(1000, 390),
  new Block(1110, 390),
  new Block(10, 360),
  new Block(120, 360),
  new Block(230, 360),
  new Block(340, 360),
  new Block(450, 360),
  new Block(560, 360),
  new Block(670, 360),
  new Block(780, 360),
  new Block(890, 360),
  new Block(1000, 360),
  new Block(1110, 360),
]

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 20
        console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - userBlockWidth-5)) {
        currentPosition[0] += 20
        console.log(currentPosition[0])
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 10)

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + userBlockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + userBlockHeight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}
