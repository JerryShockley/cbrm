$(`#project-table`).DataTable({
  ajax: `/projects/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`, `pageLength`],
  columns: [
    { data: `projectId`, className: `txtright` },
    { data: `name` },
    { data: `createdAt` },
    { data: `updatedAt` },
    { data: `respondentCount`, className: `txtright` },
  ],
})
