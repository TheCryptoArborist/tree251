"use client";
import dynamic from "next/dynamic";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Home, statuses } from "@/lib/halloween";
import styles from "./halloween.module.css";
const Map = dynamic(() => import("./NeighborhoodMap"), { ssr: false, loading: () => <p className={styles.loading}>Loading the neighborhood map…</p> });
const key = "cromwell-halloween-2026";
type Saved = Record<string, string>;
export default function HalloweenPage() {
  const [homes, setHomes] = useState<Home[]>([]), [saved, setSaved] = useState<Saved>({});
  const [loading, setLoading] = useState(true), [error, setError] = useState(""), [message, setMessage] = useState("");
  const [form, setForm] = useState(false), [editing, setEditing] = useState<Home | null>(null), [busy, setBusy] = useState(false);
  const [point, setPoint] = useState<[number, number] | null>(null), [filter, setFilter] = useState("all"), [editLink, setEditLink] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await fetch("/api/halloween", { cache: "no-store" }); const b = await r.json(); if (!r.ok) throw new Error(b.error); setHomes(b.homes); setError(""); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to load homes."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    let tokens: Saved = {};
    try { tokens = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
    const p = new URLSearchParams(location.hash.slice(1)); const id = p.get("house"), token = p.get("edit");
    if (id && token && /^[a-f0-9]{64}$/.test(token)) { tokens[id] = token; history.replaceState(null, "", location.pathname); }
    setSaved(tokens); try { localStorage.setItem(key, JSON.stringify(tokens)); } catch {}
    void load();
  }, [load]);
  function chooseLocation() { document.getElementById("neighborhood-map")?.scrollIntoView({ behavior: "smooth", block: "center" }); }
  function start(h?: Home) { setEditing(h || null); setPoint(h ? [h.lat, h.lng] : null); setForm(true); setMessage(""); setEditLink(""); setTimeout(() => document.getElementById(h ? "house-form" : "neighborhood-map")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0); }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const fields = new FormData(e.currentTarget); if (!point) { setMessage("One step left: tap your home on the map to place your pin, then return to this form."); chooseLocation(); return; }
    setBusy(true); setMessage("");
    try {
      const r = await fetch("/api/halloween", { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json", ...(editing ? { Authorization: `Bearer ${saved[editing.id]}` } : {}) }, body: JSON.stringify({ id: editing?.id, address: fields.get("address"), lat: point[0], lng: point[1], status: fields.get("status"), hours: fields.get("hours"), notes: fields.get("notes"), website: fields.get("website"), consent: fields.get("consent") === "on" }) });
      const b = await r.json(); if (!r.ok) throw new Error(b.error);
      const token = b.token || (editing && saved[editing.id]);
      if (token) {
        const next = { ...saved, [b.home.id]: token }; setSaved(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
        setEditLink(`${location.origin}/halloween#house=${b.home.id}&edit=${token}`);
      }
      setHomes(prev => [...prev.filter(h => h.id !== b.home.id), b.home].sort((a,b) => a.address.localeCompare(b.address)));
      setForm(false); setPoint(null); setMessage(editing ? "Your house has been updated." : "Your pumpkin is on the map! Save your private edit link below."); setEditing(null);
    } catch (e) { setMessage(e instanceof Error ? e.message : "Unable to save."); } finally { setBusy(false); }
  }
  async function remove() {
    if (!editing || !confirm("Remove your house from the Halloween map?")) return;
    setBusy(true);
    try { const r = await fetch("/api/halloween", { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${saved[editing.id]}` }, body: JSON.stringify({ id: editing.id }) }); const b = await r.json(); if (!r.ok) throw new Error(b.error); setHomes(h => h.filter(x => x.id !== editing.id)); setForm(false); setPoint(null); setMessage("Your house has been removed."); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Unable to remove."); } finally { setBusy(false); }
  }
  async function copy(text: string) { try { await navigator.clipboard.writeText(text); setMessage("Link copied."); } catch { setMessage("Copy this link from the field below."); setEditLink(text); } }
  const shown = homes.filter(h => filter === "all" || h.status === filter);
  return <div className={styles.page}>
    <header className={styles.hero}><div className={styles.eyebrow}>A little neighborhood magic · Mobile, Alabama</div><div className={styles.pumpkin}>🎃</div><h1>Cromwell Place<br /><em>Trick-or-Treat Trail</em></h1><p>Porch lights on. Costumes ready.<br />Find your candy stops and let the neighbors know you’re joining in.</p><div className={styles.date}>Saturday, October 31, 2026 <span>· Hours to be determined</span></div><div className={styles.actions}><button onClick={() => start()}>🎃 Add my house</button><button className={styles.secondary} onClick={() => copy(`${location.origin}/halloween`)}>Share neighborhood link ↗</button></div></header>
    <div className={styles.content}><div className={styles.intro}><div><div className={styles.eyebrow}>Follow the pumpkins</div><h2>Our neighborhood candy map</h2></div><strong>{homes.filter(h => h.status !== "out").length} participating {homes.filter(h => h.status !== "out").length === 1 ? "home" : "homes"}</strong></div>
    <p className={styles.help}>Only homes that sign up appear here. Tap a pumpkin for details. {form && !editing ? <b>Use + Zoom in to find your house, then tap it to place the red pin. You can also scroll or pinch to zoom.</b> : "Use + Zoom in for house-level detail. Scroll your mouse wheel or pinch with two fingers to zoom."}</p>
    <div className={styles.filters}><label>Show <select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All houses</option>{Object.entries(statuses).map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label><button className={styles.textButton} onClick={() => void load()} disabled={loading}>{loading ? "Refreshing…" : "Refresh map ↻"}</button></div>
    {error && <div className={styles.notice} role="alert">{error} <button onClick={() => void load()}>Retry</button></div>}
    <div id="neighborhood-map" className={styles.map}><Map homes={shown} point={point} onOutside={() => setMessage("Please choose a home inside the dashed neighborhood boundary.")} onPick={form && !editing ? (lat,lng) => { setPoint([lat,lng]); setMessage("Location selected. Complete the form below to add your pumpkin."); } : undefined} /></div>
    <div className={styles.legend}><span>🎃 Participating</span><span>⚪ Gray pumpkin = finished</span><span>📍 Your selected location</span></div>
    <div className={styles.notice} role="status" hidden={!message}>{message}</div>
    {editLink && <div className={styles.editLink}><strong>Keep this private edit link</strong><p>Anyone with this link can change your house listing. Bookmark it for another device.</p><input readOnly aria-label="Private edit link" value={editLink} onFocus={e => e.currentTarget.select()} /><button onClick={() => copy(editLink)}>Copy edit link</button></div>}
    {form && <section id="house-form" className={styles.formCard} key={editing?.id || "new"}><div className={styles.eyebrow}>{editing ? "Your porch, your plans" : "Join the trail"}</div><h2>{editing ? "Manage your house" : "Put your pumpkin on the map"}</h2><p>{editing ? "Change your hours, notes, or participation status below." : point ? "Location selected ✓ — check that the red pin is on your home." : "First, tap your home on the map above. Zoom in for a more accurate pin."}</p>{!editing && <div className={styles.locationStep}><strong>{point ? "✓ Home location selected" : "Step 1: Choose your home on the map"}</strong><p>{point ? "Your red pin is ready. Complete the details below." : "An address alone does not place a pin. Tap your home on the map, then complete the details below."}</p><button type="button" className={styles.secondary} onClick={chooseLocation}>{point ? "Adjust my pin on the map" : "Choose my home on the map ↑"}</button></div>}<form onSubmit={submit}>
      <label>House number and street<input name="address" required maxLength={110} placeholder="123 Example Drive" defaultValue={editing?.address} readOnly={!!editing} autoComplete="street-address" /></label>
      <label>What’s on your porch?<select name="status" defaultValue={editing?.status || "candy"}>{Object.entries(statuses).map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></label>
      <label>Candy hours <span>(optional)</span><input name="hours" maxLength={80} placeholder="To be determined" defaultValue={editing?.hours} /></label>
      <label>Note for the neighbors <span>(optional)</span><textarea name="notes" maxLength={300} placeholder="Treats on the front porch, non-candy goodies available…" defaultValue={editing?.notes} /></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {!editing && <label className={styles.check}><input type="checkbox" name="consent" required /><span>I live here or have permission to list this home. I understand its address, map pin, hours, and notes will be visible to anyone with the neighborhood link.</span></label>}
      <div className={styles.actions}><button disabled={busy} aria-busy={busy}>{busy ? "Saving…" : editing ? "Save changes" : "Add my pumpkin"}</button><button type="button" className={styles.secondary} onClick={() => { setForm(false); setPoint(null); }}>Cancel</button>{editing && <button type="button" className={styles.danger} disabled={busy} onClick={() => void remove()}>Remove my house</button>}</div>
    </form></section>}
    <section className={styles.list}><h2>Meet the candy stops</h2>{loading && !homes.length ? <p>Loading participating homes…</p> : !error && !shown.length ? <p>{homes.length ? "No houses match this filter." : "The trail starts with you. Be the first neighbor to add a pumpkin!"}</p> : null}<div className={styles.cards}>{shown.map(h => <article key={h.id}><span className={styles.cardIcon}>{h.status === "out" ? "🌙" : "🎃"}</span><div><h3>{h.address}</h3><strong>{statuses[h.status]}</strong><p>{h.hours || "Hours to be determined"}</p>{h.notes && <p>{h.notes}</p>}{saved[h.id] && <button onClick={() => start(h)}>Manage my house</button>}</div></article>)}</div></section>
    <footer className={styles.footer}><h3>A happy Halloween starts with good neighbors.</h3><p>Listings are added by residents and may change. Check porch lights and household notes before approaching. Please list only your own home or a home you have permission to add.</p><p>No names, phone numbers, or children’s details needed. This page is accessible to anyone with the link; it is not a private neighborhood directory.</p><small>A community page hosted by Tree251 · Cromwell Place, Mobile, Alabama</small></footer></div>
  </div>;
}
