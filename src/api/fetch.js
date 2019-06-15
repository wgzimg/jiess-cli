//api/fetch.js
let baseUrl = process.env.VUE_APP_API
const sendCnf = {
    time: 800,
    canSend: true,
    data: {},
    url: '',
}
export default async (url = '', data = {}, type = 'GET', method = 'ajax', isAttach = false) => {
    let cuo = (new Date()).getTime()
    let hUrl = getUrlString(data)
    type = type.toUpperCase();
    url = baseUrl + url;
    let boo = sendCnf.url === url
    if (hUrl && (type == 'GET' || type == 'DELETE')) {
        if (/\?/.test(url)) {
            url += '&' + hUrl
        } else {
            url += '?' + hUrl
        }
        url += '&' + 'cuo=' + cuo
    } else {
        url += '?' + 'cuo=' + cuo
    }
    url += '&Token=' + Function.$getCookie(Function.$mapping.TOKEN)
    let dd = cleanShake(sendCnf, url, data, boo)
    if (dd) return dd
    if (window.fetch && method !== 'ajax') {
        let requestConfig = {
            method: type,
            headers: {
                'Token': Function.$getCookie(Function.$mapping.TOKEN),
            },
            mode: "cors",
            cache: "force-cache"
        }
        if (method == 'json') {
            requestConfig.headers['Content-Type'] = 'application/json; charset=utf-8'
            if (type == 'POST' || type == 'PUT') {
                requestConfig.body = data
            }
        } else if (method == 'fetch') {
            requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            if (type == 'POST' || type == 'PUT') {
                requestConfig.body = hUrl
            }
        }
        try {
            let response = await fetch(url, requestConfig);
            return response.json();
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            //获取原生ajax对象
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }
            requestObj.open(type, url, true);
            if (isAttach) {
                requestObj.setRequestHeader('content-type', 'multipart/form-data');
                requestObj.send(data);
            } else {
                if (type == 'POST') {
                    requestObj.setRequestHeader('content-type', "application/x-www-form-urlencoded;charset-UTF-8");
                    requestObj.send(getUrlString(data));
                } else {
                    requestObj.send();
                }
            }
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        resolve(JSON.parse(requestObj.response))
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}

function cleanShake(sendCnf, url, data, boo) {
    if (!sendCnf.canSend && boo && JSON.stringify(sendCnf.data) === JSON.stringify(data)) {
        return new Promise((resolve, reject) => reject({}))
    }
    Object.assign(sendCnf, {
        url: url.split('?')[0],
        data,
        canSend: false
    })
    setTimeout(() => {
        sendCnf.canSend = true
    }, sendCnf.time)
    return false
}

function getUrlString(data) {
    let dataArr = [];
    if (Object.keys(data).length) {
        Object.keys(data).forEach(key => {
            if (data[key] || data[key] == 0) {
                dataArr.push(key + '=' + data[key])
            }
        })
    } else {
        return ''
    }
    return dataArr.join('&')
}