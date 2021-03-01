function formatDuration(seconds) {
  const elapsed = new Date(null)
  elapsed.setSeconds(seconds)
  return elapsed.toISOString().substr(11, 8)
}

module.exports = {
  formatDuration,
}
