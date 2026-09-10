<?php
/* TILERSS 0.1, can also be used as example how to pass PHP data (ex: mysql etc) to JAVASCRIPT and use it in tiles */
require_once('rss_php.php');    
$rss = new rss_php;
$rss->load('http://vc.ee.duth.gr/news_rss.php?category=news'); // FILL IN THE LINK OF YOUR RSS FEED! THIS IS AN EXAMPLE TO CHECK ITS WORKING

$rssItems = $rss->getItems(); // CHECK http://rssphp.net/documentation/v1/#RSS_PHP.getRSS TO GET MORE DATA using the API

$rssevents = new rss_php;
$rssevents->load('http://vc.ee.duth.gr/news_rss.php?category=events');

$rssEventsItems = $rssevents->getItems();

function seo_friendly_url($string){
    $string = str_replace(array('[\', \']'), '', $string);
    $string = preg_replace('/\[.*\]/U', '', $string);
    $string = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $string);
    $string = htmlentities($string, ENT_COMPAT, 'utf-8');
    $string = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $string );
    $string = preg_replace(array('/[^a-z0-9]/i', '/[-]+/') , '-', $string);
    return strtolower(trim($string, '-'));
}

/* the str_replace below is to make sure there are no "-signs in the string because they would close the "" from javascript, leading into errors and bugs!! Every " is replaced by ' */
?>
<script>
	rssNewsTitle1 = "<?php if (isset($rssItems[0])) { echo str_replace('"',"'",htmlspecialchars($rssItems[0]['title'], ENT_COMPAT));}?>";
	rssNewsTitle2 =  "<?php if (isset($rssItems[1])) { echo str_replace('"',"'",htmlspecialchars($rssItems[1]['title'], ENT_COMPAT));}?>";
	rssNewsTitle3 =  "<?php if (isset($rssItems[2])) { echo str_replace('"',"'",htmlspecialchars($rssItems[2]['title'], ENT_COMPAT));}?>";

    rssEventsTitle1 = "<?php if (isset($rssEventsItems[0])) { echo str_replace('"',"'",htmlspecialchars($rssEventsItems[0]['title'], ENT_COMPAT)); }?>";
    rssEventsTitle2 = "<?php if (isset($rssEventsItems[1])) { echo str_replace('"',"'",htmlspecialchars($rssEventsItems[1]['title'], ENT_COMPAT)); }?>";
    rssEventsTitle3 = "<?php if (isset($rssEventsItems[2])) { echo str_replace('"',"'",htmlspecialchars($rssEventsItems[2]['title'], ENT_COMPAT)); }?>";



</script>