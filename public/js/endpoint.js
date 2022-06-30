var BASE_URL = ""; 
var ROOT_URL = ""; 
var SITE_VIEW;

if(location.hostname.indexOf("test") > -1 ||  location.hostname.indexOf("192") >  -1 || location.hostname.indexOf("localhost") > -1) {
 SITE_VIEW = "http://test.propzy.vn";
}
else
{
	SITE_VIEW = "http://propzy.vn";	
}