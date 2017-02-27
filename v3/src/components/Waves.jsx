import React, { Component, PropTypes } from 'react';
import p5 from 'p5';

function sketch(p) {
  var cols, rows;
  var scl = 25;
  var w = 1980;
  var h = 800;
  var fade = 255;
  var flying = 0;

  var terrain;

  p.setup = function () {
    var canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    canvas.parent("home");
    p.background('#EBEBEB');
    p.frameRate(30);
    p.colorMode(p.RGB);
    p.isImmediateDrawing = false;

    cols = w / scl;
    rows = h / scl;

    terrain = [];
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
    }
  };

  // ************************************************************************************

  p.draw = function () {
    p.background('#EBEBEB');
    p.strokeWeight(2);
    p.stroke(228, 238, 238);

    flying -= 0.01;
    var yOff = flying;
    for (var y = 0; y < rows; y++) {
      var xOff = 0;
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = p.map(p.noise(xOff, yOff), 0, 1, -200, 200);
        xOff += 0.1;
      }
      yOff += 0.05;
    }

    p.rotateX(-p.PI/2);
    p.translate(-w/2, -h/4);

    var locY = (p.mouseY / p.height - 0.5) * (2);
    var locX = (p.mouseX / p.width - 0.5) * 2;

    p.ambientLight(10, 90, 255);
    p.pointLight(250, 250, 250, locX, locY, 255);
    p.ambientMaterial(155, 155);

    for (var y = 0; y < rows - 1; y++) {
      p.beginShape(p.TRIANGLE_STRIP);
      p.stroke(0);
      for (var x = 0; x < cols; x++) {
        p.push();
        p.vertex(x * scl, y * scl, terrain[x][y]);
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        p.pop();
      }
      p.endShape();
    }
  };
};

class P5Wrapper extends Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    if (this.props.sketch !== newprops.sketch) {
      this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }

    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  componentWillUnmount() {
    delete this.canvas;
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
  }
}

class Waves extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
			stateSketch: sketch
		};
  }

  componentDidMount() {
    // console.log(this.state.stateSketch.remove);
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <P5Wrapper sketch={this.state.stateSketch} />
      </div>
    );
  }
}

export default Waves;
