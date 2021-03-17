const db = require(`../models/index`)

exports.adminDashboard = (req, res) => {
  res.render(`admin/dashboard`, {
    title: `Administrator Dashboard`
  })
}

exports.adminRespondentNewSearch = (req, res) => {
    res.render(`admin/new_respondent_search`, {
      title: `Respondent Search`,
  })
}

exports.adminRespondentCreateSearch = (req, res) => {
  const { respondentId: id } = req.body
  db.Respondent.findOne({
    where: {
      respondentId: parseInt(id, 10)
    }
  })
    .then((respondent) => {
      res.redirect(`/respondents/${respondent.id}`)
      })
    .catch((err) => {
      res.render(`admin/new_respondent_search`, {
        title: `Respondent Search`,
        errmsg: `Error: Respondent ${id} was not found`,
      })
    })
}

exports.adminProjectNewSearch = (req, res) => {
    res.render(`admin/new_project_search`, {
      title: `Project Search`,
  })
}

exports.adminProjectCreateSearch = (req, res) => {
  const { projectId: id } = req.body
  db.Project.findOne({
    where: {
      projectId: parseInt(id, 10)
    }
  })
    .then((project) => {
      console.log(JSON.stringify(project, null, 2))
      res.redirect(`/projects/${project.id}`)
      })
    .catch((err) => {
      console.error(`Failed to find Project: ${err}`)
      res.render(`admin/new_project_search`, {
        title: `Project Search`,
        errmsg: `Error: Project ${id} was not found`,
      })
    })
}
