<?php
session_start();
$sCode = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";
$aCode = explode(",", $sCode);
$aLength = count($aCode);
$checkcode = "";
for ($i = 0; $i < 5; $i++) {
    $j = rand(0, $aLength - 1);
    $checkcode .= $aCode[$j];
}
$_SESSION['captcha_code'] = strtolower($checkcode);
echo strtolower($checkcode);