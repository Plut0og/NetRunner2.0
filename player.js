function player(name, x, y, speed, char){

	//data
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.inventory = [];
	this.char = char;

	//functions
	this.draw = draw;

	this.move = move;

	this.openInventory = openInventory;

	this.draw();
		
}

draw = function(){
	var _p;
	if(document.getElementsByClassName('player').length == 0){
		_p = document.createElement('p');
		_p.className = 'player';
		_p.id = this.name;
		_p.innerHTML = this.char;
		_p.style.top = this.y + 'px';
		_p.style.left = this.x + 'px';
		document.getElementsByTagName('body')[0].appendChild(_p);
	} else {
		_p = document.getElementById(this.name);
		_p.style.top = this.y + 'px';
		_p.style.left = this.x + 'px';
	}

	return;

};


move = function(xdiff, ydiff){
	this.x += xdiff * this.speed;
	this.y += ydiff * this.speed;

	this.draw();

	return;

};


openInventory = function(){

	var invWindow = window.open("about:blank", "inventory", "width=400, height=400");

	return;
};
