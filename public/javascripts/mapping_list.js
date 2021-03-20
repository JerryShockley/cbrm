$(`#mapping-table`).DataTable({
  ajax: `/mappings/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`],
  columns: [
    { data: `brand` },
    { data: `order` },
    { data: `cartesianX` },
    { data: `cartesianY` },
    { data: `duration` },
    { data: `respondent_id` },
    { data: `createdAt` },
  ],
})
