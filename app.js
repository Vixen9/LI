// Select element.
const form = document.querySelector('.form')
const list = document.querySelector('.list')
const input = document.querySelector('.input')
const filter = document.querySelector('.filter')
const clearBtn = document.querySelector('.clear')


// Function

function displayItems() {
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => addItemToDOM(item))

    clearUI()
}


function addItemOnSubmit(e) {
    e.preventDefault()

    const newItem = input.value
    if (newItem === '') {
        alert('Please add an item')
        return;
    }
    // create item DOM
    addItemToDOM(newItem)

    // add item to storage
    addItemToStorage(newItem)

    clearUI()
    input.value = ''

}

// create icon
function createIcon(clases) {
    const icon = document.createElement('i')
    icon.className = clases
    return icon;
}
// add item to dom

function addItemToDOM(item) {
    // create li
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    // create button
    const button = document.createElement('button')
    button.classList.add('delet')
    const icon = createIcon("fa-solid fa-xmark")

    // append item
    button.append(icon)
    list.append(li)
    li.append(button)
}

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // add new item to array
    itemsFromStorage.push(item)

    // convert to json string and set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('delet')) {
        deletLi(e.target.parentElement.parentElement);
    }
}

function deletLi(item) {
    if (confirm('Are you sure?')) {
        // remove item from DOM
        item.remove();
        // Remove item from storage
        removeItemFromStorage(item.textContent)
    }
    clearUI()
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item)
    // Reset to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function cleareAll() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    // Clear from localstorgae
    localStorage.removeItem('items')
    clearUI()
}

function clearUI() {
    const items = list.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.classList.add('remove')
        filter.classList.add('remove')
    } else {
        clearBtn.classList.remove('remove')
        filter.classList.remove('remove')
    }

}

function filterItm(e) {
    const items = list.querySelectorAll('li')
    let text = e.target.value.toLowerCase();

    items.forEach(item => {
        let itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.classList.remove('remove')
        } else {
            item.classList.add('remove')
        }
    })

}

// Global Event
form.addEventListener('submit', addItemOnSubmit)
list.addEventListener('click', onClickItem)
clearBtn.addEventListener('click', cleareAll)
filter.addEventListener('input', filterItm)
document.addEventListener('DOMContentLoaded', displayItems)

clearUI()