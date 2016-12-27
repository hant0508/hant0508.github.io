VK.init(function(){}, function(){}, 5.60);
VK.callMethod("showSettingsBox", 0);

var p = document.createElement("p");

function f(data)
{
	p.innerHTML = data;
}

VK.api("friends.get", {}, f(data));
document.body.appendChild(p);
