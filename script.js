const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click', (e) => { 
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click', (e) => { 
        nav.classList.remove('active');
    })
}

/*This one here prevents the scroll up effect when pressing X */
document.getElementById("close").addEventListener("click", function(event){
    event.preventDefault();
});