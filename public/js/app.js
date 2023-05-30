console.log('client side js file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const des = document.querySelector('#descript')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
fetch(`/weather?address=${location}`).then(res => {
    res.json().then(data =>{
        console.log(data)
        des.textContent = data.description
    })


})
})