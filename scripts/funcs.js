pi2 = Math.PI * 2;

function addVectors(obj1, obj2) {
    obj1.x += (obj2.x) || 0;
    obj1.y += (obj2.y) || 0;
    obj1.z += (obj2.z) || 0;
}

function angle(arg1, arg2) {
    if (arg2) {
        return Math.atan2(arg2, arg1) + Math.PI;
    }
    return angle(arg1.x, arg1.y);
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

function flipX(obj) {
    var ret = copyVector(obj);
    ret.x *= -1;
    return ret;
}

function flipY(obj) {
    var ret = copyVector(obj);
    ret.y *= -1;
    return ret;
}

function getDiff(elastic) {
    if (!elastic || elastic < 1) elastic = 1;
    var goal = copyVector(scene.camTarget);
    var diff = {
        x: (goal.x - baseline.x) / elastic,
        y: (goal.y - baseline.y) / elastic,
        z: (goal.z - baseline.z) / elastic
    };
    return diff;
}

function getSpeed(elastic) {
    return pythagorean(getDiff(elastic));
}

function pythagorean(arg1, arg2) {
    if (arg2) {
        return Math.sqrt(arg1 * arg1 + arg2 * arg2);
    }
    return pythagorean(arg1.x, arg1.y);
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

function buildSegment(arr) {
    var points = [];
    for (var i = 0; i < arr.length; i++) {
        points.push(vector(arr[i]));
    }
    return points;
}

function buildSegments() {
    var lines = [];
    for (var i = 0; i < arguments.length; i++) {
        lines.push(buildSegment(arguments[i]));
    }
    return lines;
}
