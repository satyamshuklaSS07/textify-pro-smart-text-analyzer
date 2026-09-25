const input=document.getElementById('textInput');
const el=id=>document.getElementById(id);
function analyze(){
 const t=input.value, clean=t.trim(), ws=clean?clean.split(/\s+/):[];
 const ss=clean?clean.split(/[.!?]+/).filter(x=>x.trim()):[];
 const ps=clean?clean.split(/\n\s*\n/).filter(x=>x.trim()):[];
 el('characters').textContent=t.length.toLocaleString();
 el('noSpaces').textContent=t.replace(/\s/g,'').length.toLocaleString();
 el('words').textContent=ws.length.toLocaleString();
 el('liveWords').textContent=ws.length.toLocaleString();
 el('sentences').textContent=ss.length.toLocaleString();
 el('paragraphs').textContent=ps.length.toLocaleString();
 el('lines').textContent=t?t.split(/\n/).length:0;
 const letters=ws.reduce((n,w)=>n+w.replace(/[^\p{L}\p{N}]/gu,'').length,0);
 el('avgWord').textContent=ws.length?(letters/ws.length).toFixed(1):'0.0';
 el('readingTime').textContent=`Reading time · ${ws.length?Math.max(1,Math.ceil(ws.length/200)):0} min`;
 el('limitText').textContent=`${t.length.toLocaleString()} / 10,000 characters`;
 el('progressBar').style.width=`${Math.min(t.length/10000*100,100)}%`;
 el('status').textContent=t?'Live analysis updated':'Ready to write';
}
function toast(m){const x=el('toast');x.textContent=m;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),1700)}
input.addEventListener('input',analyze);
el('clearBtn').onclick=()=>{input.value='';analyze();toast('Text cleared');input.focus()};
el('sampleBtn').onclick=()=>{input.value=`Textify Pro turns simple writing into clear, useful insights.\n\nWrite naturally, check your text instantly, and keep your content clean, readable and ready to publish.`;analyze();toast('Sample loaded')};
el('copyBtn').onclick=async()=>{if(!input.value)return toast('Nothing to copy');try{await navigator.clipboard.writeText(input.value);toast('Copied to clipboard')}catch{input.select();document.execCommand('copy');toast('Copied')}};
el('themeBtn').onclick=()=>{document.body.classList.toggle('light');el('themeBtn').textContent=document.body.classList.contains('light')?'☾':'☼';localStorage.setItem('textify-theme',document.body.classList.contains('light')?'light':'dark')};
if(localStorage.getItem('textify-theme')==='light'){document.body.classList.add('light');el('themeBtn').textContent='☾'}
analyze();