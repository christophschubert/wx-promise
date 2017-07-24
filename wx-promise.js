/* jshint esversion: 6 */

var pro = {};
const functionNames = [
  'checkSession',
  'clearStorage',
  'getNetworkType',
  'getStorageInfo',
  'getSystemInfo',
  'getUserInfo',
  'login',
  'navigateTo',
  'removeStorage',
];

functionNames.forEach(fn => {
  pro[fn] = (obj = {}) =>
    new Promise(
      (resolve, reject) => {
        obj.success = resolve;
        obj.fail = reject;
        wx[fn](obj);
      }
    );
  }
);

const getStorage = key => new Promise(
  (resolve, reject) => {
    wx.getStorage({
      key: key,
      success: res => resolve(res.data),
      fail: err => resolve() //do not reject, but rather resolve to undefined
    });
  }
);

const setStorage = (key, value) => new Promise(
  (resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: res => { resolve(value); },
      fail: reject
    });
  }
);


const saveImage = (path) => new Promise(
  (resolve, reject) => {
    wx.saveFile({
      tempFilePath: path,
      success: (res) => resolve(res.savedFilePath),
      fail: reject
    })
  }
);

//resolve gets data and headers
const request = (options) => new Promise (
  (resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      success: res => {
        if (res.statusCode >= 400)
          reject(res);
        else {
          resolve(res);
        }
      },
      fail: reject
    });
  }
);


//resolve just gets data
const requestData = (options) => new Promise (
  (resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      success: res => {
        if (res.statusCode >= 400)
          reject(res);
        else {
          resolve(res.data);
        }
      },
      fail: reject
    });
  }
);

const getURL = url => requestData({url: url});


module.exports = {
  getStorage: getStorage,
  setStorage: setStorage,
  checkSession: pro.checkSession,
  clearStorage: pro.clearStorage,
  getNetworkType: pro.getNetworkType,
  getStorageInfo: pro.getStorageInfo,
  getSystemInfo: pro.getSystemInfo,
  getUserInfo: pro.getUserInfo,
  login: pro.login,
  saveImage: saveImage,
  navigateTo: pro.navigateTo,
  removeStorage: pro.removeStorage,
  request: request,
  requestData: requestData
};
