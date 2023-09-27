document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);

  let lastX1, lastY1, lastX2, lastY2, initialDistance;
  var container = document.getElementById('workarea');
  var offset = 1;
  var isDragging = false;

  function touchHandler(evt) {
    if (evt.type == "touchcancel") { //touchcancel wird in touchend umgewandelt
      evt.type = "touchend";
    }

    evt.preventDefault();
    
    if (evt.type == "touchend" && svgCanvas.getMode() == 'text') {
      return;
    }

    if (evt.type == "touchend" && evt.touches.length > 0) { //nur ein touchendevent
      return;
    }

    if(evt.type == "touchend" && isDragging) {
      isDragging = false;
      initialDistance = null;
      return;
    }

    if(evt.touches.length == 2) {
      handleTwoFinger(evt);
    }
    else if(evt.touches.length > 2){}
    else{
      if (evt.type == "touchmove") {
        evt.preventDefault();
      }
      
      var newEvt = document.createEvent("MouseEvents");
      var type = null;
      var touch = null;
  
      switch (evt.type) { //touch wird erkannt und in mousedown, mousemove, mouseup umgewandelt
        case "touchstart":
          type = "mousedown";
          touch = evt.changedTouches[0];
          break;
        case "touchmove":
          type = "mousemove";
          touch = evt.changedTouches[0];
          break;
        case "touchend":
          type = "mouseup";
          touch = evt.changedTouches[0];
          break;
      }

      newEvt.initMouseEvent(type, true, true, window, 0,
        touch.screenX, touch.screenY, touch.clientX, touch.clientY,
        evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
  
      touch.target.dispatchEvent(newEvt);
    }    
  }

  function handleTwoFinger(evt) {
    //single touch abbrechen
    var newEvt = document.createEvent("MouseEvents");

    type = "mouseup";
    touch = evt.changedTouches[0];

    newEvt.initMouseEvent(type, true, true, window, 0,
      touch.screenX, touch.screenY, touch.clientX, touch.clientY,
      evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);

    touch.target.dispatchEvent(newEvt);

    if(evt.type == "touchstart") {
      //zeichnen abbrechen
      isDragging = true;
      initialDistance = null;

      const touch1 = evt.touches[0];
      const touch2 = evt.touches[1];

      lastX1 = touch1.clientX;
      lastY1 = touch1.clientY;
      lastX2 = touch2.clientX;
      lastY2 = touch2.clientY;
    }
    else if (evt.type == "touchmove") {
      const touch1 = evt.touches[0];
      const touch2 = evt.touches[1];

      const deltaX1 = touch1.clientX - lastX1;
      const deltaY1 = touch1.clientY - lastY1;
      const deltaX2 = touch2.clientX - lastX2;
      const deltaY2 = touch2.clientY - lastY2;

      if(Math.abs(deltaX1) <= offset && Math.abs(deltaY1) <= offset && Math.abs(deltaX2) <= offset && Math.abs(deltaY2) <= offset) return;

      handleZoom(deltaX1, deltaY1, deltaX2, deltaY2, touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);

      if(Math.abs(deltaX1) > offset){
        if (deltaX1 > 0) {
          container.scrollLeft -= deltaX1;
        } else if (deltaX1 < 0) {
          container.scrollLeft -= deltaX1;
        }
      }

      if(Math.abs(deltaY1) > offset){
        if (deltaY1 > 0) {
          container.scrollTop -= deltaY1;
        } else if (deltaY1 < 0) {
          container.scrollTop -= deltaY1;
        }
      }

      lastX1 = touch1.clientX;
      lastY1 = touch1.clientY;

      lastX2 = touch2.clientX;
      lastY2 = touch2.clientY;
    }
  }

  function handleZoom(deltaX1, deltaY1, deltaX2, deltaY2, X1, Y1, X2, Y2) {
    const currentDistance = Math.hypot(deltaX1, deltaY1, deltaX2, deltaY2);

    if (!initialDistance) {
      initialDistance = currentDistance;
      return;
    }

    const scale = (currentDistance - initialDistance) * 0.2;

    if(Math.abs(scale) > 0.1){
      var zoomScale = 1.5;
      zoom = parseInt($("#zoom").val());
      if(X1 < X2){
        if(Y1 < Y2){
          $("#zoom").val(parseInt(zoom + (deltaY2-deltaY1)/2 * zoomScale)).change();
        }
        else{
          $("#zoom").val(parseInt(zoom + (deltaY1-deltaY2)/2 * zoomScale)).change();
        }
      }
      else{
        if(Y1 < Y2){
          $("#zoom").val(parseInt(zoom + (deltaY2-deltaY1)/2 * zoomScale)).change();
        }
        else{
          $("#zoom").val(parseInt(zoom + (deltaY1-deltaY2)/2 * zoomScale)).change();
        }
      }
    }
  }
});
