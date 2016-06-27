/**
 * Created by Stas on 25.06.2016.
 */
var xhr = getXHR();

/*
 * This function creates XMLHttpRequest object to use in ajax requests
 */
function getXHR() {
    var ao;
    try {
        ao = new XMLHttpRequest();
    } catch (e) {
        return false;
    }
    return ao;
}

var All_in= function ()
{
     xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var feed = JSON.parse(xhr.responseText);
            for (var a in feed) {
                var heading = document.createElement('h1');
                heading.innerHTML = feed[a]['heading'];

                var meta = document.createElement('p');
                meta.innerHTML = feed[a]['meta'];

                var container = document.getElementById("er" + a);

                container.appendChild(heading);
                container.setAttribute('style', feed[a]['img']);
            function showData(node) {

                    function show() {
                        show.cont.innerHTML = '';
                        show.cont.appendChild(node);
                    }

                    show.cont = container;
                    show.node = node;
                    return show;
                }

                if (container.parentNode.classList.contains('four')) {
                    var p = showData(meta);
                    var h = showData(heading);
                    container.addEventListener("mouseenter", p);
                    container.addEventListener("mouseleave", h);
                }

                if (!container.parentNode.classList.contains('four'))
                    container.appendChild(meta);
            }
        }
    };
    xhr.open('POST', 'parse.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

};

window.onload = All_in;
document.getElementById('bt').addEventListener('click',All_in);
