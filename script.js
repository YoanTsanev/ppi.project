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


function isElementInLocalStorage(name) {
    for (let i = 0; i < localStorage.length; ++i) {
        const item = JSON.parse(localStorage.getItem(i.toString()))

        if (item == null || item == undefined)
            continue;

        if (name == item.model)
            return true;
    }

    return false;
}

function generateID() {
    const keys = Object.keys(localStorage);
    const numbers = keys.filter(item => !isNaN(item)).map(Number);

    if (numbers.length === 0)
        return 1;

    let maxNumber = Math.max(...numbers);
    
    return maxNumber + 1;
}


document.querySelector('.normal').addEventListener('click', () => {
        const id = generateID();
        const image = document.querySelector('.single-pro-image img').src.substring(22);
        const model = document.querySelector('.single-pro-details h4').textContent;
        let price = parseFloat(document.querySelector('.single-pro-details h2').textContent);
        price = parseFloat(price.toFixed(2)) + 0.99;
        

        const product = {
            id,
            image,
            model,
            price
        };

        // if (!isElementInLocalStorage(model)) 
        // {
            localStorage.setItem(id.toString(), JSON.stringify(product));
            console.log(product);
        // }
        // else
        // {
        //     const query = `quantity-${id}`;
        //     let inputElement = document.querySelector(query);
        //     console.log(inputElement);
        //     let value = parseInt(inputElement.value);
        //     // Increment the value
        //     value++;
        //     // Update the input with the new value
        //     inputElement.value = value;
        // }
    }
);


if (location.pathname === '/card.html') {
    let tbody = document.querySelector('.cart');

    function template(id, image, model, price) {
        return `<tr class="tablerow-${id}"><td><a href="#" class="linkcart"><i class="far fa-times-circle"></i></a></td><td><img src='${image}' alt=""></td><td>${model}</td><td>${price} лв.</td><td><input class="quantity-${id}" type="number" value="1"></td><td>${price} лв.</td></tr>`;
    }

    function calculateSum() {
        const keys = Object.keys(localStorage);
        let sum = 0;

        for (let i = 0; i < keys.length; ++i)
        {
            if (isNaN(parseFloat(keys[i])) || !isFinite(keys[i]))
                continue;

            const shoeObj = JSON.parse(localStorage.getItem(keys[i]));

            // const query = `quantity-${shoeObj.id}`.toString();
            // let inputElement = document.querySelector(query);

            // let value = parseInt(inputElement.value);
            sum += parseFloat(shoeObj.price.toFixed(2)); // * value;
        }

        return sum.toFixed(2);
    }

    function renderCartContent() 
    {
        const keys = Object.keys(localStorage);

        for (let i = 0; i < keys.length; ++i)
        {
            if (isNaN(parseFloat(keys[i])) || !isFinite(keys[i]))
                continue;

            const shoeObj = JSON.parse(localStorage.getItem(keys[i]));

            tbody.innerHTML += template(shoeObj.id, shoeObj.image, shoeObj.model, shoeObj.price.toFixed(2));
        }

        let tdarr = document.querySelectorAll(".totalsum");

        for (let i = 0; i < tdarr.length; ++i) {
            tdarr[i].textContent = `${calculateSum()} лв.` ;
        }
    }

    renderCartContent();

    document.querySelector('.cart').addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const className = row.classList.toString();
        const removeId = parseInt(className.split('-')[1]);

        localStorage.removeItem(removeId.toString());

        tbody.innerHTML = '';
        renderCartContent();

        if (tbody.children.length === 0) {
            localStorage.clear();
        }
    });
}