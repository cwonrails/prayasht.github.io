import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import TWEEN from 'tween.js';

import Terrain from '../utils/terrain.js';
var TbControls;

var wMesh, wGeometry, wMaterial, wHeightMap;
var controls; var flying = 0;

const orthographicCameraName = 'orthographicCamera';
const orthographicCameraRotation = new THREE.Euler();

class Waves extends Component {
  constructor(props, context) {
    super(props, context);

    this.fog = new THREE.Fog(0xCCE0FF, 0, 45);
    this.directionalLightPosition = new THREE.Vector3(-5, -1, 10);
    this.state = {
      ...this.state,
      mainCameraPosition: new THREE.Vector3(50, 5, 170),
      mainCameraRotation: new THREE.Euler(),
      rendererProps: {
        antialias: 1,
        width: 400,
        height: 400,
        mainCamera: 'camera',
        onAnimate: this._onAnimate
      }
    };
  }

  componentDidMount() {
    TbControls = require('three-trackballcontrols');
    controls = new TbControls(this.refs.camera, this.refs.renderer._canvas);
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.1;
    controls.panSpeed = 0.1;
    controls.dampingFactor = 0.3;
    controls.minDistance = 100;
    controls.maxDistance = 600;
    this.controls = controls;

    this.setState({
      rendererProps: {
        antialias: 1,
        width: window.innerWidth,
        height: window.innerHeight,
        mainCamera: 'camera',
        onAnimate: this._onAnimate
      }
    });

    wHeightMap = Terrain.allocateHeightMap(100, 350);
    Terrain.simplexHeightMap(wHeightMap);

    wGeometry	= Terrain.heightMapToPlaneGeometry(wHeightMap);
  	// Terrain.heightMapToVertexColor(wHeightMap, wGeometry);

    wMaterial = new THREE.MeshLambertMaterial({ color: 0x6695f7, wireframe: true });
  	wMesh = new THREE.Mesh(wGeometry, wMaterial);
  	wMesh.lookAt(new THREE.Vector3(0, 50, 0));
    this.refs.scene.add(wMesh);

  	wMesh.scale.x = 5;
    wMesh.scale.y = 3;
  	wMesh.scale.z = 0.4;
    // console.log(wMesh);
    // console.log(wHeightMap);

  	wMesh.scale.multiplyScalar(50);
    wMesh.rotation.z = 2;
  }

  componentDidUpdate() {
    this._zoom(this.refs.camera.zoom, this.props.cameraZoom, 2000);
  }

  _zoom(start, end, duration) {
    // console.log("Zooming from:", start, "to", end);
    let camZoom = { cameraZoom: start };
    let camZoomTarget = { cameraZoom: end };
    let camTween = new TWEEN.Tween(camZoom)
      .to(camZoomTarget, duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
      .onUpdate(() => {
        this.refs.camera.zoom = camZoom.cameraZoom;
        this.refs.camera.updateProjectionMatrix();
      });
  }

  _onAnimate = () => {
    TWEEN.update();
    controls.update();
    wMesh.rotation.z += 0.00001;
  }

  render() {
    var cameraProps = {
      fov: 60,
      near: 10,
      far: 10000,
      position: this.state.mainCameraPosition,
      rotation: this.state.mainCameraRotation,
      lookAt: THREE.Vector3(0, 0, 0)
    };

    return (
      <React3 ref='renderer' {...this.state.rendererProps} clearColor={0xEBEBEB} alpha={true} clearAlpha={0.25}>
        <scene ref='scene' position={THREE.Vector3(0, 0, 0)}>
          <perspectiveCamera ref='camera' name='camera' {...cameraProps} />
          {/* <orthographicCamera
            ref='camera'
            name={orthographicCameraName}
            left={window.innerWidth / -2}
            right={window.innerWidth / 2}
            top={window.innerHeight / 2}
            bottom={window.innerHeight / -2}
            near={1}
            far={1000}
            rotation={orthographicCameraRotation}
          /> */}
          <directionalLight color={0x6695F7} position={this.directionalLightPosition} />
          <ambientLight color={0xEBEBEB} intensity={1} />
        </scene>
      </React3>
    );
  }
}

export default Waves;
