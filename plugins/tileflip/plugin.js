"use strict";

// Tile Flip Plugin - CSS3 3D flip effect
$(document).on("mouseenter", ".tileFlip", function() {
    clearTimeout(timers["tileFlipTimer"]);
    $(this).addClass("tileFlipped");
}).on("mouseleave", ".tileFlip", function() {
    timers["tileFlipTimer"] = setTimeout(() => {
        $(".tileFlipped").removeClass("tileFlipped");
    }, 600);
});

function tileFlip(group, x, y, width, height, bg, linkPage, img, content, labelSettings, optClass) {
    let labelTotal = "";
    
    if (labelSettings !== "" && labelSettings[0] !== "") {
        const label = labelSettings[0];
        const labelcolor = labelSettings[1];
        const desc = labelSettings[2];
        const labelText = label !== "" 
            ? `<div class='tileLabel bottom' style='border-bottom-color:${labelcolor};'>${label}</div>` 
            : "";
        const labelDescText = desc !== "" 
            ? `<div class='tileLabelDesc'>${desc}</div>` 
            : "";
        labelTotal = `<div class='tileLabelWrapper bottom'>${labelText} ${labelDescText}</div>`;
    }
    
    const tileWidth = width * $tile.scalespacing - $tile.spacing;
    const tileHeight = height * $tile.scalespacing - $tile.spacing;
    const marginTop = (y * $tile.scalespacing) + 45;
    const marginLeft = x * $tile.scalespacing + group * $group.spacing;
    
    $page.content += `<a ${makeLink(linkPage)} class='tileFlip support3D tile group${group} ${optClass}' style='
        margin-top:${marginTop}px;margin-left:${marginLeft}px;
        width: ${tileWidth}px; height:${tileHeight}px;'>
        <div class='flipContainer' style='border:1px solid ${bg};'>
            <div class='flipFront'><img src='${img}' style='width: ${tileWidth}px; height:${tileHeight}px;'></div>
            <div class='flipBack' style='background:${bg};'>${content}</div>
            ${labelTotal}
        </div>
    </a>`;
}
