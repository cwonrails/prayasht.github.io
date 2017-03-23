import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import TWEEN from 'tween.js';

import Terrain from '../utils/terrain.js';
let TbControls;

let frameCount = 0; let controls;
let wMesh, wGeometry, wMaterial, wHeightMap;

const orthographicCameraName = 'orthographicCamera';
const orthographicCameraRotation = new THREE.Euler();

class Waves extends Component {
  constructor(props, context) {
    super(props, context);

    this.fog = new THREE.Fog(0xCCE0FF, 0, 45);
    this.directionalLightPosition = new THREE.Vector3(0, 0, 100);
    this.state = {
      ...this.state,
      mainCameraPosition: new THREE.Vector3(50, 5, 0),
      mainCameraRotation: new THREE.Euler(),
      rendererProps: {
        antialias: 1,
        width: 400,
        height: 400,
        mainCamera: 'camera',
        onAnimate: this._onAnimate
      },

      cameraProps: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        near: 10,
        far: 10000
      }
    };
  }

  componentDidMount() {
    // window.addEventListener("resize", this.updateDimensions.bind(this));

    TbControls = require('three-trackballcontrols');
    controls = new TbControls(this.refs.camera, this.refs.renderer._canvas);
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.1;
    controls.panSpeed = 0.1;
    controls.dampingFactor = 0.3;
    controls.minDistance = 100;
    controls.maxDistance = 600;
    controls.noZoom = true;
    controls.noPan = true;
    controls.noRotate = true;
    // this.controls = controls;

    this.setState({
      rendererProps: {
        antialias: 1,
        width: window.innerWidth,
        height: window.innerHeight,
        mainCamera: 'camera',
        onAnimate: this._onAnimate
      },

      cameraProps: {
        left: window.innerWidth / -2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: window.innerHeight / -2,
        near: 10,
        far: 10000
      }
    });

    wHeightMap = Terrain.allocateHeightMap(100, 200);
    Terrain.simplexHeightMap(wHeightMap);

    wGeometry	= Terrain.heightMapToPlaneGeometry(wHeightMap);

    wMaterial = new THREE.MeshLambertMaterial({ color: 0x6695f7, wireframe: true });
  	wMesh = new THREE.Mesh(wGeometry, wMaterial);
  	wMesh.lookAt(new THREE.Vector3(0, 50, 0));
    this.refs.scene.add(wMesh);

  	wMesh.scale.set(45, 250, 25);
    wMesh.scale.multiplyScalar(1.25);
    wMesh.rotation.z = 5;
    wMesh.position.z = -300;

    this.refs.camera.zoom = 5;
    this.refs.camera.updateProjectionMatrix();
    // console.log(this.refs.camera.position);
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
  }

  render() {
    let cameraProps = {
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
          {/* <perspectiveCamera ref='camera' name='camera' {...cameraProps} /> */}
          <orthographicCamera ref='camera' name='camera' {...this.state.cameraProps} />
          <directionalLight color={0x6695F7} position={this.directionalLightPosition} />
          <ambientLight color={0xEBEBEB} intensity={1} />
        </scene>
      </React3>
    );
  }
}

export default Waves;
