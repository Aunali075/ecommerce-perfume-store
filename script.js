let current = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

setInterval(() => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
}, 4000);

// Get HTML elements
const addToCartButtons = document.querySelectorAll('.btn-secondary'); // ✅ Only declared once
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');

let cartItems = [];

// Function to update cart count badge
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

// Function to update the cart modal UI
function renderCartItems() {
  cartItemsList.innerHTML = ''; // Clear old items

  cartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.cursor = 'pointer';

    removeBtn.addEventListener('click', () => {
      cartItems.splice(index, 1);           // Remove item from array
      updateCartCount();                    // Update badge
      renderCartItems();
      updateTotal();                    // Re-render list

      if (cartItems.length === 0) {
        cartEmpty.style.display = 'block';  // Show "cart is empty"
      }
    });

    listItem.appendChild(removeBtn);
    cartItemsList.appendChild(listItem);
  });
}

// Hook up "Add to Cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = productCard.querySelector('p').innerText;

    const product = {
      name: productName,
      price: productPrice
    };

    cartItems.push(product);

    updateCartCount();
    renderCartItems();
    updateTotal();

    cartEmpty.style.display = 'none';
    cartModal.classList.remove('hidden');
  });
});

// Close cart modal
closeCart.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

const clearCartBtn = document.getElementById('clear-cart');
clearCartBtn.addEventListener('click', () => {
  cartItems = [];
  updateCartCount();
  renderCartItems();
  updateTotal();
  cartEmpty.style.display = 'block';
})

function updateTotal() {
  const totalElement = document.getElementById('cart-total');
  let total = 0;

  cartItems.forEach(item => {
    const price = parseFloat(item.price.replace('$', ''));
    total += price;
  });

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}