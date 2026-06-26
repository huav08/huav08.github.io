<?php
/**
 * RSS Proxy for CORS bypass
 * 
 * Fetches an external RSS feed and returns it.
 * Only allows whitelisted domains for security.
 */

$allowed_domains = [
    'service.ema.gov.tw',
    'www.epa.ie',
    'www.simenvi.com.tw'
];

$target_url = isset($_GET['url']) ? $_GET['url'] : '';

if (empty($target_url)) {
    header("HTTP/1.1 400 Bad Request");
    echo "Missing 'url' parameter.";
    exit;
}

// Validate domain
$url_parts = parse_url($target_url);
if (!isset($url_parts['host']) || !in_array($url_parts['host'], $allowed_domains)) {
    header("HTTP/1.1 403 Forbidden");
    echo "Access to this domain is not allowed.";
    exit;
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

// SSL verification bypass for environments with SSL certificate issues
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    header("HTTP/1.1 500 Internal Server Error");
    echo "Proxy Error: " . curl_error($ch);
} else if ($http_code !== 200) {
    $status_msg = get_http_status_message($http_code);
    header("HTTP/1.1 $http_code $status_msg");
    echo "Error fetching target URL. HTTP Status: $http_code ($status_msg)";
} else {
    // Return content with appropriate XML header
    header("Content-Type: application/xml; charset=utf-8");
    echo $response;
}

curl_close($ch);

function get_http_status_message($code) {
    $status_codes = [
        200 => 'OK',
        400 => 'Bad Request',
        403 => 'Forbidden',
        404 => 'Not Found',
        500 => 'Internal Server Error'
    ];
    return isset($status_codes[$code]) ? $status_codes[$code] : 'Error';
}
