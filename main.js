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
    "a": [ "have you heard of doug dimmadome?", "doug dimmadome, owner of the dimsdale dimmadome, has a message for you!", "all our products are ego-friendly AND eco-friendly" ],
    "b": [ "here in dimsdale, we have many fun attractions!", "only for $12.99!", "we also sell live bees!", "try our new brake oil!" ],
    "c": [ "have you tried our groundbreaking products yet", "we also have neil cicierega", "i see you there, buy our products" ],
    "d": [ "dont forget to check out our pride collection that's just all our products but with a rainbow on it", 'we really love what you millenials call "d"'],
    "e": [ "9/10 doctors reccommend", "this is a message from doug dimmadome, owner of the dimsdale dimmadome", "every order even comes with a box of styrofoam peanuts!", 'hand-delivered by a teenager about sixteen wearing a dorky name tag that says "Hello, My Name is Eugene"', "you are valid", "scrappy doo was found dead in miami", "florida man dead after attempting to \"microwave a microwave\"", "gas prices have gone into the negatives after taco bell starts losing supplies", "what if...", "you are now in manual breathing mode", "you are now in manual blinking mode", "you have just lost \"the game\"", "the design is very human" ],
    "f": [ "i know where you live", "its only $6.66!", "this is a great deal!", "you should remember this!", "we always deliver", "remember: the attempted assassaination of Franz Ferdinand is the funniest attempted assassaination to ever have happened"],
    "g": [ "guarunteed* goods", "register now!", "we're here to reach you about your car's extended warranty", "here we have a circle, smooth and inoffensive", "twitter was a mistake"],
    "h": [ "michael jackson even hee hee's over this", "find new roads; chevrolet.", "find more!", "you can do this", "delivered by specially trained ninjas!", "found throughout the mountain range"],
    "i": [ "did you know?", "even jesus approves of this", "used in 20 of every 10 high schools", "these products are not haunted", "my name is barack obama, and i approve this message"],
    "j": [ "founded by classic j of glass beach the band!", "along with that, we have our reporter here, steve, with some more news.", "we pay our respects to this fallen soldier, deedee, mega-doodoo. sorry.", "you can pronounce lemon demon four different ways."],
    "k": [ "you cannot find the bodies", "better than oxi clean!", "this is the", "our marketing team is running out of budget"],
    "l": [ "we even have collections with nike!", "canada's best", "if you dont't buy our products, we'll hand you the L", "due to our strong personal convictions, we wish to stress, that these products in no way endorse a belief in the occult."],
    "m": [ "mogus mumbles approves", "the second company to exist in australia (dont look that up)", "special orders will all be fulfilled on the moon" ],
    "n": [ "mogul moves!", "even used in high school assemblies", "these can also be used as murder weapons" ],
    "o": [ "neil cicierega has a message for YOU!", "have you ever had a dream where you uh you um you uh you do you uh you do you so much you can do anything?"],
    "p": [ "you see, when i was a young boy, my father took me into the city to see a marching band. he said, \"son are those big trumpets\" (they were mellophones)", "weeeeeee", "all our servers are linux and there's nothing you can do about it"],
    "q": [ "¿por qué?", "the book is a better seller than george orwell's 1984", "as michael jackson says, Hee Hee!"],
    "r": [ "remember when vine was a thing? all our phones & tablets have a rebooted vine app on them!", "not bought our products? i think it is because of the rage"],
    "s": [ "are products are not sus", "spine crackles are guarunteed!", "we even called scrappy doo at 3am!", "this is the beginning of the resurgence of the \"e\" meme.", "markiplier e meme!", "i commit arson", "we sell peas", "\"sally sells seshells by the seashore\", well we also sell seashells so we sued her for 10.4 million and won. she now is in crippling debt. and we are happy."],
    "t": [ "john, you have a meeting at 8. no wait, the voice to text is on. off. off. OFF. OFF. GOD TURN OFF", "gaslighting does not exist, and if you think it does you're crazy", "the house that's not on fire (yet)"],
    "u": [ "you can't spell \"sus\" without \"us\"", "you need to understand how important your next action is.", "insert marketing phrase here i mean what", "joey you're fired", "bro you should really check out this new product"],
    "v": [ "delivered in yellow school buses", "every package is even accepted by Mr. Price himself!", "try out our new mayyonasal spray, for when you're breathing TOO easy...", "you can also buy the telebrush on our online store!" ],
    "w": [ "our company actually started in a shed!", "shrek used toiler paper in the original movie", "charmin's toilet paper is worse than ours"],
    "x": [ "eggs! we have eggs!", "chickens approve!", "pollo"],
    "y": [ "why would you NOT buy our products?", "our products are high quality", "hello yes i am the manager"],
    "z": [ "zedaph is an youtuber, and he definitely approves of this product", "we live in a society", "even the joker uses our products"],
    "0": [ "we train squirrels to generate secure keys for YOUR business", "the monkeys with typewriters have finally written out your will."],
    "1": [ "delivery will be made within 4-43793743 business days, on busy days", "delivery is faster than light when it exits the sun"],
    "2": [ "can you believe the sports team won the sports game? get merch at our site!", "we have the most premium"],
    "3": [ "we have vaccines that prevent the spread of stupidity", "10/20 medical professionals"],
    "4": [ "we own several golf courses", "ghostly delivery services. you won't even know it was delivered until it's there"],
    "5": [ "yeezys are a scam, but our shows are not", "better music than weezer", "we hope you like weezer"],
    "6": [ "we serve the best in texas!", "we even as well have home security systems", "the best online service in the whole galaxy"],
    "7": [ "texas yee yee", "ride with pride with our new pride collection", "check out our new neil cicierega store"],
    "8": [ "what those germans say for no", "we sell authentic beastie boys records as well", "we live in the pineapple under the sea"],
    "9": [ "be honest youd want it too", "we don't sell nonsense", "wee wee"],
    "-": [ "dash the flash uses our site", "whats that noise? oh mom, you're just jealous it's the beastie boys", "come on seriously"],
    ";": [ "founded in silicon valley, our mission is to curate the best products for you.", "the plans to travel europe can happen, with our simple tools!", "camp safely with our camping collection", "wowza this is a lot of products, but they're all useful"],
    "A": [ "dont think of us as a joke", "this is a real storefront", "we're serious bro"],

    " ": [ "but wait! there's more!", "but also", "as oppose to!", "there's even more!", "have you forgotten about this though?", "there's something else!", "dont you dare think that's all", "i will stab you" ],
    "\n": ["just in case you have me mistaken...", "let me repeat this", "dont hit your carriage return just yet", "remember your lines..."],
    // for unknown phrases, put the punctuation mark you want at the end of the string, and for no punctuation put #
    "unknown": [ "we even have '!", "have you tried '?", "there is also '!", "man, we really love '!", "another product we have is named '!", "have you seen '?" ]
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
            var phrase = rando(object["unknown"])

            var punct = phrase.slice(-1);
            if (punct == "#") {
                punct = "";
            }

            final += `${phrase.replace(`${punct}`, "")}${split[i]}'${punct}`;
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
                var unk = og_object["unknown"][i]
                var unk_punct = unk.slice(-1);
                var unk_nopunct = unk.replace(unk_punct, "");
                var phrase_changed = phrase.replace(`${unk_nopunct}`, "");
                console.log(phrase_changed)
                if (phrase_changed != phrase) {
                    var punct = phrase_changed.slice(-1);
                    var character = phrase_changed.replaceAll("'", "");
                    character = character.replaceAll(`${punct}`, "");
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
                    console.log(`new_num: ${og_num} + ${shift} = ${new_num}`)
                    if (new_num <= 0 || new_num > unicode_max) {
                        var old_num = new_num
                        new_num = Math.abs(unicode_max - new_num); // roll back to last unicode char

                        console.log(`newer_num: ${unicode_max} + ${old_num} = ${new_num}`)
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
                    shift = 3;
                }

                for (i in split) {
                    var letter = split[i];
                    var og_num = letter.charCodeAt(0);
                    var new_num = parseInt(og_num) - parseInt(shift)

                    console.log(`new_num: ${og_num} - ${shift} = ${new_num}`);
                    if (new_num <= 0 || new_num > unicode_max) {

                        var old_num = new_num;
                        new_num = Math.abs(new_num - unicode_max); // roll back to last unicode char

                        console.log(`newer_num: ${unicode_max} - ${old_num} = ${new_num}`)
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