/* =====================================================
   FLOR STORE — flor-store.js
   ===================================================== */

// ── PRODUCTOS ──
const productos = [
  { id:1,  nombre:'Blusas Koketas',       cat:'mujer',      precio:89900,  tallas:['S','M','L','XL'],    badge:'',      desc:'Algodón premium, corte moderno. Varios colores.',          img:'fotos/KOKET.png' },
  { id:2,  nombre:'Blusas Elegantes',     cat:'mujer',      precio:75000,  tallas:['S','M','L'],          badge:'nuevo', desc:'Tela suave con caída perfecta. Ideal para toda ocasión.',  img:'fotos/JAIME.png' },
  { id:3,  nombre:'Blusas Nova',          cat:'mujer',      precio:62000,  tallas:['S','M','L','XL'],    badge:'',      desc:'Estampados exclusivos, tela fresca para clima cálido.',    img:'fotos/Blusas1.png' },
  { id:4,  nombre:'Body Lycra',           cat:'mujer',      precio:72000,  tallas:['XS','S','M','L'],    badge:'nuevo', desc:'Tela ajustada de lycra, escote elegante.',                 img:'fotos/Body1.png' },
  { id:5,  nombre:'Camisas Mavar',        cat:'hombre',     precio:65000,  tallas:['S','M','L','XL'],    badge:'',      desc:'Tela fluida, múltiples estilos. Ideal para toda ocasión.', img:'fotos/camisas2.png' },
  { id:6,  nombre:'Camisas Kcios',        cat:'hombre',     precio:95000,  tallas:['S','M','L','XL'],    badge:'nuevo', desc:'Algodón premium, cortes modernos y clásicos.',             img:'fotos/Camisas1.png' },
  { id:7,  nombre:'Camisa Azul Rey',      cat:'hombre',     precio:95000,  tallas:['S','M','L','XL'],    badge:'',      desc:'Color vibrante, tela de alta calidad.',                    img:'fotos/CAMISAH3.png' },
  { id:8,  nombre:'Camisa Con Líneas',    cat:'hombre',     precio:98000,  tallas:['S','M','L','XL'],    badge:'',      desc:'Estilo urbano moderno. Comodidad y estilo.',               img:'fotos/CAMISA7.png' },
  { id:9,  nombre:'Botines Mujer',        cat:'calzado',    precio:145000, tallas:['35','36','37','38'], badge:'',      desc:'Cuero suave, suela cómoda. Elegancia en cada paso.',       img:'fotos/BOTAMUJER.png' },
  { id:10, nombre:'Botines Hombre',       cat:'calzado',    precio:155000, tallas:['40','41','42','43'], badge:'',      desc:'Cuero genuino, suela antideslizante. Confort todo el día.',img:'fotos/BOTAHOM.png' },
  { id:11, nombre:'Botín Formal',         cat:'calzado',    precio:210000, tallas:['40','41','42','43'], badge:'',      desc:'Cuero italiano, suela de goma. Perfecto para eventos.',    img:'fotos/BOTAD2.png' },
  { id:12, nombre:'Botín Casual',         cat:'calzado',    precio:168000, tallas:['37','38','39','40'], badge:'nuevo', desc:'Estilo urbano, suela flexible. Uso diario.',               img:'fotos/BOTAD3.png' },
  { id:13, nombre:'Collares Artesanales', cat:'accesorios', precio:55000,  tallas:['Único'],             badge:'',      desc:'Artesanía colombiana, piezas únicas naturales.',           img:'fotos/COLLARES.jpeg' },
  { id:14, nombre:'Aretes Colibrí',       cat:'accesorios', precio:78000,  tallas:['Único'],             badge:'nuevo', desc:'Diseños exclusivos para toda ocasión.',                    img:'fotos/COLIBRI1.jpeg' },
  { id:15, nombre:'Medias Premium',       cat:'accesorios', precio:22000,  tallas:['S','M','L'],         badge:'',      desc:'Pack variado. Algodón premium, colores únicos.',           img:'fotos/MEDIAS1.png' },
];

// ── ESTADO DEL CARRITO ──
let carrito = [];

