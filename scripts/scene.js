var initted = false;

function createScene() {
    if (initted) return;

    var scene = new BABYLON.Scene(engine);
    var globalView = null;
    var turnDamp = 8;
    var movespeed = 0.3;
    var mousePos = {};

    setSceneVars();

    scene.tick = function() {
        var delta = (1 / engine.getFps());
        scene.time += delta;
        moveCamera();
        getMouseInput();
        draw();
    };

    function moveCamera() {
        scene.camera.position.z += movespeed;
        scene.camTarget.z += movespeed;
    }

    function getMouseInput() {
        mousePos.x = scene.pointerX - globalView.width / 2;
        mousePos.y = globalView.height / 2 - scene.pointerY;
        turnCamera();

        function turnCamera() {
            scene.camTarget.x = mousePos.x / turnDamp;
            scene.camTarget.y = mousePos.y / turnDamp;
            setCamTarget();
        }
    }

    function draw() {
        return sineWave(scene);
    }

    function setCamTarget() {
        scene.camera.setTarget(scene.camTarget);
    }

    function setSceneVars() {
        scene.camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene);
        scene.camera.attachControl(canvas, true);
        scene.camTarget = new BABYLON.Vector3(0, 0, 100);

        scene.time = 0;
        scene.bounds = {};
        scene.bounds.size = 50;
        scene.bounds.len = 1000;

        globalView = scene.camera.viewport.toGlobal(engine);
        scene.maxPointerPos = globalView.width / (turnDamp * 2);
        setCamTarget();
    }

    drawWalls(scene);
    drawMilestones(scene, 5);

    initted = true;
    return scene;
}
