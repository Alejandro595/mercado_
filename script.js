const products = [
    { name: "Arroz (1 lb)", price: 10500, category: "granos", img: "https://supermercadolaestacion.com/35562-thickbox_default/arroz-bulto-x-10-libras.jpg" },
    { name: "Frijoles (500 g)", price: 9200, category: "granos", img: "https://supermercadolaestacion.com/48149-thickbox_default/frijol-zaragoza-el-trece-bolsa-x-500-gramos-.jpg" },
    { name: "Aceite (1 L)", price: 18000, category: "condimentos", img: "https://www.artepan.com.co/wp-content/uploads/2021/06/ACEITE-1000.png" },
    { name: "Huevos (30 unid)", price: 15500, category: "acompañamientos", img: "https://png.pngtree.com/png-vector/20240822/ourmid/pngtree-freshness-packed-in-every-egg-carton-on-transparent-background-png-image_13591613.png" },
    { name: "Leche (1 L)", price: 6000, category: "lacteos", img: "https://png.pngtree.com/png-clipart/20231105/original/pngtree-bottle-of-half-fat-milk-top-picture-image_13234339.png" },
    { name: "Pan Tajado (500 g)", price: 8500, category: "acompañamientos", img: "https://supermercadolaestacion.com/47907-thickbox_default/pan-natipan-x500gr-tajado.jpg" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const payButton = document.getElementById("pay-button");

let cart = [];

function displayProducts(filter = "all") {
    productList.innerHTML = "";
    const filteredProducts = products.filter(p => filter === "all" || p.category === filter);
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>$${product.price.toLocaleString()} COP</strong></p>
            <button onclick="addToCart('${product.name}', ${product.price})">Añadir</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()} 
            <button onclick="removeFromCart(${index})">❌</button>`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toLocaleString();
    payButton.disabled = cart.length === 0;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => displayProducts(button.dataset.category));
});

// Buscador de productos
document.getElementById("search").addEventListener("input", function() {
    const searchTerm = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    if (filtered.length > 0) {
        productList.innerHTML = "";
        filtered.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>$${product.price.toLocaleString()} COP</strong></p>
                <button onclick="addToCart('${product.name}', ${product.price})">Añadir</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>No hay coincidencias</p>";
    }
});

displayProducts();
