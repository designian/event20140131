$(function() {
    var $form = $("#form");
    var $searchForward = $("#js-search-forward");
    var $searchBackward = $("#js-search-backward");

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
        resultCounts: $form.find("[name=resultCounts]:checked").val()
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
      st.doSearchTime(datetime, {
        shiftMinutes: 6,
        endCount: formData.resultCounts,
        interval: 150,
        roundTrip: formData.roundTrip,
        people: formData.people
      });
    }

});