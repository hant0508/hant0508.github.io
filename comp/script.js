var form = document.forms.word;
var word;
var dic = [];

form.onsubmit = function()
{
	var value = form.elements[0].value;
	if (value == '') return false;
	word = value.toLowerCase();
	run();
	return false;
};

function load()
{
    var oFrame = document.getElementById("dic");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    dic = strRawContents.split("\n");
    for (var i = 0; i < dic.length; i++)
        var curLine = dic[i];
}

function run()
{
	var number = 0;
	var res = document.getElementById("words");
	if (typeof(res) != 'undefined' && res != null)
	{
			res.parentNode.removeChild(res);
			res = document.createElement ("p");
			res.id = "words";
	}

	for (var j = 0; j < dic.length - 1; ++j)
	{
		var s = dic[j];
		var c = [];
		for (var i = 0; i < 50; ++i)
			c[i] = false;
		var n = 0;

		for (var i = 0; i < s.length; ++i)
			for (var k = 0; k < word.length; ++k)
				if (s[i] == word[k] && c[k] == false)
				{
					c[k] = true;
					++n;
					break;
				}

		if (n == s.length && s != word)
		{
			++number;
			res.appendChild (document.createTextNode (s));
			res.appendChild (document.createElement ("br"));
		}
	} 

	document.getElementById("results").appendChild(res);
	document.getElementById("counter").innerHTML = "Составлено слов: " + number;
}
