"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("./classes/Product");
var NoDiscount_1 = require("./classes/NoDiscount");
var FixedDiscount_1 = require("./classes/FixedDiscount");
var VariableDiscount_1 = require("./classes/VariableDiscount");
var shoppingBasket = /** @class */ (function () {
    function shoppingBasket() {
        //this array only accepts Product objects, nothing else
        this._products = [];
    }
    Object.defineProperty(shoppingBasket.prototype, "products", {
        get: function () {
            return this._products;
        },
        enumerable: false,
        configurable: true
    });
    shoppingBasket.prototype.addProduct = function (product) {
        this._products.push(product);
    };
    return shoppingBasket;
}());
var cart = new shoppingBasket();
cart.addProduct(new Product_1.Product('Chair', 25, new FixedDiscount_1.FixedDiscount("fixed", 10)));
//cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));
cart.addProduct(new Product_1.Product('Table', 50, new VariableDiscount_1.VariableDiscount("variable", 25)));
cart.addProduct(new Product_1.Product('Bed', 100, new NoDiscount_1.NoDiscount("none")));
var tableElement = document.querySelector('#cart tbody');
cart.products.forEach(function (product) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerText = product.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.originalPrice.toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.calculatePrice().toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.showCalculation();
    tr.appendChild(td);
    tableElement.appendChild(tr);
});
