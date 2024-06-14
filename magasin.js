if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var addToCartButtons = document.getElementsByClassName("shop-article-button");

  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var titre =
    shopItem.getElementsByClassName("shop-article-titre")[0].innerText;
  var prix = shopItem.getElementsByClassName("shop-article-prix")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-article-image")[0].src;
  addItemToCart(titre, prix, imageSrc);
}

function addItemToCart(titre, prix, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("panier-row");
  var cartItems = document.getElementsByClassName("panier-articles")[0];
  var cartItemNames = cartItems.getElementsByClassName("panier-article-titre");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == titre) {
      alert("L'article est déjà ajouté au panier !");
      return;
    }
  }
  var cartRowContents = `
          <div class="panier-article panier-column">
              <img class="panier-article-image" src="${imageSrc}" width="100" height="100">
              <span class="panier-article-titre">${titre}</span>
          </div>
          <span class="panier-prix panier-column">${prix}</span>
          <div class="panier-qte panier-column">
              <input class="panier-qte-input" type="number" value="1">
              <button class="btn btn-danger" type="button">SUPPRIMER</button>
          </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("panier-qte-input")[0]
    .addEventListener("change", quantityChanged);
}

function purchaseClicked() {
  alert("Merci pour vos achats");
  var cartItems = document.getElementsByClassName("panier-article")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  /*updateCartTotal();*/
  majPanierTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  /*updateCartTotal();*/
  majPanierTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  /* updateCartTotal();*/
  majPanierTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title =
    shopItem.getElementsByClassName("shop-article-titre")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-article-prix")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-article-image")[0].src;
  addItemToCart(title, price, imageSrc);
  /*updateCartTotal();*/
  majPanierTotal();
}

/* mise a jour panier : 1*/

/* mise a jour panier 2:    majPanierTotal() */
function majPanierTotal() {
  var panierArticleContainer =
    document.getElementsByClassName("panier-articles")[0];
  var panierRows = panierArticleContainer.getElementsByClassName("panier-row");
  var total = 0;
  for (var i = 0; i < panierRows.length; i++) {
    var panierRow = panierRows[i];
    var priceElement = panierRow.getElementsByClassName("panier-prix")[0];
    var qtElement = panierRow.getElementsByClassName("panier-qte-input")[0];
    var prix = parseFloat(priceElement.innerText.replace("DA", ""));
    var quantite = qtElement.value;
    total = total + prix * quantite;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("panier-total-prix")[0].innerText =
    total + "DA";
}
