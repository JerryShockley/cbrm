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
// HTML node used to capture the click event of the dialog's cancel button.
const cancelButton = modalDialog.getElementsByClassName(`cancel`)[0]
// HTML node used to capture the click event of the dialogs save button.
const saveButton = modalDialog.getElementsByClassName(`save`)[0]
// HTML node used to access the dialog brand name input.
const brandName = document.getElementById(`brand-name-input`)
// HTML node used to access the dialog brand notes input.
// const brandNotes = document.getElementById(`brand-notes`)
const timerStartButton = document.getElementById(`start-button`)
const pausedDialog = document.getElementById(`paused-modal`)
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
cancelButton.addEventListener(`click`, cancelButtonHandler, false)
submitButton.addEventListener(`click`, submitButtonHandler, false)
timerStartButton.addEventListener(`click`, timerStartButtonHandler, false)
brandName.addEventListener(`keyup`, brandNameKeyupHandler, false)

function submitButtonHandler(event) {
  if (brands.size === 0) return
  const dbPoints = []
  brands.forEach((point, key) => {
    dbPoints.push(filterDbMappingObject(point))
  })
  sendDbPoints(dbPoints)
}

function sendDbPoints(dbPoints) {
  axios
    .post(`/9339/respondents/create`, {
      points: dbPoints,
      project_id: document.getElementById(`project-id`).value,
    })
    .then(
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

// Used to determine the coordinates' distance from the center.
function calculateRadius(x, y) {
  return Math.sqrt(x * x + y * y)
}

// Coordinate radius from center is <= 100.
function isValidCoordinate(x, y) {
  return calculateRadius(x, y) <= 100
}

// Extracts just the information stored in the db.
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
  const dataPoint = createdataPointObject(event)
  if (
    !isValidCoordinate(dataPoint.svgX, dataPoint.svgY) ||
    pointCount === maxPointCount
  ) {
    return
  }

  pointCount += 1 // position dependent check carefully before moving.
  brands.set(dataPoint.brand, dataPoint)
  renderDataPoint(dataPoint)
  modalDialog.style.display = `block`
  window.setTimeout(() => {
    document.getElementById(`brand-name-input`).focus()
  }, 0)
}

// Creates a partial dataPoint object because we haven't
// recieved the brand info from our dialog box yet.
function createdataPointObject(event) {
  const coordinates = translateScreenCoordinates(event)
  return {
    brand: tmpKey,
    notes: ``,
    order: pointCount + 1,
    duration: pointSeconds,
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
  newCircle.setAttribute(`r`, 1.5)
  newCircle.setAttribute(`class`, `point pt${dataPoint.order}`)
  newCircle.setAttribute(`id`, pointIdStr(dataPoint.order))
  svg.appendChild(newCircle)
}

function handleDeleteButton(event) {
  // Get the li innerText and Strip the button innerText (Delete) off.
  brand = event.path[1].innerText.replace(/Delete$/, ``)
  deleteDataPoint(brand)
}

function deleteDataPoint(brandKey) {
  if (!brands.has(brandKey)) return
  const point = removeMapElements(brandKey)
  removeDataPointRendering(point)
  pointCount -= 1
  const deletionIdx = point.order - 1
  // Renumber DOM ids of any points after deletion point to fill the gap
  // created by the deletion keeping id numbers consecutive.
  if (deletionIdx <= brands.size - 1) {
    adjustDataPointIds(deletionIdx)
  }
}

function replaceDomElementId(oldId, newId) {
  const domElement = document.querySelector(`#${oldId}`)
  domElement.id = newId
}

function adjustDataPointIds(startIdx) {
  const dataPoints = Array.from(brands.values())
  dataPoints.slice(startIdx).forEach((pt) => {
    pt.order -= 1
    replaceDomElementId(brandIdStr(pt.order + 1), brandIdStr(pt.order))
    replaceDomElementId(pointIdStr(pt.order + 1), pointIdStr(pt.order))
    replaceElementClass(
      pointIdStr(pt.order, false),
      `pt${pt.order + 1}`,
      `pt${pt.order}`
    )
    replaceDomElementId(labelIdStr(pt.order + 1), labelIdStr(pt.order))
    replaceElementClass(
      labelIdStr(pt.order, false),
      `pt${pt.order + 1}`,
      `pt${pt.order}`
    )
  })
}

// newClass can be a space delimited string (e.g. "foo bar"). It will
// replace all classes assigned to the elemeent.
function replaceElementClass(elementId, oldClass, newClass) {
  const element = document.getElementById(elementId)
  element.classList.remove(oldClass)
  element.classList.add(newClass)
}

function removeDataPointRendering(point) {
  const domBrand = document.querySelector(brandIdStr(point.order, true))
  // partial points won't have a brand or pointLabel yet.
  if (domBrand != null) {
    domBrand.parentNode.removeChild(domBrand)
    const domLabel = document.querySelector(labelIdStr(point.order, true))
    domLabel.parentNode.removeChild(domLabel)
  }
  const domPoint = document.querySelector(pointIdStr(point.order, true))
  domPoint.parentNode.removeChild(domPoint)
}

function brandIdStr(idx, prependHashChar = false) {
  hchar = prependHashChar ? `#` : ``
  return `${hchar}brand${idx}`
}

function labelIdStr(idx, prependHashChar = false) {
  hchar = prependHashChar ? `#` : ``
  return `${hchar}label${idx}`
}

function pointIdStr(idx, prependHashChar = false) {
  hchar = prependHashChar ? `#` : ``
  return `${hchar}pt${idx}`
}

// Removes the element identified by brandkey from both the points and brands
// Maps.
function removeMapElements(brandKey) {
  const item = brands.get(brandKey)
  // We only need to do this if this is not a partial entry
  brands.delete(brandKey)
  return item
}

// **************   Modal Dialog  ***************
function cancelButtonHandler(event) {
  const point = removeMapElements(tmpKey)
  removeDataPointRendering(point)
  brandName.value = ``
  // brandNotes.value = ``
  modalDialog.style.display = `none`
}

// eslint-disable-next-line no-unused-vars
function saveButtonHandler(event) {
  input = {
    brand: brandName.value,
    // notes: brandNotes.value || ``,
  }
  brandName.value = ``
  if (brands.has(input.brand)) {
    alert(`Error: Duplicate brand name.`)
    window.setTimeout(() => {
      document.getElementById(`brand-name-input`).focus()
    }, 0)
    return
  }
  // brandNotes.value = ``
  completePartialMapEntry(input)
  modalDialog.style.display = `none`
  saveButton.classList.remove(`green`)
  saveButton.classList.add(`disabled`)
  renderBrandName()
  renderPointLabel()
  pointSeconds = 0
}

/* eslint-disable no-unused-expressions */
function brandNameKeyupHandler(event) {
  if (brandName.value === ``) {
    saveButton.classList.remove(`green`)
    saveButton.classList.add(`disabled`)
    return
  }
  saveButton.classList.remove(`disabled`)
  saveButton.classList.add(`green`)
}

function completePartialMapEntry(userInput) {
  partialDataPoint = brands.get(tmpKey)
  partialDataPoint.brand = userInput.brand
  // partialDataPoint.notes = userInput.notes

  brands.delete(tmpKey) // Must do this before adding new due to size limit.
  brands.set(partialDataPoint.brand, partialDataPoint)
  const dataPoints = Array.from(brands.values()) // Make it easy to get last dP.
  const dataPoint = dataPoints[dataPoints.length - 1] // gets the last dataPoint added.
}

function computePointLabelCoordinates(x, y, labelText) {
  const posXOffset = Math.floor((19 * labelText.length) / -10)
  const negXOffset = 2
  const xOffset = x >= 0 ? posXOffset : 3
  const yOffset = y >= 0 ? -3 : 5
  return {
    x: x + xOffset,
    y: y + yOffset,
  }
}

function renderPointLabel() {
  const dataPoints = Array.from(brands.values()) // Make it easy to get last dP.
  const dataPoint = dataPoints[dataPoints.length - 1] // gets the last dataPoint added.
  const labelString = dataPoint.brand.substring(0, 10)
  const { x, y } = computePointLabelCoordinates(
    dataPoint.svgX,
    dataPoint.svgY,
    labelString
  )
  const labelText = document.createTextNode(labelString)
  const labelElement = document.createElementNS(
    `http://www.w3.org/2000/svg`,
    `text`
  )
  labelElement.setAttribute(`x`, x)
  labelElement.setAttribute(`y`, y)
  labelElement.appendChild(labelText)
  labelElement.setAttribute(`class`, `point-label-text pt${dataPoint.order}`)
  labelElement.setAttribute(`id`, labelIdStr(dataPoint.order))
  svg.appendChild(labelElement)
}

function renderBrandName() {
  const dataPoints = Array.from(brands.values()) // Make it easy to get last dP.
  const dataPoint = dataPoints[dataPoints.length - 1] // gets the last dataPoint added.
  const li = document.createElement(`li`)
  li.innerHTML = dataPoint.brand
  const button = document.createElement(`button`)
  button.setAttribute(`class`, `del-brand-button`)
  button.innerHTML = `Delete`
  button.onclick = handleDeleteButton
  li.appendChild(button)
  li.setAttribute(`class`, `brand-li `)
  li.setAttribute(`id`, brandIdStr(dataPoint.order))
  brandList.appendChild(li)
}

// ****************   Timer   ************************
let prePauseIntRef
// Never needs reseting.
let surveySeconds = 0
let pointSeconds = 0

function timerStartButtonHandler(event) {
  hidePausedDialog()
  startStopwatch()
}

/** Starts the stopwatch */
function startStopwatch() {
  // Set start time based on whether it's stopped or resetted
  // Every second
  setInterval(() => {
    pointSeconds += 1
    surveySeconds += 1
  }, 1000)
}

function showPausedDialog() {
  changeDisplay(pausedDialog, `block`)
}

function hidePausedDialog() {
  changeDisplay(pausedDialog, `none`)
}

function changeDisplay(element, value) {
  element.style.display = value
}
