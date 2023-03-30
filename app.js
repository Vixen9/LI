// Select element.
const btn = document.querySelector('.btn')
const list = document.querySelector('.list')
const input = document.querySelector('.input')
const filter = document.querySelector('.filter')


// Function
function addLi(e) {
    e.preventDefault()

    const newItem = input.value
    if (newItem === '') {
        alert('Please add an item')
        return;
    }

    // create li
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton()
    li.append(button)
    list.append(li)

    input.value = ''

}

// create button
function createButton() {
    const button = document.createElement('button')
    const icon = createIcon("fa-solid fa-xmark")
    button.append(icon)
    return button;
}

// create icon
function createIcon(clases) {
    const icon = document.createElement('i')
    icon.className = clases
    return icon;
}

function deletLi(e) {

}

// Global Event
btn.addEventListener('click', addLi)
list.addEventListener('click', deletLi)