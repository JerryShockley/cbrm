$(`#mapping-table`).DataTable({
  ajax: `/mappings/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`, `pageLength`],
  columns: [
    { data: `brand` },
    { data: `order`, className: `txtright` },
    { data: `cartesianX`, className: `txtright` },
    { data: `cartesianY`, className: `txtright` },
    { data: `duration`, className: `txtright` },
    { data: `respondent.respondentId`, className: `txtright` },
    { data: `respondent.project.projectId`, className: `txtright` },
    { data: `createdAt` },
  ],
})
