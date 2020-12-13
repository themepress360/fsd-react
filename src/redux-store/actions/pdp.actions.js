import { SET_PRODUCT_DETAIL_DATA, SET_BREADCRUMBS, ADD_TO_CART_QTY, PDP_IMAGE, PDP_PRICE, PDP_CONFIGURABLE, PDP_SELECTED_OPTION } from "../constants"

export const setProductDetailData = (response) =>{
    return {
        type : SET_PRODUCT_DETAIL_DATA,
        payload:response
    }
}
export const setBreadcrumbs = (response) =>{
    return {
        type : SET_BREADCRUMBS,
        payload:response
    }
}
export const setAddtoCartQty = (response) =>{
    return {
        type : ADD_TO_CART_QTY,
        payload:response
    }
}
export const setPDPImage = (response) =>{
    return {
        type : PDP_IMAGE,
        payload:response
    }
}
export const setPDPPrice = (response) =>{
    return {
        type : PDP_PRICE,
        payload: response
    }
}
export const setPDPConfigurable = (response) =>{
    return {
        type : PDP_CONFIGURABLE,
        payload:response
    }
}
export const setOptionData = (response) =>{
    return {
        type : PDP_SELECTED_OPTION,
        payload:response
    }
}
