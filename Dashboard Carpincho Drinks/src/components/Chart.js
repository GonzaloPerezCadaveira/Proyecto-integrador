import React, { useEffect, useState } from "react";
import ChartRow from './ChartRow';

function Chart() {

    const [genres, setGenres] = useState('');

    useEffect(() => {
        fetch('http://localhost:3020/api/products')
            .then(res => res.json())
            .then(data => setGenres(data.data.cat_name.length))
            .catch(e => console.log(e))
    }, [])


    return (
        /* <!-- DataTales Example --> */
        <div className="libros-en-db card shadow mb-4">
            <div className="card-body-categories">
                <div className="card-body-categories table-responsive">
                    <table className="table table-bordered " id="dataTable" width="100%" cellSpacing="0">
                        <thead className="titulos-categorias">
                            <tr>
                                <th><h5 className="m-0 font-weight-bold titulos-en-blanco">Categorías</h5></th>
                                <th><h5 className="m-0 font-weight-bold titulos-en-blanco">Total de productos</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.values(genres).map((row, i) => {
                                    return <ChartRow {...row} key={i} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div >

    )
}

export default Chart;