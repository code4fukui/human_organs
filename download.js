//import { parseOGP } from "https://js.sabae.cc/parseOGP.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { fetchBinAsBrowser } from "./fetchBinAsBrowser.js";
import { extractString, extractStrings } from "./extractString.js";

const fn = "human_organs.csv";
const list = await CSV.fetchJSON(fn);

for (const item of list) {
  const url = item.url_src;
  console.log(url);
  const html = await fetchOrLoad(item.url_src);
  //console.log(html);
  //const ogp = parseOGP(html);
  //console.log(ogp);
  const fns = extractStrings(html, "s3Location:\"", "\"");
  const id1 = extractString(html, "prefectRunId:\"", "\"");
  const id2 = extractString(html, "\"Output\",true,", ",") || 3420; // ??
  //console.log(fns, id1, id2);
  if (id2 == null) Deno.exit();
  const saves = ["jpg", "glb", "stl"];
  for (const fn of fns) {
    const ext = fn.substring(fn.lastIndexOf(".") + 1);
    if (!saves.includes(ext)) continue;
    //if (!fn.endsWith(".jpg")) continue;
    const fn2 = fn.substring(fn.lastIndexOf("/") + 1);
    const fn3 = ext + "/" + fn2;
    try {
      await Deno.readFile(fn3);
    } catch (e) {
      const url = `https://3d.nih.gov/api/submissions/${id2}/runs/${id1}/output-files/${fn2}`;
      const bin = await fetchBinAsBrowser(url);
      await Deno.writeFile(fn3, bin);
    }
    item["url_" + ext] = "https://code4fukui.github.io/human_organs/" + ext + "/" + fn3;
  }
  // https://3d.nih.gov/api/submissions/26476/runs/34f0188e-277e-4641-96ca-ef846f6b8946/output-files/vh_m_heart_thumb_NIH3D.png
  // https://3d.nih.gov/api/submissions/26476/runs/34f0188e-277e-4641-96ca-ef846f6b8946/output-files/vh_m_heart_thumb_NIH3D.jpg
  // https://3d.nih.gov/api/submissions/26489/runs/cfa98c68-8d7a-4e8b-bb1f-613e3c8f85cd/output-files/3d-vh-m-pancreas_thumb_NIH3D.jpg
  /*
  const sjson = html.substring(html.indexOf("return {") + 7, html.lastIndexOf("}(\"\"") + 1);
  console.log(sjson);
  const json = JSON.parse(sjson + "}}}");
  console.log(sjson);
  */
  //break;
}
await Deno.writeTextFile(fn, CSV.stringify(list));
