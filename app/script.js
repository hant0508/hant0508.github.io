VK.init(function(){}, function(){}, 5.60);

var p = document.createElement("p");
p.innerHTML = VK.callMethod("friends.get");
document.body.appendChild(p);
