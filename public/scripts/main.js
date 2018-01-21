$(document).ready(function() {
  $.get("/sensor", function(data){
   console.log(data);
   $('#temperature').text(data.temperature);
   $('#humidity').text(data.humidity);
  });
});
