var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene();

engine.runRenderLoop(function() {
    scene.tick();
    scene.render();
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});