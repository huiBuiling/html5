var i=0;

function timedCount()
{
	i=i+1;
	postMessage(i);  // 向HTML页面传回一段消息。
	setTimeout("timedCount()",1000);
}

timedCount();