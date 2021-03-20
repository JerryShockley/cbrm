$(`#project-table`).DataTable({
  ajax: `/projects/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`],
  columns: [
    { data: `projectId` },
    { data: `name` },
    { data: `createdAt` },
    { data: `updatedAt` },
    { data: `respondentCount` },
  ],
})
