function World(x, y, width, height){
  bounds = {x:x, y:y, width:width, height: height};
  this.trees = {items: new QuadTree(bounds, false),
                cs: new QuadTree(bounds, false),
                collideables: new QuadTree(bounds, false)
               };
  this.all = {items:{},
              cs:{},
              collideables:{}
             };

  this.addObject = addObject;
  this.updateTree = updateTree;
  this.updateObject = updateObject;
}

addObject = function(object, tree){
  var data = getData(object);
  this.all[tree][object.uuid] = data;
  this.trees[tree].insert(data);
}

updateObject = function(object, tree){
  this.all[tree][object.uuid] = getData(object);
}

updateTree = function(tree){
  this.trees[tree].clear();
  this.trees[tree].insert(Object.values(this.all[tree]));
}

getData = function(object){
  var sprite = object.sprite;
  return  {x:sprite.x, y:sprite.y,
           width: sprite.getWidth(), height: sprite.getHeight(),
           object: object};
}
