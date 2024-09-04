/* eslint-disable no-mixed-operators */
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { useAddUers, useFetchUsers, useDeleteUser, useUpdateUser } from '../../Hooks/useAddUsers';
import NavBar from '../../Components/NavBar/NavBar';
import { Loading } from "../../Components/Loading/Loading";

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    const { mutate: add } = useAddUers();
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: updateUser } = useUpdateUser();

    const { isLoading, data, error, isError, isFetching } = useFetchUsers();
    const imageInputRef = useRef(null);

    const addUsers = () => {
        const maxId = data?.data.reduce((max, user) => Math.max(max, parseInt(user.id)), 0);
        const newId = (maxId + 1).toString();

        const user = { id: newId, username, email, img: image };
        add(user);
        setUsername('');
        setEmail('');
        setImage(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    const handleDelete = (userId) => {
        deleteUser(userId);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        setEmail(user.email);
        setImage(user.img);
    };

    const handleUpdate = () => {
        if (editingUser) {
            const updatedUser = { ...editingUser, username, email, img: image };
            updateUser(updatedUser);
            setEditingUser(null);
            setUsername('');
            setEmail('');
            setImage(null);
            if (imageInputRef.current) {
                imageInputRef.current.value = '';
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <NavBar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h1>{editingUser ? 'Edit User' : 'Add User'}</h1>
                    </div>
                    <div className="col-md-12 mb-5">
                        <div className="d-flex mb-3">
                            <FloatLabel>
                                <InputText className='p-2 mr-2' id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <label htmlFor="username">Username</label>
                            </FloatLabel>

                            <FloatLabel>
                                <InputText className='p-2' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor="email">Email</label>
                            </FloatLabel>

                            <div className="form-group">
                                <input
                                    type="file"
                                    className='ml-2'
                                    id="image"
                                    onChange={handleImageChange}
                                    ref={imageInputRef}
                                />
                            </div>
                        </div>

                        {editingUser ? (
                            <button onClick={handleUpdate} className="w-25 d-block btn btn-success">Update User</button>
                        ) : (
                            <button onClick={addUsers} className="w-25 d-block btn btn-info">Add User</button>
                        )}
                    </div>
                    <h1>Users</h1>
                    {isLoading || isFetching ? (
                        <h2 className='pt-4 p-2'><Loading /></h2>
                    ) : isError ? (
                        <h2 className='text-danger'>Error: {error.message}</h2>
                    ) : (
                        data && data.data && data.data.length > 0 ? (
                            data.data.map((user) => (
                                <div key={user.id} className='col-lg-4 col-md-6 mb-4'>
                                    <div className='p-3 border rounded h-100 bg-light'>
                                        {user.img && (
                                            <img className="img-fluid mb-2 h-50 rounded-4 w-100" src={user.img} alt="img" />
                                        )}
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

                                        <div>
                                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger mt-2">
                                                <i className="fas fa-trash-can fa-lg"></i>
                                            </button>
                                            <button onClick={() => handleEdit(user)} className="btn btn-primary mt-2 ml-2">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2>No users found.</h2>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUser;
