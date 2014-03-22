/* require jQuery, underscore */
(function(exports) {
  exports.util = exports.util || {};
  var util = exports.util;

  /**
   * sessionStorageに値を保存する
   *
   * @method setSessionStorage
   * @param {String} key
   * @param {String} value
   */
  util.setSessionStorage = function(key, value) {
    sessionStorage.setItem(key, value);
  };

  /**
   * sessionStorageから値を取り出す
   *
   * @method getSessionStorage
   * @param {String} key
   * @return {String}
   */
  util.getSessionStorage = function(key) {
    return sessionStorage.getItem(key);
  };

  /**
   * sessionStorageから値を削除する
   *
   * @method removeSessionStorage
   * @param {String} key
   */
  util.removeItemSessionStorage = function(key) {
    sessionStorage.removeItem(key);
  };


  /**
   * localStorageに値を保存する
   *
   * @method setLocalStorage
   * @param {String} key
   * @param {String} value
   */
  util.setLocalStorage = function(key, value) {
    localStorage.setItem(key, value);
  };

  /**
   * localStorageから値を取り出す
   *
   * @method getLocalStorage
   * @param {String} key
   * @return {String}
   */
  util.getLocalStorage = function(key) {
    return localStorage.getItem(key);
  };

  /**
   * localStorageから値を削除する
   *
   * @method removeLocalStorage
   * @param {String} key
   */
  util.removeItemLocalStorage = function(key) {
    localStorage.removeItem(key);
  };


  var tmplCache = tmplCache || {};

  /**
   * 外部テンプレートファイル取得
   *
   * @method getTemplate
   * @param {String} tmplName
   *
   * return {String} tmplCache
   */
  util.getTemplate = function(tmplName) {
    if(!tmplCache[tmplName]) {
      var url = "js/tmpl/" + tmplName + ".html";
      var tmpl;

      $.ajax({
        url: url,
        method: "GET",
        async: false,
        dataType: "text"
      }).done(function(html) {
        tmpl = html;
      });
      tmplCache[tmplName] = tmpl;
    }
    return tmplCache[tmplName];
  };

  /**
   * 行きのフォームデータ取得
   *
   * return {String}
   */
  util.getFormDataForward = function() {
    return sessionStorage.getItem("d-formdata-forward");
  }

  /**
   * 復路のフォームデータ取得
   *
   * return {String}
   */
  util.getFormDataBackward = function() {
    return sessionStorage.getItem("d-formdata-backward");
  }

})(window);