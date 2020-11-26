/** @format */

$(document).ready(function () {
  //inputmask
  $(".telephone").inputmask({
    mask: "+375 (99) 999 99 99",
    clearIncomplete: true,
    greedy: false,
  });
  //submit form
  $(".form__submit").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "/mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      $("._def").hide();
      $("._thx").show();
      setTimeout(function () {
        $("._thx").hide();
        $("._def").show();
        $(".popup__close").click();
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
  //not submit on enter keydown
  $("form").keydown(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
});
// webp img for ie
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
