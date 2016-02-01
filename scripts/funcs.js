pi2 = Math.PI * 2;

function addVectors(obj1, obj2) {
    obj1.x += (obj2.x) || 0;
    obj1.y += (obj2.y) || 0;
    obj1.z += (obj2.z) || 0;
}

function angle(x, y) {
    return Math.atan2(y, x) + Math.PI;
}

function boundify(pos, bound_size) {
    var x1 = bound_size - 3;
    var x2 = x1 * -1;

    var y1 = bound_size - 2;
    var y2 = y1 * -1;
    if (pos.x > x1) {
        pos.x = x1;
    } else if (pos.x < x2) {
        pos.x = x2;
    }

    if (pos.y > y1) {
        pos.y = y1;
    } else if (pos.y < y2) {
        pos.y = y2;
    }
}

function copyVector(obj) {
    var ret = {};
    ret.x = obj.x;
    ret.y = obj.y;
    ret.z = obj.z;
    return ret;
}

function getDiff(elastic) {
    if (elastic < 1) elastic = 1;
    var goal = copyVector(scene.camTarget);
    var diff = {
        x: (goal.x - baseline.x) / elastic,
        y: (goal.y - baseline.y) / elastic,
        z: (goal.z - baseline.z) / elastic
    };
    return diff;
}

function pythagorean(x, y) {
    return Math.sqrt(x * x + y * y);
}

function vector(pos) {
    return new BABYLON.Vector3(pos.x, pos.y, pos.z);
}

function twoPoint(x1, y1, x2, y2, x) {
    var min = Math.min(y1, y2);
    var max = Math.max(y1, y2);
    var result = y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
    if (result < min) return min;
    if (result > max) return max;
    return result;
}
