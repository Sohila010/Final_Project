export default async function getProductDetails(id) {
     let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    let { data } = await response.json()
    return data
}