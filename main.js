let rgbinput = document.getElementById('rgb');
let hexinput = document.getElementById('hex');

// convert rgb code to hex
function toHex(rgb) {
  let rgbCode;
  let hex = '#';
  if (/[rgb()]/.test(rgb)) {
    rgbCode = rgb.replace(/[a-z()]/ig, '');
  } else {
    rgbCode = rgb
  }
  let arr = rgbCode.split(',');
  let condition = arr.every(num => num <= 255);

  if (condition) {
    for (var i = 0; i < arr.length; i++) {
      let code = parseInt(arr[i]).toString(16);
      hex += code.length == 1 ? '0' + code : code;
    }
    document.body.style.backgroundColor = `${hex}`;
    if (!/NaN/g.test(hex) && arr.length <= 3) {
      hexinput.value = hex;
      isValid(rgbinput, hexinput)
    } else {
      notValid(rgbinput, hexinput);
    }
  } else {
    notValid(rgbinput, hexinput);
  }
}
rgbinput.oninput = function() {
  toHex(rgbinput.value);
  restfile(rgbinput, hexinput)
}

//convert hex to rgb 
function torgb(hex) {
  if (/^#?[a-fA-F0-9]/.test(hex)) {
    let hexCode = hex.split('#')[1] || hex
    let arr = [];
    for (var i = 0; i < hexCode.length; i += 2) {
      arr.push(parseInt(hexCode[i] + hexCode[i + 1], 16))
    }
    if (!/NaN/g.test(arr) && hexCode.length <= 6 && !/[g-zG-Z]/.test(hexCode)) {
      rgbinput.value = `rgb(${arr})`;
      isValid(rgbinput, hexinput);
      document.body.style.backgroundColor = `rgb(${arr})`;
    } else {
      notValid(rgbinput, hexinput);
    }
  } else {
    notValid(rgbinput, hexinput);
  }
}
hexinput.oninput = function() {
  torgb(hexinput.value);
  restfile(hexinput, rgbinput)
}

function isValid(firstElm, secondElm) {
  firstElm.style.color = '#008E54';
  secondElm.style.color = '#008E54'
}
function notValid(firstElm, secondElm) {
  firstElm.style.color = '#BB2A2A';
  secondElm.style.color = '#BB2A2A'
}
function restfile(firstElm, secondElm) {
  if (firstElm.value == '') {
    secondElm.value = ''
  }
}

