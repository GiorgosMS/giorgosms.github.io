"use strict";

// Slideshow Tile Plugin
$.plugin($init, {
    nextSlideshow: function(id, dir) {
        clearTimeout(timers[id]);
        const $id = $(`#${id}`);
        const group = $id.data("group");
        const speed = $id.data("speed");
        
        if ($page.current === "home" && scrolling === false && ((group === $group.current || group === $group.current + 1) || mobile)) {
            if (!dir) dir = 1;
            let slide = $id.data("slide");
            const images = $id.data("images");
            const effect = $id.data("effect");
            
            slide = ((slide + 2) > images.length) ? 0 : slide + 1;
            
            const $idBack = $(`#${id}_back`);
            
            switch (effect) {
                case "fade":
                    $idBack.attr("src", $id.attr("src"))
                        .stop(true, true).show()
                        .fadeOut(500);
                    $id.stop(true, true).hide().attr("src", images[slide])
                        .fadeIn(500);
                    break;
                    
                case "slide":
                    $idBack.attr("src", $id.attr("src")).css("left", 0)
                        .stop(true, true).animate({ left: dir * $id.width() }, 500);
                    $id.attr("src", images[slide]).stop(true, true)
                        .css("left", -dir * $id.width()).animate({ left: 0 }, 500);
                    break;
                    
                case "fadeslide":
                    $idBack.attr("src", $id.attr("src")).css("left", 0)
                        .stop(true, true).animate({ left: dir * $id.width() }, 500);
                    $id.hide().attr("src", images[slide]).stop(true, true).fadeIn(600);
                    break;
                    
                case "flipvertical": {
                    const margin = $id.parent().height() / 2;
                    const height = $id.parent().height();
                    const width = $id.parent().width();
                    
                    $idBack.css({ height: "0px", width: `${width}px`, marginTop: `${margin}px`, opacity: "0.5" });
                    $id.stop(true, false).animate(
                        { height: "0px", width: `${width}px`, marginTop: `${margin}px`, opacity: "0.5" },
                        400,
                        function() {
                            $idBack.attr("src", $id.attr("src"))
                                .animate({ height: `${height}px`, width: `${width}px`, marginTop: "0px", opacity: "1" }, 400);
                        }
                    );
                    $idBack.stop(true, false).animate({ height: "0px" }, 400, function() {
                        $id.attr("src", images[slide])
                            .animate({ height: `${height}px`, width: `${width}px`, marginTop: "0px", opacity: "1" }, 400);
                    });
                    break;
                }
                    
                case "fliphorizontal": {
                    const marginH = $id.parent().width() / 2;
                    const widthH = $id.parent().width();
                    const heightH = $id.parent().height();
                    
                    $idBack.css({ width: "0px", height: `${heightH}px`, marginLeft: `${marginH}px`, opacity: "0.5" });
                    $id.stop(true, false).animate(
                        { width: "0px", height: `${heightH}px`, marginLeft: `${marginH}px`, opacity: "0.5" },
                        400,
                        function() {
                            $idBack.attr("src", $id.attr("src"))
                                .animate({ width: `${widthH}px`, height: `${heightH}px`, marginLeft: "0px", opacity: "1" }, 400);
                        }
                    );
                    $idBack.stop(true, false).animate(
                        { width: "0px", height: `${heightH}px`, marginLeft: `${marginH}px`, opacity: "0.5" },
                        400,
                        function() {
                            $id.attr("src", images[slide])
                                .animate({ width: `${widthH}px`, height: `${heightH}px`, marginLeft: "0px", opacity: "1" }, 400);
                        }
                    );
                    break;
                }
            }
            
            $id.data("slide", slide);
        }
        
        if (speed !== 0) {
            timers[id] = window.setTimeout(() => $init.nextSlideshow(id), speed);
        }
    }
});

$.plugin($onSiteLoad, {
    slideShowArrowInit: function() {
        $(document).on("mouseenter mouseleave", "#sl_arrowLeft, #sl_arrowRight", function(e) {
            $(this).stop().fadeTo(200, e.type === "mouseenter" ? 1 : 0.4);
        }).on("click", "#sl_arrowLeft", function() {
            const $img = $(this).parent("a").find(".tileSlideshowImage");
            let slide = $img.data("slide");
            
            if ((slide - 1) < 0) {
                slide = $img.data("images").length - 2;
            } else {
                slide -= 2;
            }
            
            $img.data("slide", slide).data("lastClick", new Date().getTime());
            $init.nextSlideshow($img.attr("id"), -1);
        }).on("click", "#sl_arrowRight", function() {
            const $img = $(this).parent("a").find(".tileSlideshowImage");
            let slide = $img.data("slide");
            
            if ((slide + 1) > $img.data("images").length) {
                slide = 0;
            }
            
            $img.data("slide", slide).data("lastClick", new Date().getTime());
            $init.nextSlideshow($img.attr("id"), 1);
        });
    }
});

function tileSlideshow(group, x, y, width, height, bg, linkPage, speed, arrows, effect, images, labelSettings, optClass) {
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
    
    const sid = `slideshow_${(group + "" + x + "" + y).replace(/\./g, "_")}`;
    const arrow = arrows 
        ? '<img id="sl_arrowRight" src="/img/arrows/simpleArrowRight.png"><img id="sl_arrowLeft" src="/img/arrows/simpleArrowLeft.png">'
        : "";
    
    const tileWidth = width * $tile.scalespacing - $tile.spacing;
    const tileHeight = height * $tile.scalespacing - $tile.spacing;
    const marginTop = (y * $tile.scalespacing) + 45;
    const marginLeft = x * $tile.scalespacing + group * $group.spacing;
    
    $page.content += `<a ${makeLink(linkPage)} class='tileSlideshow tile group${group} ${optClass}' style='
        margin-top:${marginTop}px; margin-left:${marginLeft}px;
        width: ${tileWidth}px; height:${tileHeight}px;
        background:${bg};'>
        <img class='tileSlideshowImageBack' id='${sid}_back' src='${images[0]}'>
        <img class='tileSlideshowImage' id='${sid}' src='${images[0]}'>
        ${arrow}
        ${labelText}
    </a>`;
    
    $.plugin($afterTilesAppend, {
        run: function() {
            $(`#${sid}`).data("slide", 0).data("images", images).data("group", group).data("speed", speed).data("effect", effect);
            // Preload images
            $.each(images, (i, val) => $("<img/>").attr("src", val));
        }
    });
    
    timers[sid] = setTimeout(() => $init.nextSlideshow(sid), speed);
}
