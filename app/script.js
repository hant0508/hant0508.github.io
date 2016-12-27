VK.init(function(){}, function(){}, 5.60);
VK.callMethod("showSettingsBox", 0);

var p = document.createElement("p");
VK.api("friends.get", {}, function(data))
{
	p.innerHTML = data;
}
document.body.appendChild(p);
