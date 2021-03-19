const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomIntegerWithSign = (min, max) => {
  let num = Math.floor(Math.random() * (max - min + 1)) + min
  if (Math.floor(Math.random() * 10 + 1) < 6) num *= -1
  return num
}

module.exports = {
  getRandomNumber,
  getRandomIntegerWithSign,
}
