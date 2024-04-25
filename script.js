$(function () {
  $("#glasses_menu").show();
  $("#beards_menu").hide();
  $("#hats_menu").hide();

  $("#menu_1").click(function () {
    $("#glasses_menu").show();
    $("#beards_menu").hide();
    $("#hats_menu").hide();
  });
  $("#menu_2").click(function () {
    $("#glasses_menu").hide();
    $("#beards_menu").show();
    $("#hats_menu").hide();
  });
  $("#menu_3").click(function () {
    $("#glasses_menu").hide();
    $("#beards_menu").hide();
    $("#hats_menu").show();
  });

  // untuk buat accessories tu draggable
  $(".accessories").draggable({
    // kalau drop kat tempat lain selain #imageFace, revert.
    revert: function (dropped) {
      if (!dropped) {
        // if dropped is FALSE, then revert function will activate
        return true;
      } else {
        return false;
      }
    },
  });

  $("#imageFace").droppable({
    drop: function (event, ui) {
      // console.log(ui)
      // console.log(event)

      var draggedAccessoryId = ui.draggable.attr("id"); // this variable to refer to attr id in html file line 32,33,34..
      console.log("dragged--",draggedAccessoryId);

      var accessoryId = draggedAccessoryId.split("_"); // [hat,1]
      console.log(accessoryId);

      console.log(!accessoryId[0].startsWith("clone"));

      // MASALAH: everytime drop, dia akan bertambah.
      if(!accessoryId[0].startsWith("clone")){
        var accessory = `#clone_${accessoryId[0]}`
        console.log("THis IS CLone : ",accessory)

        if($(accessory) != null){
            $(accessory).remove()
        }

        var clonedAccessory = ui.draggable.clone()
        clonedAccessory.draggable()       
        clonedAccessory.addClass("accessories")
        clonedAccessory.attr('id',`clone_${accessoryId[0]}`)
        $(this).append(clonedAccessory)
        ui.draggable.draggable("option", "revert", true); // revert back the drag img to the the place
      }else{
        alert("this is the clone img")
      }
      


    },
  });
});

// okey sambung nanti. 
