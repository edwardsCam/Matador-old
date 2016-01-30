function addPosObjects(obj1, obj2) {
    var ret = {};
    ret.x = obj1.x + obj2.x;
    ret.y = obj1.y + obj2.y;
    ret.z = obj1.z + obj2.z;
    return ret;
}

function boundify(pos, bounds) {
    var x1 = bounds.size - 3;
    var x2 = x1 * -1;

    var y1 = bounds.size - 2;
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

function copyPosObject(obj) {
    var ret = {};
    ret.x = obj.x;
    ret.y = obj.y;
    ret.z = obj.z;
    return ret;
}
