var types = ["normal", "numbers", "caesarian (traditional)", "caesarian (generated)", "dimmadoug dimmadome", "doug dimmadeclarations"]
var type = "normal";
var operation = "encode";
var unicode_max = 149186; // how many unicode characters there are (also the cap unicode ID for anything using generated unicode characters)

var ciphers = {
    "caesarian (traditional)": {
        "a": "x", "b": "y", "c": "z", "d": "a", "e": "b", "f": "c", "g": "d", "h": "e", "i": "f", "j": "g", "k": "h", "l": "i", "m": "j",
        "n": "k", "o": "l", "p": "m", "q": "n", "r": "o", "s": "p", "t": "q", "u": "r", "v": "s", "w": "t", "x": "u", "y": "v", "z": "w",
    }
}

var dimma_phrases = {
    "a": [ "have you heard of the doug dimmadome?", "doug dimmadome, owner of the dimsdale dimmadome, has a message for you!" ],
    "b": [ "here in dimsdale, we have many fun attractions!", "only for $12.99!" ],
    "c": [ "have you tried our groundbreaking products yet", "we also have neil cicierega", "i see you there, buy our products" ],
    "d": [ "dont forget to check out our pride collection that's just all our products but with a rainbow on it", 'we really love what you kids call "d"'],
    "e": [ "9/10 doctors reccommend"],


    " ": [ "but wait! there's more!", "but also", "as oppose to!", "there's even more!", "have you forgotten about this though?", "there's something else!", "dont you dare think that's all", "i will stab you" ],
    "unknown": [ "we even have '", "have you tried '", "there is also '", "man, we really love '", "another product we have is named '" ] // make sure there's a space and ' at the end of these messages specifically
}



var type_buttons = "";
for (i in types) {
    var classtm = "";
    if (types[i] == "normal") {
        classtm = " active-type"
    }
    type_buttons += `<p class="type-button${classtm}" onclick="set_type('${types[i]}')" id="${types[i]}_button">${types[i]}</p>\n`;
}
document.getElementById("typelist").innerHTML = type_buttons;
var options_div = document.getElementById("options-div");



// ===================================================================================
// ==================================== SET TYPE =====================================
// ===================================================================================



function set_type(in_type) {
    try {
        document.getElementById(`${type}_button`).classList.remove("active-type");
    } catch (err) {
        console.log("oops couldnt find type button lmao")
    }
    type = in_type;
    document.getElementById(`${type}_button`).classList.add("active-type");
    if (type == "caesarian (generated)") {
        options_div.innerHTML = `<input type="number" id="shift" placeholder="cipher shift" class="translateinput">`;
        document.getElementById("shift").addEventListener('keydown', () => { translate() });
        document.getElementById("shift").addEventListener('keyup', () => { translate() });
    } else if (type == "dimmadoug dimmadome") {
        options_div.innerHTML = "<h2>warning: this cipher is unable to be decoded</h2>"
    }

    else {
        options_div.innerHTML = "";
    }
    translate();

}

function set_operation(in_operation) {
    
    if (in_operation == "decode") {
        document.getElementById(`encode_button`).classList.remove("active-type");
        document.getElementById(`decode_button`).classList.add("active-type");
        operation = "decode";
    } else {
        document.getElementById(`decode_button`).classList.remove("active-type");
        document.getElementById(`encode_button`).classList.add("active-type");
        operation = "encode";
    }
    translate();
}


// simple replace from object
function repltm(objcet, text) {
    var out_text = text
    for (i in objcet) {
        out_text = out_text.replaceAll(i, objcet[i]);
    }
    return out_text
}
function kv_swap(obj) {
    var out_obj = {}
    for (i in obj) {
        out_obj[obj[i]] = i;
    }
    return out_obj
}
function rando (list) {
    return list[Math.floor((Math.random()*list.length))];
  }
  


function simple_cipher_encode(text) {
    var out_text = "";
    var split = text.split("");
    for (i in split) {
        if (ciphers[type][split[i]]) {
            out_text += ciphers[type][split[i]];
        } else {
            out_text += split[i];
        }
    }
    return out_text
}
function simple_cipher_decode(text) {
    var out_text = "";
    var split = text.split("");

    console.log(split);
    
    for (i in split) {
        var letter = `${split[i]}`;

        if (kv_swap(ciphers[type])[letter]) {
            out_text += kv_swap(ciphers[type])[letter];
        } else {
            out_text += [letter];
        }
    }
    return out_text
}

