$(function() {
    var $form = $("#js-form");
    var $searchForward = $("#js-search-forward");
    var $searchBackward = $("#js-search-backward");

    $("#js-form").on("submit",function(e) {
      e.preventDefault();
      var direction = $(this).attr("data-direction");
      util.setSessionStorage( "d-formdata-"+direction, JSON.stringify( $(this).formData()) );
      saveSearchResult();
      location.href = $(this).attr("data-href");
    });

    $searchForward.on("click", nextStep);
    $searchBackward.on("click",nextStep);
    function nextStep(){
      saveSearchResult();
      location.href = $(this).attr("data-href");
    }

    function getFormValues() {
      var values = {
        year: $form.find("[name=year]").val(),
        month: $form.find("[name=month]").val(),
        day: $form.find("[name=day]").val(),
        hour: $form.find("[name=hour]").val(),
        minute: $form.find("[name=minute]").val(),
        direction: $form.find("[name=timeOption]:checked").val(),
        from: $form.find("[name=from][vale="+ $form.find("[name=from]").val() +"]"),
        to: $form.find("[name=to][vale="+ $form.find("[name=to]").val() +"]"),
        people: $form.find("[name=people]").val(),
        roundTrip: $form.find("[name=roundTrip]:checked").val(),
        resultCounts: $form.find("[name=resultCounts]:checked").val(),
        timeOption: $form.find("[name=timeOption]:checked").val()
      }
      return values;
    }
    function createMomentDateString(fd){
      return fd.year + "-" + fd.month + "-" + fd.day + "T" + fd.hour + ":" + fd.minute;
    }
    function saveSearchResult() {
      var formData = getFormValues();

      switch(formData.timeOption) {
        case "1":
          break;
        case "2":
          break;
        case "3":
          formData.hour = "04";
          formData.minute = "30";
          break;
        case "4":
          formData.hour = "00";
          formData.minute = "50";
          break;
        case "5":
          var d = new Date();
          formData.year = d.getFullYear();
          formData.month = ("00" + (d.getMonth()+1) ).slice(-2);
          formData.day = ("00" + d.getDate()).slice(-2);
          formData.hour = ("00" + d.getHours()).slice(-2);
          formData.minute = ("00" + d.getMinutes()).slice(-2);
      }
      var datetime = createMomentDateString(formData);
      st.doSearchTime(datetime, {
        shiftMinutes: 6,
        endCount: formData.resultCounts,
        interval: 150,
        roundTrip: formData.roundTrip,
        people: formData.people
      });
    }

});