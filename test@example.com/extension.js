//true to immediately move the window upon getting the window-added signal. will crash.
//false to wait 500ms before trying to move the window. will function fine.
var immediatelyMove = true;

class Extension {
    constructor() {
    	this.signal = null;
    }

    enable() {
        this.signal = global.workspace_manager.get_workspace_by_index(0).connect("window-added", 
            function(workspace, window, data){
                log("Trying to move the window!")

                if(immediatelyMove){
                    window.move_frame(false, 100, 100);
                }else{
                    imports.gi.GLib.timeout_add(
                        imports.gi.GLib.PRIORITY_LOW,
                        500,
                        function(){
                            window.move_frame(false, 100, 100);
                            return false;
                        }
                    )
                }
            }
        )
    }

    disable() {
        global.workspace_manager.get_workspace_by_index(0).disconnect(this.signal);
    }
}

function init() {
    return new Extension();
}
