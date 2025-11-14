const par = (typeof parent !== "undefined") && parent;
const win = ( par && par.window ) ? par.window : window;
const doc = ( par && par.document) ? par.document : document;
const kly = ( par && (par.kly || par.kmklabs)) || {};
let site = (kly.site || "").toLowerCase();
if (site === "bola.com") site = "bolacom";
const platform = (kly.platform || "").toLowerCase();
const pageType = (kly.pageType || "").toLowerCase();

async function init(format, config) {
  config = config || {};
  format = (format || "").toLowerCase();
  
  const { Newstag } = await import(/* webpackChunkName: "newstag" */ "./modules/Newstag.js");
  const { SkinAd } = await import(/* webpackChunkName: "skinad" */ "./modules/SkinAd.js");
  const { AdvertorialEmbed } = await import(/* webpackChunkName: "advertorialEmbed" */ "./modules/AdvertorialEmbed.js");

  try {
    switch (format) {
      case "newstag":
        Newstag(config, site, platform, doc);
        break;
      case "skinad":
        SkinAd(config, platform, doc);
        break;
      case "advertorial-embed":
        AdvertorialEmbed(win, doc, config, site, pageType);
        break;
      default:
        console.warn("Unknown format:", format);
    }
  } catch (error) {
    console.error(`Failed to load creative "${format}":`, error);
  }
}

(function autoInit() {
  try {
    const currentScript =
      document.currentScript ||
      document.querySelector('script[src*="ad_Inventory"]') ||
      (function () {
        const scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
      })();

    if (!currentScript || !currentScript.src) return;

    const src = new URL(currentScript.src, document.location.href);
    const creative = src.searchParams.get("creative");

    if (creative) {
      console.log(`[adInventory] Auto init creative: ${creative}`);
      init(creative);
    }
  } catch (e) {
    console.warn("[adInventory] Failed to auto init creative:", e);
  }
})();

export { init };

