// initialize
const svg = document.getElementById(`mysvg`)
const NS = svg.getAttribute(`xmlns`)
const points = new Map()
const brands = new Map()
const brandListNode = document.getElementById(`brand-list`)
const maxPointCount = 12
let pointCount = 0
const colors = [
  `Red`,
  `DarkOrange`,
  `Magenta`,
  `BlueViolet`,
  `LimeGreen`,
  `Teal`,
  `Cyan`,
  `DodgerBlue`,
  `SandyBrown`,
  `SaddleBrown`,
  `Maroon`,
  `Navy`,
]

// events
// svg.addEventListener(`pointerdown`, getCoordinates);
svg.addEventListener(`pointerdown`, addDataPoint)

// Handle pointerdown event
function addDataPoint(event) {
  if (pointCount === maxPointCount) return

  pointCount += 1 // must be 1st line because it changes global
  const dataPoint = createdataPointObject(event)
  points.set(stringifyCoordinates(dataPoint.svgX, dataPoint.svgY), dataPoint)
  brands.set(dataPoint.brand, dataPoint)
  renderDataPoint(dataPoint)
}

function stringifyCoordinates(x, y) {
  return `X${x}Y${y}`
}

function createdataPointObject(event) {
  const input = getDataPointUserInput()
  const coordinates = transformCoordinates(event)
  const dataPoint = {
    brand: input.brand,
    notes: input.notes,
    screenX: coordinates.screenX,
    screenY: coordinates.screenY,
    svgX: coordinates.svgX,
    svgY: coordinates.svgY,
    cartesianX: coordinates.cartesianX,
    cartesianY: coordinates.cartesianY,
    domNode: event.target,
  }
  return dataPoint
}

// Get brand name and notes from user.
function getDataPointUserInput() {
  return {
    brand: `Brand ${pointCount}`,
    notes: `This is some very cool stuff. What do you think?`,
  }
}

// transform coordinates
function transformCoordinates(event) {
  const svgP = svgPoint(svg, event.clientX, event.clientY)
  const tCoordinates = {
    // dom coordinates
    screenX: event.clientX,
    screenY: event.clientY,
    // svg coordinate
    svgX: Math.round(svgP.x),
    svgY: Math.round(svgP.y),
    // cartesian coordinates
    cartesianX: Math.round(svgP.x),
    cartesianY: -Math.round(svgP.y),
  }
  return tCoordinates
}

// add a circle to the target
function renderDataPoint(dataPoint) {
  // circle clicked?
  // if (event.target.nodeName === `circle`) return;

  // add circle to containing element
  // target = event.target.closest(`g`) || event.target.ownerSVGElement || event.target,
  // svgP = svgPoint(event.target, event.clientX, event.clientY),
  // cX = Math.round(svgP.x),
  // cY = Math.round(svgP.y),
  circle = document.createElementNS(NS, `circle`)
  brand = document.createElement(`li`)
  circle.setAttribute(`cx`, dataPoint.svgX)
  circle.setAttribute(`cy`, dataPoint.svgY)
  circle.setAttribute(`r`, 1)
  circle.setAttribute(`fill`, colors[pointCount - 1])
  circle.setAttribute(`class`, `point`)
  circle.setAttribute(`id`, `pt${pointCount}`)
  brand.setAttribute(`class`, `brand`)
  brand.setAttribute(`id`, `brand${pointCount}`)
  brand.textContent = dataPoint.brand
  svg.appendChild(circle)
  brandListNode.appendChild(brand)
}

// translate page to SVG co-ordinate
function svgPoint(element, x, y) {
  const pt = element.createSVGPoint()
  pt.x = x
  pt.y = y
  return pt.matrixTransform(svg.getScreenCTM().inverse())
}
