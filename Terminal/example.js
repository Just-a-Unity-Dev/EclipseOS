log(getText('text.html'))
log("Welcome to Terminix for EclipseOS!\n\n Made by Duckling, Rstar and Eclipse");

swapStyleSheet(getCookie("theme"))

function getText(addr) {
    var text = '';
    var xhr= new XMLHttpRequest();
    xhr.open('GET', addr, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        text = this.responseText;
    };
    xhr.send();
    return text;
}

// Example Command - echo
register_cmd("echo", function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    message = '';
    for (var i = 0; i < parameters.length; i++) {
        message += parameters[i] + " ";
    }
    block_log(message)
});


// Wiki

register_cmd("wiki", async function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    var query = '';
    alert(performSearch(query));
    for (var i = 0; i < parameters.length; i++) {
        query = parameters[i];
    }
    try {
        const results = await performSearch(query);
        if (results.query.searchinfo.totalhits === 0) {

            block_log('No results found. Try different keywords');
        }
        block_log(wikipediaSearch(results));
    } catch (err) {
        block_log('Failed to search wikipedia');
    }
});

// Example Command - Sum

register_cmd("sum", function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    var sum = 0;
    for (var i = 0; i < parameters.length; i++) {
        sum += parseInt(parameters[i]);
    }
    block_log("Sum: " + sum);
});

// Math Command!!

register_cmd("math", function(cmd) {
    var parameters = smart_split(cmd, " ", false).slice(1);
    var output = 0;

    var add = ["+","add","sum"]
    var subtract = ["-", "subtract", "sub", "difference", "diff"]
    var multiply = ["*", "multiply", "mult"]
    var divide = ["/", "divide", "div"]
    var exponent = ["^", "power", "exponent"]

    if (add.includes(parameters[1])){
        output = parseInt(parameters[0]) + parseInt(parameters[2])
    }else if (subtract.includes(parameters[1])){
        output = parseInt(parameters[0]) - parseInt(parameters[2])
    }else if (multiply.includes(parameters[1])){
        output = parseInt(parameters[0]) * parseInt(parameters[2])
    }else if (divide.includes(parameters[1])){
        output = parseInt(parameters[0]) / parseInt(parameters[2])
    }else if (exponent.includes(parameters[1])){
        output = Math.pow(parseInt(parameters[0]),parseInt(parameters[2]))
    }

    block_log(output);
});

register_cmd("clear", function(cmd) {
    clear_all_block();
})

function swapStyleSheet(sheet) {
    var stylesheet = document.getElementById("pagestyle")

    stylesheet.setAttribute("href", sheet);

    var stylename = stylesheet.getAttribute("href");

    document.cookie = "theme=" + stylename + ";";
    console.log(getCookie("theme"))
    console.log(stylename)
}

register_cmd("settings", function(cmd) {
    var parameters = smart_split(cmd, " ", false).slice(1);
    console.log(parameters);
    if (parameters.length === 0) {
        block_log("Error: Unspecified Parameters");
        return;
    }

    if (parameters[0].toString().toUpperCase() === "SET") {
        if (parameters.length === 1) {
            block_log("Error: Unspecified Parameters");
            return;
        }
        if (parameters[1].toString().toUpperCase() === "TITLE"){
            if (parameters.length === 2) {
                block_log("Error: Unspecified Parameters");
                return;
            }
            update_user_title(parameters[2]);
            block_log("Success: Updated user title to "+ parameters[2]);
            return;
        }

        if (parameters[1].toString().toUpperCase() === "THEME"){
            if (parameters.length === 2) {
                block_log("Error: Unspecified Parameters");
                return;
            }
            if (parameters[2].toString().toUpperCase() === "RESET"){
                swapStyleSheet("themes/classic.css");
                block_log("Success: Updated user theme to Classic");
                return;
            }else{
                swapStyleSheet("themes/"+parameters[2]+".css")
                block_log("Success: Updated user theme to "+ parameters[2]);
                return;
            }

        }
    } else if (parameters[0].toString().toUpperCase() == "GET") {
        if (parameters.length === 1) {
            block_log("Error: Unspecified Parameters");
            return;
        }
        if (parameters[1].toString().toUpperCase() === "TITLE") {
            block_log("Title: " + terminal_user_title);
            return;
        }
        if (parameters[1].toString().toUpperCase() === "THEME") {
            block_log("Theme: " + getCurrentStyleSheet(false));
            return;
        }
    }

});

register_cmd("neofetch", function(cmd) {
    block_log("Model: Toaster");
    block_log("OS: " + getUA());
    block_log("Kernel: 6.9.4-20 Special Edition");
    block_log("Uptime: 69 years");
    block_log("Packages: 420691337");
    block_log("Shell: terminix-6.9");
    block_log("Resolution: 1920x1080");
    block_log("DE: N/A");
    block_log("WM: N/A");
    block_log("Theme: " + getCurrentStyleSheet(false));
    block_log("Terminal: Terminix");
    block_log("CPU: Bruh Core I96");
    block_log("GPU: Eclipse GeeForce RTG 3690 DirectY 69.00");
    block_log("Memory: 58gb / 86pb");

});

register_cmd("hello_world", function(cmd) {
    block_log("Hello, world!");
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCurrentStyleSheet(plain){
    if (plain == true){
        return document.getElementById("pagestyle").getAttribute("href")
    }else if (plain == false){
        var currentStyleSheet = document.getElementById("pagestyle").getAttribute("href")
        if (currentStyleSheet == "themes/classic.css"){
            return "Classic"
        } else if (currentStyleSheet == "themes/retro.css"){
            return "Retro"
        }else if (currentStyleSheet == "themes/bloodhell.css"){
            return "Blood Hell"
        }else if (currentStyleSheet == "themes/light.css"){
            return "Light Theme"
        }else if (currentStyleSheet == "themes/nautical.css"){
            return "Nautical"
        }else if (currentStyleSheet == "themes/ugly.css"){
            return "Ugly Theme"
        }
    }

}

const getUA = () => {
    let device = "Unknown";
    const ua = {
        "Generic Linux": /Linux/i,
        "Android": /Android/i,
        "BlackBerry": /BlackBerry/i,
        "Bluebird": /EF500/i,
        "Chrome OS": /CrOS/i,
        "Datalogic": /DL-AXIS/i,
        "Honeywell": /CT50/i,
        "iPad": /iPad/i,
        "iPhone": /iPhone/i,
        "iPod": /iPod/i,
        "macOS": /Macintosh/i,
        "Windows": /IEMobile|Windows/i,
        "Zebra": /TC70|TC55/i,
    }
    Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
    return device;
}

update_user_title(getUA());
