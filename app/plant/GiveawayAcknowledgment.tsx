"use client";

import { useEffect, useRef, useState } from "react";
import "./giveaway-acknowledgment.css";

type PlaybackIntent = "auto" | "play" | "pause";

/** A factual event acknowledgment; never an endorsement of The Arborist. */
export default function GiveawayAcknowledgment() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const intent = useRef<PlaybackIntent>("auto");
  const syncPlayback = useRef<() => void>(() => undefined);
  const allowRetry = useRef<() => void>(() => undefined);
  const [enhanced, setEnhanced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Silent video · 11 seconds");

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    let active = true;
    let visible = false;
    let blocked = false;
    let printing = false;
    let pending = false;
    let generation = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; addEventListener?: (name: string, fn: () => void) => void; removeEventListener?: (name: string, fn: () => void) => void };
    }).connection;
    video.muted = true;
    video.defaultMuted = true;
    setEnhanced(true);

    const mayPlay = () => active && visible && !document.hidden && !printing && !blocked &&
      intent.current !== "pause" &&
      (intent.current === "play" || (!motion.matches && !connection?.saveData));

    function stop() {
      generation += 1;
      pending = false;
      video!.pause();
      if (active) setLoading(false);
    }
    function sync() {
      if (!active) return;
      // Reduced-motion visitors can explicitly play once, but do not receive a loop.
      video!.loop = !motion.matches;
      if (!mayPlay()) { stop(); return; }
      if (!video!.paused || pending) return;
      pending = true;
      const request = ++generation;
      setLoading(true);
      // play() is called synchronously from the button handler when explicitly requested.
      const attempt = video!.play();
      attempt.then(() => {
        if (!active) { video!.pause(); return; }
        if (request !== generation || !mayPlay()) { if (!mayPlay()) video!.pause(); return; }
        pending = false;
        setLoading(false);
        setMessage(motion.matches ? "Playing once · No audio" : "Loops while visible · No audio");
      }).catch((error: unknown) => {
        if (!active || request !== generation) return;
        pending = false;
        setLoading(false);
        if (error instanceof DOMException && error.name === "AbortError") return;
        blocked = true;
        setPlaying(false);
        setMessage("Tap Play to watch the silent clip.");
      });
    }
    function updatePreferences() {
      if (motion.matches || connection?.saveData) {
        // A preference changed while playing: require a new explicit Play action.
        if (!video!.paused) intent.current = "pause";
        setMessage(motion.matches ? "Reduced motion is on. Press Play to watch once." : "Data saving is on. Press Play to watch.");
      } else if (intent.current !== "pause") setMessage("Loops while visible · No audio");
      sync();
    }
    const onPlay = () => { if (active) setPlaying(true); };
    const onPause = () => { if (active) setPlaying(false); };
    const onEnded = () => { intent.current = "pause"; if (active) { setPlaying(false); setMessage("Video finished · No audio"); } };
    const beforePrint = () => { printing = true; sync(); };
    const afterPrint = () => { printing = false; sync(); };
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    motion.addEventListener("change", updatePreferences);
    connection?.addEventListener?.("change", updatePreferences);
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        sync();
      }, { threshold: [0, 0.5, 1] });
      observer.observe(frame);
    }
    // Browsers without IntersectionObserver remain tap-to-play rather than auto-running.
    syncPlayback.current = () => {
      if (!observer) visible = true;
      sync();
    };
    allowRetry.current = () => { blocked = false; };
    updatePreferences();
    return () => {
      active = false;
      generation += 1;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
      motion.removeEventListener("change", updatePreferences);
      connection?.removeEventListener?.("change", updatePreferences);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.pause();
      syncPlayback.current = () => undefined;
      allowRetry.current = () => undefined;
    };
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused || loading) {
      intent.current = "pause";
      setMessage("Paused. Press Play to resume.");
    } else {
      intent.current = "play";
      allowRetry.current();
    }
    syncPlayback.current();
  }

  return (
    <section id="giveaway-thanks" className="giveaway-memory container" aria-labelledby="giveaway-memory-title">
      <div className="giveaway-memory-grid">
        <figure>
          <div className="giveaway-video-frame" ref={frameRef}>
            <video id="giveaway-banner-video" ref={videoRef} controls={!enhanced} muted playsInline preload="none" width={512} height={910}
              poster="/plant/event/arbor-day-banner-poster.jpg"
              aria-label="Arbor Day Foundation flag at the Mobile Tree Giveaway, silent video"
              aria-describedby="giveaway-video-caption">
              <source src="/plant/event/arbor-day-banner-silent.mp4" type="video/mp4" />
              The clip shows the Arbor Day Foundation flag moving in the breeze at the Mobile Tree Giveaway.
            </video>
          </div>
          {enhanced && <button className="giveaway-video-toggle" type="button" aria-controls="giveaway-banner-video" onClick={toggleVideo}>
            <span aria-hidden="true">{playing || loading ? "Ⅱ" : "▶"}</span> {playing || loading ? "Pause video" : "Play video"}
          </button>}
          <p className="giveaway-video-status" role="status" aria-live="polite">{message}</p>
          <figcaption id="giveaway-video-caption">The Arbor Day Foundation flag moving in the breeze at the November 6 Mobile Tree Giveaway. This clip has no audio.</figcaption>
        </figure>
        <div>
          <p className="eyebrow">From the Mobile Tree Giveaway</p>
          <h2 id="giveaway-memory-title">A community effort.<br />A growing future.</h2>
          <p className="giveaway-thanks">Thank you to the Alabama Urban Forestry Association, Arbor Day Foundation, and Verizon for helping make the November 6, 2026 tree giveaway possible.</p>
          <ul className="giveaway-logo-panel" aria-label="Organizations involved in the tree giveaway">
            <li><img className="aufa-logo" src="/plant/event/alabama-urban-forestry-association.png" alt="Alabama Urban Forestry Association" width={614} height={157} loading="lazy" decoding="async" /></li>
            <li><img className="adf-logo" src="/plant/event/arbor-day-foundation.png" alt="Arbor Day Foundation" width={467} height={132} loading="lazy" decoding="async" /></li>
            <li><img className="verizon-logo" src="/plant/event/verizon.png" alt="Verizon" width={278} height={73} loading="lazy" decoding="async" /></li>
          </ul>
          <p className="giveaway-closing">Bringing a tree home is the beginning. This guide helps you take the next steps.</p>
        </div>
      </div>
    </section>
  );
}
