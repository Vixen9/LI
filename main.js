const list = document.querySelector(".list")
const btn = document.querySelector(".btn")
const litext = document.querySelector('#input')

btn.addEventListener('click', function () {
    const li = document.createElement('li')
    li.innerText = litext.value
    list.append(li)

    litext.value = ''
})