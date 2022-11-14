import React, { useEffect, useState } from "react";


function LastUserInDB() {
    const [lastUser, setLastUser] = useState('');

    useEffect(() => {
        fetch('http://localhost:3020/api/users')
            .then(res => res.json())
            .then(data => setLastUser(data.data[data.data.length - 1]))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último usuario registrado en BD</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <p>ID: {lastUser.id}</p>
                        <p>Nombre: {lastUser.user_name}</p>
                        <p>Email: {lastUser.user_email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastUserInDB;
