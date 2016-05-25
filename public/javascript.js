// jQuery(function ($) {
//   $("ol").sortable();
//   $(document).on("click", "button", function () {
//     var count1 = 0;
//     $("ol > li").each(function () {
//       count1 += 1;
//     });
//     var count2 = 0;
//     $("ol > li").each(function (idx) {
//       if (parseInt(this.id, 10) == this.id) {
//         ApiUtil.changeRank1(parseInt(this.id, 10), idx);
//       }
//     });
//   });
// });

jQuery(function ($) {

  $("ol").sortable();

  // setTimeout(function () {

  $(document).on("click", "button", function () {
    var count1 = 1;

    var arr = []

    $("ol > li").each(function (item) {

      if (parseInt(this.id, 10) == this.id) {
        arr.push(parseInt(this.id, 10));
      }

      count1 += 1;
    });
    var count2 = 1;

    console.log(arr);

    ApiUtil.changeRank1(1, arr);
  //   setTimeout(function () {
  //
  //   $("ol > li").each(function (idx) {
  //
  //     setTimeout(function () {
  //
  //     if (count2 < count1 - 1) {
  //       if (parseInt(this.id, 10) == this.id) {
  //         console.log(this.id + " " + $(this).text() + " " + idx);
  //         ApiUtil.changeRank1(parseInt(this.id, 10), idx + 1);
  //
  //       }
  //     } else {
  //       if (parseInt(this.id, 10) == this.id) {
  //         console.log(this.id + " " + $(this).text() + " " + idx);
  //         // ApiUtil.changeRank1(parseInt(this.id, 10), idx);
  //         // setTimeout(function (datum, num) {
  //           ApiUtil.changeRank(parseInt(this.id, 10), idx + 1);
  //
  //         // }, 1000);
  //       }
  //     }
  //     count2 += 1;
  //
  //   }.bind(this), (500 * count2));
  //
  //   });
  //
  // }.bind(this), 500);


    //
    // setTimeout(function () {
    //   ApiUtil.fetchUser();
    // }, 10000);
  });
// }, 4000);



});
