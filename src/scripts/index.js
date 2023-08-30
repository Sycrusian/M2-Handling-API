import { getProduct, deleteProduct, getProducts, postProduct, patchProduct } from "./requests.js";

const handleEdit = async id => {
    const product = await getProduct(id);
    const editProductInputs = document.querySelectorAll(".input__edit-product");
    const editProductDialog = document.querySelector("#dialog__edit-product");
    const editProductCloseButton = document.querySelector("#close__edit-product");
    const editProductCommitButton = document.querySelector("#edit-product");
    editProductCloseButton.addEventListener("click", () => editProductDialog.close());
    editProductCommitButton.addEventListener("click", async () => {
        editProductInputs.forEach(input => {
        if (input.value.trim()) {
            if (input.type == "number") {
                product[input.name] = parseFloat(input.value.trim());
            } else {
                product[input.name] = input.value.trim();
            }
        }});
        id = product.id;
        delete product.id;
        await patchProduct(id, product);
        renderCards();
        editProductDialog.close();
    })
    editProductInputs.forEach(input => input.value = product[input.name]);
    editProductDialog.showModal();
}

const handleDelete = async id => {
    const del = await deleteProduct(id);
    renderCards();
    return del;
}

const createProductCard = product => {
    const card = document.createElement("li");
    card.classList.add("product__card");
    const id = document.createElement("span");
    id.classList.add("hidden");
    id.innerText = product.id;
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
    price.innerText = `R$ ${(product.preco).toFixed(2)}`;
    const quantity = document.createElement("p");
    quantity.classList.add("product__quantity");
    quantity.innerText = `Quantidade em Estoque: ${product.quantidade_em_estoque}`;
    const buttons = document.createElement("div");
    const updateButton = document.createElement("button");
    updateButton.classList.add("card__button");
    updateButton.innerText = "Alterar";
    updateButton.addEventListener("click", event => {
        handleEdit(product.id);
    });
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__button");
    deleteButton.innerText = "Excluir";
    deleteButton.addEventListener("click", () => {
        handleDelete(product.id);
    });
    buttons.append(updateButton, deleteButton);
    card.append(id, title, image, description, price, quantity, buttons);
    return card;
}

const renderCards = async () => {
    const products = await getProducts();
    const productList = document.querySelector(".product__list");
    productList.innerHTML = "";
    products.forEach(product => productList.appendChild(createProductCard(product)));
}

const createProduct = async () => {
    const productInputs = document.querySelectorAll(".input__new-product");
    const newProduct = {};
    let valid = true;
    productInputs.forEach(input => {
        if (input.value.trim()) {
            if (input.type == "number") {
                newProduct[input.name] = parseFloat(input.value.trim());
            } else {
                newProduct[input.name] = input.value.trim();
            }
        } else {
            valid = false;
        }
    });
    if (valid) {
        await postProduct(newProduct);
        productInputs.forEach(input => input.value = "");
    }
    return valid;
}

const handleModal = () => {
    const newProductDialog = document.querySelector("#dialog__new-product");
    const newProductButton = document.querySelector("#new-product");
    const newProductCloseButton = document.querySelector("#close__new-product");
    const newProductCreateButton = document.querySelector("#create__new-product");
    newProductButton.addEventListener("click", () => newProductDialog.showModal());
    newProductCloseButton.addEventListener("click", () => newProductDialog.close());
    newProductCreateButton.addEventListener("click", async () => {
        const finished = await createProduct();
        if (finished) {
            newProductDialog.close();
            renderCards();
        }
    })
}


const renderPage = () => {
    handleModal();
    renderCards();
}

renderPage();

