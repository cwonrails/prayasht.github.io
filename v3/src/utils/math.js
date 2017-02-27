export function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;

var perlin_octaves = 4; // default to medium smooth
var perlin_amp_falloff = 0.5; // 50% reduction/octave

var scaled_cosine = function(i) {
  return 0.5*(1.0-Math.cos(i*Math.PI));
};

var perlin; // will be initialized lazily by noise() or noiseSeed()

/**
 * Returns the Perlin noise value at specified coordinates. Perlin noise is
 * a random sequence generator producing a more natural ordered, harmonic
 * succession of numbers compared to the standard <b>random()</b> function.
 * It was invented by Ken Perlin in the 1980s and been used since in
 * graphical applications to produce procedural textures, natural motion,
 * shapes, terrains etc.<br /><br /> The main difference to the
 * <b>random()</b> function is that Perlin noise is defined in an infinite
 * n-dimensional space where each pair of coordinates corresponds to a
 * fixed semi-random value (fixed only for the lifespan of the program; see
 * the noiseSeed() function). p5.js can compute 1D, 2D and 3D noise,
 * depending on the number of coordinates given. The resulting value will
 * always be between 0.0 and 1.0. The noise value can be animated by moving
 * through the noise space as demonstrated in the example above. The 2nd
 * and 3rd dimension can also be interpreted as time.<br /><br />The actual
 * noise is structured similar to an audio signal, in respect to the
 * function's use of frequencies. Similar to the concept of harmonics in
 * physics, perlin noise is computed over several octaves which are added
 * together for the final result. <br /><br />Another way to adjust the
 * character of the resulting sequence is the scale of the input
 * coordinates. As the function works within an infinite space the value of
 * the coordinates doesn't matter as such, only the distance between
 * successive coordinates does (eg. when using <b>noise()</b> within a
 * loop). As a general rule the smaller the difference between coordinates,
 * the smoother the resulting noise sequence will be. Steps of 0.005-0.03
 * work best for most applications, but this will differ depending on use.
 *
 *
 * @method noise
 * @param  {Number} x   x-coordinate in noise space
 * @param  {Number} y   y-coordinate in noise space
 * @param  {Number} z   z-coordinate in noise space
 * @return {Number}     Perlin noise value (between 0 and 1) at specified
 *                      coordinates
 * @example
 * <div>
 * <code>var xoff = 0.0;
 *
 * function draw() {
 *   background(204);
 *   xoff = xoff + .01;
 *   var n = noise(xoff) * width;
 *   line(n, 0, n, height);
 * }
 * </code>
 * </div>
 * <div>
 * <code>var noiseScale=0.02;
 *
 * function draw() {
 *   background(0);
 *   for (var x=0; x < width; x++) {
 *     var noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
 *     stroke(noiseVal*255);
 *     line(x, mouseY+noiseVal*80, x, height);
 *   }
 * }
 * </code>
 * </div>
 *
 * @alt
 * vertical line moves left to right with updating noise values.
 * horizontal wave pattern effected by mouse x-position & updating noise values.
 *
 */

export function noise(x,y,z) {
  y = y || 0;
  z = z || 0;

  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x<0) { x=-x; }
  if (y<0) { y=-y; }
  if (z<0) { z=-z; }

  var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
  var xf = x - xi;
  var yf = y - yi;
  var zf = z - zi;
  var rxf, ryf;

  var r=0;
  var ampl=0.5;

  var n1,n2,n3;

  for (var o=0; o<perlin_octaves; o++) {
    var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1  = perlin[of&PERLIN_SIZE];
    n1 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n1);
    n2  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
    n2 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
    n1 += ryf*(n2-n1);

    of += PERLIN_ZWRAP;
    n2  = perlin[of&PERLIN_SIZE];
    n2 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n2);
    n3  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
    n3 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
    n2 += ryf*(n3-n2);

    n1 += scaled_cosine(zf)*(n2-n1);

    r += n1*ampl;
    ampl *= perlin_amp_falloff;
    xi<<=1;
    xf*=2;
    yi<<=1;
    yf*=2;
    zi<<=1;
    zf*=2;

    if (xf>=1.0) { xi++; xf--; }
    if (yf>=1.0) { yi++; yf--; }
    if (zf>=1.0) { zi++; zf--; }
  }
  return r;
}
