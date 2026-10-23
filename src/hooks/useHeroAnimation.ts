import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  background: RefObject<HTMLElement | null>;
  overlay: RefObject<HTMLElement | null>;
  content: RefObject<HTMLElement | null>;
  title: RefObject<HTMLElement | null>;
  subtitle: RefObject<HTMLElement | null>;
  meta: RefObject<HTMLElement | null>;
  hint: RefObject<HTMLElement | null>;
};

export function useHeroAnimation(refs: HeroRefs) {
  useLayoutEffect(() => {
    const section = refs.section.current;
    const background = refs.background.current;
    const overlay = refs.overlay.current;
    const content = refs.content.current;
    const title = refs.title.current;
    const subtitle = refs.subtitle.current;
    const meta = refs.meta.current;
    const hint = refs.hint.current;

    if (!section || !background || !content) return;

    const mm = gsap.matchMedia();
    let cancelled = false;

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([background, overlay, content, title, subtitle, meta, hint], {
        clearProps: "all",
      });
    });

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(background, { scale: 1.08, yPercent: 0 });
        gsap.set(overlay, { opacity: 0.18 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.addLabel("entrance", 0)
          .to(background, { scale: 1.22, yPercent: -6 }, "entrance")
          .to(overlay, { opacity: 0.55 }, "entrance")
          .to(title, { y: -40 }, "entrance")
          .to(subtitle, { y: -28, opacity: 0.32 }, "entrance")
          .to(
            meta,
            { scale: 0.96, opacity: 0.72, transformOrigin: "left center" },
            "entrance"
          )
          .to(hint, { opacity: 0, y: 16 }, "entrance")
          .addLabel("transition", 0.55)
          .to(content, { y: -72, opacity: 0.12 }, "transition");

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    mm.add(
      "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(background, { scale: 1.05 });
        gsap.set(overlay, { opacity: 0.16 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 0.7)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(background, { scale: 1.14, yPercent: -3 }, 0)
          .to(overlay, { opacity: 0.4 }, 0)
          .to(title, { y: -22 }, 0)
          .to(subtitle, { y: -14, opacity: 0.45 }, 0)
          .to(meta, { opacity: 0.8 }, 0)
          .to(hint, { opacity: 0 }, 0)
          .to(content, { y: -36, opacity: 0.35 }, 0.5);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(background, { scale: 1.04 });

        const tween = gsap.to(background, {
          scale: 1.1,
          yPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);
}
