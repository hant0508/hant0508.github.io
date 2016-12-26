function inIframe()
{
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

alert("I'm alive!")
if (inFrame()) alert("VK DERECTED");
