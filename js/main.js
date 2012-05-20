require(["util/domReady!", // Waits for page load
	"model"
], function(doc) {

    "use strict";

	// create the 3d engine
	var engine = new CL3D.CopperLicht('3darea');
	
	if (!engine.initRenderer())
		return; // this browser doesn't support WebGL
		
	// add a new 3d scene
	var scene = new CL3D.Scene();
	engine.addScene(scene);
	
	scene.setBackgroundColor(CL3D.createColor(1, 0, 0, 64));
	
	// add our own scene node
	var mynode = new JSONNode(engine, "root/model/cube.js");
	scene.getRootSceneNode().addChild(mynode);
	mynode.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 0.6, 0.8)));
	
						
	// add a user controlled camera with a first person shooter style camera controller
	var cam = new CL3D.CameraSceneNode();
	cam.Pos.X = 50;
	cam.Pos.Y = 20;
	
	var animator = new CL3D.AnimatorCameraFPS(cam, engine);										
	cam.addAnimator(animator);										
	animator.lookAt(new CL3D.Vect3d(0,20,0));			
	
	scene.getRootSceneNode().addChild(cam);
	scene.setActiveCamera(cam);

	
});
