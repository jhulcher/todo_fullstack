jQuery(function ($) {
  $("ol").sortable();
  $(document).on("click", "button", function () {
    var count1 = 0;
    $("ol > li").each(function () {
      count1 += 1;
    });
    var count2 = 0;
    $("ol > li").each(function (idx) {
      if (parseInt(this.id, 10) == this.id) {
        ApiUtil.changeRank1(parseInt(this.id, 10), idx);
      }
    });
  });
});
