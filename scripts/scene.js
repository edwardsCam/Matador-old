var initted = false;

function createScene() {
    if (initted) return;

    var scene = new BABYLON.Scene(engine);
    var globalView = null;
    var turnDamp = 8;
    var movespeed = 1.5;
    var mousePos = {};

    var cycle = 0;
    var maxCycle = 3;
    var hitRegistered = false;

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

    function onKeyDown(evt) {
        if (!hitRegistered && evt.keyCode == 32) {
            hitRegistered = true;
            if ((++cycle) > maxCycle) cycle = 0;
        }
    }

    function onKeyUp(evt) {
        if (hitRegistered) {
            hitRegistered = false;
        }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function draw() {
        switch (cycle) {
            case 0:
                return sineWave(scene);
            case 1:
                return flyingTunnel(scene);
            case 2:
                return chevron(scene)
            default:
                return flappingChevron(scene);
        }
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
