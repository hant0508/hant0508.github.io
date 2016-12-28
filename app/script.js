VK.init(function(){}, function(){}, 5.60);
//VK.callMethod("showSettingsBox", 0);

VK.loadParams(document.location.href);
var viewer_id = VK.params.viewer_id;

VK.api("get_friends", {}, function(data) {
	document.getElementById('user_info').innerHTML = data.count + '<br />';
	data.items.forEach(function(item, i, data) {
		document.getElementById('user_info').innerHTML = item + ' ';});
});
