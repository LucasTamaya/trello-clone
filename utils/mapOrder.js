// fonction qui permet de changer et d'enregistrer les nouvelles positions de mes cards lorsqu'on les déplace

function mapOrder(array, order, key) {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });
  console.log("nouveau tableau", array);
  return array;
}

export default mapOrder;

