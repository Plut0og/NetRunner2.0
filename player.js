console.log('loaded player');

function player(name, x, y, speed, char, size){

	//data
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.inventory = new inventory(this.name, [], 3, 5);
	this.char = char;
	this.size = size;

	//functions
	this.draw = draw;
	this.move = move;
	this.openInventory = openInventory;
	this.willCollide = willCollide;

	this.draw();

	this.invWindow;
	this.invDocument;
		
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
	
	this.inventory.update()

	return;
};

willCollide = function(x, y, dir){
	if(dir == 'left'){
		if(this.x - this.speed < x && this.x - this.speed + this.size > x){
			if(this.y < y && this.y + this.size > y){
				return true;
			}
		}
		return false;
	} else if(dir == 'up'){
		if(this.x < x && this.x + this.size > x){
			if(this.y - this.speed < y && this.y - this.speed + this.size > y){
				return true;
			}
		}
	} else if(dir = 'right'){
		if(this.x + this.speed < x && this.x + this.speed + this.size){
			if(this.y < y && this.y + this.size > y){
				return true;
			}
		}
	} else {
		if(this.x < x && this.x + this.size > x){
			if(this.y + this.size < y && this.y + this.size + this.size > y){
				return true;
			}
		}
	}
	return false;
}

