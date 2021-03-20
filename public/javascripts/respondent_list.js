$(`#respondent-table`).DataTable({
  ajax: `/respondents/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`],
  columns: [
    { data: `respondentId` },
    { data: `pointCount` },
    { data: `durationSum` },
    { data: `project_id` },
    { data: `createdAt` },
    { data: `MappingsCount` },
  ],
})
