import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import { Noise } from '../utils/noise';
// import { map, noise } from '../utils/math';

var mesh;
var noise = new Noise(0.5);
var height = 100;
var width = height;
var noiseMatrix = [];

class Waves extends Component {
  constructor(props, context) {
    super(props, context);
    this.fog = new THREE.Fog(0xCCE0FF, 500, 10000);
    this.directionalLightPosition = new THREE.Vector3(-5, -1, 10);
    this.pointLightPosition = new THREE.Vector3(100, 100, 100);

    this.state = {
      ...this.state,
      mainCameraPosition: new THREE.Vector3(0, -70, 5)
    };
  }

  createGeometry() {
    var plane = new THREE.PlaneGeometry(height, width, 15, 25);
    var material = new THREE.MeshPhongMaterial({ color: 0x6695f7, wireframe: true });

    var mesh = new THREE.Mesh(plane, material);
    mesh.geometry.vertices.forEach((vert) => {
      noiseMatrix.push({
        x: vert.x + height / 2,
        y: vert.y - width / 2
      });
    })

    return mesh;
  }

  getZ(vert) {
    var z = 1.75 * ((noise.simplex2(vert.x * 0.1, vert.y * 0.1) + 1) / 2) +
      0.1 * ((noise.simplex2(vert.x * 2, vert.y * 0.5) + 2) / 2) +
      0.03 * ((noise.simplex2(vert.x * 5, vert.y * 5) + 5) / 2);
    z = Math.pow(z, 2.75);
    // var z = map(noise(vert.x, vert.y), 0, 1, 5, 5)
    return z;
  }

  componentDidMount() {
    mesh = this.createGeometry();
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.refs.scene.add(mesh);
    console.log(this.refs.camera);
    this.refs.camera.rotation.x += 1.5;
  }

  componentWillUnmount() {

  }

  _onAnimate = () => {
    mesh.geometry.vertices.forEach((vert, index) => {
      vert.z = this.getZ(noiseMatrix[index]);
    });

    noiseMatrix.forEach((vert) => {
      vert.x += 0.01;
      vert.y += 0.05;
    });

    mesh.geometry.verticesNeedUpdate = true;
  }

  render() {
    var rendererProps = {
      antialias: 1,
      width: window.innerWidth,
      height: window.innerHeight,
      mainCamera: 'camera',
      onAnimate: this._onAnimate
    };

    var cameraProps = {
      fov: 60,
      aspect: (rendererProps.width / rendererProps.height),
      near: 0.1,
      far: 10000,
      position: this.state.mainCameraPosition
    };

    return (
      <React3 ref='renderer' {...rendererProps} clearColor={0xEBEBEB}>

        <resources>
          <boxGeometry resourceId='cubeGeo' width={30} height={30} depth={30} />
          <meshNormalMaterial resourceId='cubeMaterial' />
        </resources>

        <scene ref='scene' position={THREE.Vector3(0, 0, 0)}>

          <perspectiveCamera ref='camera' name='camera' {...cameraProps} />
          {/* <Box width={30} height={30} depth={30} rotation={this.state.cubeRotation} /> */}

          <directionalLight color={0xFFFFFF} position={this.directionalLightPosition} />
          <directionalLight color={0xD92B6A} position={this.directionalLightPosition} />
          <ambientLight color={0x222222} intensity={3} />
          <pointLight color={0x6695f7} position={this.pointLightPosition} />

          {/* <mesh>
            <octahedronGeometry radius={40} detail={2} />
            <meshPhongMaterial color={0xD92B6A} shading={THREE.FlatShading} />
          </mesh>

          <mesh>
            <octahedronGeometry ref='icosFrameGeom' radius={50} detail={2} />
            <meshPhongMaterial ref='icosWire' color={0xFFFFFF} transparent={true} opacity={0.2} wireframe={true} />
          </mesh> */}

        </scene>

      </React3>
    );
  }
}

export default Waves;



// var cols, rows;
// var scl = 25;
// var w = 1980;
// var h = 800;
// var fade = 255;
// var flying = 0;
//
// var terrain;
//
// // ************************************************************************************
//
// function setup() {
//   var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
//   canvas.parent("content");
//   background('#EBEBEB');
//   frameRate(30);
//   colorMode(RGB);
//
//   cols = w / scl;
//   rows = h / scl;
//
//   terrain = [];
//   for (var x = 0; x < cols; x++) {
//     terrain[x] = [];
//   }
// }
//
// // ************************************************************************************
//
// function draw() {
//   background('#EBEBEB');
//   strokeWeight(2);
//   stroke(228, 238, 238);
//
//   flying -= 0.01;
//   var yOff = flying;
//   for (var y = 0; y < rows; y++) {
//     var xOff = 0;
//     for (var x = 0; x < cols; x++) {
//       terrain[x][y] = map(noise(xOff, yOff), 0, 1, -200, 200);
//       xOff += 0.1;
//     }
//     yOff += 0.05;
//   }
//
//   rotateX(-PI/2);
//   translate(-w/2, -h/4);
//
//   var locY = (mouseY / height - 0.5) * (2);
//   var locX = (mouseX / width - 0.5) * 2;
//
//   var hue = map(frameCount, 0, 255, 0, 255);
//   ambientLight(10, 90, hue);
//   pointLight(250, 250, 250, locX, locY, 255);
//   ambientMaterial(155, 155);
//
//   for (var y = 0; y < rows - 1; y++) {
//     beginShape(TRIANGLE_STRIP);
//     stroke(0);
//     for (var x = 0; x < cols; x++) {
//       push();
//       vertex(x * scl, y * scl, terrain[x][y]);
//       vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
//       pop();
//     }
//     endShape();
//   }
// }
//
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
