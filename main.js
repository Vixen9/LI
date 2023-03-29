const list = document.querySelector(".list")
const btn = document.querySelector(".btn")
const litext = document.querySelector('#input')

btn.addEventListener('click', function () {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const i = document.createElement('i')

    i.classList.add("fa-solid", "fa-xmark")


    li.innerText = litext.value
    list.append(li)
    li.append(button)
    button.append(i)

    litext.value = ''
})

