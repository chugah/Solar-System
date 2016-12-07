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
	// var camera = new BABYLON.TouchCamera('camera', BABYLON.Vector3.Zero(), scene); applies to mobile devices

	//Let user move the camera
	camera.attachControl(canvas);
	camera.upperRadiusLimit = 100; // not needed for TouchCamera when used on mobile devices
	
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
	planet1.orbit = {
		radius: planet1.position.x,
		speed: 0.01,
		angle: 0
	};

	var planet2 = BABYLON.Mesh.CreateSphere('planet2', 16, 1, scene);
	planet2.position.x = 6;
	planet2.material = planetMaterial;
	planet2.orbit = {
		radius: planet2.position.x,
		speed: -0.01,
		angle: 0
	};

	var planet3 = BABYLON.Mesh.CreateSphere('planet3', 16, 1, scene);
	planet3.position.x = 8;
	planet3.material = planetMaterial;
	planet3.orbit = {
		radius: planet3.position.x,
		speed: 0.02,
		angle: 0
	};

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

	// enable animate or movement of planets
	scene.beforeRender = function() {
		planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
		planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
		planet1.orbit.angle += planet1.orbit.speed;

		planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
		planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
		planet2.orbit.angle += planet2.orbit.speed;

		planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
		planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
		planet3.orbit.angle += planet3.orbit.speed;
	};


	// render the scene
	engine.runRenderLoop(function(){
		scene.render();
	});

	// listen for browser resize event 
	window.addEventListener('resize', function () {
		engine.resize();
	});
};
