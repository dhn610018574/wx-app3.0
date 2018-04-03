require('es6-promise/auto');
require('whatwg-fetch');

const _fetch = (requestPromise, timeout = 60000) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('timeout');
    }
  });
  setTimeout(()=>{
    timeoutAction()
  }, timeout);
  return Promise.race([requestPromise, timerPromise]);
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    error.body = response.json();
    throw error;
  }
}

function returnResponse(response) {
  return response;
}

function parseJSON(response) {
  return response.json();
}

const FetchInterface = {
  // do get
  Get(url: string, httpHeaders?: { [name: string]: any }, parse = parseJSON, timeOut: number) {
    let customHttpHeaders = Object.assign({}, httpHeaders);
    let defer = new Promise((resolve, reject) => {
      _fetch(fetch(url, {
        method: 'GET',
        headers: customHttpHeaders,
        credentials: 'include',
        mode: 'cors'
      }), timeOut)
      .then(checkStatus)
      .then(parse)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        //捕获异常
        reject(error)
      })
    });
    return defer;
  },
  // do post
  Post(url: string, parmJson?: { [name: string]: any }, extraHeaders?: { [name: string]: any }, timeOut: number) {
    let requestHeaders = Object.assign({}, extraHeaders);
    let defer = new Promise((resolve, reject) => {
      _fetch(fetch(url, {
        method: 'POST',
        headers: requestHeaders,
        body: parmJson,
        credentials: 'include',
        mode: 'cors'
      }), timeOut)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        console.log('111')
        resolve(data)
      })
      .catch(error => {
        console.log('222')
        //捕获异常
        reject(error)
      })
    });

    return defer;
  },
  // do put
  Put(url: string, parmJson?: { [name: string]: any }, extraHeaders?: { [name: string]: any }, timeOut: number) {
    let requestHeaders = Object.assign({}, extraHeaders);
    let defer = new Promise((resolve, reject) => {
      _fetch(fetch(url, {
        method: 'PUT',
        headers: requestHeaders,
        body: parmJson,
        credentials: 'include',
        mode: 'cors'
      }), timeOut)
      .then(checkStatus)
      .then(parseJSON)
      .then(returnResponse)
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        //捕获异常
        reject(error)
      })
    });

    return defer;
  },
  handleError(err,Toast,callback,fn){

    if (err === 'timeout') {
      Toast.info('系统超时，请稍后再试');
    } else {
      let msg = err&&err.body;
      let status = err&&err.response&&err.response.status;

      if(!fn){
        fn=()=>location.reload();
      }

      switch(status){
        case 400:
          break;
        case 401:
        Toast.info('D_1登录超时');
          CRFLogin.initialize(fn);
          break;
        case 403:
          Toast.info('D_3非法请求');
          break;
        case 404:
        case 405:
          Toast.info('D_4服务器繁忙，请稍后再试');
          break;
        case 406:
          Toast.info('D_6请更新应用至最新版本');
          break;
        case 413:
          Toast.info('D_13服务暂时无法使用，请联系客服');
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          Toast.info('E_0服务器繁忙，请稍后再试');
          break;
        default:
          msg && msg.then(data => {
            Toast.info(data.message);
          });
      }
      typeof callback==='function'&&callback();
    }

  }
}

module.exports = FetchInterface;
