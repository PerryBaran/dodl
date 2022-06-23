export function getLocalStorage(value) {
    if (!localStorage.getItem(value)){
        return 0.5;
    } else {
        const retrieveStorage = localStorage.getItem(value);
        return JSON.parse(retrieveStorage)
    }
}

export function populateStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}