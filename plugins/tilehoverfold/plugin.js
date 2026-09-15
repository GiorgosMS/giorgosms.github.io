"use strict";

// Tile Hover Effect Fold Plugin - CSS3 folding effect
$.plugin($afterTilesAppend, {
    tileHoverEffectFold: function() {
        $(".tileHoverEffectFold").each(function() {
            const $item = $(this);
            const img = $item.children("img").attr("src");
            const struct = `
                <div class="slice s1">
                    <div class="slice s2">
                        <div class="slice s3">
                            <div class="slice s4">
                            </div>
                        </div>
                    </div>
                </div>`;
            
            const $struct = $(struct);
            $item.children("img").remove().end()
                .append($struct)
                .find("div.slice")
                .css("background-image", `url(${img})`)
                .prepend($('<span class="overlay"></span>'));
        });
    }
});

$.plugin($onSiteLoad, {
    tileHoverEffectFold: function() {
        $(document).on("mouseenter", ".tileHoverEffectFold", function() {
            const $item = $(this);
            $item.addClass("tileHoverEffectFoldHover");
            for (let i = 2; i < 5; i++) {
                $item.find(`.s${i}`).addClass(`s${i}n`);
            }
        }).on("mouseleave", ".tileHoverEffectFold", function() {
            const $item = $(this);
            for (let i = 2; i < 5; i++) {
                $item.find(`.s${i}`).removeClass(`s${i}n`);
            }
            setTimeout(() => {
                $(".tileHoverEffectFoldHover").removeClass("tileHoverEffectFoldHover");
            }, 201);
        });
    }
});

function tileHoverEffectFold(group, x, y, width, height, bg, linkPage, image, content, labelSettings, optClass) {
    let labelText = "";
    
    if (labelSettings !== "" && labelSettings[0] !== "") {
        const label = labelSettings[0];
        const labelcolor = labelSettings[1];
        const labelposition = labelSettings[2];
        
        if (labelposition === "top") {
            labelText = `<div class='tileLabelWrapper top' style='border-top-color:${labelcolor};'><div class='tileLabel top'>${label}</div></div>`;
        } else {
            labelText = `<div class='tileLabelWrapper bottom'><div class='tileLabel bottom' style='border-bottom-color:${labelcolor};'>${label}</div></div>`;
        }
    }
    
    const tileWidth = width * $tile.scalespacing - $tile.spacing;
    const tileHeight = height * $tile.scalespacing - $tile.spacing;
    const marginTop = (y * $tile.scalespacing) + 45;
    const marginLeft = x * $tile.scalespacing + group * $group.spacing;
    
    $page.content += `<a ${makeLink(linkPage)} class='tileHoverEffectFold tile group${group} ${optClass}' style='
        margin-top:${marginTop}px;margin-left:${marginLeft}px;
        width: ${tileWidth}px; height:${tileHeight}px;
        background:${bg};'>
        <div class='view-back'>
            ${content}
        </div>
        <img src='${image}' />
        ${labelText}
    </a>`;
}
