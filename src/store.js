const updateStorage = (element) => {
    localStorage.setItem("workspace", JSON.stringify(element));
};

const retrieveStorage = (key) => {
    let element = JSON.parse(localStorage.getItem(key))
    return element;
}

// const add

export default {updateStorage, retrieveStorage};