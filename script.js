// KL3 cipher table — non-sequential letter shift, canon per Keane's notebook
const KL3 = {
  A:"BAC", B:"DBC", C:"CED", D:"DFE", E:"FGE", F:"GFH", G:"HIG",
  H:"SHI", I:"JRI", J:"NJK", K:"NKM", L:"BLC", M:"OMP", N:"MNO",
  O:"PQO", P:"RQR", Q:"RQS", R:"TSR", S:"TSU", T:"UVT", U:"WVU",
  V:"WXV", W:"WYX", X:"YXZ", Y:"YZY", Z:"ZZZ"
};

const KL3_REVERSE = Object.fromEntries(
  Object.entries(KL3).map(([letter, code]) => [code, letter])
);

function kl3Encode(text){
  return text
    .split(/\s+/)
    .map(word =>
      word
        .split("")
        .map(ch => {
          const upper = ch.toUpperCase();
          if (KL3[upper]) {
            const code = KL3[upper];
            return ch === upper ? code : code.toLowerCase();
          }
          return ch;
        })
        .join("")
    )
    .join(" ");
}

function kl3Decode(text){
  return text
    .split(/\s+/)
    .map(word => {
      if(!word) return "";
      let out = "";
      for (let i = 0; i < word.length; i += 3){
        const tok = word.slice(i, i + 3);
        const upper = tok.toUpperCase();
        if (tok.length === 3 && KL3_REVERSE[upper]) {
          const letter = KL3_REVERSE[upper];
          out += tok === upper ? letter : letter.toLowerCase();
        } else {
          out += tok;
        }
      }
      return out;
    })
    .join(" ");
}
