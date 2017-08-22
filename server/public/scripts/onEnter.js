$(() => {
  $(".signup").on("keydown", function (e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      $(".signup .gold-button").click();
    }
  });

  $(".signin").on("keydown", function (e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      $(".signin .gold-button").click();
    }
  });
});