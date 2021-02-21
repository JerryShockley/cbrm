/**
 * js file for the relationship mapping page: mapping.pug.
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

// points is passed to pug template and then JSON.stringifyed so that it can be
// included with the HTML in string form.
render(points)

function render(dataPoints) {
  dataPoints.forEach((dataPoint) => {
    iDataPoint = convertStrs2Ints(dataPoint)
    renderDataPoint(iDataPoint)
    renderBrandName(iDataPoint)
  })
}

function convertStrs2Ints(point) {
  const intKeynames = [`order`, `cartesianX`, `cartesianY`, `duration`]
  const newPoint = Object.assign(...point) // shallow copy works for us.
  intKeynames.forEach((key) => {
    newPoint[key] = parseInt(point[key], 10)
  })
  return newPoint
}

function renderDataPoint(dataPoint) {
  const newCircle = document.createElementNS(NS, `circle`)
  newCircle.setAttribute(`cx`, dataPoint.cartesianX)
  newCircle.setAttribute(`cy`, -dataPoint.cartesianY)
  newCircle.setAttribute(`r`, 1)
  newCircle.setAttribute(`fill`, colors[dataPoint.order - 1])
  newCircle.setAttribute(`class`, `point`)
  newCircle.setAttribute(`id`, `pt${dataPoint.order}`)
  svg.appendChild(newCircle)
}

function renderBrandName(dataPoint) {
  const newBrand = document.createElement(`li`)
  newBrand.setAttribute(`class`, `brand`)
  newBrand.setAttribute(`id`, `brand${dataPoint.order}`)
  newBrand.textContent = dataPoint.brand
  brandList.appendChild(newBrand)
}
