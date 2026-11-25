/* @comum:datahora v1.0 — REGRA GERAL (todas as apps): transferências entre aparelhos com data-hora, para nunca substituir dados mais recentes por mais antigos sem aviso. Regra: docs/regras/transferencias.md
   - cada unidade transferível (processo, verba, parcela…) guarda «alterado em», atualizado sozinho quando o conteúdo muda;
   - o nome do ficheiro enviado leva a data-hora do envio;
   - ao receber, cada unidade mostra a data-hora deste aparelho e a do ficheiro, com «mais recente» / «mais antigo»;
   - a escolha sugerida é sempre a mais recente; substituir dados mais recentes por mais antigos pede confirmação expressa. */
const DH={
 ms:t=>t==null||t===''?0:typeof t==='number'?t:(Date.parse(t)||0),
 fmt:t=>{const m=DH.ms(t);if(!m)return 'sem data';const d=new Date(m),p=n=>String(n).padStart(2,'0');return `${p(d.getDate())}/${p(d.getMonth()+1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`},
 tag:()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`},
 /* 'rec' = o recebido é mais recente; 'loc' = o deste aparelho é mais recente; 'igual' / '?' (sem datas) */
 qual:(loc,rec)=>{const a=DH.ms(loc),b=DH.ms(rec);if(!a&&!b)return '?';if(Math.abs(a-b)<1000)return 'igual';return b>a?'rec':'loc'},
 linhas:(loc,rec)=>{const q=DH.qual(loc,rec);return `Neste aparelho: alterado em ${DH.fmt(loc)}${q==='loc'?' — mais recente':''}\nNo ficheiro: alterado em ${DH.fmt(rec)}${q==='rec'?' — mais recente':q==='loc'?' — MAIS ANTIGO':''}`},
 html:(loc,rec)=>{const q=DH.qual(loc,rec);return `<div class="dh">📱 Neste aparelho: <b>${DH.fmt(loc)}</b>${q==='loc'?' <span class="dhn">mais recente</span>':''}<br>📄 No ficheiro: <b>${DH.fmt(rec)}</b>${q==='rec'?' <span class="dhn">mais recente</span>':q==='loc'?' <span class="dho">mais antigo</span>':''}</div>`},
 css:'.dh{font-size:13px;margin:4px 0 6px;line-height:1.5}.dhn{background:#e1f5ee;color:#085041;border-radius:8px;padding:0 6px;font-size:12px}.dho{background:#fcebeb;color:#791f1f;border-radius:8px;padding:0 6px;font-size:12px;font-weight:600}',
 /* marca «alterado em» nos itens cujo conteúdo mudou (hash próprio de cada app) */
 marca:(itens,hash,iso=false)=>{for(const it of itens||[]){const c={...it};delete c._dh;delete c.updatedAt;const h=hash(c);if(it._dh!==h){if(it._dh!==undefined||!it.updatedAt)it.updatedAt=iso?new Date().toISOString():Date.now();it._dh=h}}},
 aviso:'Vai substituir dados MAIS RECENTES deste aparelho por dados MAIS ANTIGOS do ficheiro. As alterações mais recentes perdem-se. Continuar?'};
(()=>{try{const s=document.createElement('style');s.textContent=DH.css;document.head.appendChild(s)}catch(_){}})();
/* @fim:datahora */
