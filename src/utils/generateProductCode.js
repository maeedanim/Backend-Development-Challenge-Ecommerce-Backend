const crypto = require('crypto');
const Product = require('../models/Product');

function longestIncreasingSubstrings(name) {
  const s = name.toLowerCase();
  const results = [];
  let start = 0, cur = s[0]||'';
  for (let i = 1; i <= s.length; i++) {
    const prev = s[i-1];
    const curr = s[i];
    if (i === s.length) {

      results.push({ substr: s.slice(start, i), start, end: i-1 });
    } else {
   
      const prevIsLetter = prev >= 'a' && prev <= 'z';
      const currIsLetter = curr >= 'a' && curr <= 'z';
      if (prevIsLetter && currIsLetter && curr.charCodeAt(0) > prev.charCodeAt(0)) {
    
      } else {
        results.push({ substr: s.slice(start, i), start, end: i-1 });
        start = i;
      }
    }
  }

  return results.filter(r => /[a-z]/.test(r.substr));
}

async function generateProductCode(name) {
  const items = longestIncreasingSubstrings(name);
  if (items.length === 0) {

    const fallback = name.toLowerCase().replace(/[^a-z]/g, '').slice(0,3) || 'prd';
    const hash = crypto.createHash('sha256').update(name).digest('hex').slice(0,7);
    let codeBase = `${hash}-${0}${fallback}${name.length-1}`;

    let code = codeBase, i=0;
    while (await Product.exists({ productCode: code })) {
      i++;
      code = `${codeBase}-${i}`;
    }
    return code;
  }

  
  let maxLen = 0;
  items.forEach(it => {
    if (it.substr.length > maxLen) maxLen = it.substr.length;
  });

  const chosen = items.filter(it => it.substr.length === maxLen);
  const concatenated = chosen.map(c => c.substr).join('');
  const startIndex = chosen[0].start;
  const endIndex = chosen[chosen.length - 1].end;

  const hash = crypto.createHash('sha256').update(name).digest('hex').slice(0,7);
  let codeBase = `${hash}-${startIndex}${concatenated}${endIndex}`;
  let code = codeBase;
  let i = 0;
  while (await Product.exists({ productCode: code })) {
    i++;
    code = `${codeBase}-${i}`;
  }
  return code;
}

module.exports = { generateProductCode, longestIncreasingSubstrings };
