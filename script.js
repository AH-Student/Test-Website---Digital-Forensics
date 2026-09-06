const products = {
  1: { name: "Product 1", price: 20 },
  2: { name: "Product 2", price: 30 }
};

let cart = [];

const cartElement = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const checkout = document.getElementById("checkout");

function sendGA4Event(name, data = {}) {
  if (typeof gtag === "function") {
    gtag("event", name, data);
  }
}

document.querySelectorAll(".details").forEach(button => {
  button.addEventListener("click", () => {
    const product = products[button.dataset.id];

    sendGA4Event("view_item", {
      currency: "AUD",
      value: product.price,
      item_name: product.name
    });

    alert(product.name + "\nPrice: $" + product.price.toFixed(2));
  });
});

document.querySelectorAll(".add").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const product = products[id];

    cart.push(product);
    updateCart();

    sendGA4Event("add_to_cart", {
      currency: "AUD",
      value: product.price,
      item_name: product.name
    });
  });
});

function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
    total.textContent = "0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(product => `<p>${product.name} - $${product.price.toFixed(2)}</p>`)
    .join("");

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);
  total.textContent = cartTotal.toFixed(2);
}

cartButton.addEventListener("click", () => {
  cartElement.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartElement.classList.remove("open");
});

checkout.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  sendGA4Event("begin_checkout", {
    currency: "AUD",
    value: cartTotal
  });

  alert("Demo checkout. No payment is processed.");
});
