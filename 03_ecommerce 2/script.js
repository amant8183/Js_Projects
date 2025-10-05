document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99 },
        { id: 2, name: 'Product 2', price: 19.99 },
        { id: 3, name: 'Product 3', price: 39.9999 },
    ]

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const deleteCartItemBtn = document.getElementsByClassName('deleteBtn') || '';
    renderCart();
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv)
    })

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            console.log(productId);
            addToCart(product);
        }
    })

    function addToCart(prod) {
        cart.push(prod);
        renderCart();
    }
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length) {
            emptyCartMessage.classList.add('hidden')
            cartTotalMessage.classList.remove('hidden')
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`
                cartItem.classList.add(`${item.id}`);
                cartItems.appendChild(cartItem);

                // delete button creation
                const deleteCartItem = document.createElement('button')
                deleteCartItem.classList.add('deleteBtn')
                deleteCartItem.innerHTML = `Delete`;

                deleteCartItem.addEventListener('click', () => {
                    cart.splice(index, 1);
                    renderCart();
                })

                cartItems.appendChild(deleteCartItem);
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            })
        }
        else {
            emptyCartMessage.classList.remove('hidden');
            totalPriceDisplay.textContent = `$0.00`;
        }
        saveCart();

    }

    checkoutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checkout Successfully');
        renderCart();
    })




})