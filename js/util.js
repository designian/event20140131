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
})(window);