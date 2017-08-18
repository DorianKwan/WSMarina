$(document).ready(() => {
  $(".switch-to-signin").on("click", (event) => {
    event.preventDefault();
    $(".signup").addClass("display-none");
    $(".signin").removeClass("display-none");
  });

  $(".switch-to-signup").on("click", (event) => {
    event.preventDefault();
    $(".signin").addClass("display-none");
    $(".signup").removeClass("display-none");
  });
});