function dimma(message) {
    var final = "";
    var words = message.split(" ");
    // split message into list of words, seperated by spaces

    for (i in words) {
        var word = words[i]
        if (i != 0) {
            final += " ";
            // add a space if its not the first word
        }
        var com_word = word.split("-");
        
        if (com_word.length > 1) {
            for (e in com_word) {
                var comword = com_word[e].split("");
                if (comword[0] == "d") {
                    comword[0] = "dimmad";
                }
                com_word[e] = comword.join("");
            }
            words[i] = com_word.join("-");
        } else {
            var splitword = word.split("");
            if (splitword[0] == "d") {
                splitword[0] = "dimmad";
            }
            words[i] = splitword.join("");
        }
    }

    return words.join(" ");
}

function marketing_swap(object) {
    var out_obj = {}
    for (i in object) {
        if (i != "unknown") {
            for (e in object[i]) {
                out_obj[object[i][e]] = `${i}`;
    }   }   }
    return out_obj
}

function marketing_encode(object, message) {
    var final = "";

    var split = message.split("");

    for (i in split) {
        if (i != 0) {
            final += " ; "
        }
        if (object[split[i]]) {
            final += `${rando(object[split[i]])}`;



        } else {
            // unknown
            final += `${rando(object["unknown"])}${split[i]}'!`;
        }
    }


    return final
}

function marketing_decode(object, message) {
    var final = "";
    var split = message.split(" ; ");
    var og_object = object;
    var object = marketing_swap(object);
    for (i in split) {
        if (object[split[i]]) {
            // if it exists in the object
            final += object[split[i]];
        } else {
            // if it doesnt (it's an unknown character in the conversion object or someone was messing with the code)
            var phrase = split[i];
            for (i in og_object["unknown"]) {
                var phrase_changed = phrase.replace(`${og_object["unknown"][i]}`, "");
                if (phrase_changed != phrase) {
                    var character = phrase_changed.replaceAll("'", "");
                    character = character.replaceAll("!", "");
                    final += character
                }
            }
        }
    }

    return final
}


// ===================================================================================
// =================================== TRANSLATE =====================================
// ===================================================================================



// trnaslate function

function translate() {
    var in_text = document.getElementById("intext").value;
    var out_text = "";

    console.log(in_text)

    try {
        if (operation == "encode") {
            var split = in_text.split("");

            if (type == "numbers") {
                var final = [];
                for (i in split) {
                    final.push(`${split[i].charCodeAt(0)}`)
                }
                out_text = final.join(";");
            } else if (type == "caesarian (traditional)") {
                out_text = simple_cipher_encode(in_text);
            } else if (type == "caesarian (generated)") {
                var final = "";

                var shift = document.getElementById("shift").value;
                if (shift == "" || shift == undefined || shift == null) {
                    shift = -3;
                }

                for (i in split) {
                    var letter = split[i];
                    var og_num = letter.charCodeAt(0);
                    var new_num = parseInt(og_num) + parseInt(shift)
                    if (new_num <= 0) {
                        new_num = unicode_max + new_num; // roll back to last unicode char
                    }
                    final += String.fromCharCode(new_num);
                }
                out_text += final;
            } else if (type == "dimmadoug dimmadome") {
                out_text = dimma(in_text);
            } else if (type == "doug dimmadeclarations") {
                out_text = marketing_encode(dimma_phrases, in_text);
            }
            
            // add things before this        
            else {
                out_text = in_text;
            }
    
        } else if (operation == "decode") {
            var split = in_text.split("");
    
            if (type == "numbers") {
                var split = in_text.split(";")
                var final = "";
                for (i in split) {
                    final += String.fromCharCode(parseInt(split[i]))
                }
                out_text = final;
            } else if (type == "caesarian (traditional)") {
                out_text = simple_cipher_decode(in_text);
            } else if (type == "caesarian (generated)") {
                var final = "";

                var shift = document.getElementById("shift").value;
                if (shift == "" || shift == undefined || shift == null) {
                    shift = -3;
                }

                for (i in split) {
                    var letter = split[i];
                    var og_num = letter.charCodeAt(0);
                    var new_num = parseInt(og_num) - parseInt(shift)
                    if (new_num > unicode_max) {
                        new_num = new_num - unicode_max; // roll back to last unicode char
                    }
                    final += String.fromCharCode(new_num);
                }
                out_text += final;
            } else if (type == "dimmadoug dimmadome") {
                out_text = in_text;
            } else if (type == "doug dimmadeclarations") {
                out_text = marketing_decode(dimma_phrases, in_text);
            }
            
            
            // add things before this
            else {
                out_text = in_text;
            }
    
        } else {
            out_text = "an internal error hath occurred";
        }
    } catch (err) {
        out_text = "an internal error hath occurred!";
        console.error(err);
    }

    





    document.getElementById("outtext").innerHTML = out_text;
    return out_text
}



// it will translate all of it no matter what
document.getElementById("intext").addEventListener('keydown', () => {
    translate();
});
document.getElementById("intext").addEventListener('keyup', () => {
    translate();
});