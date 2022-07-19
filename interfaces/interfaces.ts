export default interface FavsInfo{
    [key: string]: any,
    UserId: string,
    Unique: string,
    ProductIdentity: string,
    ImageOfProduct: string,
}
    
export default interface userInfo {
    id: string,
    createdAt: Date,
    productId: string,
    Author: string, 
    Photo: string,
    Content: string
}

