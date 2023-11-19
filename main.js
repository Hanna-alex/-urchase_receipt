function getInput(placeholder, type) {
  let input = document.createElement('input')
  input.placeholder = placeholder
  input.type = type
  input.classList.add('add-form__input')

  return input

}

function getBox(className) {
  let box = document.createElement('div')
  box.classList.add(className)

  return box
}

function getBtn(className, text, type = 'button') {
  let btn = document.createElement('button')
  btn.classList.add(className)
  btn.textContent = text
  btn.type = type

  return btn
}

function render(products, arquantity, prices) {
  listProduct.innerHTML = ''
  totalPrice = 0

  for (let i = 0; i < products.length; i++) {
    let productItem = getProduct(i, products[i], arquantity[i], prices[i])

    totalPrice = totalPrice + arquantity[i] * prices[i]
    priceBox.textContent = totalPrice + ' руб'
    // общая стоимоть
    listProduct.append(productItem)
  }
}

function getProduct(index, product, num, price) {
  let titleArr = ['Название', 'Кол-во', 'Цена', 'Общая цена']

  let productItem = document.createElement("li")
  productItem.classList.add('list__item')

  productItem.insertAdjacentHTML('afterbegin', `
  <span class='list__index'>${index + 1}</span>
  <span class='list__box'> 
  <h3 class='item__title'>${titleArr[0]}</h3> 
  <span class='list__text'> ${normWord(product)}</span> 
  </span >

  <span class='list__box'>
  <h3 class='item__title'>${titleArr[1]}</h3> 
  <span class='list__text'> ${num}</span> 
  </span >

  <span class='list__box'>
  <h3 class='item__title'>${titleArr[2]}</h3> 
  <span class='list__text'> ${price} руб</span> 
  </span >

  <span class='list__box'>
  <h3 class='item__title'>${titleArr[3]}</h3> 
  <span class='list__text'> ${num * price} руб</span> 
  </span >
    `)

  let editBtn = getBtn('btn__edit', 'Изменить', type = 'button')
  let deleteBtn = getBtn('btn__delete', 'Удалить', type = 'button')


  editBtn.onclick = function () {
    // Получаем значение
    let newProduct
    let newNum
    let newPrice

    do {
      newProduct = prompt("Введите название товара", productArr[index])

    } while (!newProduct || newProduct.length < 2 || !isNaN(newProduct)) {

      productArr[index] = normWord(newProduct)  // Имзеняем значение в массиве
    }

    do {
      newNum = Number(prompt("Введите количество товара", quantityArr[index]))
    } while (!newNum || newNum <= 0) {
      quantityArr[index] = newNum

    }

    do {
      newPrice = Number(prompt("Введите цену товара", priceArr[index]))
    } while (!newPrice || newPrice <= 0) {
      priceArr[index] = newPrice
    }

    render(productArr, quantityArr, priceArr)  // Перерисовываем список
  }

  deleteBtn.onclick = function () {
    productArr.splice(index, 1)
    quantityArr.splice(index, 1)
    priceArr.splice(index, 1)

    render(productArr, quantityArr, priceArr)
  }

  productItem.append(editBtn, deleteBtn)

  return productItem
}

function normWord(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

//
let productArr = ['Молоко', 'Хлопья', 'Йогурт']
let quantityArr = [3, 1, 12]
let priceArr = [100, 150, 85]

// элементы
let section = document.createElement('section')
let container = getBox('container')

let addForm = document.createElement('form')
addForm.classList.add('add-form')

let product = getInput('Название товара', 'text')
let quantity = getInput('Количство', 'number')
let price = getInput('Цена', 'number')
let addBtn = getBtn('add-form__btn', 'Добавить')

let listProduct = document.createElement('ul')
listProduct.classList.add('list')

let title = document.createElement('h1')
title.textContent = 'Чек покупки'

let totalBox = getBox('total-price')
let priceBox = document.createElement('span')
priceBox.classList.add('total-price__num')

totalBox.insertAdjacentHTML('afterbegin', `
<span class= 'total-price__text'>Итоговая стоимость:</span>`)


//
addBtn.onclick = function () {
  let newProduct = product.value
  let newNum = +quantity.value
  let newPrice = +price.value

  product.classList.remove('err')
  quantity.classList.remove('err')
  price.classList.remove('err')

  if (!product.value || product.value.length < 2 || !isNaN(newProduct)) {

    product.classList.add('err')
    // функция вывода ошибки

  } else if (!quantity.value || +quantity.value <= 0) {

    quantity.classList.add('err')
    // 

  } else if (!price.value || price.value <= 0) {
    price.classList.add('err')

  } else {
    product.classList.remove('err')

    productArr.push(newProduct)
    quantityArr.push(newNum)
    priceArr.push(newPrice)

    product.value = ''
    quantity.value = ''
    price.value = ''

    render(productArr, quantityArr, priceArr);
  }
}

//

render(productArr, quantityArr, priceArr)
// добавление эллементов на страницу

document.body.append(section)
section.append(container)
container.append(title, addForm, listProduct, totalBox)
addForm.append(product, quantity, price, addBtn)
totalBox.append(priceBox)