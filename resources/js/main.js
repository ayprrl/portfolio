//variables for setup
let container;
let camera;
let renderer;
let scene;
let dinorex;
let mixer;

function init(){
    container = document.querySelector('.scene');
    
    //Create scene
    scene = new THREE.Scene();
    const fov = 75;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    //Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-1,2.5,4.8);

    //Ambient Light
    const ambient = new THREE.AmbientLight(0x404040,2);
    scene.add(ambient);
    //Directional Light
    const directlight = new THREE.DirectionalLight(0xffffff, 2);
    directlight.position.set(10,10,10); 
    scene.add(directlight);
    
    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load('resources/models/trex.gltf', function(gltf){
        const trexmodel = gltf.scene;

        scene.add(trexmodel);
        mixer = new THREE.AnimationMixer(trexmodel);
        const clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, 'trexidleroar');
        const action = mixer.clipAction(clip);

        action.play();
        animate();
        //console.log(gltf); //view gltf data
        
        /*dinorex = gltf.scene.children[2];  //to animate dino on y axis
        animateDino();*/
    });
}

const clock = new THREE.Clock();
function animate(){
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());

    renderer.render(scene, camera);
}
/*function animateDino(){
    requestAnimationFrame(animateDino); 
    dinorex.rotation.y += 0.005; //to animate dino on y axis
    renderer.render(scene, camera);
}*/

init();