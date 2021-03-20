const db = require(`../models/index`)

exports.mappingList = (req, res) => {
  res.render(`mapping/list`, {
    title: `Showing all mappings`,
  })
}

exports.mappingListData = (req, res) => {
  db.Mapping.findAll({
    attributes: {
      exclude: [`id`, `notes`, `updatedAt`],
    },
  })
    .then((mappings) => {
      console.log(JSON.stringify(mappings[0], null, 2))
      res.json({ data: mappings })
    })
    .catch((err) => {
      console.error(`Failed to findall mappings: ${err.message}`)
      return next(err)
    })
}
