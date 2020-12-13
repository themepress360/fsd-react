const dispatchEvent = (eventName) => {
    var event;
    if (typeof (Event) === 'function') {
        event = new Event(eventName);
    } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    document.dispatchEvent(event);
}
export default dispatchEvent;