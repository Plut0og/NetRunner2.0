console.log('loaded player');

function player(name, x, y, speed, char, size){

	//data
	this.sprite = new Sprite([char],x, y, size, 0);
	this.speed = speed;
	this.inventory = new inventory(this.name, [], 5, 3);
	this.char = char;
	this.size = size;
	this.uuid = generateUUID();

	//functions
	this.move = move;
	this.openInventory = openInventory;
	this.willCollide = willCollide;

	this.invWindow;
	this.invDocument;

}


move = function(xdiff, ydiff){
	console.log(this.sprite);
	this.sprite.translate(xdiff*this.speed, ydiff*this.speed);
};

openInventory = function(){
	this.inventory.update();
};

willCollide = function(x, y, dir){
	if(dir == 'left'){
		if(this.sprite.x - this.speed < x && this.sprite.x - this.speed + this.size > x){
			if(this.sprite.y < y && this.sprite.y + this.size > y){
				return true;
			}
		}
		return false;
	} else if(dir == 'up'){
		if(this.sprite.x < x && this.sprite.x + this.size > x){
			if(this.sprite.y - this.speed < y && this.sprite.y - this.speed + this.size > y){
				return true;
			}
		}
	} else if(dir = 'right'){
		if(this.sprite.x + this.speed < x && this.sprite.x + this.speed + this.size){
			if(this.sprite.y < y && this.sprite.y + this.size > y){
				return true;
			}
		}
	} else {
		if(this.sprite.x < x && this.sprite.x + this.size > x){
			if(this.sprite.y + this.size < y && this.sprite.y + this.size + this.size > y){
				return true;
			}
		}
	}
	return false;
}
