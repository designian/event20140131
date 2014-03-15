/* require underscore.js, moment.js, util.js  */
(function(exports){
  exports.st = exports.st || {};
  var st = exports.st;

  moment.lang('ja', {
      weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
      weekdaysShort: ["日","月","火","水","木","金","土"],
  });



  /**
   * 指定した日時から検索し、結果をsessionStorageに保存する
   * 指定するdatetimeはmomentオブジェクトの初期化に使えるformatで指定する
   *
   * @method doSearchTime
   * @param {String} datetime
   * @param {Oject} _opts{}
   *   @param _opts.shiftMinutes {Number} 出発ずらす時間(分)
   *   @param _opts.endCount {Number} 取得する件数
   *   @param _opts.interval {Number} 出発と到着の時間差(分)
   */
  st.doSearchTime = function(datetime, _opts) {
    var SearchTimeModel = function(momentObj){
      this.year    = momentObj.year();
      this.month   = momentObj.month();
      this.date    = momentObj.date();
      this.hour    = momentObj.hour();
      this.minutes = momentObj.minutes();
    };

    var opts = _.extend({
      shiftMinutes: 6,
      interval: 150
    }, _opts);

    var end_count = opts.endCount;
    var interval = opts.interval;
    var shift_minutes = opts.shiftMinutes

    var mo = moment(datetime).add("minutes", shift_minutes);
    var results = [];
    var total = 1000;

    for(var i = 0, j = 1, cnt =0, limit = total/2 ; i < limit; i++, j++, cnt++ ){

      var tempTime = mo.clone().add("minutes",(cnt *(interval * 0.2)) );
      var tempHour = tempTime.get("hours");
      if( 0 < tempHour && tempHour < 4 ) {
        mo = tempTime.clone().add("minutes", 180);
        cnt = 0;
      }


      var m = mo.clone().add("minutes", (cnt *(interval * 0.2)) );
      var m2 = mo.clone().subtract("minutes", (cnt *(interval * 0.2)) );

      results[limit+i] = {
        start : new SearchTimeModel(m),
        end : new SearchTimeModel(m.add("minutes", interval)),
        seatStatus: st.genSeatStatus(),
        name: st._getTrainName()
      };
      results[limit-j] = {
        end : new SearchTimeModel(m2),
        start : new SearchTimeModel(m2.subtract("minutes", interval)),
        seatStatus: st.genSeatStatus(),
        name: st._getTrainName()
      };
    }


    if(_opts.people) {
      st.calcAmount(_opts.people);
    }
    util.setSessionStorage("d-searchResult-roundTrip", _opts.roundTrip);
    util.setSessionStorage("d-searchResult", JSON.stringify(results));
    util.setSessionStorage("d-searchResult-count", _opts.endCount)
  };

  var key_amount = "d-amount";
  st.calcAmount = function(peopleCount) {
    var ticketAmount = 15850;
    var amount;

    if(util.getSessionStorage(key_amount)) {
      amount = parseInt(util.getSessionStorage(key_amount));
    }
    else {
      amount = 0;
    }
    amount = amount + (parseInt(peopleCount) * ticketAmount);

    util.setSessionStorage(key_amount, amount);
  };
  st.getAmount = function() {
    return util.getSessionStorage(key_amount);
  };

  /**
   * doSearchTimeで保存した結果を取得する
   *
   * @method getSearchResult
   * return {Array}
   */
  st.getSearchResult = function(opts,is_all){
    var times = JSON.parse(util.getSessionStorage("d-searchResult"));
    opts = _.extend({
      index: 0,
      count: 5
    }, opts);

    if(is_all){
      return _.map(times, function(time, index) {
        return st._convertTimeModel(time, index);
      });
    }
    else{
      times = times.slice( 500+opts.index, 500+opts.index + parseInt(opts.count));
      return _.map(times, function(time, index) {
        return st._convertTimeModel(time, 500+opts.index + index);
      });
    }
  };

    st._convertTimeModel = function(time, opt_index) {
      var TimeModel = function(time) {
        this.year    = time.year;
        this.month   = time.month;
        this.day     = time.date;
        this.hour    = time.hour;
        this.minutes = time.minutes;
        this.getMoment = function(){
          return moment(this);
        }
      };
      var _start = new TimeModel(time.start).getMoment();
      var _end = new TimeModel(time.end).getMoment();
      return {
        name: time.name,
        date: _start.format("M月DD日"),
        startTime: _start.format("HH:mm"),
        endTime: _end.format("HH:mm"),
        index: opt_index ? opt_index : 0,
        seatStatus: time.seatStatus
      }
    };

    st._getTrainName = function() {
      var rand = _.random(40,120);
      var name = "のぞみ " + rand + "号（N700系）";
      return name;
    };


  /**
   * 保存した検索結果をhtmlに出力する
   *
   * @method displaySearchResult
   * @param {String} outputId HTMLのidを指定
   * @param {String} templateName /js/tmpl/以下にあるファイルの拡張子を除いた名前
   */
  st.displaySearchResult = function(opts) {
    opts.count = parseInt(util.getSessionStorage("d-searchResult-count"));
    var results = st.getSearchResult(opts);
    st.displayTemplate({
      "outputId": opts.outputId,
      "templateName": opts.templateName,
      "data": results
    });
  };

  st.searchIndex = 0;
  /**
   * @param {Object} opts
   *   opts.outputId
   *   opts.templateName
   *   opts.searchIndex
   *   opts.searchCount
   */
  st.paginatePrev = function(opts) {
    opts.count =  parseInt(util.getSessionStorage("d-searchResult-count"));
    st.searchIndex = st.searchIndex - opts.count;
    opts.index = st.searchIndex;
    $("#"+opts.outputId).html("");
    st.displaySearchResult(opts);
    scrollTo(0,0);
  };


  /**
   * @param {Object} opts
   *   opts.outputId
   *   opts.templateName
   *   opts.searchIndex
   *   opts.searchCount
   */
  st.paginateNext = function(opts) {
    opts.count =  parseInt(util.getSessionStorage("d-searchResult-count"));
    st.searchIndex = st.searchIndex + opts.count;
    opts.index = st.searchIndex;
    $("#"+opts.outputId).html("");
    st.displaySearchResult(opts);
    scrollTo(0,0);
  };


  /**
   * 指定したtemplateを表示する
   *
   * @method displayTemplate
   * @param {Object} opts
   *   @param {String} opts.templateName
   *   @param {String} opts.outputId
   *   @param {Object} opts.data
   */
  st.displayTemplate = function(opts) {
    var templateText = util.getTemplate(opts.templateName);
    var template = _.template(templateText);
    var $output = $("#" + opts.outputId);
    var $html = $("<span>");
    if(opts.data.length){
      _.each(opts.data, function(item) {
        $html.append(template(item));
      });
    }else{
      $html.append(template(opts.data));
    }
    $output.append($html);
  };

  var key_forward = "d-forward";
  var key_backward = "d-backward";

  /**
   * @private
   */
  st.saveForward = function(params) {
    var results = st.getSearchResult({},true);
    var result = results[params.index];
    result.seatType = params.seatType;
    util.setSessionStorage(key_forward, JSON.stringify(result));
  };

  /**
   * @method loadForward
   */
  st.loadForward = function() {
    return JSON.parse(util.getSessionStorage(key_forward));
  };
  st.deleteForward = function() {
    util.removeItemSessionStorage(key_forward);
  };

  /**
   * 行きを保存
   *
   * @method preserveForward
   * @param index
   */
  st.preserveForward = function(params) {
    st.saveForward(params);
    var roundTrip = parseInt(util.getSessionStorage("d-searchResult-roundTrip"));
    if(roundTrip) {
      location.href = "./search_backward.html";
    }
    else {
      location.href = "./confirm_forward.html";
    }
  };

  /**
   * @private
   */
  st.saveBackward = function(params) {
    var results = st.getSearchResult({},true);
    var result = results[params.index];
    result.seatType = params.seatType;
    util.setSessionStorage(key_backward, JSON.stringify(result));
  }

  /**
   * @method loadBackward
   */
  st.loadBackward = function() {
    return JSON.parse(util.getSessionStorage(key_backward));
  };

  /**
   * 帰り削除
   *
   * @method deleteBackward
   */
  st.deleteBackward = function() {
    util.removeItemSessionStorage(key_backward);
  };

  /**
   * 帰りのチケットを保存する
   *
   * @method preserveForward
   * @param index
   */
  st.preserveBackward = function(params) {
    st.saveBackward(params);
    location.href = "./confirm_backward.html";
  };

  st.seatType = ["窓側", "通路側", "どちらでも"];
  st.genSeatStatus = function() {
    var types = [];
    types[0] = st._genSeatState();
    types[1] = st._genSeatState();
    types[2] = types[0] && types[1] ? true : false;
    return types;
  }
  st._genSeatState = function() {
    return _.random(0, 1) ? true : false;
  }
  st.getSeatType = function(typeNum){
    return st.seatType[typeNum];
  }

}(window));