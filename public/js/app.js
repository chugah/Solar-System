/// <reference path="babylon.2.1.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function(){
	//get the canvas
	var canvas = document.getElementById('renderCanvas');
	
	//create a BabylonJS engine object
	var engine = new BABYLON.Engine(canvas, true);
	
	//create scene
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 0, 0);

	//create camera
	var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, BABYLON.Vector3.Zero(), scene);

	//Let user move the camera
	camera.attachControl(canvas);
	camera.upperRadiusLimit = 100;
	
	// light
	var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.5;
	light.groundColor = new BABYLON.Color3(0, 0, 1);

	// Create the sun and sunlight
	var sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
	sunMaterial.emissiveTexture = new BABYLON.Texture('images/sun.jpg', scene);
	sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

	var sun = BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
	sun.material= sunMaterial;

	var sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
	sunLight.intensity = 2;

	// adding planets to the solar system
	var planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);
	planetMaterial.diffuseTexture = new BABYLON.Texture('images/sand.jpg', scene);
	planetMaterial.specularColor = new BABYLON.Color3(0, 0 ,0);
	
	var planet1 = BABYLON.Mesh.CreateSphere('planet1', 16, 1, scene);
	planet1.position.x = 4;
	planet1.material = planetMaterial;

	// create skybox for background
	var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);

	// don't render beyond background box
	skyboxMaterial.backFaceCulling = false;

	// move background box with camera
	skybox.infiniteDistance = true; 

	skybox.material = skyboxMaterial;

	// remove any unwanted reflection in background box
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

	// texture of each side of background box 
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('images/skybox', scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

	// render the scene
	engine.runRenderLoop(function(){
		scene.render();
	});

	// listen for browser resize event 
	window.addEventListener('resize', function () {
		engine.resize();
	});
};
