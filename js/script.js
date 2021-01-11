//Define UI Element


let carts = document.querySelectorAll('.add-cart');



let products = [
    {
        name: 'Denim shirt',
        tag: 'denim blue',
        price: 120,
        inCart: 0
    },
    {
        name: 'Sweat shirt',
        tag: 'sports red',
        price: 139,
        inCart: 0
    },
    {
        name: 'Grey blouse',
        tag: 'sports grey',
        price: 99,
        inCart: 0
    },
    {
        name: 'Black Jacket',
        tag: 'denim black',
        price: 219,
        inCart: 0
    },
    {
        name: 'Red Pullover',
        tag: 'denim red',
        price: 120,
        inCart: 0
    },
    {
        name: 'Gray Pullover',
        tag: 'sports gray',
        price: 139,
        inCart: 0
    },
    {
        name: 'Jeans Black',
        tag: 'Shirt Black',
        price: 99,
        inCart: 0
    },
    {
        name: 'Blue Jacket',
        tag: 'denim blue',
        price: 219,
        inCart: 0
    }
]



// add event listener

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        window.location.reload(true);
    })

}

//for cart to remember local storage value . this work only when we call
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart .cart-count').textContent = productNumbers;



    }
}

//function to add cart number with local storage
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');


    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart .cart-count').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart .cart-count').textContent = 1
    }

    setItems(product); //function description below

}

function setItems(product) {
    // console.log("Inside of set Item")
    // console.log("My product is ", product)
    let cartItems = localStorage.getItem('productsInCart'); //using same name as object to understand
    cartItems = JSON.parse(cartItems);


    if (cartItems != null) {
        // console.log(cartItems[product.tag]) //its coming undefine so we gonna fix it now by another if statement
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//total cost function and access from array and loop

function totalCost(product) {
    // console.log("The product price is ", product.price)
    let cartCost = localStorage.getItem('totalCost');

    console.log("my cart cost is ", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price);
    }


}

//function to display cart from local storage in UI
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productsContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');//from above
    console.log(cartItems)
    if (cartItems && productsContainer) {
        productsContainer.innerHTML = '';
        Object.values(cartItems).map(item => {


            productsContainer.innerHTML += `

            <table class="table table-borderless p-3">
            <thead>
                <tr>
                <th class="text-secondary" scope="col">Product</th>
                <th class="text-secondary" scope="col">Price</th>
                <th class="text-secondary" scope="col">Quantity</th>
                <th class="text-secondary" scope="col">Total</th>
                <th class="text-secondary" scope="col"></th>
                </tr>
                
            </thead>
            <tbody>   
            
                  
                        
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.inCart}</td>
                        <td> ${item.inCart * item.price} </td>
                        <td> <span style="color:red"><i id="clear_product_all" class="fas fa-trash-alt"></i></span> </td>
                    </tr>
                    
            
            </tbody>
        </table>
            `
            //     <div class="container">
            //     <div class-"row">
            //     <div class="col-md-6 product">
            //     <span style="color:red"><i class="fas fa-trash-alt"></i></span>
            //     <span>${item.name}<span>
            //     </div>
            //     <div class="col-md-2 price">
            //    <span> $${item.price},00</span>
            //     </div>
            //     <div class="col-md-2 quantity">
            //     <span style="color:blue"><i class="fas fa-arrow-alt-circle-right"></i></span>
            //    <span> ${item.inCart}</span>
            //     </div>
            //     <div class="col-md-2 total">
            //    $${item.inCart * item.price},00
            //     </div>
            //     </div>
            //     </div>
        });
        productsContainer.innerHTML += `
        <div class="basketTotalContainer style>
        <h4 class="basketTotalTitle">
        <h6><span style="color:sienna">Basket Total</span></h6>
        </h4>
        <h4 class="basketTotal" style="background-color: lavender">$${cartCost},00</h4>
        </div>
        <Button class="btn btn-success">Proceed to checkout</Button>
        
        `
    }
}



onLoadCartNumbers();
displayCart();




