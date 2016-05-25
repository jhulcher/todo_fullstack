jQuery(function ($) {

  $("ol").sortable();

  $(document).on("mouseup", "li", function () {

    setTimeout(function () {

      var arr = []

      $("ol > li").each(function (item) {
        if (parseInt(this.id, 10) == this.id) {
          arr.push(parseInt(this.id, 10));
        }
      });
      ApiUtil.changeRank(1, arr);

    }, 1000);
  });
});
