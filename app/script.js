VK.init(function(){}, function(){}, 5.60);
VK.callMethod("showSettingsBox", 0);

var p = document.createElement("p");
p.innerHTML = VK.api("friends.get", {}, function(data));
document.body.appendChild(p);
