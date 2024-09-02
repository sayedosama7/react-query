/* eslint-disable no-mixed-operators */
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useAddUers, useFetchUsers } from '../../Hooks/useAddUsers';
import NavBar from '../../Components/NavBar/NavBar';
import { Loading } from "../../Components/Loading/Loading";

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const { mutate: add } = useAddUers();

    const { isLoading, data, error, isError, isFetching } = useFetchUsers();

    const addUsers = () => {
        const maxId = data?.data.reduce((max, user) => Math.max(max, parseInt(user.id)), 0);
        const newId = (maxId + 1).toString();
        const user = { id: newId, username, email };
        console.log(user);
        add(user);
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1>AddUser</h1>
                    </div>
                    <div className="col-md-12 mb-5">
                        <div className="d-flex mb-3">
                            <FloatLabel>
                                <InputText className='p-2 mr-2' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label htmlFor="username">Username</label>
                            </FloatLabel>

                            <FloatLabel>
                                <InputText className='p-2' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label htmlFor="email">Email</label>
                            </FloatLabel>
                        </div>

                        <button onClick={addUsers} className="w-25 d-block btn btn-info">Add User</button>
                    </div>
                    <h1>Users</h1>
                    {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
                    {isError && <h2 className='text-danger'>Error: {error.message}</h2>}
                    {!isLoading && !isError && (
                        data?.data.map((user) => (
                            <div key={user.id} className='col-lg-3 col-md-6 mb-4'>
                                <div className='p-3 border rounded h-100'>
                                    <p>
                                        <span>ID : </span>
                                        {user.id}
                                    </p>
                                    <p>
                                        <span>Name : </span>
                                        {user.username}
                                    </p>
                                    <p>
                                        <span>Email : </span>
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUser;
