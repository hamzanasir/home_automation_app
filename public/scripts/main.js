$(document).ready(function() {
  function flipSwitch(plug, powerState) {
    if (powerState === 1) {
      $(`#switch${plug === 1 ? '' : '1'}`).prop('checked', false);
    } else {
      $(`#switch${plug === 1 ? '' : '1'}`).prop('checked', true);
    }
  }

  $.get("/sensor", function(data){
    $('#temperature').text(data.temperature);
    $('#humidity').text(data.humidity);
  });

  $.get("/plugs/1", function(data){
    flipSwitch(1, data.powerState);
  });

  $.get("/plugs/2", function(data){
    flipSwitch(2, data.powerState);
  });

  $('input').on('click', function() {
    const plug = $(this).data('plug');
    $.post(`/plugs/${plug}`, function(data) {
      flipSwitch(plug, data.powerState === true ? 0 : 1);
    });
  });

  setInterval(function () {
    $.get("/sensor", function(data){
      $('#temperature').text(data.temperature);
      $('#humidity').text(data.humidity);
    });
  }, 300000);
});
