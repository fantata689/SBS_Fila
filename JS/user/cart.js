const unitPrice = 99000;
let quantity = 1;

const qty = document.querySelector("#qty");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const productTotal = document.querySelector("#productTotal");
const orderTotal = document.querySelector("#orderTotal");
const checkout = document.querySelector("#checkout");

const formatWon = (value) => `${value.toLocaleString("ko-KR")}원`;

function render() {
  const total = unitPrice * quantity;
  qty.textContent = quantity;
  productTotal.textContent = formatWon(total);
  orderTotal.textContent = formatWon(total);
  checkout.textContent = `총 ${quantity}개 상품 결제하기`;
}

minus.addEventListener("click", () => {
  quantity = Math.max(1, quantity - 1);
  render();
});

plus.addEventListener("click", () => {
  quantity += 1;
  render();
});

render();
