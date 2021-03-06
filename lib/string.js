function formatDuration(seconds) {
  const elapsed = new Date(null)
  elapsed.setTime(seconds * 1000)
  const str = elapsed.toISOString().substr(11, 8)
  return str.startsWith(`00:`) ? str.slice(3) : str
}

module.exports = {
  formatDuration,
}
