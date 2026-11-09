"use client";
import { useEffect, useState } from "react";
type Draft = { id: string; prompt: string; mode: "text" | "image"; ratio: string; seconds: string; created: string };
const KEY = "braintechken-studio-drafts-v1";
const EXAMPLES = [{label:"💳 Publicité FIAXY",prompt:"Une carte bancaire virtuelle noire et violette flotte dans un studio fintech futuriste. Reflets premium, particules lumineuses, mouvement de caméra lent, rendu cinématique réaliste, sans texte ajouté."},{label:"🏝️ Voyage",prompt:"Vue aérienne cinématique d’une plage tropicale haïtienne au lever du soleil, vagues turquoise, palmiers en mouvement, travelling fluide, ambiance chaleureuse et réaliste."},{label:"📱 Produit digital",prompt:"Un smartphone élégant tourne lentement dans un décor sombre et lumineux, interface futuriste abstraite, éclairage violet, reflets réalistes, publicité premium, sans texte ajouté."}];
export default function Home() {
  const [prompt,setPrompt] = useState("");
  const [mode,setMode] = useState<"text"|"image">("text");
  const [ratio,setRatio] = useState("9:16");
  const [seconds,setSeconds] = useState("5");
  const [image,setImage] = useState<File|null>(null);
  const [logo,setLogo] = useState<File|null>(null);
  const [drafts,setDrafts] = useState<Draft[]>([]);
  const [ready,setReady] = useState(false);
  const [notice,setNotice] = useState("");
  useEffect(()=>{try {const data=JSON.parse(localStorage.getItem(KEY)||"[]");if(Array.isArray(data))setDrafts(data.slice(0,20));}catch{}setReady(true);},[]);
  function saveDraft(){
    if(!prompt.trim()){setNotice("Ajoute une description de ta vidéo.");return;}
    if(mode==="image"&&!image){setNotice("Ajoute une image de référence.");return;}
    const entry:Draft={id:crypto.randomUUID(),prompt:prompt.trim(),mode,ratio,seconds,created:new Date().toISOString()};
    const next=[entry,...drafts].slice(0,20);
    try{localStorage.setItem(KEY,JSON.stringify(next));setDrafts(next);setNotice("Brouillon enregistré localement. Aucune vidéo n’a été générée.");}
    catch{setNotice("Stockage indisponible : impossible d’enregistrer le brouillon.");}
  }
  function deleteDraft(id:string){const next=drafts.filter(d=>d.id!==id);try{localStorage.setItem(KEY,JSON.stringify(next));setDrafts(next);setNotice("Brouillon supprimé.");}catch{setNotice("Impossible de supprimer le brouillon.");}}
  function pickFile(file:File|undefined,kind:"image"|"logo"){
    if(!file){kind==="image"?setImage(null):setLogo(null);return;}
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>10*1024*1024){setNotice("Utilise une image JPG, PNG ou WebP de 10 Mo maximum.");return;}
    kind==="image"?setImage(file):setLogo(file);setNotice("");
  }
  return <main className="shell">
    <aside className="sidebar"><div className="brand"><span className="mark">✦</span><span>BRAINTECHKEN <small>AI VIDEO STUDIO</small></span></div>
      <nav><a className="selected" href="#create">✦ &nbsp; Créer une vidéo</a><a href="#history">▤ &nbsp; Mes brouillons</a><a href="#about">◈ &nbsp; Infrastructure</a></nav>
      <div className="sidebarFoot">LTX-2.5 · Prototype UI<br/><span>GPU non connecté</span></div>
    </aside>
    <section className="content" id="create"><header className="top"><div><p className="eyebrow">STUDIO DE CRÉATION</p><h1>Donnez vie à vos idées<span>.</span></h1><p className="muted">Préparez vos créations vidéo avec LTX-2.5.</p></div><div className="status">● MODE DÉMO</div></header>
      <div className="workspace"><div className="panel"><h2>Nouvelle création</h2><p className="muted">Définissez votre projet vidéo</p>
        <div className="tabs"><button className={mode==="text"?"active":""} onClick={()=>setMode("text")}>✎ Texte → Vidéo</button><button className={mode==="image"?"active":""} onClick={()=>setMode("image")}>▧ Image → Vidéo</button></div>
        <label htmlFor="prompt">Description de la scène</label><div className="examples" aria-label="Exemples de prompts">{EXAMPLES.map(e=><button key={e.label} type="button" onClick={()=>{setPrompt(e.prompt);setNotice("Modèle chargé : personnalise-le avant de l’enregistrer.");}}>{e.label}</button>)}</div><textarea id="prompt" maxLength={2000} value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ex. Une carte bancaire virtuelle FIAXY flotte dans un environnement futuriste, éclairage cinématique, mouvements de caméra fluides…" rows={6}/>
        <div className="counter">{prompt.length}/2000</div>
        {mode==="image"&&<div className="field"><label htmlFor="reference">Image de référence</label><input id="reference" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>pickFile(e.target.files?.[0],"image")}/>{image&&<p className="file">{image.name}</p>}</div>}
        <div className="field"><label htmlFor="logo">Logo de marque (facultatif)</label><input id="logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>pickFile(e.target.files?.[0],"logo")}/>{logo&&<p className="file">{logo.name} · prévu pour la composition finale</p>}</div>
        <div className="controls"><div><label htmlFor="ratio">Format</label><select id="ratio" value={ratio} onChange={e=>setRatio(e.target.value)}><option>9:16</option><option>16:9</option><option>1:1</option></select></div><div><label htmlFor="seconds">Durée cible</label><select id="seconds" value={seconds} onChange={e=>setSeconds(e.target.value)}><option value="5">5 secondes</option><option value="10">10 secondes</option></select></div></div>
        <button className="primary" onClick={saveDraft}>Enregistrer le brouillon <span>→</span></button>
        <p className="hint">La génération sera activée après connexion d'un backend GPU. Aucun coût n'est engagé.</p>
        {notice&&<p className="notice" role="status">{notice}</p>}
      </div>
      <div className="panel preview"><div className="previewHeader"><h2>Aperçu du projet</h2><span className="pill">Préproduction</span></div><div className={"screen "+(ratio==="9:16"?"portrait":ratio==="1:1"?"square":"landscape")}><div className="spark">✦</div><strong>Votre vidéo apparaîtra ici</strong><span>Prévisualisation disponible après génération</span></div><div className="previewBottom"><span>◷ {seconds}s</span><span>▣ {ratio}</span><span>◈ LTX-2.5</span></div></div></div>
      <section className="history" id="history"><div className="sectionHeading"><h2>Brouillons récents</h2><span>{ready?drafts.length:"…" } enregistrés</span></div>{drafts.length===0?<p className="empty">Aucun brouillon pour le moment. Commencez votre première création ci-dessus.</p>:<div className="drafts">{drafts.map(d=><article className="draft" key={d.id}><span className="draftIcon">✦</span><div><strong>{d.prompt}</strong><p>{d.mode==="text"?"Texte":"Image"} · {d.ratio} · {d.seconds}s · {new Date(d.created).toLocaleString("fr-FR")}</p></div><div className="draftActions"><button onClick={()=>{setPrompt(d.prompt);setMode(d.mode);setRatio(d.ratio);setSeconds(d.seconds);window.scrollTo({top:0,behavior:"smooth"});}}>Réutiliser</button><button type="button" aria-label="Supprimer le brouillon" onClick={()=>deleteDraft(d.id)}>Supprimer</button></div></article>)}</div>}</section>
      <footer id="about">Prototype de préparation de vidéos · Les brouillons restent dans ce navigateur · Aucune génération GPU ni sauvegarde serveur</footer>
    </section>
  </main>;
}
