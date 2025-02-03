import React from "react";

const ProductList = ({ products, deleteProduct }) => {

    return (
        <div>
            <h1>Product List</h1>
            <ul className="p-2 grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <li className=" border border-gray-100 rounded-lg p-5 shadow-xl" key={product.id}>
                        <h2 className="font-bold text-xl text-center" >{product.name}</h2>
                        <p className="my-2">{product.description}</p>
                        <p className="my-2 float-end">{product.price} €</p>
                        <img src={product.imagen} alt="imagen" width={100} height={100} className="rounded-lg w-full" />
                        <button className="bg-red-500 w-full hover:bg-red-700 text-white px-2 p-1 rounded-full " type="button" onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
