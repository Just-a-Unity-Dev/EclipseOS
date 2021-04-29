log(getText('text.html'))
log("Welcome to Terminix for EclipseOS!\n\n Made by Duckling, Rstar and Eclipse");

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

register_cmd("clear", function(cmd) {
    clear_all_block();
})

register_cmd("echo", function(cmd) {
    var parameters = cmd.split(" ").slice(1);
    for (var i = 0; i < parameters.length; i++) {
        block_log(parameters[i]);
    }
});

function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
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
        if (parameters[1].toString().toUpperCase() === "USER"){
            if (parameters.length === 2) {
                block_log("Error: Unspecified Parameters");
                return;
            }
            update_user_title(`${parameters[2]}@${getUA()}`);
            block_log("Success: Updated user name to "+ parameters[2]);
            return;
        }   

        if (parameters[1].toString().toUpperCase() === "THEME"){
            if (parameters.length === 2) {
                block_log("Error: Unspecified Parameters");
                return;
            }
            swapStyleSheet("themes/"+parameters[2]+".css")
            block_log("Success: Updated user theme to "+ parameters[2]);
            return;
        }
    } else if (parameters[0].toString().toUpperCase() == "GET"){
        if (parameters.length === 1) {
            block_log("Error: Unspecified Parameters");
            return;
        }
        if (parameters[1].toString().toUpperCase() === "USER"){
            block_log("User: " + terminal_user_title);
            return;
        }
    }

});

register_cmd("open", function(cmd){
    var parameters = smart_split(cmd, " ", false).splice(1)

    if (parameters.length === 0) {
        block_log("Error: Unspecified Parameters");
        return;
    }

    if (parameters[0] == "calculator"){
        window.open('calculator/calc.html', 'name', 'width=600,height=400')
    }
});

register_cmd("neofetch", function(cmd) {
    block_log("Host: " + terminal_user_title);
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

function getCurrentStyleSheet(plain){
    if (plain == true){
        return document.getElementById("pagestyle").getAttribute("href")
    }else if (plain == false){
        var currentStyleSheet = document.getElementById("pagestyle").getAttribute("href")
        if (currentStyleSheet == "themes/classic.css"){
            return "Classic"
        } else if (currentStyleSheet == "themes/retro.css"){
            return "Retro"
        }
    }

}

const getUA = () => {
    let device = "Unknown";
    const ua = {
        "Linux": /Linux/i,
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

update_user_title(`User@${getUA()}`);
