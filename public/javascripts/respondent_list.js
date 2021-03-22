$(`#respondent-table`).DataTable({
  ajax: `/respondents/listdata`,
  responsive: true,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`, `pageLength`],
  columns: [
    { data: `respondentId`, className: `txtright text-wrap` },
    { data: `pointCount`, className: `txtright` },
    { data: `durationSum`, className: `txtright` },
    { data: `project.projectId`, className: `txtright` },
    { data: `createdAt` },
  ],
})
