paper.install(window);
const SQRT_3 = Math.pow(3, 0.5);
let triangle, D, mousePos, position;
const count = 50;

const moveStars = function(vector) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:
  const layer = project.activeLayer;
  for (let i = 1; i < count + 1; i++) {
    const item = layer.children[i];
    const size = item.bounds.size;
    const length = vector.length / 10 * size.width / 10;
    item.position = item.position.add( vector.normalize(length).add(item.data.vector));
    keepInView(item);
  }
};
const buildStars = function() {
  // Create a symbol, which we will use to place instances of later:
  const path = new Path.Circle({
    center: [0, 0],
    radius: 5,
    fillColor: 'white',
    strokeColor: 'white'
  });

  const symbol = new Symbol(path);

  // Place the instances of the symbol:
  for (let i = 0; i < count; i++) {
    // The center position is a random point in the view:
    const center = Point.random().multiply(paper.view.size);
    const placed = symbol.place(center);
    placed.scale(i / count + 0.01);
    placed.data = {
      vector: new Point({
        angle: Math.random() * 360,
        length : (i / count) * Math.random() / 5
      })
    };
  }

  const vector = new Point({
    angle: 45,
    length: 0
  });
};

// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
const Triangle = function(a) {
  this.build(a);
};
const refresh = () => {
  paper.setup('paper-plane-space');

  D = Math.max(paper.view.getSize().width, paper.view.getSize().height);

  mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
  position = paper.view.center;

  // Draw the BG
  const background = new Path.Rectangle(view.bounds);
  background.fillColor = '#3B3251';
  buildStars();
  triangle = new Triangle(50);

  paper.view.draw();

  paper.view.onFrame = function(event) {
    position = position.add( (mousePos.subtract(position).divide(10) ) );
    const vector = (view.center.subtract(position)).divide(10);
    moveStars(vector.multiply(3));
    triangle.update();
  };
}
window.onload = function() {
  refresh();
};
// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
window.onresize = function() {
  project.clear();
  refresh();
  // D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
  // // Draw the BG
  // const background = new Path.Rectangle(view.bounds);
  // background.fillColor = '#3B3251';
  // buildStars();
  // triangle.build(50);
};

const random = function (minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

const map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

Triangle.prototype.build = function(a) {
  // The points of the triangle
  const segments = [new paper.Point(0, -a / SQRT_3),
    new paper.Point(-a / 2, a * 0.5 / SQRT_3),
    new paper.Point(a / 2, a * 0.5 / SQRT_3)];

  this.flameSize = a / SQRT_3;
  const flameSegments = [new paper.Point(0, this.flameSize),
    new paper.Point(-a / 3, a * 0.4 / SQRT_3),
    new paper.Point(a / 3, a * 0.4 / SQRT_3)];

  this.flame = new Path({
    segments: flameSegments,
    closed: true,
    fillColor: '#FCE589'
  });
  this.ship = new Path({
    segments: segments,
    closed: true,
    fillColor: '#FF7885'
  });
  this.group = new Group({
    children: [this.flame, this.ship],
    position: view.center
  });
};

Triangle.prototype.update = function() {
  this.flame.segments[0].point.x = random(this.flame.segments[1].point.x, this.flame.segments[2].point.x);

  const dist = mousePos.subtract(paper.view.center).length;
  const angle = mousePos.subtract(paper.view.center).angle;
  const spread = map(dist, 0, D / 2, 10, 30);

  this.flame.segments[0].point = paper.view.center.subtract(new Point({
    length: map(dist, 0, D/2, 2*this.flameSize/3, this.flameSize),
    angle: random(angle - spread, angle + spread)
  }));
};

Triangle.prototype.rotate = function() {
  const angle = paper.view.center.subtract(mousePos).angle - paper.view.center.subtract(this.ship.segments[0].point).angle;

  this.group.rotate(angle, paper.view.center);
};
// ---------------------------------------------------
//  Stars (from paperjs.org examples section)
// ---------------------------------------------------
window.onmousemove = function(event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
  triangle.rotate();
};


const keepInView = function (item) {
  const position = item.position;
  const viewBounds = paper.view.bounds;
  if (position.isInside(viewBounds))
    return;
  const itemBounds = item.bounds;
  if (position.x > viewBounds.width + 5) {
    position.x = -item.bounds.width;
  }

  if (position.x < -itemBounds.width - 5) {
    position.x = viewBounds.width;
  }

  if (position.y > viewBounds.height + 5) {
    position.y = -itemBounds.height;
  }

  if (position.y < -itemBounds.height - 5) {
    position.y = viewBounds.height
  }
};
