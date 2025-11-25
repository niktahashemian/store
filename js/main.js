// ...existing code...
(function(){
  const CART_KEY = 'shop_cart_v1';

  function getCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount(){
    const cart = getCart();
    const total = cart.reduce((s,i) => s + (i.qty || 1), 0);
    const el = document.getElementById('cart-count');
    if(el) el.textContent = total;
  }

  function addToCart(item){
    const cart = getCart();
    const existing = cart.find(i => i.title === item.title && i.price === item.price);
    if(existing) existing.qty = (existing.qty||1) + 1;
    else { item.qty = 1; cart.push(item); }
    saveCart(cart);
  }

  function readProductFromCard(card){
    const titleEl = card.querySelector('.title');
    const priceEl = card.querySelector('.price');
    const imgEl = card.querySelector('.img-sec img');
    return {
      title: titleEl ? titleEl.textContent.trim() : 'محصول',
      price: priceEl ? priceEl.textContent.trim() : '',
      img: imgEl ? imgEl.src : ''
    };
  }

  document.addEventListener('click', function(e){
    const a = e.target.closest('a.b-text');
    if(!a) return;
    // اگر متن شامل "خرید" باشه اقدام کن
    if(a.textContent && a.textContent.trim().includes('خرید')){
      e.preventDefault();
      const card = a.closest('.shoping-card');
      if(!card) return;
      const item = readProductFromCard(card);
      addToCart(item);
      updateCartCount();
      // برای دیباگ: کنسول هم چاپ کن
      console.log('added to cart:', item);
      // بازخورد کوتاه به کاربر
      alert('محصول به سبد اضافه شد');
    }
  });

  document.addEventListener('DOMContentLoaded', updateCartCount);
})();
 // ...existing code...