const scrapeBtn = $('#scrapeBtn');
const displayBtn = $('#displayBtn');

$(document).on('click', '.addNote', function() {
  const thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: `/notes/${thisId}`,
    data: {
      note: $(`#${thisId}`).val(),
    },
  }).then(data => {
    // console.log(data);
    $(`#${thisId}`).empty();
  });
  $(`#${thisId}`).val('');
});

$(scrapeBtn).on('click', () => {
  $.ajax({
    type: 'GET',
    url: 'api/scrape',
  });
});

$(displayBtn).on('click', () => {
  window.location.reload();
});