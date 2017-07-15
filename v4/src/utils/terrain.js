import * as THREE from 'three'
import Simplex from './noise'

let Terrain = {}

/**
 * Allocate the HeightMap
 * @param {Int} width - width of the heightmap
 * @param {Int} depth - depth of the heightmap
 * @return {Array} - allocated memory for heightmap
 */
Terrain.allocateHeightMap = function(width, depth) {
  let heightMap = new Array(width)
  for (let x = 0; x < width; x++) {
    heightMap[x] = new Float64Array(depth)
  }
  return heightMap
}

/**
 * generate a heightmap using a simplex noise
 * @param {Array} heightMap - the heightmap to store the data
 * @return {Void} - modifies heightMap in-memory
 */
Terrain.simplexHeightMap = function(heightMap) {
  let width = heightMap.length
  let depth = heightMap[0].length

  let simplex = new Simplex()
  for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
      let height = 0,
        level = 8

      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.125
      level *= 3
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.25
      level *= 2
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.5
      level *= 2
      height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 1
      height /= 1 + 0.5 + 0.25 + 0.125

      heightMap[x][z] = height
    }
  }
}

/**
 * Build a THREE.PlaneGeometry based on a heightMap
 * @param  {Array} heightMap - the heightmap
 * @return {THREE.Geometry} - plane geometry
 */
Terrain.heightMapToPlaneGeometry = function(heightMap) {
  let width = heightMap.length / 2
  let depth = heightMap[0].length
  // console.log(width, depth);

  let geometry = new Terrain.PlaneGeometry(1, 1, width - 1, depth - 1)

  for (let x = 0; x < width; x++) {
    for (let z = 0; z < depth; z++) {
      let height = heightMap[x][z]

      // Set vertex.z to a normalized height
      let vertex = geometry.vertices[x + z * width]
      vertex.z = (height - 0.5) * 2
    }
  }

  // Notify geometry to update vertices & normals
  geometry.verticesNeedUpdate = true
  geometry.computeFaceNormals()
  geometry.computeVertexNormals()
  geometry.normalsNeedUpdate = true
  // console.log(geometry);
  return geometry
}

/**
 * plane geometry with THREE.Face3
 * @param {Int} width, height, widthSegments, heightSegments
 */
Terrain.PlaneGeometry = function(width, height, widthSegments, heightSegments) {
  THREE.Geometry.call(this)

  this.width = width
  this.height = height

  this.widthSegments = widthSegments || 1
  this.heightSegments = heightSegments || 1

  let ix, iz
  let width_half = width / 2
  let height_half = height / 2

  let gridX = this.widthSegments
  let gridZ = this.heightSegments

  let gridX1 = gridX + 1
  let gridZ1 = gridZ + 1

  let segment_width = this.width / gridX
  let segment_height = this.height / gridZ

  let normal = new THREE.Vector3(0, 0, 1)

  for (iz = 0; iz < gridZ1; iz++) {
    for (ix = 0; ix < gridX1; ix++) {
      let x = ix * segment_width - width_half
      let y = iz * segment_height - height_half

      this.vertices.push(new THREE.Vector3(x, -y, 0))
    }
  }

  for (iz = 0; iz < gridZ; iz++) {
    for (ix = 0; ix < gridX; ix++) {
      let a = ix + gridX1 * iz
      let b = ix + gridX1 * (iz + 1)
      let c = ix + 1 + gridX1 * (iz + 1)
      let d = ix + 1 + gridX1 * iz

      let uva = new THREE.Vector2(ix / gridX, 1 - iz / gridZ)
      let uvb = new THREE.Vector2(ix / gridX, 1 - (iz + 1) / gridZ)
      let uvc = new THREE.Vector2((ix + 1) / gridX, 1 - (iz + 1) / gridZ)
      let uvd = new THREE.Vector2((ix + 1) / gridX, 1 - iz / gridZ)

      let face = new THREE.Face3(a, b, d)
      face.normal.copy(normal)
      face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone())

      this.faces.push(face)
      this.faceVertexUvs[0].push([uva, uvb, uvd])

      face = new THREE.Face3(b, c, d)
      face.normal.copy(normal)
      face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone())

      this.faces.push(face)
      this.faceVertexUvs[0].push([uvb.clone(), uvc, uvd.clone()])
    }
  }
}

Terrain.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype)
export default Terrain
