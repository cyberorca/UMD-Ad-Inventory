export function SkinAd(config, platform, doc) {
  try {
    if (platform && platform !== "desktop") return;
    const { leftImage, rightImage, landingPage = "#", imageWidth = 300 } = config;
    if (!leftImage && !rightImage) return;

    const style = doc.createElement("style");
    style.textContent = `
      .skinad-side{position:fixed;top:0;bottom:0;display:flex;align-items:center;z-index:9999}
      .skinad-side img{max-width:${imageWidth}px;display:block;height:100%;object-fit:cover}
    `;
    doc.head.appendChild(style);

    const pageWidth = doc.documentElement.clientWidth;
    const contentWidth = doc.querySelector(".container")?.clientWidth || 1000;
    const offset = (pageWidth - contentWidth) / 2;

    if (leftImage) {
      const left = doc.createElement("a");
      left.href = landingPage; left.target = "_blank"; left.className = "skinad-side"; left.style.left = offset - imageWidth + "px";
      left.innerHTML = `<img src="${leftImage}">`;
      doc.body.appendChild(left);
    }

    if (rightImage) {
      const right = doc.createElement("a");
      right.href = landingPage; right.target = "_blank"; right.className = "skinad-side"; right.style.right = offset - imageWidth + "px";
      right.innerHTML = `<img src="${rightImage}">`;
      doc.body.appendChild(right);
    }

  } catch (e) {
    console.warn("[SkinAd] Error:", e);
  }
}
