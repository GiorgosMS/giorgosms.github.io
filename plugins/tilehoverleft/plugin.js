"use strict";

// Tile Hover Effect Left Plugin
$(document).on("mouseenter", ".tileHoverEffectLeft", function() {
    $(this).children("img").stop().animate({ "margin-left": $(this).width() * 0.4 }, 400);
}).on("mouseleave", ".tileHoverEffectLeft", function() {
    $(this).children("img").stop().animate({ "margin-left": 0 }, 400);
});

function tileHoverEffectLeft(group, x, y, width, height, bg, linkPage, image, content, labelSettings, optClass) {
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
    
    $page.content += `<a ${makeLink(linkPage)} class='tileHoverEffectLeft tile group${group} ${optClass}' style='
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
