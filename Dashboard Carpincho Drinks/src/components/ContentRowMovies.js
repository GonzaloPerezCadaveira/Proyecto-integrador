import React, { useEffect, useState } from "react";
import SmallCard from './SmallCard';


function ContentRowMovies() {
    const [bebidas, setBebidas] = useState('');
    const [users, setUsers] = useState('');
    const [categories, setCategories] = useState('');

    useEffect(() => {
        console.log('%cse monto el componente', 'color:yellow');
        fetch('http://localhost:3020/api/products')
            .then(res => res.json())
            .then(data => setBebidas(data.meta.count))
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3020/api/users')
            .then(res => res.json())
            .then(data => setUsers(data.meta.count))
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3020/api/products')
            .then(res => res.json())
            .then(data => setCategories(data.countByCategory.length))
            .catch(e => console.log(e))
    }, [])


    const resumen_totales = [{
        title: "Total de productos",
        count: bebidas,
        color: 'warning',
        icon: "fa-beer"
    }, {
        title: "Total de Usuarios",
        count: users,
        color: 'warning',
        icon: 'fa-user-check'
    }, {
        title: "Total de Categorias",
        count: categories,
        color: 'warning',
        icon: 'fa-star'
    }];

    return (
        <React.Fragment>

            <div className="row">

                {resumen_totales.map((item, i) => {

                    return <SmallCard {...item} key={i} />

                })}

            </div>
        </React.Fragment>
    )
}

export default ContentRowMovies;