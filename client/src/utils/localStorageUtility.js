
export const setLocalStorageData = (key, data) => {
    return localStorage.setItem(key, data)
}

export const getLocalStorageData = (key) => {
    return localStorage.getItem(key)
}

export const removeLocalStorageData = (key) => {
    return localStorage.removeItem(key)
}