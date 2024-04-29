$(function () {

  // yang ni dia buaat secara default, border tu ada kt image
  var selectedDiv = $("#imageFace");
  selectedDiv.addClass("dotted-border")

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
        
        // adakan border
        selectedDiv.removeClass("dotted-border") 
        selectedDiv = clonedAccessory
        selectedDiv.addClass("dotted-border")

        ui.draggable.draggable("option", "revert", true); // revert back the drag img to the the place
      }else{
        selectedDiv.removeClass("dotted-border");
        selectedDiv = $(`#${ui.draggable.attr("id")}`);
        selectedDiv.addClass("dotted-border");
      }

    },
  });
  $("#plus").click(function(){
    increasedSelected()
  })

  $("#minus").click(function(){
    decreasedSelected()
  })

  $("#imageFace").click(function(){
    selectedDiv.removeClass("dotted-border")
    selectedDiv = $("#imageFace")
    selectedDiv.addClass("dotted-border")
  })
  function increasedSelected(){
    var curWidth = selectedDiv.width()
    var curheight = selectedDiv.height()
    selectedDiv.height(curheight * 1.1)
    selectedDiv.width(curWidth * 1.1)
  }

  // use keyboard + to increased size
  $(document).keydown(function(e){
    if(e.which == 187 || e.keycode == 187){
      increasedSelected()
    }else if(e.which == 189 || e.keycode == 189){
      decreasedSelected()
    }
  })


  // how to save image
  $("#save").click(function(){ // when button save clicked
    
    var canvas = document.createElement("canvas") // create canvas element 
    var ctx = canvas.getContext("2d")           // get context of canvas

    canvas.width = $("#imageFace").width()
    canvas.height = $("#imageFace").height()

                                                                  // amik url gambar dari css. mun kitak perasan, nya set gambar pake property dalam css.
    var backgroundImage = $("#imageFace").css('background-image') // so mun mok amik gambar ya, pake .css("background-image")

    var imgURL = backgroundImage.split('"') // then klk kitak dapat dalam bentuk url("fileName.png"), 
                                            // so we split it with `""`, and take the second part which is our file name

    var bgImage = new Image() // new object Image()


    bgImage.onload = function(){ // when page load

      ctx.drawImage(bgImage,0,0,canvas.width,canvas.height) // draw

      var images = $("#imageFace").find('img')
      
      images.each(function(){
        var image = this;
        var imagePosition = $(image).position()
        var imageWidth = $(image).width()
        var imageHeight = $(image).height()

        ctx.drawImage(image, imagePosition.left, imageWidth.top, imageWidth, imageHeight)
      })

      
      var dataURL = canvas.toDataURL('image/png')
      var link = document.createElement('a')

      link.download = 'image.png'
      link.href = dataURL

      link.click();

      document.body.appendChild(canvas)
    } 
    bgImage.src = imgURL[1]

  })

  function decreasedSelected(){
    var curWidth = selectedDiv.width()
    var curheight = selectedDiv.height()
    selectedDiv.height(curheight * .9)
    selectedDiv.width(curWidth * .9)
  }
  
});


