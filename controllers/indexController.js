const db = require(`../models/index`)

exports.homePage = (req, res) => {
  res.render(`index`, {
    title: `Welcome to Radboud University!`,
  })
}

exports.nextSteps = async (req, res) => {
  const { id } = req.params
  respondent = await db.Respondent.findByPk(id, {
    attributes: [`respondentId`, `project_id`],
  })
  project = await db.Project.findByPk(respondent.project_id, {
    attributes: [`finalPrompt`, `surveyUrl`],
  })
  try {
    console.log(`Survey URL = ${project.surveyUrl}${respondent.respondentId}`)
    res.render(`finish`, {
      title: `Next steps for respondent #${respondent.respondentId} `,
      surveyUrl: `${project.surveyUrl.trim()}${respondent.respondentId}`,
      prompt: project.finalPrompt,
    })
  } catch (err) {
    console.log(`Error processing next steps for respondent ${id}`)
  }
}

exports.startSurvey = async (req, res) => {
  if (req.params.projectId === undefined) console.log(`Project ID is undefined`)

  const { id: projectId } = req.params
  console.log(`Entering start_survey: project #${projectId}`)
  try {
    project = await db.Project.findOne({
      attributes: [`id`, `initialPrompt`, `videoLink`],
      where: { projectId },
    })
    console.log(JSON.stringify(project, null, 2))
    res.render(`survey_intro`, {
      title: `Survey #${projectId} Introduction`,
      relUrl: `/9339/respondents/new/${project.id}`,
      prompt: project.initialPrompt,
      videoLink: project.videoLink.trim(),
    })
  } catch (err) {
    res.render(`index`, {
      title: `Welcome to Radboud University Brand Relationship Survey`,
      errmsg: `Error: Unknown project survey key. Please check the URL
        address you are using.`,
    })
  }
}
