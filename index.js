var modifiers = {
		shift: "shift", 
		ctrl : "ctrl", 
		alt : "alt", 
		meta : "meta"
	}

	var pressed_map = {
		"ctrl M" : "enter", 
		" " : "space", 
	}

	var lower = {
		8: "backspace",
		9: "tab",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause/break",
		20: "capslock",
		27: "escape",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		45: "insert",
		46: "delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		91: "leftwindow",
		92: "rightwindow",
		93: "select",
		96: "0",
		97: "1",
		98: "2",
		99: "3",
		100: "4",
		101: "5",
		102: "6",
		103: "7",
		104: "8",
		105: "9",
		106: "*",
		107: "+",
		109: "-",
		110: ".",
		111: "/",
		112: "f1",
		113: "f2",
		114: "f3",
		115: "f4",
		116: "f5",
		117: "f6",
		118: "f7",
		119: "f8",
		120: "f9",
		121: "f10",
		122: "f11",
		123: "f12",
		144: "numlock",
		145: "scrolllock",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'"
	};

	var upper = {
		48: ")",
		49: "!",
		50: "@",
		51: "#",
		52: "$",
		53: "%",
		54: "^",
		55: "&",
		56: "*",
		57: "(",
		65: "A",
		66: "B",
		67: "C",
		68: "D",
		69: "E",
		70: "F",
		71: "G",
		72: "H",
		73: "I",
		74: "J",
		75: "K",
		76: "L",
		77: "M",
		78: "N",
		79: "O",
		80: "P",
		81: "Q",
		82: "R",
		83: "S",
		84: "T",
		85: "U",
		86: "V",
		87: "W",
		88: "X",
		89: "Y",
		90: "Z",
		
		
		186: ":",
		187: "+",
		188: "<",
		189: "_",
		190: ">",
		191: "?",
		192: "~",
		219: "{",
		220: "|",
		221: "}",
		222: "\""
	};

	var make_key_updown_string = function(event) {
		var primary = lower[event.keyCode];
		var upper_case = false;
		if (!primary || event.shiftKey) {
			if (upper[event.keyCode]) {
				primary = upper[event.keyCode]
				upper_case = true;
			}
		}
		var mods = [];
		if (primary != "shift" && !upper_case && event.shiftKey) {
			mods.push("shift");
		}
		if (primary != "ctrl" && event.ctrlKey) {
			primary = primary.toUpperCase();
			mods.push("ctrl");
		}
		if (primary != "alt" && event.altKey) {
			mods.push("alt");
		}
		if (primary != "meta" && event.metaKey) {
			mods.push("meta");
		}

		return [mods.join(" "), primary].join(" ").trim();
	}
var make_key_press_string = function(event) {
	var str =  String.fromCharCode(event.which);
	if (event.which < 32) {
			str = "ctrl " + String.fromCharCode(event.which + 64);
		}
		else if ( event.which == 127 ) {
			str = "delete"
		}
		if ( pressed_map[str] ) {
			str = pressed_map[str];
		}

		return str;
}

var events = require('events');



module.exports = function(domElement) {
	var domElement= domElement	|| document;

	// make three event emitters for the various key event types
	var pressed = new events.EventEmitter();
	var down = new events.EventEmitter();
	var up = new events.EventEmitter();

	var on_key_down = function(event) {
		var str =make_key_updown_string(event);
		down.emit(str)
	}
	var on_key_up = function(event) {
		var str =make_key_updown_string(event);
		up.emit(str)
	}
	var on_key_pressed = function(event) {
		var str =  make_key_press_string(event);
		pressed.emit(str)
	}

	domElement.addEventListener("keydown", on_key_down, false);
	domElement.addEventListener("keyup", on_key_up, false);
	domElement.addEventListener("keypress", on_key_pressed, false);

	return {
		pressed:pressed, 
		down : down, 
		up : up
	}

}

