export function getLocalStorage(value) {
    if (!localStorage.getItem(value)){
        return undefined;
    } else {
        const retrieveStorage = localStorage.getItem(value);
        return JSON.parse(retrieveStorage)
    }
}

export function populateStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalVolume() {
    const localVolume = getLocalStorage('volume');
    if (localVolume) {
        return Number(localVolume)
    }
    return 0.5
}