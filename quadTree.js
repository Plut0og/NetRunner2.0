function QuadTree(bounds, pointQuad, maxDepth, maxChildren) {
    var node;
    if (pointQuad) {
        node = new Node(bounds, 0, maxDepth, maxChildren);
    } else {
        node = new BoundsNode(bounds, 0, maxDepth, maxChildren);
    }
    this.root = node;
}

QuadTree.prototype.root = null;
QuadTree.prototype.insert = function (item) {
    if (item instanceof Array) {
        var len = item.length;
        var i;
        for (i = 0; i < len; i++) {
            this.root.insert(item[i]);
        }
    } else {
        this.root.insert(item);
    }
};

QuadTree.prototype.clear = function () {
    this.root.clear();
};

QuadTree.prototype.retrieve = function (item) {
    var out = this.root.retrieve(item).slice(0);
    return out;
};

function Node(bounds, depth, maxDepth, maxChildren) {
    this._bounds = bounds;
    this.children = [];
    this.nodes = [];
    if (maxChildren) {
        this._maxChildren = maxChildren;
    }
    if (maxDepth) {
        this._maxDepth = maxDepth;
    }
    if (depth) {
        this._depth = depth;
    }
}

Node.prototype.nodes = null;
Node.prototype._classConstructor = Node;
Node.prototype.children = null;
Node.prototype._bounds = null;
Node.prototype._depth = 0;
Node.prototype._maxChildren = 4;
Node.prototype._maxDepth = 4;
Node.TOP_LEFT = 0;
Node.TOP_RIGHT = 1;
Node.BOTTOM_LEFT = 2;
Node.BOTTOM_RIGHT = 3;
Node.prototype.insert = function (item) {

  if (this.nodes.length) {
      var index = this._findIndex(item);
      this.nodes[index].insert(item);
      return;
  }
  this.children.push(item);
  var len = this.children.length;
  if (!(this._depth >= this._maxDepth) &&
          len > this._maxChildren) {
      this.subdivide();
      var i;
      for (i = 0; i < len; i++) {
          this.insert(this.children[i]);
      }
      this.children.length = 0;
  }
};

Node.prototype.retrieve = function (item) {
    if (this.nodes.length) {
        var index = this._findIndex(item);
        return this.nodes[index].retrieve(item);
    }
    return this.children;
};

Node.prototype._findIndex = function (item) {
    var b = this._bounds;
    var left = (item.x > b.x + b.width / 2) ? false : true;
    var top = (item.y > b.y + b.height / 2) ? false : true;
    var index = Node.TOP_LEFT;
    if (left) {
        if (!top) {
            index = Node.BOTTOM_LEFT;
        }
    } else {
        if (top) {
            index = Node.TOP_RIGHT;
        } else {
            index = Node.BOTTOM_RIGHT;
        }
    }
    return index;
};

Node.prototype.subdivide = function () {
    var depth = this._depth + 1;
    var bx = this._bounds.x;
    var by = this._bounds.y;
    var b_w_h = (this._bounds.width / 2);
    var b_h_h = (this._bounds.height / 2);
    var bx_b_w_h = bx + b_w_h;
    var by_b_h_h = by + b_h_h;
    this.nodes[Node.TOP_LEFT] = new this._classConstructor({
        x: bx,
        y: by,
        width: b_w_h,
        height: b_h_h
    },
        depth, this._maxDepth, this._maxChildren);
    this.nodes[Node.TOP_RIGHT] = new this._classConstructor({
        x: bx_b_w_h,
        y: by,
        width: b_w_h,
        height: b_h_h
    },
        depth, this._maxDepth, this._maxChildren);
    this.nodes[Node.BOTTOM_LEFT] = new this._classConstructor({
        x: bx,
        y: by_b_h_h,
        width: b_w_h,
        height: b_h_h
    },
        depth, this._maxDepth, this._maxChildren);
    this.nodes[Node.BOTTOM_RIGHT] = new this._classConstructor({
        x: bx_b_w_h,
        y: by_b_h_h,
        width: b_w_h,
        height: b_h_h
    },
        depth, this._maxDepth, this._maxChildren);
};

