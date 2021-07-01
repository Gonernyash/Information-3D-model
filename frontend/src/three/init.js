import * as THREE from 'three';
import {Interaction} from 'three.interaction';
import InfoModel from './classes/InfoModel';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GUIInit} from './GUI';

const cameraZoom = 200

let infoModel;
let container;
let SCENE;
let CAMERA;
let RENDERER;
let CONTROLS;

function init() {
    sceneInit();
    console.log(SCENE);
    infoModel = new InfoModel(SCENE, CAMERA, RENDERER);
    new Interaction(RENDERER, SCENE, CAMERA);
    setOrbitControls();
    GUIInit();
}   

//Подготовка сцены
function sceneInit() {
    container = document.getElementById('WebGL-Output');
    const sceneWidth = container.offsetWidth;
    const sceneHeight = window.innerHeight / (window.innerWidth / sceneWidth);
    SCENE = new THREE.Scene();
    CAMERA = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight , 0.1, 1000);
    CAMERA.position.set(cameraZoom, cameraZoom, cameraZoom);
    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setClearColor(0xEEEEEE, 1);
    RENDERER.setSize(sceneWidth, sceneHeight);
}

//Добавление возможности вращения/приближения камеры
function setOrbitControls() {
    CONTROLS = new OrbitControls(CAMERA, container);
    CONTROLS.update();
    CONTROLS.autoRotateSpeed = 1;
    CONTROLS.autoRotate = true;
    CONTROLS.enableRotate = false;
    CONTROLS.enableZoom = false;
}

export default init;
export {infoModel, container, SCENE, CAMERA, RENDERER, CONTROLS}