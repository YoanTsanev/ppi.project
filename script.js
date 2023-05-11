//import { productArray } from './cart.js'


const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
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


document.querySelector('.normal').addEventListener('click', () => {
        // Get the data from the div with class "description"
        const image = document.querySelector('.single-pro-image img').src.substring(22);
        const model = document.querySelector('.single-pro-details h4').textContent;
        let price = parseFloat(document.querySelector('.single-pro-details h2').textContent);
        price = parseFloat(price.toFixed(2)) + 0.99;

        // Create an object with the data
        const product = {
            image,
            model,
            price
        };

        localStorage.setItem(localStorage.length.toString(), JSON.stringify(product));
    }
);


if (location.pathname === '/card.html') {
    function template(image, model, price) {
        return `<tr class="tablerow"><td><a href="#" class="linkcart"><i class="far fa-times-circle"></i></a></td><td><img src='${image}' alt=""></td><td>${model}</td><td>${price} лв.</td><td><input type="number" value="1"></td><td>${price} лв.</td></tr>`;
    }

    for (let i = 0; i < localStorage.length; ++i) {
        if (JSON.parse(localStorage.getItem(i.toString())) == null)
            continue;
    
        productArray.push(JSON.parse(localStorage.getItem(i.toString())))
    }

    let sum = 0;
    let tbody = document.querySelector('.cart');

    for (let i = 0; i < productArray.length; ++i) {
        if (productArray[i] == null)
            continue;

        sum += productArray[i].price;

        tbody.innerHTML += template(productArray[i].image, productArray[i].model, productArray[i].price);
    }

    let tdarr = document.querySelectorAll(".totalsum");

    for (let i = 0; i < tdarr.length; ++i) {
        tdarr[i].textContent = `${sum} лв.` ;
    }

    document.querySelector('.cart').addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target.classList.contains('.linkcart')) {
            const td = event.target.parentNode;
            td.parentNode.removeChild(td);
        }
    });

    if (tbody.children.length === 0) {
        localStorage.clear();
    }
}



{/* <tr>
        <td><a href="#" class="linkcart"><i class="far fa-times-circle"></i></a></td>
        <td><img src="img/products/nike/NIKE Обувки AIR WINFLO 9/1.png" alt=""></td>
        <td>NIKE AIR WINFLO 9</td>
        <td>199,99 лв.</td>
        <td><input type="number" value="1"></td>
        <td>199,99 лв.</td>
    </tr>

                <tr>
                    <td><a href="#" class="linkcart"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="img/products/adidas/ADIDAS PERFORMANCE Обувки EQ19 Run/1.png" alt=""></td>
                    <td>ADIDAS PERFORMANCE EQ19 Run</td>
                    <td>249,99 лв.</td>
                    <td><input type="number" value="1"></td>
                    <td>249,99 лв.</td>
                </tr>

                <tr>
                    <td><a href="#" class="linkcart"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="img/products/nike/NIKE Обувки DOWNSHIFTER 12/3.png" alt=""></td>
                    <td>NIKE DOWNSHIFTER 12</td>
                    <td>149,99 лв.</td>
                    <td><input type="number" value="1"></td>
                    <td>149,99 лв.</td>
                </tr> */}