Node.prototype.clear = function () {
    this.children.length = 0;
    var len = this.nodes.length;

    var i;
    for (i = 0; i < len; i++) {
        this.nodes[i].clear();
    }
    this.nodes.length = 0;
};

function BoundsNode(bounds, depth, maxChildren, maxDepth) {
    Node.call(this, bounds, depth, maxChildren, maxDepth);
    this._stuckChildren = [];
}

BoundsNode.prototype = new Node();
BoundsNode.prototype._classConstructor = BoundsNode;
BoundsNode.prototype._stuckChildren = null;
BoundsNode.prototype._out = [];
BoundsNode.prototype.insert = function (item) {
    if (this.nodes.length) {
        var index = this._findIndex(item);
        var node = this.nodes[index];
        if (item.x >= node._bounds.x &&
                item.x + item.width <= node._bounds.x + node._bounds.width &&
                item.y >= node._bounds.y &&
                item.y + item.height <= node._bounds.y + node._bounds.height) {

                  this.nodes[index].insert(item);

        } else {
            this._stuckChildren.push(item);
        }
        return;
    }
    this.children.push(item);
    var len = this.children.length;
    if (!(this._depth >= this._maxDepth) &&
            len > this._maxChildren) {

        this.subdivide();
        var i;
        for (i = 0; i < len; i++) {
            this.insert(this.children[i]);
        }
        this.children.length = 0;
    }
};

BoundsNode.prototype.getChildren = function () {
    return this.children.concat(this._stuckChildren);
};

BoundsNode.prototype.retrieve = function (item) {
    var out = this._out;
    out.length = 0;
    if (this.nodes.length) {
        var index = this._findIndex(item);
        var node = this.nodes[index];
        if (item.x >= node._bounds.x &&
                item.x + item.width <= node._bounds.x + node._bounds.width &&
                item.y >= node._bounds.y &&
                item.y + item.height <= node._bounds.y + node._bounds.height) {

            out.push.apply(out, this.nodes[index].retrieve(item));
        } else {

            if (item.x <= this.nodes[Node.TOP_RIGHT]._bounds.x) {
                if (item.y <= this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                    out.push.apply(out, this.nodes[Node.TOP_LEFT].getAllContent());
                }

                if (item.y + item.height > this.nodes[Node.BOTTOM_LEFT]._bounds.y) {
                    out.push.apply(out, this.nodes[Node.BOTTOM_LEFT].getAllContent());
                }
            }

            if (item.x + item.width > this.nodes[Node.TOP_RIGHT]._bounds.x) {//position+width bigger than middle x
                if (item.y <= this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                    out.push.apply(out, this.nodes[Node.TOP_RIGHT].getAllContent());
                }

                if (item.y + item.height > this.nodes[Node.BOTTOM_RIGHT]._bounds.y) {
                    out.push.apply(out, this.nodes[Node.BOTTOM_RIGHT].getAllContent());
                }
            }
        }
    }
    out.push.apply(out, this._stuckChildren);
    out.push.apply(out, this.children);
    return out;
};

BoundsNode.prototype.getAllContent = function () {
    var out = this._out;
    if (this.nodes.length) {

        var i;
        for (i = 0; i < this.nodes.length; i++) {
            this.nodes[i].getAllContent();
        }
    }
    out.push.apply(out, this._stuckChildren);
    out.push.apply(out, this.children);
    return out;
};

BoundsNode.prototype.clear = function () {
    this._stuckChildren.length = 0;
    this.children.length = 0;
    var len = this.nodes.length;
    if (!len) {
        return;
    }
    var i;
    for (i = 0; i < len; i++) {
        this.nodes[i].clear();
    }
    this.nodes.length = 0;
};
