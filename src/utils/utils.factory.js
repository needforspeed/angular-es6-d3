/**
 * Created by zyc on 2017/4/15.
 */
export default class Utils {
  setNum(n = 0) {
    return (typeof n === 'undefined' || n === null) ? 0 : n;
  }

  setString(s = '') {
    return (typeof s === 'undefined' || s === null) ? "" : s;
  }

  setArray(a = []) {
    return (typeof a === 'undefined' || a === null) ? [] : a;
  }
}
