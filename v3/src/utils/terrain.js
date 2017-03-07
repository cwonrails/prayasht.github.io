import * as THREE from 'three';
import Simplex from './noise';

var Terrain = {};

/**
 * Allocate the HeightMap
 * @param {Number} width - width of the heightmap
 * @param {Number} depth - depth of the heightmap
 * @return {Array} allocated heightmap
 */
Terrain.allocateHeightMap = function(width, depth) {
  var heightMap = new Array(width);
  for (var x = 0; x < width; x++) {
    heightMap[x] = new Float64Array(depth);
  }
  return heightMap;
}

/**
 * generate a heightmap using a simplex noise
 * @param {Array} heightMap the heightmap to store the data
 */
Terrain.simplexHeightMap = function(heightMap) {

  var width = heightMap.length;
  var depth = heightMap[0].length;

  var simplex = new Simplex();
  for (var x = 0; x < width; x++) {
    for (var z = 0; z < depth; z++) {
      var height = 0, level = 8;

      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.125;
      level *= 3;
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.25;
      level *= 2;
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.5;
      level *= 2;
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 1;
      height /= 1 + 0.5 + 0.25 + 0.125;

      heightMap[x][z] = height;
    }
  }
}

/**
 * Build a THREE.PlaneGeometry based on a heightMap
 * @param  {Array} heightMap the heightmap
 * @return {THREE.Geometry}  the just built geometry
 */
Terrain.heightMapToPlaneGeometry = function(heightMap) {

  var width = heightMap.length;
  var depth = heightMap[0].length;

  var geometry = new Terrain.PlaneGeometry(1, 1, width - 1, depth - 1);

  for (var x = 0; x < width; x++) {
    for (var z = 0; z < depth; z++) {
      var height = heightMap[x][z];

      // Set vertex.z to a normalized height
      var vertex = geometry.vertices[x + z * width];
      vertex.z = (height - 0.5) * 2;
    }
  }

  // Notify geometry to update vertices & normals
  geometry.verticesNeedUpdate = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.normalsNeedUpdate = true;
  return geometry;
}

/**
 * Set the vertex color for a THREE.Geometry based on a heightMap
 * @param  {Array} heightMap the heightmap
 * @param  {THREE.Geometry} geometry  the geometry to set
 */
Terrain.heightMapToVertexColor = function(heightMap, geometry) {

  var width = heightMap.length;
  var depth = heightMap[0].length;
  var color = new THREE.Color();

  for (var i = 0; i < geometry.faces.length; i++) {
    var face = geometry.faces[i];
    if (face instanceof THREE.Face4) {
      console.assert(face instanceof THREE.Face4);
      face.vertexColors.push(vertexIdxToColor(face.a).clone());
      face.vertexColors.push(vertexIdxToColor(face.b).clone());
      face.vertexColors.push(vertexIdxToColor(face.c).clone());
      face.vertexColors.push(vertexIdxToColor(face.d).clone());
    } else if (face instanceof THREE.Face3) {
      console.assert(face instanceof THREE.Face3)
      face.vertexColors.push(vertexIdxToColor(face.a).clone());
      face.vertexColors.push(vertexIdxToColor(face.b).clone());
      face.vertexColors.push(vertexIdxToColor(face.c).clone());
    } else
      console.assert(false);
  }

  geometry.colorsNeedUpdate = true;
  return;

  function vertexIdxToColor(vertexIdx) {
    var x = Math.floor(vertexIdx % width);
    var z = Math.floor(vertexIdx / width);
    var height = heightMap[x][z];
    return Terrain.heightToColor(height);
  }
}

/**
 * Return color based on a given height
 * @param {Number} height the height
 * @return {THREE.Color} the color for this height
 */
Terrain.heightToColor = (function() {
  var color = new THREE.Color();
  return function(height) {
    // compute color based on height
    if (height < 0.5) {
      height = (height * 2) * 0.5 + 0.2;
      color.setRGB(0, 0, height);
    } else if (height < 0.7) {
      height = (height - 0.5) / 0.2;
      height = height * 0.5 + 0.2;
      color.setRGB(0, height, 0);
    } else {
      height = (height - 0.7) / 0.3;
      height = height * 0.5 + 0.5;
      color.setRGB(height, height, height);
    }
    // color.setRGB(1,1,1)
    return color;
  }
})()

/**
 * plane geometry with THREE.Face3
 * @param {[type]} width          [description]
 * @param {[type]} height         [description]
 * @param {[type]} widthSegments  [description]
 * @param {[type]} heightSegments [description]
 */
Terrain.PlaneGeometry = function(width, height, widthSegments, heightSegments) {
  THREE.Geometry.call(this);

  this.width = width;
  this.height = height;

  this.widthSegments = widthSegments || 1;
  this.heightSegments = heightSegments || 1;

  var ix, iz;
  var width_half = width / 2;
  var height_half = height / 2;

  var gridX = this.widthSegments;
  var gridZ = this.heightSegments;

  var gridX1 = gridX + 1;
  var gridZ1 = gridZ + 1;

  var segment_width = this.width / gridX;
  var segment_height = this.height / gridZ;

  var normal = new THREE.Vector3(0, 0, 1);

  for (iz = 0; iz < gridZ1; iz++) {
    for (ix = 0; ix < gridX1; ix++) {

      var x = ix * segment_width - width_half;
      var y = iz * segment_height - height_half;

      this.vertices.push(new THREE.Vector3(x, -y, 0));
    }
  }

  for (iz = 0; iz < gridZ; iz++) {
    for (ix = 0; ix < gridX; ix++) {

      var a = ix + gridX1 * iz;
      var b = ix + gridX1 * (iz + 1);
      var c = (ix + 1) + gridX1 * (iz + 1);
      var d = (ix + 1) + gridX1 * iz;

      var uva = new THREE.Vector2(ix / gridX, 1 - iz / gridZ);
      var uvb = new THREE.Vector2(ix / gridX, 1 - (iz + 1) / gridZ);
      var uvc = new THREE.Vector2((ix + 1) / gridX, 1 - (iz + 1) / gridZ);
      var uvd = new THREE.Vector2((ix + 1) / gridX, 1 - iz / gridZ);

      var face = new THREE.Face3(a, b, d);
      face.normal.copy(normal);
      face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());

      this.faces.push(face);
      this.faceVertexUvs[0].push([uva, uvb, uvd]);

      face = new THREE.Face3(b, c, d);
      face.normal.copy(normal);
      face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());

      this.faces.push(face);
      this.faceVertexUvs[0].push([uvb.clone(), uvc, uvd.clone()]);
    }
  }
};

Terrain.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype);
export default Terrain;
