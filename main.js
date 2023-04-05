const cartButton = document.querySelector(".cart-button");
const modal = document.querySelector(".modal");
let panier = [];

cartButton.addEventListener("click", function () {
  modal.classList.toggle("active");
});

const productsContainer = document.querySelector(".products-container");
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    let products = res.products;
    products.forEach((e, i) => {
      productsContainer.innerHTML += ` <div id="${i}" class="product">
        <img
          src=${e.thumbnail}
          alt=""
        />

        <h3 class="product-title">${e.title}</h3>
        <h3 class="product-price">${e.price} $</h3>
        <input class="add-btn" type="button" value="Add to cart" />
      </div>`;
    });
    const addButtons = document.querySelectorAll(".add-btn");
    addButtons.forEach((e) => {
      e.addEventListener("click", (event) => {
        let num = document.querySelector(".num");

        let parent = event.target.parentNode;
        // let priceObject = parent.querySelector(".product-price").innerHTML;
        // let price = parseInt(priceObject);
        // let title = parent.querySelector(".product-title").innerHTML;
        let clickedProductID = parent.getAttribute("id");
        let clickedProduct = products[clickedProductID];

        let exists = false;
        panier.forEach((e) => {
          if (e.title == clickedProduct.title) {
            exists = true;
          }
        });
        if (exists) {
          alert("produit deja dans le panier");
        } else {
          panier.push(clickedProduct);

          modal.innerHTML += `
            <div class="modal-item">
        <div class="title">${clickedProduct.title}</div>
        <div class="unit-price">${clickedProduct.price}</div>
        <div class="quantity">
          <i class="fa-solid fa-minus moins"></i>
          <div class="quantity-amount">1</div>
          <i class="fa-solid fa-plus plus" ></i>
        </div>
        <div class="total-item-price">${clickedProduct.price}</div>
   
          <i class="fa-solid fa-trash delete"></i>
      </div>
        `;

          num.innerHTML = panier.length;
          const plus = document.querySelectorAll(".plus");
          plus.forEach((e) => {
            e.addEventListener("click", (event) => {
              let stamount =
                event.target.parentNode.querySelector(
                  ".quantity-amount"
                ).innerHTML;
              let parse = parseInt(stamount);
              let newquantity = parse + 1;
              event.target.parentNode.querySelector(
                ".quantity-amount"
              ).innerHTML = newquantity;
            });
          });
        }
        const moins = document.querySelectorAll(".moins");
        moins.forEach((e) => {
          e.addEventListener("click", (e) => {
            let moinsamount =
              e.target.parentNode.querySelector(".quantity-amount").innerHTML;
            let parsed = parseInt(moinsamount);

            if (parsed > 1) {
              parsed = parsed - 1;
              console.log(parsed);
              e.target.parentNode.querySelector(".quantity-amount").innerHTML =
                parsed;
            } else {
              alert("coucou");
            }
          });
        });

        const d = document.querySelectorAll(".delete");
        d.forEach((e) => {
          e.addEventListener("click", (event) => {
            let rmv = event.target.parentNode.querySelector(".title").innerHTML;
            let newpanier = [];
            panier.forEach((e) => {
              if (e.title != rmv) {
                newpanier.push(e);
              }
            });
            panier = newpanier;
            event.target.parentNode.remove();
            num.innerHTML = panier.length;
          });
        });
      });
    });
  });
