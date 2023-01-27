const shop = document.getElementById('shop');
const cartAmount = document.getElementById('cartAmount');
let basket = JSON.parse(localStorage.getItem("data")) || [];


const generateShop = () => {

     const shopItems = shopData.map(item => {
        const { id, title, image, description, price } = item

        let itemIndex = null
        basket.forEach((item, index) => {
            if (item.id === id) itemIndex = index
        })

        return `<div id=product-id-${id} class="item">
     <img width="220" src=${image} alt=""> 
     <div class="details">
         <h3>${title}</h3>
         <p>${description}</p>
        <div class="price-quantity">
         <h2>$${price}</h2>
         <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
             <div id=${id} class="quantity">${basket[itemIndex].amount}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
         </div>
         </div>
     </div>
 </div>`}).join('')

shop.innerHTML = shopItems;

}

const shopExists = localStorage.getItem("data"); 
if (!shopExists) {
    for (i = 0; i < shopData.length; i++) {
        basket.push({id: i + 1, amount: 0})
        localStorage.setItem("data", JSON.stringify(basket))
    }
}


function setLocalStorage(id, operator) {
    let itemIndex = null
    basket.forEach((item, index) => {
        if (item.id === id) itemIndex = index
    })
    if (itemIndex !== null && operator === "increment") {
        basket[itemIndex].amount = basket[itemIndex].amount + 1
        
    } else if (operator === "decrement" && basket[itemIndex].amount > 0) {
        basket[itemIndex].amount = basket[itemIndex].amount - 1
    }
    
    localStorage.setItem("data", JSON.stringify(basket))

    cartAmount.innerHTML = JSON.parse(localStorage.getItem("data")).reduce(function (accumulator, obj) {
        return accumulator + obj.amount
        }, 0)  
    }

window.onload = function() {
    cartAmount.innerHTML = JSON.parse(localStorage.getItem("data")).reduce(function (accumulator, obj) {
        return accumulator + obj.amount
        }, 0)
}

generateShop()

const increment = (id) => {
    // Om användaren klickar på + på produkten 
    setLocalStorage(id, "increment")
    generateShop()
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    setLocalStorage(id, "decrement")
    generateShop()
}
