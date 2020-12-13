import { SET_PRODUCT_DETAIL_DATA,IS_LOADING,SET_BREADCRUMBS,ADD_TO_CART_QTY,PDP_PRICE,PDP_IMAGE,PDP_CONFIGURABLE,PDP_SELECTED_OPTION } from "../constants";

export const pdpData = (state=null,action)=>{

    switch (action.type) {
      case SET_PRODUCT_DETAIL_DATA:
         // window.productItem= {};
         if(!window.productItem.item)
          window.productItem.item = action.payload;
           
          return {...state, ...action.payload,isLoading : false};
      case IS_LOADING:
            return {
                ...state,
                isLoading : true
            };
      default: return state;
    }
}
export const breadcrumbsData = (state=null,action)=>{
    switch (action.type) {
      case SET_BREADCRUMBS:
          return action.payload;
      default: return state;
    }
}
export const addtocartQty = (state=1,action)=>{
    
    switch (action.type) {
      case ADD_TO_CART_QTY:
          window.productItem.qty = action.payload;
          return action.payload;
      default:  
          window.productItem =  window.productItem || {};
          window.productItem.qty = state; 
          return state;
    }
}  

export const pdpPrice = (state={},action)=>{
    switch (action.type) {
      case PDP_PRICE:
          return action.payload;
      default:  
          return state;
    }
}  
export const pdpImage = (state={gallery_image:[]},action)=>{
    switch (action.type) {
      case PDP_IMAGE:
          if(action.payload.data){
              action.payload.data.id = action.payload.id;
              
              const alreadyExits = state.gallery_image.find(image=>image.id===action.payload.id);
              if(!alreadyExits){
                //state.map(image=>image.id)  
                return {gallery_image:[...state.gallery_image,action.payload.data],id:action.payload.id}
              }
              return {...state,id:action.payload.id};
          }
          return {gallery_image:action.payload};
      default:  
          return state;
    }
}
export const configurableOption = (state={},action)=>{
    switch (action.type) {
      case PDP_CONFIGURABLE:
          return action.payload;
      default:  
          return state;
    }
} 

export const selectedConfigData = (state={},action)=>{
    console.log(action);
    switch (action.type) {
      case PDP_SELECTED_OPTION:
          return {...state,...action.payload};
      default:  
          return state;
    }
}