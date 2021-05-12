/* eslint-disable */
const cport = window.location.port
const cportStr = cport ? `:${cport}` : ``
const showUrlRoot = `${window.location.protocol}//${window.location.hostname}${cportStr}`

$(`#project-table`).DataTable({
  ajax: `/9339/projects/listdata`,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`, `pageLength`],
  columns: [
    {
      data: `projectId`,
      className: `txtright`,
      render: function (data, type, row, meta) {
        // prettier-ignore
        const link = "<a class='list-link' href='" + showUrlRoot + "/9339/projects/" +
          row.id + "'>" + data + "</a>"
        // alert(JSON.stringify(row))
        return link
      },
    },
    { data: `name` },
    { data: `createdAt` },
    { data: `updatedAt` },
    { data: `respondentCount`, className: `txtright` },
  ],
})
