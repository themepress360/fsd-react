import React from 'react';
import withApp from '../../higherorder';
var globalA = 0
const MagnifierImgView = (props) => {
    const {constant}= props;
    var lensSize = {
        width:250,
        height:250,
    }

    if (props.lensWidth)
        lensSize.width = props.lensWidth
        
    if (props.lensHeight)
        lensSize.height = props.lensHeight

    const idOfElem = Date.now() + "-" + (globalA++)
    function imageZoom(imgID) {
        var img, lens, cx, cy;
        img = document.getElementById(imgID);
        if (!img)
            return
        var resultID = props.largeImageSrc;
        /*create lens:*/
        lens = document.getElementById(props.index + "-lens");

        if (!lens) {
            lens = document.createElement("div");
            lens.setAttribute("id", props.index + "-lens")
            lens.setAttribute("class", "img-zoom-lens");
            /*insert lens:*/
            if (img.parentElement)
                img.parentElement.insertBefore(lens, img);
        }

        lens.style.width = img.clientWidth / 2;
        lens.style.height = img.clientHeight / 2;
        if(lensSize.width < lens.style.width)
            lens.style.width = lensSize.width;
    
        if(lensSize.height < lens.style.height)
            lens.style.height = lensSize.height;

        /*calculate the ratio between result DIV and lens:*/
        cx = img.offsetWidth / lens.offsetWidth;
        cy = img.offsetHeight / lens.offsetHeight;
        /*set background properties for the result DIV:*/
        img.style.backgroundImage = "url('" + resultID + "')";
        img.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);

        lens.addEventListener("mouseover", goingToWork);
        img.addEventListener("mouseover", goingToWork);

        lens.addEventListener("mouseout", placeImg);
        img.addEventListener("mouseout", placeImg);

        /*and also for touch screens:*/
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);

        lens.addEventListener("touchover", goingToWork);
        img.addEventListener("touchover", goingToWork);

        lens.addEventListener("touchout", placeImg);
        img.addEventListener("touchout", placeImg);

        function placeImg(e) {
            img.src = props.imageSrc;
            if (props.onHoverStop)
                props.onHoverStop()
        }

        function goingToWork(e) {
            moveLens(e)
            if (props.onHoverStart)
                props.onHoverStart()
        }

        function moveLens(e) {
            var pos, x, y;
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            /*calculate the position of the lens:*/
            x = pos.x - (lens.offsetWidth / 2);
            y = pos.y - (lens.offsetHeight / 2);
            /*prevent the lens from being positioned outside the image:*/
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }
            /*set the position of the lens:*/
            lens.style.left = x + "px";
            lens.style.top = y + "px";
            /*display what the lens "sees":*/
            img.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
            img.src = constant.imagePath+"/transparent.png"
        }

        function getCursorPos(e) {
            var a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }

        function stopWorking() {
            /*execute a function when someone moves the cursor over the image, or the lens:*/
            lens.removeEventListener("mousemove", moveLens);
            img.removeEventListener("mousemove", moveLens);

            lens.removeEventListener("mouseover", goingToWork);
            img.removeEventListener("mouseover", goingToWork);

            lens.removeEventListener("mouseout", placeImg);
            img.removeEventListener("mouseout", placeImg);

            /*and also for touch screens:*/
            lens.removeEventListener("touchmove", moveLens);
            img.removeEventListener("touchmove", moveLens);

            lens.removeEventListener("touchover", goingToWork);
            img.removeEventListener("touchover", goingToWork);

            lens.removeEventListener("touchout", placeImg);
            img.removeEventListener("touchout", placeImg);
        }

        return stopWorking;
    }

    setTimeout(function () {
        imageZoom(idOfElem)
    }, 10)

    return (<img src={props.imageSrc} id={idOfElem} className="full-width-img" />)
}

export default  withApp(MagnifierImgView)
