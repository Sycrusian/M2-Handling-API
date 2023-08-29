import { getProducts } from "./requests.js";

const createProductCard = product => {
    const card = document.createElement("li");
    card.classList.add("product__card");
    const title = document.createElement("h3");
    title.classList.add("product__name");
    title.innerText = product.nome_do_produto;
    const image = document.createElement("img");
    image.classList.add("product__image");
    image.src = product.imagem;
    image.alt = product.nome_do_produto;
    const description = document.createElement("p");
    description.classList.add("product__description");
    description.innerText = product.descricao_do_produto;
    const price = document.createElement("p");
    price.classList.add("product__price");
    price.innerText = `R$ ${product.preco}`;
    const quantity = document.createElement("p");
    quantity.classList.add("product__quantity");
    quantity.innerText = `Quantidade em Estoque: ${product.quantidade_em_estoque}`;
    card.append(title, image, description, price, quantity);
    return card;
}

const renderCards = async () => {
    const products = await getProducts();
    const productList = document.querySelector(".product__list");
    products.forEach(product => productList.appendChild(createProductCard(product)));
}

const handleModal = () => {
    const newProductDialog = document.querySelector("#dialog__new-product");
    const newProductButton = document.querySelector("#new-product");
    const newProductCloseButton = document.querySelector("#close__new-product");
    newProductButton.addEventListener("click", () => newProductDialog.showModal());
    newProductCloseButton.addEventListener("click", () => newProductDialog.close());
}


const renderPage = () => {
    handleModal();
    renderCards();
}

renderPage();

