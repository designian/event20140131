$(function() {
    var $form = $("#form");
    var $serarchBtn = $("#search");

    $serarchBtn.on("click", function(){
      saveSearchResult();
      location.href = "result.html";
    });
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
        rountTrip: $form.find("[name=roundTrip]")
      }
      return values;
    }
    function createMomentDateString(formData){
      var fd = formData;
      return fd.year + "-" + fd.month + "-" + fd.day + "T" + fd.hour + ":" + fd.minute;
    }
    function saveSearchResult() {
      var formData = getFormValues();
      var datetime = createMomentDateString(formData);

      // console.log(formData);
      // console.log(datetime);
      st.doSearchTime(datetime, {
        shiftMinutes: 6,
        endCount: 5,
        interval: 150
      });
    }

});