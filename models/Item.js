class Item{
    constructor(id,imageUrl,name,userId,provider,quantity){
        this.id = id;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.name = name;
        this.provider = provider;
        this.quantity = quantity;
    }
}
export default Item;