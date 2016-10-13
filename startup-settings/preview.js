var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var imgs = document.getElementsByClassName("preview");
console.log(imgs.length);

function preview (img)
{
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

modal.onclick = function()
{ 
    modal.style.display = "none";
}
