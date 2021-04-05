const db = require(`../models/index`)

exports.adminDashboard = (req, res) => {
  res.render(`admin/dashboard`, {
    title: `Administrator Dashboard`,
  })
}
