const db = require(`../models/index`)
const { nextProjectId } = require(`../lib/idFactory`)

exports.projectList = (req, res) => {
  res.render(`project/list`, {
    title: `Showing all Projects`,
  })
}

exports.projectListData = (req, res) => {
  db.Project.findAll({
    attributes: {
      exclude: [`initialPrompt`, `mapPrompt`, `finalPrompt`, `videoLink`],
      include: [
        [
          db.Sequelize.fn(`COUNT`, db.Sequelize.col(`project_id`)),
          `respondentCount`,
        ],
      ],
    },
    include: [
      {
        model: db.Respondent,
        as: `respondents`,
        attributes: [],
      },
    ],
    group: [`Project.id`],
  })
    .then((projects) => {
      console.log(JSON.stringify(projects, null, 2))
      res.json({ data: projects })
    })
    .catch((err) => {
      console.error(`Failed to find all projects: ${err.message}`)
      return next(err)
    })
}

exports.projectAll = async (req, res) => {
  try {
    const projects = await db.Project.findAll({
      attributes: [`id`, `projectId`, `name`, `createdAt`, `updatedAt`],
      raw: true,
    })
    const respondentCounts = await db.sequelize.query(
      `SELECT r.project_id, COUNT(*) FROM respondents r GROUP BY project_id`
    )
    console.log(JSON.stringify(projects, null, 2))
    console.log(JSON.stringify(respondentCounts, null, 2))
  } catch (err) {
    console.error(`Failed to gather project all data: ${err.message}`)
    return next(err)
  }
}

exports.projectNew = (req, res) => {
  res.render(`project/new`, {
    title: `New Project`,
  })
}

exports.projectEdit = (req, res) => {
  const { id } = req.params
  console.log(`projectId = ${id}`)
  db.Project.findByPk(id)
    .then((project) => {
      res.render(`project/edit`, {
        title: `Editing Project #${project.projectId}`,
        project,
      })
    })
    .catch((err) => {
      console.error(
        `Failed to find project (${project.id}) for edit: ${err.message}`
      )
      return next(err)
    })
}

exports.projectCreate = (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  const { name, initialPrompt, mapPrompt, finalPrompt, videoLink } = req.body
  db.Project.create({
    projectId: nextProjectId(),
    name,
    initialPrompt,
    mapPrompt,
    finalPrompt,
  })
    .then((project) => {
      console.log(`Created new Project #${project.id}`)
      res.redirect(`/projects/${project.id}`)
    })
    .catch((err) => {
      console.error(`Failed to create project: ${err.message}`)
      return next(err)
    })
}

/* eslint-disable consistent-return */
exports.projectUpdate = async (req, res) => {
  const { id } = req.params
  const { name, initialPrompt, mapPrompt, finalPrompt, videoLink } = req.body
  try {
    project = await db.Project.findByPk(id)
    project.name = name
    project.videoLink = videoLink
    project.initialPrompt = initialPrompt
    project.mapPrompt = mapPrompt
    project.finalPrompt = finalPrompt
    await project.save()
    res.redirect(`/projects/${id}`)
  } catch (err) {
    console.log(`Project update(${id}) failed: ${err}`)
    return next(err)
  }
}

exports.projectShow = (req, res) => {
  const { id } = req.params
  db.Project.findByPk(id)
    .then((project) => {
      res.render(`project/show`, {
        title: `Project #${project.projectId}`,
        project,
      })
    })
    .catch((err) => {
      console.error(`Failed to find project(${id}): ${err}`)
      return next(err)
    })
}
