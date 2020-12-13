class Method{
    imagePath = process.env.REACT_APP_BASE_PATH;
    formatPrice = (price) =>{
        // console.log(price);
        return "$"+Number(price).toFixed(2);
    }
    
}
export default Method;