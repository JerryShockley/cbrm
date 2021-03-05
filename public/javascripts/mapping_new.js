/**
 * js file for the relationship mapping page: grid.html
 *
 * A dataPoint is a javascript object containing all information
 * relavent to a single brand. They are stored (duplicated) in two
 * maps based on two different key types. This It is used to contain the data
 * that is stored in the DB.
 * */

// Globals.  We use this instead of a state machine because it
// is small.

// HTML node used to add the point on the circle.
const svg = document.getElementById(`mysvg`)
// Specifies the SVG namespace for use in createElementNS().
const NS = svg.getAttribute(`xmlns`)
// HTML node used to add brand names to the list.
const brandList = document.getElementById(`brand-list`)
// HTML node used to manage the modal dialog visibility.
const modalDialog = document.getElementById(`brand-modal`)
// HTML node used to capture the click event of the page's submit button.
const submitButton = document.getElementById(`submit`)
// MTML node used to capture the click event of the dialogs save button.
const saveButton = modalDialog.getElementsByClassName(`save`)[0]
// HTML node used to access the dialog brand name input.
const brandName = document.getElementById(`brand-name`)
// HTML node used to access the dialog brand notes input.
const brandNotes = document.getElementById(`brand-notes`)
// Map of dataPoint values with a stringifyed svg coordinates key.
// Note the points map and the brands map contain the same values.
const points = new Map()
// Map of dataPoint values with the brand name as the key.
// Note the points map and the brands map contain the same values.
const brands = new Map()
// Map key used to store a partial data value while awaiting user
// input of the brand info from the dialog.
const tmpKey = `partial`
// Incremented by 1 each time a dataPoint is added.
let pointCount = 0
// Stores the maximum number of points the user is allowed to add.
// Note this value cannot be greater than the number of elements
// in styled in mapping.css.
const maxPointCount = 12

svg.addEventListener(`pointerdown`, addDataPointHandler)
saveButton.addEventListener(`click`, saveButtonHandler, false)
submitButton.addEventListener(`click`, submitButtonHandler, false)

function submitButtonHandler(event) {
  const dbPoints = []

  brands.forEach((point, key) => {
    dbPoints.push(filterDbMappingObject(point))
  })
  sendDbPoints(dbPoints)
}

function sendDbPoints(dbPoints) {
  axios.post(`/mappings/create`, { points: dbPoints }).then(
    (response) => {
      const cport = window.location.port
      const cportStr = cport ? `:${cport}` : ``
      console.log(`port = ${cport}`)
      const showUrl = `${window.location.protocol}//${window.location.hostname}${cportStr}${response.data.location}`
      window.location.assign(showUrl)
    },
    (error) => {
      alert(`Failed: ${error}`)
    }
  )
}

function calculateRadius(x, y) {
  return Math.sqrt(x * x + y * y)
}

// Coordinate radius from center is <= 100.
function isValidCoordinate(x, y) {
  return calculateRadius(x, y) <= 100
}

function filterDbMappingObject(point) {
  const dbKeynames = [
    `brand`,
    `notes`,
    `order`,
    `cartesianX`,
    `cartesianY`,
    `duration`,
  ]
  const dbPoint = {}

  dbKeynames.forEach((dbKey) => {
    dbPoint[dbKey] = point[dbKey]
  })
  return dbPoint
}

function addDataPointHandler(event) {
  if (pointCount === maxPointCount) return
  const dataPoint = createdataPointObject(event)
  if (!isValidCoordinate(dataPoint.svgX, dataPoint.svgY)) return
  pointCount += 1 // must be 1st line because it changes global
  brands.set(dataPoint.brand, dataPoint)
  renderDataPoint(dataPoint)
  modalDialog.style.display = `block`
  brandName.focus()
}

// Creates a partial dataPoint object because we haven't
// recieved the brand info from our dialog box yet.
function createdataPointObject(event) {
  const coordinates = translateScreenCoordinates(event)
  return {
    brand: tmpKey,
    notes: ``,
    order: pointCount + 1,
    duration: 0,
    // dom screen coordinates
    screenX: event.clientX,
    screenY: event.clientY,
    svgX: coordinates.svgX,
    svgY: coordinates.svgY,
    cartesianX: coordinates.cartesianX,
    cartesianY: coordinates.cartesianY,
    domNode: event.target,
  }
}

// Translates to SVG and cartesian coordinates. Rounds all values to nearest
// integer.
function translateScreenCoordinates(event) {
  const svgP = translateScreen2SvgCoordinates(svg, event.clientX, event.clientY)
  return {
    // svg coordinates
    svgX: Math.round(svgP.x),
    svgY: Math.round(svgP.y),
    // cartesian coordinates
    cartesianX: Math.round(svgP.x),
    cartesianY: -Math.round(svgP.y),
  }
}

// Translate page coordinates to SVG co-ordinate
function translateScreen2SvgCoordinates(element, x, y) {
  const pt = element.createSVGPoint()
  pt.x = x
  pt.y = y
  return pt.matrixTransform(svg.getScreenCTM().inverse())
}

function renderDataPoint() {
  const newCircle = document.createElementNS(NS, `circle`)
  const dataPoint = brands.get(tmpKey)
  newCircle.setAttribute(`cx`, dataPoint.svgX)
  newCircle.setAttribute(`cy`, dataPoint.svgY)
  newCircle.setAttribute(`r`, 1)
  newCircle.setAttribute(`class`, `point`)
  newCircle.setAttribute(`id`, `pt${dataPoint.order}`)
  svg.appendChild(newCircle)
}

// **************   Modal Dialog  ***************
// eslint-disable-next-line no-unused-vars
function saveButtonHandler(event) {
  if (brandName.value === undefined) return
  input = {
    brand: brandName.value,
    notes: brandNotes.value || ``,
  }
  brandName.value = ``
  brandNotes.value = ``
  completePartialMapEntry(input)
  modalDialog.style.display = `none`
  renderBrandName(brands.get(input.brand))
}

function completePartialMapEntry(userInput) {
  partialDataPoint = brands.get(tmpKey)
  partialDataPoint.brand = userInput.brand
  partialDataPoint.notes = userInput.notes
  brands.delete(tmpKey) // Must do this before adding new due to size limit.
  brands.set(partialDataPoint.brand, partialDataPoint)
  points.set(stringifyCoordinates(partialDataPoint.svgX, partialDataPoint.svgY))
}

// Creates a Map key for the points Map by stringifying the SVG coordinates.
function stringifyCoordinates(x, y) {
  return `X${x}Y${y}`
}

function renderBrandName() {
  const newBrand = document.createElement(`li`)
  const dataPoints = Array.from(brands.values()) // Make it easy to get last dP.
  const dataPoint = dataPoints.pop() // gets the last dataPoint added.
  newBrand.setAttribute(`class`, `brand`)
  newBrand.setAttribute(`id`, `brand${dataPoint.order}`)
  newBrand.textContent = dataPoint.brand
  brandList.appendChild(newBrand)
}
