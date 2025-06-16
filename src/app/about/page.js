"use client";
import React, { useEffect, useRef, useLayoutEffect} from "react";
import "./page.about.css";
import { gsap } from "gsap/gsap-core";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(TextPlugin, ScrollTrigger);
gsap.registerPlugin(TextPlugin);

export default function About() {
  const textContentRefs = useRef([]);
  const imageContentRefs = useRef([]);
  const skillBarRefs = useRef([]);
  const h2Ref = useRef(null); 
  const footerRef = useRef(null);
  const socialIconRefs = useRef([]);
  const copyrightRef = useRef(null);

  useLayoutEffect(() => {
    // Animasi untuk text dan image content
    textContentRefs.current.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    imageContentRefs.current.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Animasi skill bar (progress)
    skillBarRefs.current
      .filter(Boolean) // hilangkan null
      .forEach((bar) => {
        const targetWidth = bar.dataset.width;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            width: targetWidth,
            duration: 2,
            ease: "power2.out",
          }
        );
      });
  }, []);
  

  useLayoutEffect(() => {
    if (h2Ref.current) {
      const texts = ["Nico Genniyo", "Web Developer", "Pecinta Wanita"];
      let index = 0;

      const animateText = () => {
        const fullText = texts[index];
        h2Ref.current.textContent = "Halo I'm "; // Tetap statis tanpa animasi

        // Animasi mengetik bagian dinamis
        gsap.fromTo(
          h2Ref.current,
          { text: "Halo I'm " },
          {
            text: `Halo I'm ${fullText}`,
            duration: 2, // Durasi mengetik diperpanjang menjadi 2 detik
            ease: "power1.out", // Transisi smooth
            onUpdate: () => {
              const currentText = gsap.getProperty(h2Ref.current, "text");
              const dynamicPartLength = currentText.length - 8; // 8 adalah panjang "Halo I'm "
              if (dynamicPartLength >= 0) {
                h2Ref.current.textContent =
                  "Halo I'm " + fullText.substring(0, dynamicPartLength);
              }
            },
            onComplete: () => {
              // Jeda 1 detik setelah mengetik
              setTimeout(() => {
                // Animasi menghapus dari belakang
                gsap.to(h2Ref.current, {
                  text: "Halo I'm ",
                  duration: 2, // Durasi menghapus sama dengan mengetik (2 detik)
                  ease: "power1.in", // Transisi smooth
                  onUpdate: () => {
                    const currentText = gsap.getProperty(h2Ref.current, "text");
                    const dynamicPartLength = currentText.length - 8;
                    if (dynamicPartLength >= 0) {
                      h2Ref.current.textContent =
                        "Halo I'm " + fullText.substring(0, dynamicPartLength);
                    } else {
                      h2Ref.current.textContent = "Halo I'm ";
                    }
                  },
                  onComplete: () => {
                    index = (index + 1) % texts.length; // Pindah ke teks berikutnya
                    setTimeout(animateText, 1000); // Jeda 1 detik sebelum animasi berikutnya
                  },
                });
              }, 1000); // Jeda 1 detik setelah mengetik selesai
            },
          }
        );
      };

      // Mulai animasi pertama
      animateText();
    }
  }, []);

  useLayoutEffect(() => {
    console.log("Icons: ", socialIconRefs.current);
    // Footer NICODING teks
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Social icons - muncul staggered
    gsap.from(socialIconRefs.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      },
      duration: 1,
      y: 20,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Copyright text
    gsap.from(copyrightRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      },
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="pageContent">
      <div className="contentSection">
        <div
          className="textContent"
          ref={(el) => textContentRefs.current.push(el)}
        >
          <h2 ref={h2Ref}></h2> {/* H2 pertama dengan ref untuk animasi */}
          <p>
            Saya adalah seorang mahasiswa aktif semester 6 di Universitas Bina
            Sarana Informatika, Program Studi Sistem Informasi. Saya memiliki
            minat yang kuat dalam dunia teknologi informasi, khususnya di bidang
            pemrograman, pengembangan web, dan manajemen basis data. Selama masa
            studi, saya aktif mempelajari berbagai teknologi dan framework yang
            digunakan dalam pengembangan perangkat lunak modern. Saya senang
            mengeksplorasi solusi digital yang efisien dan mudah digunakan, baik
            untuk kebutuhan bisnis maupun personal.
          </p>
        </div>
        <div
          className="imageContent"
          ref={(el) => imageContentRefs.current.push(el)}
        >
          <img src="/pp.jpg" alt="Placeholder 1" />
        </div>
      </div>
      <div className="contentSection">
        <div
          className="imageContent"
          ref={(el) => imageContentRefs.current.push(el)}
        >
          <img src="/kopi.jpg" alt="Placeholder 2" />
        </div>
        <div
          className="textContent"
          ref={(el) => textContentRefs.current.push(el)}
        >
          <h2>My Journey</h2>
          <p>
            Saya memiliki kompetensi dalam berbagai bahasa pemrograman seperti
            HTML, CSS, JavaScript, PHP, Python, serta pengelolaan data
            menggunakan SQL. Dalam pengembangan antarmuka web, saya terbiasa
            menggunakan Tailwind CSS untuk desain responsif dan efisien. Untuk
            sisi backend, saya menguasai framework CodeIgniter dan Laravel,
            sementara di sisi frontend dan fullstack modern saya aktif mendalami
            React.js dan Next.js. Selain itu, saya juga terbiasa menggunakan
            Figma dan Canva untuk mendesain antarmuka serta kebutuhan visual
            lainnya dalam pengembangan proyek digital. Kombinasi kemampuan ini
            mendukung saya dalam membangun aplikasi web yang fungsional,
            estetik, dan terstruktur dengan baik.
          </p>
        </div>
      </div>
      <div className="skillsSection">
        <h2>My Skills</h2>
        {[
          { label: "Web Developer", width: "90%" },
          { label: "UI/UX Designer", width: "85%" },
          { label: "System Analyst", width: "80%" },
        ].map((skill, i) => (
          <div className="skillItem" key={i}>
            <p>{skill.label}</p>
            <div className="skillBar">
              <div
                className="skillProgress"
                ref={(el) => (skillBarRefs.current[i] = el)}
                data-width={skill.width}
              ></div>
            </div>
            <span>{skill.width}</span>
          </div>
        ))}
      </div>
      <footer className="footer">
        <div className="footerLeft">
          <p ref={footerRef}>NICODING</p>
        </div>
        <div className="footerRight">
          <div className="socialIcons">
            {[
              "/ig-icon.png",
              "/linkedin-icon.png",
              "/github-icon.png",
              "/fb-icon.png",
            ].map((src, idx) => (
              <a href="#" key={idx} aria-label={`Icon ${idx}`}>
                <img
                  src={src}
                  alt={`Icon ${idx}`}
                  ref={(el) => {
                    if (el && !socialIconRefs.current.includes(el)) {
                      socialIconRefs.current.push(el);
                    }
                  }}
                />
              </a>
            ))}
          </div>
          <p ref={copyrightRef}>Copyright 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}