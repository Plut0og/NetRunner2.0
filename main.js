var LOCALPLAYER;
var COLLIDEABLES = [];
var DOCWORDS = [];
console.log('loaded main');

function main(){
	if(document.getElementsByTagName('currentroom').length > 0){

		var currentroom = document.getElementsByTagName('currentroom')[0]
		decomposeWordsFromDoc(document.getElementsByTagName('currentroom')[0]);
		DOCWORDS = document.getElementsByTagName('word');

		for(var i = 0; i < currentroom.children.length; i++){

			var child = currentroom.children[i];
			COLLIDEABLES = COLLIDEABLES.concat(getCollideables(child, currentroom, []));

		}

	} else {

		//var name = prompt("What would you like to be named?", "");
		LOCALPLAYER = new player("player", 5, 5, 5, '@', 10);
		document.addEventListener('keydown', inputHandler, true);
		var sTest = new Sprite(["I AM A SPRITE"], 10, 10, 10, 0);
		sTest.translate(10,10);
		sTest.scale(2);
		sTest.rotate(90);
		sword = swordItem(100, 100);
		sword.pickUp(LOCALPLAYER);
		sword.onUse(0);
	}
}

function inputHandler(event){
	if (event.keyCode == 65) {
		LOCALPLAYER.move(-1, 0);
	} else if(event.keyCode == 87){
		LOCALPLAYER.move(0, -1);
	} else if (event.keyCode == 68) {
		LOCALPLAYER.move(1, 0);
	} else if(event.keyCode == 83){
		LOCALPLAYER.move(0, 1);
	} else if(event.keyCode == 73){
		LOCALPLAYER.openInventory();
	}
}


decomposeNodeFromNodes = function(nodes) {
  	var node, _j, _len2, _results;
  	_results = [];
  	for (_j = 0, _len2 = nodes.length; _j < _len2; _j++) {
    	node = nodes[_j];
    	_results.push(decomposeWordsFromDoc(node));
  	}
  	return _results;
};

function decomposeWordsFromDoc(node){
	var _ref2 = ['script', 'style', 'iframe', 'canvas', 'video', 'audio', 'textarea', 'embed', 'object', 'select', 'area', 'map', 'input', 'title'];
	for(var r = 0; r < _ref2.length; r++){
		if(node.nodeName.toLowerCase() === _ref2[r]){
			return;
		} else {
			switch(node.nodeType){
				case 1 :
					 decomposeNodeFromNodes(node.childNodes);
				case 3 :
					if(!/^\s*$/.test(node.nodeValue) && node.nodeValue != null && node.nodeName != 'word' && node.nodeName != 'lettergroup' && node.nodeName != 'letter'){
						var parent = node.parentNode;
						if(parent.childNodes.length === 1){
							parent.innerHTML = decomposeText(node.nodeValue);
							return
						} else {
							newNode = document.createElement("lettergroup");
          					newNode.innerHTML = decomposeText(node.nodeValue);
          					node.parentNode.replaceChild(newNode, node);
          					return;
						}
					}
				defualt:
					return
			}
		}
	}
}


function decomposeText(str){
	var chars = str.split('')
	var letters = [];
	for(var l = 0; l < chars.length; l++){
		if(!/^\s*$/.test(chars[l])){
			letters.push("<letter style='display:inline-block'>" + chars[l] + "</letter>");
		} else {
			letters.push('&nbsp;');
		}
	}
	letters = letters.join('');
	letters = letters.split('&nbsp;')
	var words = [];
	for(var w = 0; w < letters.length; w++){
		var word = letters[w];
		if(!/^\s*$/.test(word) || word === '\n'){
			words.push("<word style='white-space:now-wrap'>"+ word +"</word>");
		} else {
			words.push(word);
		}
	}
	return(words.join(' '));

}

function getCollideables(child, parent, output){
	var childBk = child.style.background,
      parentBk = parent.style.background
  if(childBk != parentBk && childBk != '' && childBk != 'none' && childBk != 'transparent' || child.nodeName == 'BUTTON' || child.nodeName == 'image' || child.nodeName == 'IMG' || child.style.backgroundImage != ''){
    output.push(child);
  }else{
    for(var i = 0; i < child.children.length; i++){
      if (child.children[i].nodeName == 'WORD'){
        output.push(child.children[i]);
      }else{
        getCollideables(child.children[i],child,output);
      }
    }
  }
  return output;
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
	console.log('tp-ing to: '+ dest)
	var request = createCORSRequest("get", "https://crossorigin.me/" + dest)
	if (request){
    		request.onreadystatechange = function(){
    			if(this.readyState == 4 && this.status == 200){
    				document.getElementsByTagName("body")[0].innerHTML += "<currentroom>"+ this.responseText + "</currentroom>";
    				console.log('loading game on new page');
    				main();
    			} else if(this.readyState == 4) {
    				console.log("website is unreachable(error:" + this.status + ")")
    			}
    		};
    		console.log('tp request sent');
    		request.send();
    };
}