// ── RENDERIZAR PRODUCTOS ──
function renderProductos(lista) {
  const grid = document.getElementById('product-grid');
  document.getElementById('prod-count').textContent = lista.length;

  grid.innerHTML = lista.map(function(p) {
    return `
      <div class="product-card" data-cat="${p.cat}">
        <div class="product-img" style="background-image:url('${p.img}')">
          ${p.badge ? `<div class="product-badge ${p.badge}">${p.badge === 'nuevo' ? 'Nuevo' : p.badge}</div>` : ''}
        </div>
        <div class="product-info">
          <div class="product-cat">${p.cat}</div>
          <div class="product-name">${p.nombre}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="tallas-label">Talla</div>
          <div class="tallas-row">
            ${p.tallas.map(function(t) {
              return `<button class="talla-btn" onclick="selTalla(this)">${t}</button>`;
            }).join('')}
          </div>
          <div class="product-footer">
            <span class="product-price">$${p.precio.toLocaleString('es-CO')}</span>
            <button class="add-to-cart" onclick="agregarAlCarrito(${p.id}, this)">
              + Agregar
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── FILTRAR POR CATEGORÍA ──
function filtrar(cat, btn) {
  document.querySelectorAll('.filtro-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  const lista = cat === 'todos'
    ? productos
    : productos.filter(function(p) { return p.cat === cat; });

  renderProductos(lista);
}

// ── SELECTOR DE TALLA ──
function selTalla(btn) {
  const row = btn.closest('.tallas-row');
  row.querySelectorAll('.talla-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
}

// ── AGREGAR AL CARRITO ──
function agregarAlCarrito(id, btn) {
  const prod = productos.find(function(p) { return p.id === id; });
  const card = btn.closest('.product-card');
  const tallaBtn = card.querySelector('.talla-btn.sel');
  const talla = tallaBtn ? tallaBtn.textContent : prod.tallas[0];

  const existente = carrito.find(function(i) {
    return i.id === id && i.talla === talla;
  });

  if (existente) {
    existente.qty++;
  } else {
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      cat: prod.cat,
      precio: prod.precio,
      talla: talla,
      qty: 1,
      img: prod.img
    });
  }

  // Feedback visual en el botón
  btn.textContent = '✓ Agregado';
  btn.classList.add('added');
  setTimeout(function() {
    btn.textContent = '+ Agregar';
    btn.classList.remove('added');
  }, 1500);

  actualizarCarrito();
  mostrarToast('¡' + prod.nombre + ' agregado al carrito!');
}

// ── ACTUALIZAR CARRITO ──
function actualizarCarrito() {
  const total = carrito.reduce(function(sum, i) { return sum + i.precio * i.qty; }, 0);
  const totalItems = carrito.reduce(function(sum, i) { return sum + i.qty; }, 0);

  // Contador del botón
  const countEl = document.getElementById('cart-count');
  countEl.textContent = totalItems;
  countEl.classList.toggle('visible', totalItems > 0);

  // Totales
  document.getElementById('cart-subtotal').textContent = '$' + total.toLocaleString('es-CO');
  document.getElementById('cart-total').textContent = '$' + total.toLocaleString('es-CO');

  // Renderizar items
  const itemsEl = document.getElementById('cart-items');

  if (carrito.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍️</div>
        <p>Tu carrito está vacío</p>
      </div>`;
  } else {
    itemsEl.innerHTML = carrito.map(function(item) {
      return `
        <div class="cart-item">
          <div class="cart-item-img" style="background-image:url('${item.img}')"></div>
          <div class="cart-item-info">
            <div class="cart-item-cat">${item.cat}</div>
            <div class="cart-item-name">${item.nombre}</div>
            <div class="cart-item-talla">Talla: ${item.talla}</div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">$${(item.precio * item.qty).toLocaleString('es-CO')}</span>
              <div class="cart-item-controls">
                <button class="qty-btn" onclick="cambiarQty(${item.id},'${item.talla}',-1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button class="qty-btn" onclick="cambiarQty(${item.id},'${item.talla}',1)">+</button>
                <button class="remove-btn" onclick="eliminarItem(${item.id},'${item.talla}')">✕</button>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  // Generar mensaje de WhatsApp
  if (carrito.length > 0) {
    let msg = '¡Hola! Quiero hacer el siguiente pedido:%0A%0A';
    carrito.forEach(function(item) {
      msg += '✦ ' + item.nombre + ' — Talla ' + item.talla + ' x' + item.qty + ' = $' + (item.precio * item.qty).toLocaleString('es-CO') + '%0A';
    });
    msg += '%0A*Total: $' + total.toLocaleString('es-CO') + '*';
    document.getElementById('btn-whatsapp').href = 'https://wa.me/573219024318?text=' + msg;
  }
}

// ── CAMBIAR CANTIDAD ──
function cambiarQty(id, talla, dir) {
  const item = carrito.find(function(i) { return i.id === id && i.talla === talla; });
  if (!item) return;
  item.qty += dir;
  if (item.qty <= 0) eliminarItem(id, talla);
  else actualizarCarrito();
}

// ── ELIMINAR ITEM ──
function eliminarItem(id, talla) {
  carrito = carrito.filter(function(i) {
    return !(i.id === id && i.talla === talla);
  });
  actualizarCarrito();
}

// ── ABRIR / CERRAR CARRITO ──
function toggleCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}

// ── TOAST ──
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

// ── INICIALIZACIÓN ──
document.addEventListener('DOMContentLoaded', function() {
  renderProductos(productos);
});