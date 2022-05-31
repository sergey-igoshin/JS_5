/*
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/
const cart = [
  // {name: 'Asus', price: 900, quantity: 1, },
  // {name: 'Lenovo', price: 1200, quantity: 1, },
];

const dict = {  
  cart_null: 'Корзина пустая',
  add_to_cart: 'В корзину',
  total_products: 'Всего товаров: ',
  amount: 'На сумму: ',
  currency: '₽',
  unit_of_measurement: 'шт', 
};

const setting = {
  display: {
    table:'table',
    tableCell: 'table-cell',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'black',
  },
  paddingBottom: 0,
  margin: 'auto',
  verticalAlign: 'middle',
  padding: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  width: 120,
  height: 30,
  text: {
    alignRight: 'center',
    alignRight: 'right',
    alignLeft: 'left',
  },
  container: 360,
};

const main = { 
  cart,
  dict,
  setting,
  containerElement: document.querySelector('div'),

  init(){
    this.containerElement.innerHTML = '';
    this.initCart();       
  },  

  initCart(){
    const store_cart = this.createStoreCart();    

    if(this.cart.length > 0){
      const obj = {total: 0, quantity: 0}

      this.cart.forEach(function (el){
        const store_product = main.createStoreProduct();      
        
        Object.keys(el).forEach(function(key) {
          if(key == 'price') obj.total += el[key];
          if(key == 'quantity') obj.quantity += el[key];
          const product = main.createProduct(key, el, 'cart')
          store_product.appendChild(product);
        });      
        
        store_cart.appendChild(store_product);
      }); 

      const cart_total = main.createTotalProduct();
      cart_total.innerText = this.dict.total_products + obj.quantity  + ' ' + this.dict.unit_of_measurement;
      store_cart.appendChild(cart_total);

      const cart_sum = main.createTotalProduct();
      cart_sum.innerText = this.dict.amount + obj.total + ' ' + this.dict.currency;
      store_cart.appendChild(cart_sum);

    }else{
      const cart_null = main.createStoreProduct();
      cart_null.innerText = this.dict.cart_null
      store_cart.appendChild(cart_null);
    }

    this.containerElement.appendChild(store_cart);
  },   

  createProduct(key, el, t){
    const d = document.createElement('div');
    this.createBlockProduct(d, key, el, t);
    return d;
  },  

  createStoreProduct(){
    const d = document.createElement('div');
    this.storeProductStyle(d);
    return d;
  },

  createTotalProduct(){
    const d = document.createElement('div');
    this.storeProductStyle(d);
    return d;
  },

  createStoreCart(){
    const d = document.createElement('div');
    this.storeCartStyle(d);
    return d;
  },

  createBlockProduct(p, key, el, t){
    let text = '';
    if(key == 'name'){
      text = el[key];
    }else if(key == 'price'){
      if(el['quantity'] < 1) {
        text = '';
      }else {
        text = el[key] + ' ' + this.dict.currency;
      }     
      this.textAlignRight(p);
    }else if(key == 'quantity'){
      if(t == 'product') {
        if(el[key] < 1) text = this.dict.out_of_stock;
        else text = this.dict.in_stock;
      }else if(t == 'cart'){
        text = el[key] + ' ' + this.dict.unit_of_measurement
      }      
      this.textAlignRight(p);
    }
    p.innerText = text;
    this.productStyle(p);    
  },

  productStyle(t){
    t.style.display = this.setting.display.tableCell;
    t.style.verticalAlign = this.setting.verticalAlign;
    t.style.width = this.setting.width + 'px';
    this.padding(t);
  },  

  textAlignRight(t){
    t.style.textAlign = this.setting.text.alignRight;
  },

  storeProductStyle(t){
    t.style.margin = this.setting.margin;
    t.style.display = this.setting.display.table;
    t.style.verticalAlign = this.setting.verticalAlign;
    this.padding(t);
  },

  storeCartStyle(t){
    t.style.margin = this.setting.margin;
    t.style.width = this.setting.container + 'px'
    t.style.display = this.setting.display.table;
    t.style.borderBottomWidth = this.setting.borderBottom.borderBottomWidth + 'px';
    t.style.borderBottomStyle = this.setting.borderBottom.borderBottomStyle;
    t.style.borderBottomColor =  this.setting.borderBottom.borderBottomColor;
    t.style.paddingBottom =  this.setting.paddingBottom + 'px';
  },

  padding(t){
    t.style.paddingTop = this.setting.padding.paddingTop + 'px'; 
    t.style.paddingRight = this.setting.padding.paddingRight + 'px'; 
    t.style.paddingBottom = this.setting.padding.paddingBottom + 'px'; 
    t.style.paddingLeft = this.setting.padding.paddingLeft + 'px'; 
  },
}

main.init();