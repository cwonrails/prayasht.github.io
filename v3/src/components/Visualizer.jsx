import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

// var TrackballControls = require('three-trackballcontrols');

// import Sky from './components/Sky';
// import Box from './Box';

var cubes = [], spheres = [];
var controls;
const palette = ["#ECF0F1", "#7877F9", "#3498DB", "#FFA446", "#7AA8FF"];

function Box(props) {
  const { width, height, depth, rotation } = props;

  return (
    <mesh rotation={rotation}>
      <boxGeometry width={width} height={height} depth={depth} />
      <meshNormalMaterial />
    </mesh>
  );
}

Box.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired
};

class Visualizer extends Component {
  constructor(props, context) {
    super(props, context);
    this.fog = new THREE.Fog(0xCCE0FF, 500, 10000);
    this.directionalLightPosition = new THREE.Vector3(-5, -1, 10);
    this.pointLightPosition = new THREE.Vector3(100, 100, 100);

    this.state = {
      ...this.state,
      r: Date.now() * 0.0005,
      cubeRotation: new THREE.Euler(),
      mainCameraPosition: new THREE.Vector3(0, 40, 120),
      mainCameraRotation: new THREE.Euler()
    };
  }

  componentDidMount() {
    // const controls = new OrbitControls(this.refs.camera);
    // this.controls = controls;

    // controls = new TrackballControls(this.refs.camera, this.refs.renderer._canvas);
    // controls.rotateSpeed = 2.0;
    // controls.zoomSpeed = 1;
    // controls.panSpeed = 1;
    // controls.dampingFactor = 0.3;
    // controls.minDistance = 100;
    // controls.maxDistance = 600;
    // this.controls = controls;

    this.refs.scene.fog = new THREE.FogExp2('#FCF7E1', 0.0011);

    for (var i = 0; i < 255; i++) {
      var cubeGeometry = new THREE.CubeGeometry(15, 15, 15);
      var cubeMaterial = new THREE.MeshPhongMaterial({
        color: palette[Math.floor(Math.random() * palette.length)],
        specular: '#FFFFFF',
        shininess: 20,
        reflectivity: 1.5,
        shading: THREE.FlatShading,
        // wireframe: Math.random(1) > 0.8 ? true : false
      });

      cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cubes[i].position.set((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000);
      cubes[i].updateMatrix();
      this.refs.scene.add(cubes[i]);
    }

    for (var j = 0; j < 300; j++) {
      var geometry = new THREE.Geometry();
      var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      vertex.normalize();
      vertex.multiplyScalar(500);
      geometry.vertices.push(vertex);

      var vertex2 = vertex.clone();
      vertex2.multiplyScalar(Math.random() * 0.3 + 1);
      geometry.vertices.push(vertex2);

      var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: '#FFFFFF',
        linewidth: Math.random(3),
        transparent: true,
        fog: true,
        opacity: 1
      }));
      this.refs.scene.add(line);
    }

    for (i in this.refs.icosFrameGeom.vertices) {
      var sphereG = new THREE.SphereGeometry(0.5, 8, 8);
      var sphereM = new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, shading: THREE.FlatShading});
      spheres.push(new THREE.Mesh(sphereG, sphereM));
      spheres[i].position.set(this.refs.icosFrameGeom.vertices[i].x, this.refs.icosFrameGeom.vertices[i].y, this.refs.icosFrameGeom.vertices[i].z)
      this.refs.scene.add(spheres[i]);
    }
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  _onAnimate = () => {
    controls.update();
    const r = Date.now() * 0.0005;

    this.refs.camera.position.x += 0.1;
    this.refs.camera.position.y += 0.1;
    this.refs.camera.lookAt(this.refs.scene.position);

    this.setState({
      r,
      cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.01, this.state.cubeRotation.y + 0.01, 0)
    });
  }

  render() {
    // var width = window.innerWidth;
    // var height = window.innerHeight;

    const { r } = this.state;
    var rendererProps = {
      antialias: 1,
      width: 400,
      height: 340,
      mainCamera: 'camera',
      onAnimate: this._onAnimate
    };

    var cameraProps = {
      fov: 60,
      aspect: (rendererProps.width / rendererProps.height),
      near: 0.1,
      far: 10000,
      position: this.state.mainCameraPosition,
      rotation: this.state.mainCameraRotation,
      lookAt: THREE.Vector3(0, 0, 0)
    };

    return (
      <React3 ref='renderer' {...rendererProps} clearColor={0xFCF7E1}>

        <resources>
          <boxGeometry resourceId='cubeGeo' width={30} height={30} depth={30} />
          <meshNormalMaterial resourceId='cubeMaterial' />
        </resources>

        <scene ref='scene' position={THREE.Vector3(0, 0, 0)}>

          <perspectiveCamera ref='camera' name='camera' {...cameraProps} />
          {/* <gridHelper size={1000} step={300} colorCenterLine={0x0000ff} /> */}

          {/* <Sky radius={4000} widthSegments={32} heightSegments={15} topColor={0x999999} bottomColor={0x333333}/> */}
          <Box width={30} height={30} depth={30} rotation={this.state.cubeRotation} />

          <directionalLight color={0xFFFFFF} position={this.directionalLightPosition} />
          <directionalLight color={0xD92B6A} position={this.directionalLightPosition} />
          <ambientLight color={0x222222} intensity={3} />
          <pointLight color={0xFFFFFF} position={this.pointLightPosition} />

          <mesh>
            <octahedronGeometry radius={40} detail={2} />
            <meshPhongMaterial color={0xD92B6A} shading={THREE.FlatShading} />
          </mesh>

          <mesh>
            <octahedronGeometry ref='icosFrameGeom' radius={50} detail={2} />
            <meshPhongMaterial ref='icosWire' color={0xFFFFFF} transparent={true} opacity={0.2} wireframe={true} />
          </mesh>

        </scene>

      </React3>
    );
  }
}

export default Visualizer;
