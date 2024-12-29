const header = document.getElementById("header");

function logo() {
  const navbar = document.createElement("div");
  navbar.innerHTML = `
    <div class="navbar">
      <div class="logo">
        <img src="./assets/img-logo/Eco-Market.png" alt="logo de Eco Market">
      </div>
      <div class="titulo">
        <h1>Eco Market</h1>
      </div>
      <div id="agregados" class="carrito">
        <img src="./assets/img-carrito de compras/carrito-de-compras (1).png" alt="carrito de compras">
        <span id="numProductos" class="num-productos">0</span>
      </div>
    </div>
  `;
  header.append(navbar);
}

logo();

const productos = document.getElementById("main");
const carrito = [];

async function obtenerProductos() {
  try {
    const respuestaProductos = await fetch("https://fakestoreapi.com/products");
    const data = await respuestaProductos.json();
    console.log(data);

    data.forEach((item) => {
      const cardproducto = document.createElement("div");
      cardproducto.classList.add("card");

      cardproducto.innerHTML = `
        <img class="card-img" src="${item.image}" alt="${item.title}">
        <h3 class="producto">${item.title}</h3>
        <p class="informacion">${item.category}</p>
        <p class="informacion">${item.description}</p>
        <p class="informacion">Precio: $${item.price}</p>
        <button class="boton" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}">Agregar al carrito</button>
      `;

      productos.appendChild(cardproducto);
    });

    document.querySelectorAll(".boton").forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
    });

  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al obtener los productos",
      icon: "error"
    });
  }
}

obtenerProductos();

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));  
}

function cargarCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];  
}

function agregarAlCarrito(event) {
  const boton = event.target;
  const producto = {
    id: boton.getAttribute("data-id"),
    title: boton.getAttribute("data-title"),
    price: parseFloat(boton.getAttribute("data-price"))
  };

  carrito.push(producto);
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const section = document.getElementById("agregarCarrito");
  section.innerHTML = '';  

  if (carrito.length > 0) {
    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <thead class = "tabla">
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody class = "tabla2">
        ${carrito.map((item, index) => `
          <tr>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td><button class="botones1" data-index="${index}">Eliminar</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;
    section.appendChild(tabla);

    const total = carrito.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    section.appendChild(totalElement);

    const botones = document.createElement("div");
    botones.innerHTML = `
      <button class="botones2" id="finalizarCompra">Finalizar compra</button>
      <button id="vaciarCarrito">Vaciar carrito</button>
    `;
    section.appendChild(botones);

    document.getElementById("finalizarCompra").addEventListener("click", finalizarCompra);
    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
    document.querySelectorAll(".botones1").forEach(boton => {
      boton.addEventListener("click", eliminarProducto);
    });
  } else {
    section.innerHTML = "<p>El carrito está vacío</p>";
  }


  document.getElementById("numProductos").textContent = carrito.length;
}

function finalizarCompra() {
  Swal.fire({
    title: "Compra finalizada",
    text: "¡Gracias por tu compra!",
    icon: "success"
  });
  carrito.length = 0; 
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  guardarCarrito(); 
  actualizarCarrito();
}

function eliminarProducto(event) {
  const index = event.target.getAttribute("data-index");
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

const pieDePagina = document.getElementById("footer");

function redesSociales() {
  const footer = document.createElement("div");
  footer.innerHTML = `
    <h2>Consulta nuestras redes sociales</h2>
    <div class="Social-icons">
      <a href="#">
        <img src="./assets/img-redes/facebook-color-svgrepo-com.svg" alt="icono de Facebook">
      </a>
      <a href="#">
        <img src="./assets/img-redes/instagram-1-svgrepo-com.svg" alt="icono de Instagram">
      </a>
      <a href="#">
        <img src="./assets/img-redes/twitter-svgrepo-com.svg" alt="icono de Twitter">
      </a>
    </div>
  `;
  pieDePagina.append(footer);
}

redesSociales();
