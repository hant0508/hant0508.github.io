function inIframe()
{
	try { return window.self !== window.top; }
	catch (e) { return true; }
}

if (inIframe())
{
	var content = document.getElementById("content");
	content.innerHTML="";
	var p = document.createElement("p");
	p.innerHTML="Здесь пока ничего нет, но скоро что-то появится;)";
//	alert("VK DETECTED");
	content.appendChild(p);
}
