/* eslint-disable */
const cport = window.location.port
const cportStr = cport ? `:${cport}` : ``
const showUrlRoot = `${window.location.protocol}//${window.location.hostname}${cportStr}`

$(`#respondent-table`).DataTable({
  ajax: `/respondents/listdata`,
  responsive: true,
  dom: `Bfrtip`,
  buttons: [`copy`, `csv`, `excel`, `pdf`, `print`, `pageLength`],
  columns: [
    {
      data: `respondentId`,
      className: `txtright text-wrap`,
      render: function (data, type, row, meta) {
        // prettier-ignore
        const link = "<a class='list-link' href='" + showUrlRoot + "/respondents/" +
          row.id + "'>" + data + "</a>"
        // alert(JSON.stringify(row))
        return link
      },
    },
    { data: `pointCount`, className: `txtright` },
    { data: `durationSum`, className: `txtright` },
    { data: `project.projectId`, className: `txtright` },
    { data: `createdAt` },
  ],
})
