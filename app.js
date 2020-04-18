class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }   
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div'); // acento grave alt + 96
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">

                <strong>Product Name: </strong>  ${product.name}
                <strong>Product Price: </strong> ${product.price}
                <strong>Product Year: </strong>  ${product.year}

                <a href="#" class="btn btn-danger" name="delete">Delete</a>

                </div>
            </div>
        `;
        productList.appendChild(element);

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Delete successfully', 'warning');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');

        div.className = `alert alert-${cssClass} mt-2`;

        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

// DOM Events

document.getElementById('product-form').addEventListener('submit', function(event){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);
    const ui = new UI();

    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Complete los campos por favor.', 'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product added Successfully', 'success');
    //console.log(name, price, year);
    //console.log(new Product(name, price, year)); // Llamamos al objeto que creamos al inicio y ahora lo mostramos

    event.preventDefault(); // CANCELA EL COMPORTAMINETO POR DEFECTO DEL FORMULARIO (NO SE REFRESCARA LA PÁGINA).
});


document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
});