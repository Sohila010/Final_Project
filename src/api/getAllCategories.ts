export default async function getAllcategories() {
    let response=await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    let {data} = await response.json()
    return data
}