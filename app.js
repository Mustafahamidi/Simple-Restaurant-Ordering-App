import { menuArray } from './data.js';

const menuSection = document.getElementById('menu-section')
const orderSection = document.getElementById('order-section')
const paymentForm = document.getElementById('payment-form')
const formContainer = document.getElementById('form-container')
const footer = document.getElementById("footer")




const orderItems = []

document.addEventListener("click", function(e){
    if(e.target.dataset.additem){
        handleClick(e.target.dataset.additem)
    }
})

function handleClick(id){ 

    const targetObj = menuArray.filter((menu) =>{
        return menu.id === Number(id)
    })[0]
    if(targetObj){
        orderItems.push(targetObj)
        updateOrderList()
    }
}



function updateOrderList(){
    
    orderSection.innerHTML =`
     <h2>Your Order</h2>
        <div id="order-items">
            ${orderItems.map(order => `
                <div class="order-item">
                    <span class="item-name">${order.name}</span>
                    <button class="remove-btn" data-id="${order.id}">Remove</button>
                    <span class="item-price">$${order.price}</span>
                </div>
            `).join('')}
        </div>
        <div class="order-total">
            <span>Total price:</span>
            <span>$${calculateTotal()}</span>
        </div>
        <button class="complete-order-btn" id='complete-order-btn'>Complete Order</button>
    `
    
    attachRemoveEvent();
    
}

function calculateTotal(){
    return orderItems.reduce((total, item) => total + item.price, 0)
}

function attachRemoveEvent() {
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function() {
            const itemId = Number(this.dataset.id);
            const itemIndex = orderItems.findIndex(item => item.id === itemId);
            if (itemIndex > -1) {
                orderItems.splice(itemIndex, 1); // Remove item from array
                updateOrderList(); // Re-render order list and update total
            }
        });
    });
}

document.body.addEventListener('click', function (e){
    if(e.target && e.target.id === 'complete-order-btn'){
        formContainer.style.display = 'inline'
    }
})






function getFormData(){
    paymentForm.addEventListener("submit", function(e){
        e.preventDefault()
        const loginFormData = new FormData(paymentForm)
        const name = loginFormData.get('card-name')
        formContainer.style.display = 'none'
        orderSection.style.display = 'none'
        footer.innerHTML = `<h3>Thanks,${name}! Your order is on its way!</h3>`
    
    })
}

getFormData()


function renderMenuItems() {
    const menus = menuArray.map((menu) => {
        const { name, ingredients, price, id, emoji } = menu;
        return `
            <div class="item" id="${id}">
                <div class='emoji'>${emoji}</div>
                <div class='about-item'>
                    <h1 class="item-title">${name}</h1>
                    <p class="item-description">${ingredients.join(", ")}</p>
                    <p class="item-price">$${price}</p>
                </div>
                <button class="item-btn" data-additem="${id}">+</button>
            </div>
            <div class="divider"></div>
        `
    }).join('');

    menuSection.innerHTML = menus;
}


renderMenuItems()



