
// const
const clientType = "house";

// defining data structures
const Window = {
    CLOSED: 'closed',
    OPENED: 'open'
}

// to make enums work
Object.freeze(Window);


// defining house objects
let window1 = {subject:"window1", value: Window.CLOSED};


// defining helpers functions 
let toggleWindowStatus = (status) => {
    if(status==Window.CLOSED){
        return Window.OPENED
    }
    else {
        return Window.CLOSED
    }
}

// run when DOM loaded
$(document).ready(function () {
    $("#window-btn").click(function() {

    window1.value = toggleWindowStatus(window1.value);

    console.log(window1);
        publish(clientType, window1);
    });
});
