"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PanoramaBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Create Geometry (Inverted Sphere)
    // This creates a ball around the camera, and we paste the image on the inside.
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    // Invert the geometry so the image is visible from the inside
    geometry.scale(-1, 1, 1);

    // 3. Load Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/media/panorama.png');
    
    // Fixes the "Mipmap" errors for non-power-of-two images
    texture.minFilter = THREE.LinearFilter; 
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false; 

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Animation Loop (Slow Rotation)
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the sphere slowly to simulate camera movement
      mesh.rotation.y += 0.0006; 
      renderer.render(scene, camera);
    };
    animate();

    // 5. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        // The Console Edition Blur Effect
        filter: 'blur(4px) scale(1.02)' 
      }} 
    />
  );
}