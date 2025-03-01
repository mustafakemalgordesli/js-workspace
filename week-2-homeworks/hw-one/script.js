const user = {
  name: prompt("Adınız:"),
  age: (function getValidAge() {
    let age;
    do {
      age = prompt("Yaşınız:");
    } while (isNaN(age) || age.trim() === "");
    return parseInt(age, 10);
  })(),
  job: prompt("Mesleğiniz:"),
};

console.log(user);
document.write(`<p>Ad: ${user.name}</p>`);
document.write(`<p>Yaş: ${user.age}</p>`);
document.write(`<p>Meslek: ${user.job}</p>`);

let cart = [];

function addProduct() {
  let name;
  let price;
  do {
    name = prompt("Ürün adını girin:");
  } while (name.trim() === "");

  do {
    price = prompt("Ürün fiyatını girin:");
  } while (isNaN(price));

  price = parseInt(price, 10);

  if (name && !isNaN(price)) {
    cart.push({ name, price });
    console.log(`${name} sepete eklendi.`);
    document.write(`<p>${name} sepete eklendi.</p>`);
  } else {
    console.log("Geçersiz giriş!");
    document.write(`<p>Geçersiz giriş!</p>`);
  }
}

function listCart() {
  console.log("Sepetiniz:");
  document.write("<h3>Sepetiniz:</h3>");
  cart.forEach((item, index) => {
    let productInfo = `${index + 1}. ${item.name} - ${item.price.toFixed(
      2
    )} TL`;
    console.log(productInfo);
    document.write(`<p>${productInfo}</p>`);
  });
}

function calculateTotal() {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let totalMessage = `Toplam Tutar: ${total.toFixed(2)} TL`;
  console.log(totalMessage);
  document.write(`<h3>${totalMessage}</h3>`);
}

function removeProduct() {
  listCart();
  let index =
    parseInt(prompt("Silmek istediğiniz ürünün numarasını girin:")) - 1;

  if (index >= 0 && index < cart.length) {
    let removedItem = cart.splice(index, 1);
    console.log(`${removedItem[0].name} sepetten çıkarıldı.`);
    document.write(`<p>${removedItem[0].name} sepetten çıkarıldı.</p>`);
  } else {
    console.log("Geçersiz seçim!");
    document.write(`<p>Geçersiz seçim!</p>`);
  }
}

function findProduct() {
  let searchName = prompt("Aramak istediğiniz ürünün adını girin:");
  let foundProducts = cart.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())
  );

  if (foundProducts.length > 0) {
    console.log("Bulunan Ürünler:");
    document.write("<h3>Bulunan Ürünler:</h3>");
    foundProducts.forEach((item) => {
      let foundInfo = `${item.name} - ${item.price.toFixed(2)} TL`;
      console.log(foundInfo);
      document.write(`<p>${foundInfo}</p>`);
    });
  } else {
    console.log("Ürün bulunamadı.");
    document.write(`<p>Ürün bulunamadı.</p>`);
  }
}

while (confirm("Sepete ürün eklemek ister misiniz?")) {
  addProduct();
}

listCart();
calculateTotal();

if (cart.length > 0 && confirm("Bir ürünü sepetten çıkarmak ister misiniz?")) {
  removeProduct();
  listCart();
  calculateTotal();
}

if (cart.length > 0 && confirm("Bir ürünü aramak ister misiniz?")) {
  findProduct();
}
