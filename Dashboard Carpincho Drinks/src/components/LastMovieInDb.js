import React, { useEffect, useState } from "react";


function LastMovieInDb() {
    const [lastProduct, setLastProduct] = useState('');

    useEffect(() => {
        fetch('http://localhost:3020/api/products')
            .then(res => res.json())
            .then(data => setLastProduct(data.data[data.data.length - 1]))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto en BD</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <p>ID: {lastProduct.id}</p>
                        <p>Nombre: {lastProduct.name}</p>
                        <p>Descripción: {lastProduct.description}</p>
                        <p>Precio: ${lastProduct.price}</p>
                        <p>Descuento: {lastProduct.discount}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastMovieInDb;


