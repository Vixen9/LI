const list = document.querySelector(".list")
const filter = document.querySelector("#filter")
const btn = document.querySelector(".btn")
const clearBtn = document.querySelector(".clear")
const litext = document.querySelector('#input')


btn.addEventListener('click', function () {

    // create element
    const li = document.createElement('li')
    const button = document.createElement('button')
    const i = document.createElement('i')

    i.classList.add("fa-solid", "fa-xmark")
    button.classList.add("remove-list")


    li.innerText = litext.value
    list.append(li)
    li.append(button)
    button.append(i)

    checkUi()

    litext.value = ''

})


list.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('remove-list')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
        }
    }
    checkUi()
})


clearBtn.addEventListener('click', () => {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
    checkUi()
})

filter.addEventListener('input', (e) => {
    const items = list.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
    })
})


function checkUi() {
    const items = list.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.classList.add("remove")
        filter.classList.add("remove")
    } else {
        clearBtn.classList.remove("remove")
        filter.classList.remove("remove")
    }
}
checkUi()