var comment;
var time;
var url = document.getElementById("url");
var res = document.getElementById("result");

function seconds(data) {
	var parsed = $.parseHTML(data.responseText);
	var commentTime = $(parsed).find(comment).find("time").first().attr("datetime");
	var postTime = $(parsed).find(".story__date").attr("title");
	time = commentTime - postTime;
	console.log(time);
	out();
}

function out() {
	var sec = " секунд";
	if (time % 100 < 10 || time % 100 > 20) {
		if (time % 10 == 1) sec += "a";
		else if (time % 10 < 5) sec += "ы";
	}
	res.innerHTML = time + sec;
	url.focus();
	url.select();
}

document.forms.url.onsubmit = function() {
	var str = url.value;
	var post = str.slice(0, str.indexOf('#'));
	comment = '#'+str.slice(str.indexOf('#')+1);
	res.innerHTML = "Считаем секунды, ожидайте..."
	$.get(post, seconds, "html");
	return false;
}
