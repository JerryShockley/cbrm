const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomCircleCoordinates = (radius) => {
  const coordinates = {}
  const r = randomNumber(0, radius)
  const theta = getRandomDecimal(0, 2 * Math.PI)
  coordinates.x = r * Math.cos(theta)
  coordinates.x *= randomNumber(1, 10) < 6 ? 1 : -1
  coordinates.y = r * Math.sin(theta)
g coordinates.y *= randomNumber(1, 10) < 6 ? 1 : -1
  return coordinates
}

const randomDecimal = (min, max) => {
  return Math.random() * (max - min) + min
}

const randomInteger = (min, max) => {
  let num = randomInteger(min, max)
  if (Math.floor(Math.random() * 10 + 1) < 6) num *= -1
  return num
}

module.exports = {
  randomNumber,
  randomCircleCoordinates,
  randomDecimal,
  randomInteger,
}
