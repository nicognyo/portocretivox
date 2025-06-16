"use client";

import React, { useState, useRef, useEffect, useDebugValue } from "react";
import Link from "next/link";

import "./menu.css";

import { gsap } from "gsap/gsap-core";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);
import { useGSAP } from "@gsap/react";

  const menuLinks = [
      { path : "/", label: "Home"},
      { path : "/", label: "Project"},
      { path : "/about", label: "About"},
      { path : "/", label: "Contact"},
      { path : "/", label: "Lab"},
];

const Menu = () => {
    const container= useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLinkClick = () => {
      setIsMenuOpen(false); // tutup menu setelah klik link
    };

    const tl = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    useGSAP(() => {
        const overlay = document.querySelector(".menu-overlay");
        const links = document.querySelectorAll(".menu-link-item-holder");
      
        gsap.set(links, { y: 75 });
        gsap.set(".menu-close", { autoAlpha: 0, y: -20 });
      
        tl.current = gsap
          .timeline({
            paused: true,
            onStart: () => {
              overlay.style.pointerEvents = "auto";
            },
            onReverseComplete: () => {
              overlay.style.pointerEvents = "none";
            },
          })

          .to(".menu-overlay", {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
          })
          .to(".menu-link-item-holder", {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.inOut",
            delay: -0.75,
          })
          .to(
            ".menu-close",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.8"
          ); // muncul sebelum akhir animasi
      }, { scope: container });

      useEffect(() => {
        gsap.fromTo(
          ".page-content-hero h1",
          { autoAlpha: 0, y: 50 },{
            autoAlpha: 1,
            y: -50,
            duration: 1,
            ease: "bounce",
            delay: 0.3, // bisa kamu sesuaikan
          }
        );
      });

      useEffect(() => {
        gsap.fromTo(
          ".menu-logo-main a",
          { y: -100, text: "" },
          {
            y: 0,
            text: "Nicoding",
            duration: 1,
            ease: "power2.inOut",
          }
        );
        }, []);
      
useEffect(() => {
    if (isMenuOpen) {
        tl.current.play();
    } else {
        tl.current.reverse();
        // Matikan pointer events setelah animasi reverse selesai
        setTimeout(() => {
            document.querySelector(".menu-overlay").style.pointerEvents = "none";
        }, 1300); 
    }
}, [isMenuOpen]);


    return (
      <div className="menu-container" ref={container}>
        <div className="menu-bar">
          <div className="menu-logo-main">
            <Link href="/">Nicoding</Link>
          </div>
          <div className="menu-open" onClick={toggleMenu}>
            <p>Menu</p>
          </div>
        </div>
        <div className="menu-overlay">
          <div className="menu-overlay-bar"></div>
          <div className="menu-logo">
            <Link href="/">Nicoding</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>&#10005;</p>
          </div>
          <div className="menu-close-icon">
            <p>&#x2751;</p>
          </div>
          <div className="menu-copy">
            <div className="menu-links">
              {menuLinks.map((link, index) => (
                <div className="menu-link-item" key={index}>
                  <div className="menu-link-item-holder">
                    <Link href={link.path} className="menu-link" onClick={handleLinkClick}>
                    
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="menu-info">
              <div className="menu-info-col">
                <a href="#">X &#8599;</a>
                <a href="#">Instagram &#8599;</a>
                <a href="#">LinkedIn &#8599;</a>
                <a href="#">Facebook &#8599;</a>
                <a href="#">Github &#8599;</a>
              </div>
              <div className="menu-info-col">
                <p>gnniyo345@gmail.com</p>
                <p>0858-8242-8644</p>
              </div>
            </div>
          </div>
          <div className="menu-preview">
            <p></p>
          </div>
        </div>
      </div>
    );
};

export default Menu;