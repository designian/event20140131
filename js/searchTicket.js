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

    var times = JSON.parse(util.getSessionStorage("d-searchResult"));

    return _.map(times, function(time, index) {
      return st.convertTimeModel(time, index);
    });
  };

  st.convertTimeModel = function(time, opt_index) {
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
      name: "temp_name",
      date: _start.format("M月DD日"),
      startTime: _start.format("HH:mm"),
      endTime: _end.format("HH:mm"),
      index: opt_index ? opt_index : 0
    }
  };

  /**
   * 保存した検索結果をhtmlに出力する
   *
   * @method displaySearchResult
   * @param {String} outputId HTMLのidを指定
   * @param {String} templateName /js/tmpl/以下にあるファイルの拡張子を除いた名前
   */
  st.displaySearchResult = function(outputId, templateName) {
    var results = st.getSearchResult();
    st.displayTemplate({
      "outputId": outputId,
      "templateName": templateName,
      "data": results
    });
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
  st.saveForward = function(index) {
    var results = st.getSearchResult();
    util.setSessionStorage(key_forward, JSON.stringify(results[index]));
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
  st.preserveForward = function(index) {
    st.saveForward(index);
    location.href = "./confirm_forward.html";
  };

  /**
   * @private
   */
  st.saveBackward = function(index) {
    var results = st.getSearchResult();
    util.setSessionStorage(key_backward, JSON.stringify(results[index]));
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
  st.preserveBackward = function(index) {
    st.saveBackward(index);
    location.href = "./confirm_backward.html";
  };


}(window));