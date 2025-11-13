export function Newstag(config, site, platform, doc) {
  const newstagElement = {
    kapanlagi: {
      targetSelector: ".header25-trending__list",
      itemSelector: "a.header25-trending__item",
      titleSelector: ".header25-trending__item__title"
    },
    liputan6: {
      targetSelector: ".trending--list",
      itemSelector: ".trending--list__item",
      titleSelector: ".trending__item__title"
    },
    fimela: {
      mode: "replace",
      desktop: {
        targetSelector: ".tags--box",
        itemSelector: ".tags--box--item",
        titleSelector: ".tags--box--item__name",
        linkSelector: ".tags--box--item__link"
      },
      mobile: {
        targetSelector: ".selected-tags-homepage__list",
        itemSelector: ".selected-tags-homepage--item",
        titleSelector: ".selected-tags-homepage--item__link",
        linkSelector: ".selected-tags-homepage--item__link"
      }
    },
    bolacom: {
      desktop: {
        targetSelector: ".cycle-carousel-wrap",
        itemSelector: ".tags--box--item",
        titleSelector: ".tags--box--item__name",
        linkSelector: ".tags--box--item__link"
      }
    },
    bola: {
      mode: "swiper",
      desktop: {
        targetSelector: ".box-tag-swiper .swiper-wrapper",
        itemSelector: ".swiper-slide",
        linkSelector: "a"
      },
      mobile: {
        targetSelector: ".box-tag-swiper",
        itemSelector: ".box-overflow-x-item",
        linkSelector: "a"
      }
    }
  };

  try {
    const elements = newstagElement[site];
    if (!elements) return console.warn("[Newstag] Unsupported site:", site);

    const textTag = config.textTag || "Newstag";
    const landingPage = config.landingPage || "#";
    const position = Number.isInteger(config.position) ? config.position : 0;
    let count = 0;
    const platformCheck = elements.mode ? (platform === "mobile" ? elements.mobile : elements.desktop) : elements;

    const interval = setInterval(() => {
      // BOLACOM 
      if (site === "bolacom") {
        const wrap = doc.querySelector(".cycle-carousel-wrap") || doc.querySelector(".tags--box");
        if (!wrap) return (++count > 300 && clearInterval(interval));

        if (config.debugPreview) {
          if (!wrap.querySelector(".tag-ads")) {
            const li = doc.createElement("li");
            li.className = "tags--box--item tag-ads";
            li.innerHTML = `<a href="${landingPage}" class="tags--box--item__link" title="${textTag}" target="_blank">
              <span class="tags--box--item__name">${textTag}</span></a>`;
            wrap.prepend(li);
          }
          return clearInterval(interval);
        }

        const items = [...wrap.querySelectorAll(".tags--box--item.cycle-slide")];
        if (!items.length || items.some(i => i.textContent.trim() === textTag)) return;
        const active = wrap.querySelector(".cycle-slide-active");
        if (!active) return;
        const li = doc.createElement("li");
        li.className = "tags--box--item cycle-slide tag-ads";
        li.innerHTML = `<a href="${landingPage}" class="tags--box--item__link" title="${textTag}" target="_blank">
          <span class="tags--box--item__name">${textTag}</span>
          <i class="tags--box--item__topic-icon i-checklist"></i>
          <i class="tags--box--item__topic-icon-green i-checklist-green"></i>
        </a>`;
        wrap.insertBefore(li, items[Math.min(items.indexOf(active) + position, items.length)] || null);
        return clearInterval(interval);
      }

      // SWIPER mode
      if (elements.mode === "swiper") {
        const wrap = doc.querySelector(platformCheck.targetSelector);
        if (!wrap || wrap.querySelector(".tag-ads")) return clearInterval(interval);
        const reference = wrap.children[position];
        if (!reference) return;
        const div = doc.createElement("div");
        // platformCheck.item might be like ".swiper-slide" — remove dot if present
        const itemClass = (platformCheck.itemSelector || platformCheck.item || "").replace(/^\./, "");
        div.className = `${itemClass} tag-ads`;
        div.innerHTML = `<a href="${landingPage}" title="${textTag}" target="_blank">${textTag}</a>`;
        wrap.insertBefore(div, reference);
        if (platform !== "mobile") wrap.closest(".swiper-container")?.swiper?.update();
        return clearInterval(interval);
      }

      // REPLACE mode
      if (elements.mode === "replace") {
        const wrap = doc.querySelector(platformCheck.targetSelector || platformCheck.target);
        const tagItem = wrap?.querySelectorAll(platformCheck.itemSelector || platformCheck.item)[position];
        if (!tagItem) return;
        const link = tagItem.querySelector(platformCheck.linkSelector || platformCheck.link || "a");
        if (link) { link.textContent = textTag; link.href = landingPage; link.target = "_blank"; }
        tagItem.classList.add("tag-ads");
        return clearInterval(interval);
      }

      // CLONE (default)
      const wrap = doc.querySelector(elements.targetSelector);
      if (!wrap) return (++count > 300 && clearInterval(interval));
      const tagItem = wrap.querySelectorAll(elements.itemSelector)[position];
      if (!tagItem || wrap.querySelector(".tag-ads")) return;
      const tag = tagItem.cloneNode(true);
      tag.classList.add("tag-ads");
      const title = tag.querySelector(elements.titleSelector);
      if (title) title.textContent = textTag;
      const link = tag.querySelector(elements.linkSelector || "a");
      if (link) { link.href = landingPage; link.target = "_blank"; }
      tagItem.insertAdjacentElement("beforebegin", tag);
      clearInterval(interval);

    }, 100);
  } catch (e) {
    console.warn("[Newstag] Error:", e);
  }
}
