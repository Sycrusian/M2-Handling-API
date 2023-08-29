const baseURL = "http://localhost:3333";

export const getProducts = async () => {
    const products = await fetch(`${baseURL}/products`, { method: "GET" })
        .then(async response => {
            const responseJson = await response.json();
            if (response.ok) {
                return responseJson;
            } else {
                throw new Error(`Erro: ${response.status}`);
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
    }
    const fetchPost = await fetch(`${baseURL}/products`, options)
}