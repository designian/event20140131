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
      endCount: 3,
      interval: 150
    }, _opts);

    var end_count = opts.endCount;
    var interval = opts.interval;
    var shift_minutes = opts.shiftMinutes

    var mo = moment(datetime).add("minutes", shift_minutes);
    var results = [];
    for(var i = 0; i < end_count; i++ ){
      var m = mo.clone().add("minutes", (i *(interval * 0.2)) );

      results[i] = {
        start : new SearchTimeModel(m),
        end : new SearchTimeModel(m.add("minutes", interval))
      };
    }

    util.setSessionStorage("d-searchResult", JSON.stringify(results));
  };

  /**
   * doSearchTimeで保存した結果を取得する
   *
   * @method getSearchResult
   * return {Array}
   */
  st.getSearchResult = function(){
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

    var times = JSON.parse(util.getSessionStorage("d-searchResult"));

    return _.map(times, function(time, index) {
      var _start = new TimeModel(time.start).getMoment();
      var _end = new TimeModel(time.end).getMoment();
      return {
        name: "test_name",
        date: _start.format("M月DD日"),
        startTime: _start.format("HH:mm"),
        endTime: _end.format("HH:mm"),
      }
    });
  };

}(window));