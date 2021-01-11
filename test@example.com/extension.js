/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

var immediatelyMove = false;

class Extension {
    constructor() {
    	this.signal = null;
    }

    enable() {
        this.signal = global.workspace_manager.get_workspace_by_index(0).connect("window-added", 
            function(workspace, window, data){
                log("Trying to move the window!")

                if(immediatelyMove){
                    log("Moving!")
                    window.move_frame(false, 100, 100);
                }else{
                    imports.gi.GLib.timeout_add(
                        imports.gi.GLib.PRIORITY_LOW,
                        500,
                        function(){
                            log("Moving!")
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
