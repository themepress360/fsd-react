import { axiosfsd } from "./axios";
import dispatchEvent from "../utils/dispatchEvent";
export default class CartService{
    addToCart(){
        dispatchEvent('add-to-cart');
    }
}