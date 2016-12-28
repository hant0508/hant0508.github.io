VK.init(function(){}, function(){}, 5.60);
//VK.callMethod("showSettingsBox", 0);

VK.loadParams(document.location.href);
var viewer_id = VK.params.viewer_id;

VK.api("friends.get", {}, function(data)
	{
		document.getElementById('user_info').innerHTML = data.response.count + "<br />";
		data.response.items.forEach(function(item, i, data)
		   	{
				var node = document.createTextNode(item + ' ');
				document.getElementById("user_info").appendChild(node);
			});
	});
