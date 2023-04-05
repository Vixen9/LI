//  Variable
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const list = document.querySelector('.list')
const filter = document.querySelector('.filter')
const clearAll = document.querySelector('.clear')


// function
// create a function that display the data from localstorage when page load.
function displayLocalStorage() {
    let itemsFromStorage = getItemFromStorage();
    // for each item in localstorage create an item with function addItemToDOM().
    itemsFromStorage.forEach(item => addItemToDOM(item))

    clearUI();
}


function onAddItemSubmit(e) {
    e.preventDefault()

    // get input value
    let newItem = input.value

    if (newItem === '') {
        alert('You need to add content');
        return;
    }
    // check if there is another li with the same name.
    if (checkIfItemExists(newItem)) {
        alert('That item already exists!')
        return;
    }
    //call function
    addItemToDOM(newItem)
    addItemToStorage(newItem)
    clearUI()

    input.value = ''

}

function addItemToDOM(item) {
    // create html tag 
    const li = document.createElement('li')
    const deletBtn = createDeletBtn('liBtn')

    li.classList.add('li')

    // append
    li.append(document.createTextNode(item))
    li.append(deletBtn)
    list.append(li)
}

function createDeletBtn(classes) {
    const button = document.createElement('button')
    const icon = btnIcon()
    button.className = classes
    button.append(icon)
    return button;

}

function btnIcon() {
    const i = document.createElement('i')
    i.classList.add("fa-solid", "fa-xmark")
    return i;
}

function addItemToStorage(item) {
    let itemsFromStorage = getItemFromStorage();


    itemsFromStorage.push(item)

    // Convert to json string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// make a function that set an empty array or get the data from localstorage array.
function getItemFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.parentElement.classList.contains('li')) {
        // daca obiectul apasat este buton atunci invocam aceasta functie.
        removeItem(e.target.parentElement.parentElement)
    }

}

// check if the item in li exist and if(true) then return this function and call it up in onAddItemSubmit(e)
function checkIfItemExists(item) {
    let itemsFromStorage = getItemFromStorage();
    return itemsFromStorage.includes(item)
}

function removeItem(item) {
    // remove item from DOM
    // item primeste aceasta valoare (e.target.parentElement.parentElement).
    item.remove()

    //remove item from storage
    // o functie separa in care dam datele li.textContent

    removeItemFromStorage(item.textContent)

    clearUI()
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemFromStorage();
    // filter out item to be removed
    // Aici i primeste li.textContent cel pe care am pasat sa il eliminam si se verifica daca acel text este la fel cu text-ul din array atunci il va sterge
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    // Re-set to localstorage
    // Aici dupa verificarea cu filter() intoarcem datele inapoi in storage cu schimbarile aduse eliminarea unui item in cazul asta.
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function deletAll() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    // clear from localstorage
    localStorage.removeItem('items')

    clearUI()
}

// Create a function where we compare the  li firstChild textContent with the value put in filter input. create 2 variabel 1 take the text from li and one take filter value.
function filterItm(e) {
    let items = document.querySelectorAll('li')
    const liText = e.target.value.toLowerCase()

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()
        // this check if liText(input text) its the same with itemName(li text).
        // litext e diferit de itemName ? daca da atunci -1 daca nu atunci 0.
        if (itemName.indexOf(liText) != -1) {
            item.style.display = 'block'
            // we are using != bcs if itemName.indexOf(liText) it's true(0) then 0 != -1
            // and 0 is not equal with -1 (0 != -1)
        } else {
            item.style.display = 'none'
        }
    })
}

function clearUI() {
    let li = document.querySelectorAll('li')
    if (li.length === 0) {
        clearAll.classList.add('remove')
        filter.classList.add('remove')
    } else {
        clearAll.classList.remove('remove')
        filter.classList.remove('remove')
    }
}


// Global event
form.addEventListener('submit', onAddItemSubmit)
list.addEventListener('click', onClickItem)
clearAll.addEventListener('click', deletAll)
filter.addEventListener('input', filterItm)
document.addEventListener('DOMContentLoaded', displayLocalStorage)

clearUI()