/* eslint-disable no-useless-escape */
export const initColorScript = `(() => {
    try {
      var primary = localStorage.getItem('primary-color');
      var secondary = localStorage.getItem('secondary-color');
      if (!primary || !secondary) return;
      function hexToHsl(hex) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        return h + ' ' + s + '% ' + l + '%';
      }
      function lighten(hsl, amt) {
        if (amt === void 0) amt = 20;
        // eslint-disable-next-line no-useless-escape
        var parts = hsl.split(/\s+/);
        var l = parseFloat(parts[2]);
        var newL = Math.min(100, l + amt);
        return parts[0] + ' ' + parts[1] + ' ' + newL + '%';
      }
      var ph = hexToHsl(primary);
      var sh = hexToHsl(secondary);
      var p50 = lighten(ph);
      var s50 = lighten(sh);
      var root = document.documentElement;
      root.style.setProperty('--primary', ph);
      root.style.setProperty('--primary-50', p50);
      root.style.setProperty('--primary-100', ph);
      root.style.setProperty('--secondary', sh);
      root.style.setProperty('--secondary-50', s50);
      root.style.setProperty('--secondary-100', sh);
    } catch (e) {}
    })()`
