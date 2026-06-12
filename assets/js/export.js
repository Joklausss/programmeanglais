/* ============================================================
   export.js — Génération 100% locale de fichiers téléchargeables
   • ZIP (méthode "store", CRC32 maison) — aucune dépendance / CDN
   • DOCX (Word) valides générés à la volée
   • Images SVG pédagogiques originales
   Fonctionne même en ouvrant index.html en file:// (hors-ligne).
   ============================================================ */
(function () {
  const ENC = new TextEncoder();

  /* ---------- CRC32 ---------- */
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
    return t;
  })();
  function crc32(bytes) { let crc = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xFF]; return (crc ^ 0xFFFFFFFF) >>> 0; }

  /* ---------- ZIP (store / no compression) ---------- */
  function makeZip(files) {
    const chunks = []; let offset = 0; const central = [];
    const u16 = n => new Uint8Array([n & 255, (n >> 8) & 255]);
    const u32 = n => new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
    const push = a => { chunks.push(a); offset += a.length; };
    for (const f of files) {
      const name = ENC.encode(f.name);
      const data = f.bytes instanceof Uint8Array ? f.bytes : ENC.encode(f.bytes);
      const crc = crc32(data), at = offset;
      push(u32(0x04034b50)); push(u16(20)); push(u16(0x0800)); push(u16(0));
      push(u16(0)); push(u16(0)); push(u32(crc)); push(u32(data.length)); push(u32(data.length));
      push(u16(name.length)); push(u16(0)); push(name); push(data);
      const c = [u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
        u32(crc), u32(data.length), u32(data.length), u16(name.length), u16(0), u16(0),
        u16(0), u16(0), u32(0), u32(at), name];
      central.push(c);
    }
    const cdStart = offset;
    for (const c of central) for (const p of c) push(p);
    const cdSize = offset - cdStart;
    push(u32(0x06054b50)); push(u16(0)); push(u16(0));
    push(u16(files.length)); push(u16(files.length));
    push(u32(cdSize)); push(u32(cdStart)); push(u16(0));
    let total = 0; for (const c of chunks) total += c.length;
    const out = new Uint8Array(total); let p = 0;
    for (const c of chunks) { out.set(c, p); p += c.length; }
    return out;
  }

  /* ---------- DOCX builder ---------- */
  const xe = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function run(text, o = {}) {
    const rpr = `<w:rPr>${o.b ? '<w:b/>' : ''}${o.i ? '<w:i/>' : ''}` +
      `${o.color ? `<w:color w:val="${o.color}"/>` : ''}<w:sz w:val="${o.sz || 22}"/><w:szCs w:val="${o.sz || 22}"/></w:rPr>`;
    return `<w:r>${rpr}<w:t xml:space="preserve">${xe(text)}</w:t></w:r>`;
  }
  function P(text, o = {}) {
    const ppr = `<w:pPr><w:spacing w:before="${o.before || 40}" w:after="${o.after || 60}"/>` +
      `${o.ind ? `<w:ind w:left="${o.ind}"/>` : ''}</w:pPr>`;
    return `<w:p>${ppr}${run(text, o)}</w:p>`;
  }
  const H1 = t => P(t, { b: true, sz: 40, color: '1E3A8A', before: 120, after: 120 });
  const H2 = t => P(t, { b: true, sz: 30, color: '1D4ED8', before: 200, after: 80 });
  const H3 = t => P(t, { b: true, sz: 24, color: '1E3A8A', before: 140, after: 40 });
  const BUL = t => P('•  ' + t, { ind: 360, after: 30 });
  function TABLE(headers, rows) {
    const cell = (txt, opt = {}) =>
      `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/>${opt.bg ? `<w:shd w:val="clear" w:color="auto" w:fill="${opt.bg}"/>` : ''}` +
      `<w:tcMar><w:top w:w="40" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tcMar></w:tcPr>` +
      `<w:p><w:pPr><w:spacing w:after="0"/></w:pPr>${run(txt, { b: opt.b, sz: 20 })}</w:p></w:tc>`;
    let t = `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>` +
      ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(s => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="D7DEE8"/>`).join('') +
      `</w:tblBorders></w:tblPr>`;
    if (headers) t += '<w:tr>' + headers.map(h => cell(h, { b: true, bg: 'EFF6FF' })).join('') + '</w:tr>';
    for (const r of rows) t += '<w:tr>' + r.map(c => cell(c)).join('') + '</w:tr>';
    return t + '</w:tbl>' + P('', { after: 40 });
  }

  function makeDocx(blocks) {
    const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${blocks.join('')}` +
      `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`;
    const ct = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`;
    const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
    return makeZip([
      { name: '[Content_Types].xml', bytes: ct },
      { name: '_rels/.rels', bytes: rels },
      { name: 'word/document.xml', bytes: doc },
    ]);
  }

  /* ---------- SVG images (originales, libres de droit) ---------- */
  const gradOf = css => { const m = (css || '').match(/#[0-9a-fA-F]{3,6}/g) || ['#1d4ed8', '#7c3aed']; return [m[0], m[m.length - 1]]; };
  function wrapTspan(text, max, x, y, lh) {
    const words = text.split(' '); const lines = []; let cur = '';
    for (const w of words) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
    if (cur.trim()) lines.push(cur.trim());
    return lines.map((l, i) => `<tspan x="${x}" y="${y + i * lh}">${xe(l)}</tspan>`).join('');
  }
  function coverSVG(seq, axeName) {
    const [c1, c2] = gradOf(seq.visuel);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<rect x="60" y="60" width="220" height="44" rx="22" fill="#ffffff" opacity="0.92"/>
<text x="80" y="89" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="bold" fill="#1e293b">${xe(seq.niveau)} · Axe ${seq.axe}</text>
<text font-family="Georgia,'Times New Roman',serif" font-size="74" font-weight="bold" fill="#ffffff">${wrapTspan(seq.title, 24, 60, 300, 90)}</text>
<text x="60" y="560" font-family="Arial,Helvetica,sans-serif" font-size="30" fill="#ffffff" opacity="0.92">${xe(seq.niveau)} · ${xe(seq.statut)} · CECRL ${xe(seq.cecrl)} · ${xe(seq.seances)} séances</text>
<text x="60" y="600" font-family="Arial,Helvetica,sans-serif" font-size="22" fill="#ffffff" opacity="0.7">LinguaLab — ressource pédagogique conforme au programme</text>
</svg>`;
  }
  function wordcloudSVG(words) {
    const palette = ['#1d4ed8', '#b45309', '#7c3aed', '#0891b2', '#16a34a', '#be123c'];
    let inner = '', y = 120;
    words.forEach((w, i) => {
      const size = 64 - (i % 5) * 8, x = 80 + ((i * 137) % 420);
      inner += `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="bold" fill="${palette[i % palette.length]}" opacity="0.9">${xe(w)}</text>`;
      y += 70; if (y > 560) y = 150;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="630" viewBox="0 0 1000 630"><rect width="1000" height="630" fill="#f8fafc"/><text x="80" y="60" font-family="Georgia,serif" font-size="30" fill="#0f172a" font-weight="bold">Word cloud — lead-in</text>${inner}</svg>`;
  }
  function timelineSVG(events) {
    let inner = ''; const x0 = 90, x1 = 910, step = (x1 - x0) / (events.length - 1);
    inner += `<line x1="${x0}" y1="300" x2="${x1}" y2="300" stroke="#1d4ed8" stroke-width="4"/>`;
    events.forEach((e, i) => {
      const x = x0 + i * step, up = i % 2 === 0;
      inner += `<circle cx="${x}" cy="300" r="9" fill="#b45309"/>`;
      inner += `<text x="${x}" y="${up ? 250 : 360}" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="bold" fill="#0f172a">${xe(e.year)}</text>`;
      inner += `<text x="${x}" y="${up ? 220 : 390}" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#334155">${wrapTspan(e.label, 16, x, up ? 220 : 390, 22).replace(/x="\d+"/g, `x="${x}" text-anchor="middle"`)}</text>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600" viewBox="0 0 1000 600"><rect width="1000" height="600" fill="#ffffff"/><text x="90" y="80" font-family="Georgia,serif" font-size="30" font-weight="bold" fill="#0f172a">Repères chronologiques</text>${inner}</svg>`;
  }

  /* ============================================================
     PPTX — diaporama de présentation (OOXML, sans dépendance)
     ============================================================ */
  const PNS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
  const XMLHEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';

  const PPTX_THEME = XMLHEAD + `<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="LinguaLab"><a:themeElements><a:clrScheme name="LinguaLab"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1E3A8A"/></a:dk2><a:lt2><a:srgbClr val="EFF6FF"/></a:lt2><a:accent1><a:srgbClr val="1D4ED8"/></a:accent1><a:accent2><a:srgbClr val="F59E0B"/></a:accent2><a:accent3><a:srgbClr val="7C3AED"/></a:accent3><a:accent4><a:srgbClr val="16A34A"/></a:accent4><a:accent5><a:srgbClr val="0891B2"/></a:accent5><a:accent6><a:srgbClr val="BE123C"/></a:accent6><a:hlink><a:srgbClr val="1D4ED8"/></a:hlink><a:folHlink><a:srgbClr val="7C3AED"/></a:folHlink></a:clrScheme><a:fontScheme name="LinguaLab"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="LinguaLab"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;

  const PPTX_MASTER = XMLHEAD + `<p:sldMaster ${PNS}><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle><a:lvl1pPr algn="l"><a:defRPr sz="4400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mj-lt"/></a:defRPr></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr marL="342900" indent="-342900"><a:buFont typeface="Arial"/><a:buChar char="&#8226;"/><a:defRPr sz="2400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/></a:defRPr></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:defPPr><a:defRPr lang="en-US"/></a:defPPr></p:otherStyle></p:txStyles></p:sldMaster>`;
  const PPTX_MASTER_RELS = XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`;
  const PPTX_LAYOUT = XMLHEAD + `<p:sldLayout ${PNS} type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
  const PPTX_LAYOUT_RELS = XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`;
  const PPTX_SLIDE_RELS = XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>`;
  const PPTX_SLIDE_RELS_IMG = XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image1.jpeg"/></Relationships>`;

  /* Rasterise un SVG en PNG (Uint8Array) via canvas — asynchrone */
  function svgToPng(svg, w, h) {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
        const img = new Image();
        img.onload = () => {
          try {
            const c = document.createElement('canvas'); c.width = w; c.height = h;
            const ctx = c.getContext('2d');
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); // fond opaque (JPEG sans alpha)
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(url);
            c.toBlob(b => { if (!b) return reject(new Error('toBlob null')); b.arrayBuffer().then(ab => resolve(new Uint8Array(ab))).catch(reject); }, 'image/jpeg', 0.82);
          } catch (e) { URL.revokeObjectURL(url); reject(e); }
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('svg image load failed')); };
        img.src = url;
      } catch (e) { reject(e); }
    });
  }
  const PPTX_ROOT_RELS = XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`;

  function pptxPara(text, o = {}) {
    const color = o.color ? `<a:solidFill><a:srgbClr val="${o.color}"/></a:solidFill>` : '';
    const bullet = o.bullet
      ? `<a:pPr marL="285750" indent="-285750"><a:buFont typeface="Arial"/><a:buChar char="&#8226;"/></a:pPr>`
      : `<a:pPr${o.sub ? ' marL="285750"' : ''}/>`;
    return `<a:p>${bullet}<a:r><a:rPr lang="en-US" sz="${o.sz || 1500}"${o.b ? ' b="1"' : ''} dirty="0">${color}</a:rPr><a:t>${xe(text)}</a:t></a:r></a:p>`;
  }
  function pptxSlideXml(s, opts) {
    opts = opts || {};
    // Slide de couverture : image plein cadre (le visuel contient déjà titre/axe/niveau)
    if (opts.imageRid) {
      return XMLHEAD + `<p:sld ${PNS}><p:cSld><p:spTree>` +
        `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
        `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
        `<p:pic><p:nvPicPr><p:cNvPr id="2" name="Cover"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>` +
        `<p:blipFill><a:blip r:embed="${opts.imageRid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>` +
        `<p:spPr><a:xfrm><a:off x="0" y="228600"/><a:ext cx="12192000" cy="6400800"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>` +
        `</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
    }
    const body = s.blocks.map(bl => {
      if (bl.t === 'h') return pptxPara(bl.text, { sz: 1900, b: true, color: '1D4ED8' });
      if (bl.t === 's') return pptxPara(bl.text, { sz: 1300, color: '475569', sub: true });
      return pptxPara(bl.text, { sz: 1500, bullet: true });
    }).join('');
    return XMLHEAD + `<p:sld ${PNS}><p:cSld><p:spTree>` +
      `<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
      `<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>` +
      `<p:sp><p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr>` +
      `<p:spPr><a:xfrm><a:off x="457200" y="274320"/><a:ext cx="11277600" cy="1143000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>` +
      `<p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="2800" b="1" dirty="0"><a:solidFill><a:srgbClr val="1E3A8A"/></a:solidFill></a:rPr><a:t>${xe(s.title)}</a:t></a:r></a:p></p:txBody></p:sp>` +
      `<p:sp><p:nvSpPr><p:cNvPr id="3" name="Body"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr>` +
      `<p:spPr><a:xfrm><a:off x="457200" y="1577340"/><a:ext cx="11277600" cy="4953000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>` +
      `<p:txBody><a:bodyPr wrap="square"><a:normAutofit fontScale="92500" lnSpcReduction="10000"/></a:bodyPr><a:lstStyle/>${body || '<a:p/>'}</p:txBody></p:sp>` +
      `</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
  }
  function pptxPresentation(n) {
    let ids = '';
    for (let i = 1; i <= n; i++) ids += `<p:sldId id="${255 + i}" r:id="rId${i}"/>`;
    return XMLHEAD + `<p:presentation ${PNS}><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId${n + 1}"/></p:sldMasterIdLst>` +
      `<p:sldIdLst>${ids}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`;
  }
  function pptxPresRels(n) {
    let r = '';
    for (let i = 1; i <= n; i++) r += `<Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`;
    r += `<Relationship Id="rId${n + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`;
    return XMLHEAD + `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${r}</Relationships>`;
  }
  function pptxContentTypes(n, hasImg) {
    let o = '';
    for (let i = 1; i <= n; i++) o += `<Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`;
    return XMLHEAD + `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>` +
      (hasImg ? `<Default Extension="jpeg" ContentType="image/jpeg"/>` : '') +
      `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>` +
      `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>` +
      `<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>` +
      `<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>${o}</Types>`;
  }
  function makePptx(slides, coverPng) {
    const hasImg = coverPng && coverPng.length;
    const files = [
      { name: '[Content_Types].xml', bytes: pptxContentTypes(slides.length, hasImg) },
      { name: '_rels/.rels', bytes: PPTX_ROOT_RELS },
      { name: 'ppt/presentation.xml', bytes: pptxPresentation(slides.length) },
      { name: 'ppt/_rels/presentation.xml.rels', bytes: pptxPresRels(slides.length) },
      { name: 'ppt/slideMasters/slideMaster1.xml', bytes: PPTX_MASTER },
      { name: 'ppt/slideMasters/_rels/slideMaster1.xml.rels', bytes: PPTX_MASTER_RELS },
      { name: 'ppt/slideLayouts/slideLayout1.xml', bytes: PPTX_LAYOUT },
      { name: 'ppt/slideLayouts/_rels/slideLayout1.xml.rels', bytes: PPTX_LAYOUT_RELS },
      { name: 'ppt/theme/theme1.xml', bytes: PPTX_THEME },
    ];
    if (hasImg) files.push({ name: 'ppt/media/image1.jpeg', bytes: coverPng });
    slides.forEach((s, i) => {
      const cover = hasImg && i === 0;       // 1re slide = visuel de couverture
      files.push({ name: `ppt/slides/slide${i + 1}.xml`, bytes: pptxSlideXml(s, cover ? { imageRid: 'rId2' } : {}) });
      files.push({ name: `ppt/slides/_rels/slide${i + 1}.xml.rels`, bytes: cover ? PPTX_SLIDE_RELS_IMG : PPTX_SLIDE_RELS });
    });
    return makeZip(files);
  }

  const firstSentence = t => { const m = String(t).split(/\.\s/); return m[0] ? m[0].replace(/\.$/, '') + '.' : t; };

  function sequenceSlides(seq, axeName) {
    const slides = [];
    // Slide titre
    slides.push({
      title: seq.title, blocks: [
        { t: 'h', text: `${seq.niveau} · Axe ${seq.axe} — ${axeName(seq.axe, seq.niveau)}` },
        { t: 'b', text: seq.objet || '' },
        { t: 'b', text: `Niveau CECRL visé : ${seq.cecrl} · ${seq.seances} séances` },
        { t: 'h', text: 'Problématique' },
        { t: 's', text: seq.problematique || '' },
      ]
    });
    // Slide vue d'ensemble
    if (seq.objectifs && seq.tacheFinale) {
      const b = [{ t: 'h', text: 'Objectifs culturels' }];
      seq.objectifs.culturels.forEach(c => b.push({ t: 'b', text: c }));
      b.push({ t: 'h', text: 'Tâche finale' });
      b.push({ t: 'b', text: seq.tacheFinale.titre });
      b.push({ t: 's', text: seq.tacheFinale.consigne });
      slides.push({ title: 'Vue d\'ensemble', blocks: b });
    }
    // Une slide par séance
    (seq.seancesDetail || []).forEach(se => {
      const b = [{ t: 'h', text: 'Objectif : ' + se.objectif }];
      se.phases.forEach(p => {
        b.push({ t: 'b', text: `${p.nom} (${p.min})` });
        b.push({ t: 's', text: firstSentence(p.desc) });
      });
      if (se.supports && se.supports.length) {
        b.push({ t: 'h', text: 'Supports' });
        se.supports.forEach(su => b.push({ t: 's', text: `${su.type} — ${su.titre} (${su.src})` }));
      }
      slides.push({ title: `Séance ${se.n} — ${se.titre}`, blocks: b });
    });
    // Slide évaluation
    if (seq.evaluation) {
      const b = [{ t: 'b', text: 'Diagnostique : ' + seq.evaluation.diagnostique }];
      b.push({ t: 'h', text: 'Grille — tâche finale (sur 20)' });
      seq.evaluation.grille.forEach(g => b.push({ t: 'b', text: `${g.critere} — ${g.points} pts` }));
      slides.push({ title: 'Évaluation', blocks: b });
    }
    return slides;
  }

  /* ============================================================
     Construction du bundle d'une séquence
     ============================================================ */
  function sequenceDocxBlocks(seq, axeName) {
    const b = [];
    b.push(H1(seq.title));
    b.push(P(`${seq.niveau} · ${seq.statut} · ${seq.voie || 'Générale'} — Niveau CECRL visé : ${seq.cecrl} — ${seq.seances} séances (${seq.duree || ''})`, { i: true, color: '64748B' }));
    b.push(TABLE(null, [
      ['Niveau', `${seq.niveau} · ${seq.statut} · ${seq.voie || 'Générale'}`],
      ['Axe culturel', `Axe ${seq.axe} — ${axeName(seq.axe, seq.niveau)}`],
      ['Objet(s) d\'étude', seq.objet || ''],
      ['Problématique', seq.problematique || ''],
      ['Résumé', seq.resume || ''],
    ]));

    if (seq.ancrage && seq.ancrage.length) {
      b.push(H2('Œuvres & documents authentiques phares'));
      seq.ancrage.forEach(a => b.push(BUL(`${a.oeuvre} — ${a.type} (${a.source})`)));
    }

    if (seq.objectifs) {
      const o = seq.objectifs;
      b.push(H2('1. Objectifs d\'apprentissage'));
      b.push(H3('Objectifs culturels'));
      o.culturels.forEach(c => b.push(BUL(c)));
      b.push(H3('Objectifs par activité langagière'));
      b.push(TABLE(['Activité langagière', 'Objectif visé'], Object.entries(o.langagiers)));
      b.push(H3('Grammaire'));
      o.grammaire.forEach(g => b.push(BUL(g)));
      b.push(H3('Lexique'));
      o.lexique.forEach(g => b.push(BUL(g)));
      b.push(H3('Phonologie'));
      o.phonologie.forEach(g => b.push(BUL(g)));
    }
    if (seq.tacheFinale) {
      const t = seq.tacheFinale;
      b.push(H2('2. Tâche finale actionnelle'));
      b.push(P(t.titre, { b: true }));
      b.push(P(t.consigne));
      b.push(P('Activités mobilisées : ' + t.activites.join(', '), { i: true, color: '64748B' }));
      b.push(P('Perspective actionnelle : ' + t.perspective, { i: true, color: '64748B' }));
    }
    if (seq.seancesDetail) {
      b.push(H2('3. Déroulé séance par séance'));
      seq.seancesDetail.forEach(se => {
        b.push(H3(`Séance ${se.n} — ${se.titre}`));
        b.push(P('Objectif : ' + se.objectif, { i: true }));
        b.push(TABLE(['Phase', 'Durée', 'Activité'], se.phases.map(p => [p.nom, p.min, p.desc])));
        b.push(P('Supports : ' + se.supports.map(s => `${s.titre} (${s.type} — ${s.src})`).join(' ; '), { sz: 20, color: '64748B' }));
      });
    }
    if (seq.evaluation) {
      const e = seq.evaluation;
      b.push(H2('4. Évaluation'));
      b.push(P('Diagnostique : ' + e.diagnostique));
      b.push(H3('Formative'));
      e.formative.forEach(f => b.push(BUL(f)));
      b.push(P('Sommative : ' + e.sommative));
      b.push(H3('Grille — tâche finale (sur 20)'));
      b.push(TABLE(['Critère', 'Descripteur', 'Points'], e.grille.map(g => [g.critere, g.desc, String(g.points)])));
    }
    if (seq.differenciation) {
      const d = seq.differenciation;
      b.push(H2('5. Différenciation'));
      b.push(H3('Soutien')); d.soutien.forEach(x => b.push(BUL(x)));
      b.push(H3('Approfondissement')); d.approfondissement.forEach(x => b.push(BUL(x)));
      b.push(P('Modalités : ' + d.modalites.join(', '), { i: true, color: '64748B' }));
    }
    if (seq.prolongements) {
      b.push(H2('6. Prolongements'));
      seq.prolongements.forEach(p => b.push(BUL(p)));
    }
    if (seq.idees && seq.idees.length) {
      b.push(H2('Banque d\'idées de thèmes (à piocher / varier)'));
      seq.idees.forEach(i => b.push(BUL(i)));
    }
    b.push(P('— Document généré par LinguaLab. Licence ressource : Creative Commons (BY). Sources image : domaines publics indiqués dans references.md.', { sz: 18, color: '94A3B8', before: 240 }));
    return b;
  }

  function tracesDocxBlocks(seq) {
    const b = [H1('Traces écrites & cours — ' + seq.title)];
    b.push(P('À recopier / coller dans le cahier de l\'élève. Structuré par séance.', { i: true, color: '64748B' }));
    if (seq.seancesDetail) {
      seq.seancesDetail.forEach(se => {
        b.push(H2(`Séance ${se.n} — ${se.titre}`));
        const trace = se.phases.find(p => /trace/i.test(p.nom));
        b.push(P(trace ? trace.desc : se.objectif));
      });
    }
    if (seq.objectifs) {
      b.push(H2('Mémo grammaire'));
      seq.objectifs.grammaire.forEach(g => b.push(BUL(g)));
      b.push(H2('Mémo lexique'));
      seq.objectifs.lexique.forEach(g => b.push(BUL(g)));
    }
    return b;
  }

  function referencesMD(seq, axeName) {
    let md = `# Références & sources — ${seq.title}\n\n`;
    md += `- Niveau : ${seq.niveau} ${seq.statut} (CECRL ${seq.cecrl})\n- Axe ${seq.axe} : ${axeName(seq.axe, seq.niveau)}\n\n## Supports utilisés\n`;
    if (seq.seancesDetail) {
      seq.seancesDetail.forEach(se => {
        md += `\n### Séance ${se.n} — ${se.titre}\n`;
        se.supports.forEach(s => { md += `- [${s.type}] ${s.titre} — Source : ${s.src}\n`; });
      });
    } else {
      md += `\n(Détail des supports disponible dans la version complète de la séquence.)\n`;
    }
    if (seq.ressourcesProf) {
      md += `\n## Ressources pour le professeur\n`;
      seq.ressourcesProf.forEach(r => { md += `- ${r}\n`; });
    }
    md += `\n## Droits & licence\n- Ressource LinguaLab sous licence Creative Commons (BY).\n- Aucune donnée élève nominative (RGPD).\n- Les photographies citées (Library of Congress, National Archives) sont dans le domaine public : télécharger les fichiers haute définition depuis les sources officielles indiquées ci-dessus.\n- Pas de scan de manuel — respect du droit d'auteur.\n`;
    return md;
  }

  function readmeTXT(seq) {
    return `SÉQUENCE PÉDAGOGIQUE — ${seq.title}
Plateforme LinguaLab · ${new Date().toLocaleDateString('fr-FR')}

Contenu de ce dossier :
  • Fiche-sequence.docx ....... séquence complète (cadrage, objectifs, séances, évaluation, différenciation)
  • Cours-et-traces-ecrites.docx  traces écrites à donner aux élèves
  • Diaporama-presentation.pptx  diaporama (titre, vue d'ensemble, 1 slide/séance, évaluation)
  • references.md ............. sources des documents + licence
  • images/ .................. visuels pédagogiques (SVG, libres de droit, ouvrables dans un navigateur)

Les .docx et .pptx s'ouvrent dans Word/PowerPoint, LibreOffice ou Google Docs/Slides — entièrement modifiables.
Les .svg s'ouvrent dans n'importe quel navigateur et peuvent être insérés dans vos supports.

Niveau : ${seq.niveau} ${seq.statut} · CECRL ${seq.cecrl} · ${seq.seances} séances
Licence : Creative Commons (BY) — réutilisation autorisée avec attribution.
`;
  }

  // Visuels spécifiques par séquence (sinon génériques)
  function imagesFor(seq, axeName) {
    const imgs = [{ name: 'images/cover.svg', bytes: coverSVG(seq, axeName) }];
    if (seq.id === 'am-dream') {
      imgs.push({ name: 'images/lead-in-wordcloud.svg', bytes: wordcloudSVG(['freedom', 'opportunity', 'self-made', 'immigrants', 'success', 'hard work', 'frontier', 'equality', 'hardship', 'mobility']) });
      imgs.push({ name: 'images/timeline.svg', bytes: timelineSVG([
        { year: '1776', label: 'Declaration of Independence' },
        { year: '1892', label: 'Ellis Island opens' },
        { year: '1929', label: 'Great Depression' },
        { year: '1963', label: 'I Have a Dream' },
        { year: '2026', label: 'The Dream today' },
      ]) });
    } else {
      imgs.push({ name: 'images/infographie.svg', bytes: wordcloudSVG((seq.objet || seq.title).split(/[ ,·]+/).filter(w => w.length > 3).slice(0, 8)) });
    }
    return imgs;
  }

  async function buildSequenceBundle(seq, axeName) {
    // Rasterise le visuel de couverture pour l'intégrer au diaporama ; en cas
    // d'échec (environnement sans canvas), on retombe sur un diaporama sans image.
    let coverPng = null;
    try { coverPng = await svgToPng(coverSVG(seq, axeName), 1200, 630); } catch (e) { coverPng = null; }
    const files = [
      { name: 'README.txt', bytes: readmeTXT(seq) },
      { name: 'Fiche-sequence.docx', bytes: makeDocx(sequenceDocxBlocks(seq, axeName)) },
      { name: 'Cours-et-traces-ecrites.docx', bytes: makeDocx(tracesDocxBlocks(seq)) },
      { name: 'Diaporama-presentation.pptx', bytes: makePptx(sequenceSlides(seq, axeName), coverPng) },
      { name: 'references.md', bytes: referencesMD(seq, axeName) },
      ...imagesFor(seq, axeName),
    ];
    return makeZip(files);
  }

  function buildExerciseDocx(ex, axeName) {
    const b = [
      H1(ex.titre),
      P(`Compétence : ${ex.competence} · Type : ${ex.type} · Difficulté : ${ex.difficulte}` + (axeName ? ` · ${ex.niveau || ''} Axe ${ex.axe} — ${axeName(ex.axe, ex.niveau)}` : ''), { i: true, color: '64748B' }),
      P(ex.desc),
    ];
    b.push(H2('Consigne'));
    b.push(P(ex.consigne || 'Réalisez l\'activité ci-dessous.'));
    if (ex.texte) { b.push(H2('Document')); b.push(P(ex.texte)); }
    if (ex.items && ex.items.length) {
      b.push(H2('Exercice'));
      ex.items.forEach(it => b.push(P(it, { after: 80 })));
    }
    if (ex.corrige && ex.corrige.length) {
      b.push(H2('Corrigé'));
      ex.corrige.forEach(c => b.push(P(c, { after: 60 })));
    }
    b.push(P('— LinguaLab · Licence Creative Commons (BY). Documents authentiques cités : à exploiter selon vos droits d\'usage en classe.', { sz: 18, color: '94A3B8', before: 200 }));
    return makeDocx(b);
  }

  /* ---------- Programmation annuelle (Word) ---------- */
  function buildProgrammationDocx(niveau, statut, cecrl, seqs, axeName, periods) {
    const total = seqs.reduce((n, s) => n + s.seances, 0);
    const axesCount = new Set(seqs.map(s => s.axe)).size;
    const b = [
      H1(`Programmation annuelle — Anglais ${statut} · Classe de ${niveau}`),
      P(`Niveau CECRL visé : ${cecrl}  ·  ${seqs.length} séquences  ·  ${total} séances. Couverture : ${axesCount} axes sur 6 (minimum 5 requis en voie générale, dont l'axe 6 obligatoire). Les 6 activités langagières sont équilibrées sur l'année ; progression spiralaire.`, { i: true, color: '64748B' }),
      H2('Déroulé de l\'année'),
      TABLE(['Période', 'Axe culturel', 'Séquence', 'Problématique', 'Tâche finale'],
        seqs.map((s, i) => [
          periods[i] || ('Période ' + (i + 1)),
          `Axe ${s.axe} — ${axeName(s.axe, niveau)}`,
          `${s.title} (${s.seances} séances · ${cecrl})`,
          s.problematique || '',
          s.tacheFinale ? s.tacheFinale.titre : '',
        ])),
      H2('Progression grammaticale spiralaire'),
    ];
    seqs.forEach((s, i) => b.push(BUL(`Séq. ${i + 1} — ${axeName(s.axe, niveau)} : ${(s.objectifs.grammaire || []).join(' · ')}`)));
    b.push(H2('Équilibre des activités langagières'));
    b.push(P('Compréhension de l\'oral et de l\'écrit : travaillées dans chaque séquence. Expression (orale/écrite), interaction et médiation : réparties dans les tâches finales (voir tableau ci-dessus).'));
    b.push(P('— Programmation générée par LinguaLab. À ajuster selon votre calendrier et vos classes. Licence Creative Commons (BY).', { sz: 18, color: '94A3B8', before: 200 }));
    return makeDocx(b);
  }

  /* ============================================================
     PDF natif — sans dépendance, fontes standard Helvetica
     (pas d'embarquement de police : lisible par tout lecteur PDF)
     ============================================================ */
  const HW = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  const pdfCharW = cp => (cp >= 32 && cp <= 126) ? HW[cp - 32] : 556;
  function pdfClean(s) {
    return String(s)
      .replace(/[\u{1F000}-\u{1FAFF}]/gu, '')
      .replace(/[←-⇿⬀-⯿]/g, m => ({ '→': '->', '←': '<-', '⇒': '=>' }[m] || ''))
      .replace(/[☀-➿️]/g, '')
      .replace(/•/g, '·')
      .replace(/[ɐ-ʯ]/g, '')
      .replace(/[✓✔]/g, '(ok)');
  }
  const CP1252 = { 0x20AC: 0x80, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2013: 0x96, 0x2014: 0x97, 0x2026: 0x85, 0x2022: 0x95, 0x02C6: 0x88, 0x2122: 0x99 };
  const toCP1252 = ch => { const cp = ch.codePointAt(0); if (cp <= 0xFF) return cp; if (CP1252[cp] != null) return CP1252[cp]; return 0x3F; };
  function pdfEsc(s) {
    let out = '';
    for (const ch of s) { const b = toCP1252(ch);
      if (b === 0x28 || b === 0x29 || b === 0x5C) out += '\\' + String.fromCharCode(b);
      else if (b < 32 || b > 126) out += '\\' + b.toString(8).padStart(3, '0');
      else out += String.fromCharCode(b); }
    return out;
  }
  const pdfWidth = (s, size) => { let w = 0; for (const ch of s) w += pdfCharW(toCP1252(ch)) * size / 1000; return w; };
  function pdfWrap(s, size, maxW) {
    const words = String(s).split(/\s+/); const lines = []; let cur = '';
    for (const w of words) { const t = cur ? cur + ' ' + w : w; if (pdfWidth(t, size) > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur); return lines.length ? lines : [''];
  }
  const PDF_STY = {
    h1: { size: 18, bold: 1, color: [0.12, 0.23, 0.54], before: 14, after: 6 },
    h2: { size: 13, bold: 1, color: [0.11, 0.31, 0.85], before: 14, after: 4 },
    h3: { size: 11, bold: 1, color: [0.12, 0.23, 0.54], before: 9, after: 2 },
    p:  { size: 10.5, bold: 0, color: [0.1, 0.1, 0.12], before: 1, after: 4 },
    bullet: { size: 10.5, bold: 0, color: [0.2, 0.23, 0.28], before: 0, after: 2, indent: 14, prefix: '·  ' },
    small: { size: 8.5, bold: 0, color: [0.45, 0.5, 0.56], before: 2, after: 6 },
  };
  function makePdf(blocks) {
    const W = 595, H = 842, M = 54, maxW = W - 2 * M;
    const pages = []; let lines = []; let y = H - M;
    const nl = () => { pages.push(lines); lines = []; y = H - M; };
    for (const b of blocks) {
      const st = PDF_STY[b.type] || PDF_STY.p, lh = st.size * 1.32, indent = st.indent || 0;
      const cln = pdfClean((st.prefix || '') + (b.text == null ? '' : b.text));
      y -= st.before || 0;
      pdfWrap(cln, st.size, maxW - indent).forEach(ln => {
        if (y - lh < M) nl();
        y -= lh; lines.push({ x: M + indent, y, size: st.size, bold: st.bold, color: st.color, text: ln });
      });
      y -= st.after || 0;
    }
    if (lines.length) pages.push(lines);

    const contents = pages.map(pg => {
      let s = '', lc = null;
      for (const ln of pg) {
        const c = ln.color; if (!lc || c[0] !== lc[0] || c[1] !== lc[1] || c[2] !== lc[2]) { s += `${c[0]} ${c[1]} ${c[2]} rg\n`; lc = c; }
        s += `BT /${ln.bold ? 'F2' : 'F1'} ${ln.size} Tf ${ln.x.toFixed(1)} ${ln.y.toFixed(1)} Td (${pdfEsc(ln.text)}) Tj ET\n`;
      }
      return s;
    });

    const objs = [];
    objs[1] = '<</Type/Catalog/Pages 2 0 R>>';
    objs[3] = '<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>';
    objs[4] = '<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>';
    let n = 5; const kids = [];
    contents.forEach(cs => {
      const co = n++, po = n++;
      objs[co] = `<</Length ${cs.length}>>\nstream\n${cs}endstream`;
      objs[po] = `<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${W} ${H}]/Resources<</Font<</F1 3 0 R/F2 4 0 R>>>>/Contents ${co} 0 R>>`;
      kids.push(`${po} 0 R`);
    });
    objs[2] = `<</Type/Pages/Kids[${kids.join(' ')}]/Count ${kids.length}>>`;

    let pdf = '%PDF-1.4\n'; const offsets = []; const total = n - 1;
    for (let i = 1; i <= total; i++) { offsets[i] = pdf.length; pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
    const xrefPos = pdf.length;
    pdf += `xref\n0 ${total + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= total; i++) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    pdf += `trailer\n<</Size ${total + 1}/Root 1 0 R>>\nstartxref\n${xrefPos}\n%%EOF`;
    const out = new Uint8Array(pdf.length); for (let i = 0; i < pdf.length; i++) out[i] = pdf.charCodeAt(i) & 0xff;
    return out;
  }

  function sequencePdfBlocks(seq, axeName) {
    const b = [];
    b.push({ type: 'h1', text: seq.title });
    b.push({ type: 'small', text: `${seq.niveau} · ${seq.statut} · ${seq.voie || 'Générale'} — CECRL ${seq.cecrl} — ${seq.seances} séances` });
    b.push({ type: 'p', text: `Axe ${seq.axe} — ${axeName(seq.axe, seq.niveau)}  |  ${seq.objet || ''}` });
    if (seq.problematique) b.push({ type: 'p', text: `Problématique : « ${seq.problematique} »` });
    if (seq.resume) b.push({ type: 'p', text: seq.resume });
    if (seq.objectifs) {
      b.push({ type: 'h2', text: 'Objectifs' });
      b.push({ type: 'h3', text: 'Culturels' });
      seq.objectifs.culturels.forEach(c => b.push({ type: 'bullet', text: c }));
      b.push({ type: 'h3', text: 'Par activité langagière' });
      Object.entries(seq.objectifs.langagiers).forEach(([k, v]) => b.push({ type: 'bullet', text: `${k} : ${v}` }));
      b.push({ type: 'h3', text: 'Repères de langue' });
      b.push({ type: 'bullet', text: 'Grammaire : ' + seq.objectifs.grammaire.join(' · ') });
      b.push({ type: 'bullet', text: 'Lexique : ' + seq.objectifs.lexique.join(' · ') });
      b.push({ type: 'bullet', text: 'Phonologie : ' + seq.objectifs.phonologie.join(' · ') });
    }
    if (seq.tacheFinale) {
      b.push({ type: 'h2', text: 'Tâche finale actionnelle' });
      b.push({ type: 'p', text: seq.tacheFinale.titre });
      b.push({ type: 'p', text: seq.tacheFinale.consigne });
      b.push({ type: 'small', text: 'Activités : ' + seq.tacheFinale.activites.join(', ') });
    }
    if (seq.ancrage) { b.push({ type: 'h2', text: 'Œuvres & documents authentiques phares' }); seq.ancrage.forEach(a => b.push({ type: 'bullet', text: `${a.oeuvre} — ${a.type} (${a.source})` })); }
    if (seq.seancesDetail) {
      b.push({ type: 'h2', text: 'Déroulé séance par séance' });
      seq.seancesDetail.forEach(se => {
        b.push({ type: 'h3', text: `Séance ${se.n} — ${se.titre}` });
        b.push({ type: 'small', text: 'Objectif : ' + se.objectif });
        se.phases.forEach(p => b.push({ type: 'bullet', text: `${p.nom} (${p.min}) — ${p.desc}` }));
        b.push({ type: 'small', text: 'Supports : ' + se.supports.map(s => `${s.titre} (${s.src})`).join(' ; ') });
      });
    }
    if (seq.evaluation) {
      b.push({ type: 'h2', text: 'Évaluation' });
      b.push({ type: 'bullet', text: 'Diagnostique : ' + seq.evaluation.diagnostique });
      seq.evaluation.formative.forEach(f => b.push({ type: 'bullet', text: 'Formative : ' + f }));
      b.push({ type: 'bullet', text: 'Sommative : ' + seq.evaluation.sommative });
      b.push({ type: 'h3', text: 'Grille — tâche finale (sur 20)' });
      seq.evaluation.grille.forEach(g => b.push({ type: 'bullet', text: `${g.critere} — ${g.points} pts (${g.desc})` }));
    }
    if (seq.differenciation) {
      b.push({ type: 'h2', text: 'Différenciation' });
      seq.differenciation.soutien.forEach(x => b.push({ type: 'bullet', text: 'Soutien : ' + x }));
      seq.differenciation.approfondissement.forEach(x => b.push({ type: 'bullet', text: 'Approfondissement : ' + x }));
    }
    if (seq.idees) { b.push({ type: 'h2', text: 'Idées de thèmes connexes' }); b.push({ type: 'p', text: seq.idees.join('  ·  ') }); }
    b.push({ type: 'small', text: '— Fiche générée par LinguaLab. Licence Creative Commons (BY). Documents authentiques à exploiter selon vos droits d\'usage en classe.' });
    return b;
  }
  function buildSequencePdf(seq, axeName) { return makePdf(sequencePdfBlocks(seq, axeName)); }

  /* ---------- Déclenche le téléchargement navigateur ---------- */
  function downloadBytes(bytes, filename, mime) {
    const blob = new Blob([bytes], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  /* ---------- API publique ---------- */
  window.LinguaExport = { buildSequenceBundle, buildExerciseDocx, buildProgrammationDocx, buildSequencePdf, downloadBytes };
})();
