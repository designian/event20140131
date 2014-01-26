$(document).ready(function(){
  var hour_input   = 12;
  var minute_input = 20;

  function searchTimetable(hour_in, minute_in, isStart) {
    var hour = hour_in;
    var minute = minute_in;


    if(!Number.isFinite(hour_in)) {
	    console.log("時 ⇒ 数字に変換");
	    hour = Number(hour_in);
    }
    if(!Number.isFinite(minute_in)) {
	    console.log("分 ⇒ 数字に変換");
	    minute = Number(minute_in);
    }

	console.log("時間" + hour + ":" + minute);


    if(isStart) {

		if((hour < 5)||(hour > 20)) {
			hour = 5;
		}


	    if((3<minute)&&(minute<=24)) {
	      console.log("出発 3<minute<=24");
	      $("#h1_1").text(hour);
	      $("#h1_2").text(hour+2);
	      $("#h2_1").text(hour);
	      $("#h2_2").text(hour+2);
	      $("#h3_1").text(hour+1);
	      $("#h3_2").text(hour+3);

	      $("#m1_1").text(24);
	      $("#m1_2").text(24 + 30);
	      $("#m2_1").text(46);
	      $("#m2_2").text(46 + 30-60);
	      $("#m3_1").text("03");
	      $("#m3_2").text(3 + 30);
	    } else if((24<minute)&&(minute<=46)) {
	      console.log("出発 24<minute<=46");
	      $("#h1_1").text(hour);
	      $("#h1_2").text(hour+2);
	      $("#h2_1").text(hour+1);
	      $("#h2_2").text(hour+3);
	      $("#h3_1").text(hour+1);
	      $("#h3_2").text(hour+3);

	     $("#m1_1").text(46);
	      $("#m1_2").text(46 + 30-60);
	      $("#m2_1").text("03");
	      $("#m2_2").text(33);
	      $("#m3_1").text(20);
	      $("#m3_2").text(20 + 30);
	    } else if((46<minute)&&(minute<=59)) {
	      console.log("出発 条件３");
	      $("#h1_1").text(hour+1);
	      $("#h1_2").text(hour+3);
	      $("#h2_1").text(hour+1);
	      $("#h2_2").text(hour+3);
	      $("#h3_1").text(hour+1);
	      $("#h3_2").text(hour+3);

	      $("#m1_1").text("03");
	      $("#m1_2").text(3 + 30);
	      $("#m2_1").text(20);
	      $("#m2_2").text(20 + 30);
	      $("#m3_1").text(46);
	      $("#m3_2").text(46 + 30-60);
	    } else if((0<=minute)&&(minute<=3)) {
	      console.log("出発 条件４");
	      $("#h1_1").text(hour);
	      $("#h1_2").text(hour+2);
	      $("#h2_1").text(hour);
	      $("#h2_2").text(hour+2);
	      $("#h3_1").text(hour);
	      $("#h3_2").text(hour+2);

	      $("#m1_1").text("03");
	      $("#m1_2").text(3 + 30);
	      $("#m2_1").text(20);
	      $("#m2_2").text(20 + 30);
	      $("#m3_1").text(46);
	      $("#m3_2").text(16 + 30);
	    }


    } else if(!isStart){

		if((hour < 8)||(hour > 22)) {
			hour = 22;
		}


	    if((16<minute)&&(minute<=33)) {
	      console.log("到着 16<minute<=33");
	      $("#h1_1").text(hour-3);
	      $("#h1_2").text(hour-1);
	      $("#h2_1").text(hour-3);
	      $("#h2_2").text(hour-1);
	      $("#h3_1").text(hour-2);
	      $("#h3_2").text(hour);


	      //$("#m1_1").text(33 - 30);
	      $("#m1_1").text("03");
	      $("#m1_2").text(33);
	      $("#m2_1").text(54 - 30);
	      $("#m2_2").text(54);
	      $("#m3_1").text(16 - 30+60);
	      $("#m3_2").text(16);
	    } else if((33<minute)&&(minute<=54)) {
	      console.log("到着 33<minute<=54");
	      $("#h1_1").text(hour-3);
	      $("#h1_2").text(hour-1);
	      $("#h2_1").text(hour-2);
	      $("#h2_2").text(hour);
	      $("#h3_1").text(hour-2);
	      $("#h3_2").text(hour);

	     $("#m1_1").text(54 - 30);
	      $("#m1_2").text(54);
	      $("#m2_1").text(16 - 30+60);
	      $("#m2_2").text(16);
//	      $("#m3_1").text(33 - 30);
	      $("#m3_1").text("03");
	      $("#m3_2").text(33);
	    } else if((54<minute)&&(minute<=59)) {
	      console.log("到着 条件３");
	      $("#h1_1").text(hour-2);
	      $("#h1_2").text(hour);
	      $("#h2_1").text(hour-2);
	      $("#h2_2").text(hour);
	      $("#h3_1").text(hour-2);
	      $("#h3_2").text(hour);

	      $("#m1_1").text(16 - 30+60);
	      $("#m1_2").text(16);
//	      $("#m2_1").text(33 - 30);
	      $("#m2_1").text("03");
	      $("#m2_2").text(33);
	      $("#m3_1").text(54 - 30);
	      $("#m3_2").text(54);
	    } else if((0<=minute)&&(minute<=3)) {
	      console.log("到着 条件４");
	      $("#h1_1").text(hour-3);
	      $("#h1_2").text(hour-1);
	      $("#h2_1").text(hour-3);
	      $("#h2_2").text(hour-1);
	      $("#h3_1").text(hour-3);
	      $("#h3_2").text(hour-1);

	      $("#m1_1").text(16 - 30+60);
	      $("#m1_2").text(16);
//	      $("#m2_1").text(33 - 30);
	      $("#m2_1").text("03");
	      $("#m2_2").text(33);
	      $("#m3_1").text(54 - 30);
	      $("#m3_2").text(54);
	    }
    } else {
	    console.log("想定外");
    }

    console.log("処理終了");
  }

  //searchTimetable("7", "40", true);
  //searchTimetable(0, 15, true);
  //searchTimetable(20, 15, true);
  //searchTimetable(21, 15, true);
  searchTimetable(21, 15, true);

  //searchTimetable(hour_input, minute_input, true);
  //searchTimetable(hour_input, minute_input, false);

});


