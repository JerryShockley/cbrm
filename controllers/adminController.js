const db = require(`../models/index`)

exports.adminRespondentNewSearch = (req, res) => {
    res.render(`admin/new_respondent_search`, {
      title: `Respondent Search`
  })
}

exports.adminRespondentCreateSearch = (req, res) => {
  const { respondentId: id } = req.body
  db.Respondent.findOne({
    where: {
      respondentId: parseInt(id, 10)
    },
    include: [ `mappings` ]
  })
    .then((respondent) => {
      res.render(`respondent/show`, {
        points: respondent.mappings,
        duration: respondent.getDurationString(),
        createDate: respondent.createdAt,
        totalPoints: respondent.pointCount,
        title: `Respondent #${respondent.respondentId}`,
      })
    })
    .catch((err) => {
      console.error(`Failed to find Respondent: ${err}`)
    })

}
