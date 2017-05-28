var localPlayer;


function begin(){

	var name = prompt("What would you like to be named?", "");
	localPlayer = new player(name, 5, 5, 5, '@');
	document.addEventListener('keydown', inputHandler, true);
}

function inputHandler(event){
	if (event.keyCode == 37) {
			localPlayer.move(-1, 0);
		} else if(event.keyCode == 38){
			localPlayer.move(0, -1);
		} else if (event.keyCode == 39) {
			localPlayer.move(1, 0);
		} else if(event.keyCode == 40){
			localPlayer.move(0, 1);
		} else if(event.keyCode == 9){
			localPlayer.openInventory();
		}
}



function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

function teleport(dest){
	var request = createCORSRequest("get", "https://crossorigin.me/" + dest)
	if (request){
    		request.onreadystatechange = function(){
    			if(this.readyState == 4 && this.status == 200){
    				console.log("gotDats");
    				document.getElementsByTagName("body")[0].innerHTML = request.responseText;
    			} else if(this.readyState == 4) {
    				console.log("website is unreachable")
    			}
    		};
    		request.send();	
    };
}