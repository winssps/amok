

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


export function delCookie( name, domain, path ) {
    if (getCookie(name)) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' +
            path + '; domain=' +
            domain;
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
