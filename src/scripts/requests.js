const baseURL = "http://localhost:3333";

export const getProduct = async id => {
    const product = await fetch(`${baseURL}/products/${id}`, { method: "GET" })
        .then(async response => {
            const responseJson = await response.json();
            if (response.ok) {
                return responseJson;
            } else {
                throw new Error(`Erro: ${response.status}`);
            }
        })
        .catch(error => console.error(error.message));
    return product;
}

export const getProducts = async () => {
    const products = await fetch(`${baseURL}/products`, { method: "GET" })
        .then(async response => {
            const responseJson = await response.json();
            if (response.ok) {
                return responseJson;
            } else {
                throw new Error(`Erro: ${responseJson.message}`);
            }
        })
        .catch(error => console.error(error.message));
    return products;
}

export const postProduct = async product => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    };
    const postProduct = await fetch(`${baseURL}/products`, options)
    .then(async response => {
        const responseJson = await response.json();
        if (response.ok) {
            return responseJson;
        } else {
            throw new Error(`Erro: ${responseJson.message}`);
        }
    })
    .catch(error => console.error(error.message));
    return postProduct;
}

export const patchProduct = async (id, data) => {
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    const patchProduct = await fetch(`${baseURL}/products/${id}`, options)
    .then(async response => {
        const responseJson = await response.json();
        if (response.ok) {
            return responseJson;
        } else {
            throw new Error(`Erro: ${responseJson.message}`);
        }
    })
    .catch(error => console.error(error.message));
    return patchProduct;
}

export const deleteProduct = async id => {
    const deleteProduct = await fetch(`${baseURL}/products/${id}`, { method: "DELETE" })
    .then(async response => {
        const responseJson = await response.json();
        if (response.ok) {
            return responseJson;
        } else {
            throw new Error(`Erro: ${responseJson.message}`);
        }
    })
    .catch(error => console.error(error.message));
    return deleteProduct;
}