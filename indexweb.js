let cart = [];

fetch('http://localhost:5000/api/food')
  .then(res => res.json())
  .then(data => {
    const menuDiv = document.getElementById('menu');
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <p>Price: $${item.price}</p>
        <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
      `;
      menuDiv.appendChild(div);
    });
  });

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function placeOrder() {
  fetch('http://localhost:5000/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    cart = [];
    updateCart();
  });
}
