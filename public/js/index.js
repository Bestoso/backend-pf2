const productItem = document.querySelector('.product-item')
const addToCartButton = document.getElementById('add-to-cart-button')

let currentCart;

const addToCart = async (event) =>{
    if(!currentCart){
        await fetch('/api/carts',{method: 'POST'})
        .then(response => response.json())
        .then(data => currentCart = data.cart._id);
    }
    productId = event.target.parentNode.getAttribute('id')
    fetch(`/api/carts/${currentCart}/product/${productId}`, {
        method: 'POST'
    })
    .then(Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: false,
        timer: 1500
        }))
}


const seeCart = async (event) =>{
    if(!currentCart){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must add at least one product to your cart',
        })
    }
    window.location.href = `/cart/${currentCart}`
}