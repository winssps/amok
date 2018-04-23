

export function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}

export function setCookie(name, info) {
    //cookie 有效期10分钟
    document.cookie = name + "=" + info + "; domain=localhost; max-age=600;"
}


export function delCookie(name) {
    if (getCookie(name)) {
        console.log("hello");
        document.cookie = name + '=;path=/;expires=Thu, 01-Jan-70 00:00:01 GMT; domain=localhost';
    }
}


// Operation LocalStorage
export function setLocalStorage(key, vaule) {
    return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
}
