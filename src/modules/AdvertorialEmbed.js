export function AdvertorialEmbed(win, doc, config, site, pageType) {
    const SITENAME = site;
    const PAGETYPE = pageType;
    const IFRAME_EMBED_ARTICLE_WRAPPER = document.createElement("div")
    const IFRAME_EMBED_ARTICLE = document.createElement("iframe");
    const CURRENT_SCRIPT = document.currentScript;
    var isIframeReisized = false;
    const EMBED_URL = config.embedURL;//"https://d.kapanlaginetwork.com/banner/preview/2025/11/14/bolacom-revive-advertorial-embed-DWm5X6dty/wangiyangbikininget-ffar-jadi-senjata-andalan-pria-ambisius-biar-selalu-tampil-menarik.html?advembed=1";
    const SETTINGS = {
        "bolacom": {
            "color": "#31824A",
            "targetEl": ".tags--topics"
        }, //.article-content-body__item
        "liputan6": {
            "color": "#FF3300",
            "targetEl": ".trending-tags"
        }, //.article-content-body__item trending-tags
        "kapanlagi": {
            "color": "#F28900",
            "targetEl": ".detail__box.wrapper.relatedtag.relatedtag-collapsed, .box.box--topic"
        }, // .infinite-paging-item
        "fimela": {
            "color": "#BF0561",
            "targetEl": ".fimela-tags--topics"
        }, // .article-readpage--section
        "merdeka": {
            "color": "#8E01FF",
            "targetEl": {
                "readpage": ".dt-inner.relative" // tidak ada di legacy 
            }
        },
        "merdeka.com": {
            "color": "#8E01FF",
            "targetEl": {
                "readpage3": "#div-gpt-ad-mgid-underarticle-placeholder, section.section--postcredit", //.article--version2  .dt--postcredit-tag
                "readpage2": "#div-gpt-ad-mgid-underarticle-placeholder, section.section--postcredit", //  .article--version2 .dt--postcredit-tag
            }
        },
        "otosia.com": {
            "color": "#D71920",
            "targetEl": "#div-gpt-ad-mgid-underarticle-placeholder, section.section--postcredit"
        }, // .article--version2
        "bola": {
            "color": "#138137",
            "targetEl": "#div-revive-ad-bolanet-sc"
        }, // .detail-body .infinite
    }

    klyAds();


    function klyAds() {
        const isNotEmpty = doc.querySelector("#kly-embeded-article-wrapper");

        if (isNotEmpty) return;

        _getTargetElement_();
        _createIframeArticle(EMBED_URL);
    }

    function _createIframeArticle(_iframesrc) {
        var label = document.createElement("p");
        label.textContent = "Baca juga";
        label.classList.add("advembed-label");

        IFRAME_EMBED_ARTICLE_WRAPPER.setAttribute("id", "kly-embeded-article-wrapper");
        IFRAME_EMBED_ARTICLE.setAttribute("frameborder", 0);
        IFRAME_EMBED_ARTICLE.setAttribute("scrolling", "no");
        IFRAME_EMBED_ARTICLE.setAttribute("id", "kly-embeded-article");
        IFRAME_EMBED_ARTICLE.setAttribute("src", _iframesrc);

        IFRAME_EMBED_ARTICLE_WRAPPER.appendChild(label);
        IFRAME_EMBED_ARTICLE_WRAPPER.appendChild(IFRAME_EMBED_ARTICLE);
        createCTA(IFRAME_EMBED_ARTICLE_WRAPPER);
        // tweakCss();

        win.addEventListener('message', (event) => {
            // Handle the received message
            if (event.data.type == "iframeResizer" && !isIframeReisized) {
                // console.log('Received message:', event.data);
                // tweakCss(event.data);
                tweakCss();
                setTimeout(function() {
                    isIframeReisized = true;
                }, 3000)
            }
        });
    }
    //height : ${data.dimensions.height * 4 / 10 }px !important;
    // function tweakCss(data) {
    function tweakCss() {
        var style = document.createElement("style");
        var mystyle = `
                    :root {
                        --site-color-theme: ${SETTINGS[SITENAME].color};
                    }
            
                    iframe#kly-embeded-article{
                        width: 100%;
                        height : 50vh !important;
                    }
            
                    div#kly-embeded-article-wrapper {
                        position: relative;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
                    div#kly-embeded-article-wrapper::before {
                        content: "Paid content";
                        position: relative;
                        width: 100%;
                        top: 0;
                        left: 0;
                        font-size: 12;
                        color: gray;
                    }
            
                    div#kly-embeded-article-wrapper p {
                        margin: 10px 0;
                        font-size: 24px;
                        font-weight: 700;
                        color: var(--site-color-theme);
                    }
            
                    div#kly-embeded-article-wrapper::after {
                        content: "";
                        width: 100%;
                        height: 200px;
                        background: linear-gradient(0deg, white, transparent);
                        position: absolute;
                        bottom: 0;
                        margin-bottom: 65px;
                    }
            
                    button.cta-advembed {
                        max-width: 320px;
                        min-width: 300px;
                        height: 50px;
                        display: block;
                        margin: 30px auto 0;
                        border: solid 2px var(--site-color-theme);
                        border-radius: 7px;
                        background: white;
                        color: var(--site-color-theme);
                        font-size: 16px;
                        font-weight: 600;
                    }
            
                    /*merdeka readpage 1 tweak*/
                    .section .dt-inner.relative #kly-embeded-article-wrapper::before,
                    .section .dt-inner.relative #kly-embeded-article-wrapper iframe {
                        padding: 1.5rem;
                    }
            
                    .dark div#kly-embeded-article-wrapper::after {
                        background: linear-gradient(0deg, #141414, transparent);
                    }
            
                    .dark button.cta-advembed {
                        background: #141414;
                    }
            
                    .box-tag div#kly-embeded-article-wrapper {
                        margin: 0 15px;
                    }
                    `
        style.textContent = mystyle;
        CURRENT_SCRIPT && CURRENT_SCRIPT.insertAdjacentElement("beforebegin", style);
    }

    function _getTargetElement_() {
        let count = 0;
        const setWrapper = setInterval(function() {
            let wrapper = (typeof SETTINGS[SITENAME].targetEl == "string") ? doc.querySelectorAll(`${SETTINGS[SITENAME].targetEl}`) : doc.querySelectorAll(SETTINGS[SITENAME].targetEl[PAGETYPE]);
            let lastWrapper = wrapper[wrapper.length - 1];
            if (lastWrapper) {
                lastWrapper.appendChild(IFRAME_EMBED_ARTICLE_WRAPPER);
                clearInterval(setWrapper);
            }
            count > 100 && clearInterval(setWrapper);
            count++;
        }, 200);
    }

 /**
   *  Utility: safely get the native window.open
   *  even if Revive (or another script) has wrapped it.
   */
  function getNativeOpen() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // The iframe's window.open is always the real, native version
    const nativeOpen = iframe.contentWindow.open.bind(window);
    document.body.removeChild(iframe);

    return nativeOpen;
  }

  // Cache the true browser window.open
  const nativeOpen = getNativeOpen();

   function createCTA(target) {
         const btn = document.createElement("button");
         btn.className = "cta-advembed";
         btn.textContent = "Baca Selengkapnya";

         btn.addEventListener("click", function(e) {
           e.stopPropagation();
           e.preventDefault();

          // Always use the native open, never Revive's wrapped one
          nativeOpen(`{clickurl}${getNonEmbedUrl()}`, "_blank");
       });

       target.appendChild(btn);
    }

    function getNonEmbedUrl() {
        var url = null;
        if (EMBED_URL.split("/advembedded").length > 1) {
            url = EMBED_URL.split("/advembedded")[0] + EMBED_URL.split("/advembedded")[1]
        } else {
            url = EMBED_URL.split("?")[0];
        }
        return url;
    }
}