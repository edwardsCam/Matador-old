function drawWalls(scene) {
    var max = scene.bounds.size;
    var min = scene.bounds.size * -1;
    var len = scene.bounds.len;
    
    BABYLON.Mesh.CreateLines("wall_ne", [
        new BABYLON.Vector3(max, max, min), new BABYLON.Vector3(max, max, len)
    ], scene);
    BABYLON.Mesh.CreateLines("wall_se", [
        new BABYLON.Vector3(max, min, min), new BABYLON.Vector3(max, min, len)
    ], scene);
    BABYLON.Mesh.CreateLines("wall_sw", [
        new BABYLON.Vector3(min, min, min), new BABYLON.Vector3(min, min, len)
    ], scene);
    BABYLON.Mesh.CreateLines("wall_nw", [
        new BABYLON.Vector3(min, max, min), new BABYLON.Vector3(min, max, len)
    ], scene);
}

function drawMilestones(scene, num_milestones) {
    var max = scene.bounds.size;
    var min = scene.bounds.size * -1;
    var len = scene.bounds.len;
    var dist = len / num_milestones;

    for (var i = 1; i <= num_milestones; i++) {
        var pos = i * dist;
        BABYLON.Mesh.CreateLines("milestones", [
            new BABYLON.Vector3(min, min, pos),
            new BABYLON.Vector3(max, min, pos),
            new BABYLON.Vector3(max, max, pos),
            new BABYLON.Vector3(min, max, pos),
            new BABYLON.Vector3(min, min, pos)
        ], scene);
    }
}
