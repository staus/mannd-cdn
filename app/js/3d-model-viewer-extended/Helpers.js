const Helpers = {
  
  RGBToHex: (r,g,b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  },

  hexToRGB: (h) => {
    h = h.substring(1)
    var aRgbHex = h.match(/.{1,2}/g);
    var aRgb = [
        (parseInt(aRgbHex[0], 16) / 255),
        (parseInt(aRgbHex[1], 16) / 255),
        (parseInt(aRgbHex[2], 16) / 255)
    ];
    return aRgb;
  }

}