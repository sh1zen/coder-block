$files = 0;
dir . -include *.css,*.php,*.js,*.html -Recurse | % {

$files++;

}

$i=0;
$k=0;
$words=0;

dir . -include *.css,*.php,*.js,*.html -Recurse | % {

$count = (gc $_).count; 

    if ($count) {
        if($_.Extension -eq ".css"){$css = $css + [int]$count;}
        elseif($_.Extension -eq ".php"){$php = $php + [int]$count;}
        elseif($_.Extension -eq ".js"){$js = $js + [int]$count;}
        elseif($_.Extension -eq ".html"){$html = $html + [int]$count;}
    } 

    $k =  $i/$files*100;
    $k = "{0:N0}" -f $k;

    $words = ((gc $_) | Measure-Object -word).Words + $words ;

    Write-Progress -Activity "Counting lines number:" -status "File $i completed $k%" -percentComplete ($k)
    $i++;
}

 write-host "`nTotal:";
 write-host "______________________________";
 write-host "`n  Files:  $files";
 write-host "  --------------------------";
 write-host "`n  PHP  :  $php";
 write-host "`n  CSS  :  $css";
 write-host "`n  HTML :  $html";
 write-host "`n  JS   :  $js";
 write-host "______________________________";

 $tot = $js+ $css + $php + $html;
 write-host "`n`nTotal lines: $tot";
  write-host "`nTotal words: $words`n`n";

pause