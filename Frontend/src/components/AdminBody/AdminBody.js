/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './AdminBody.css';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios'
import { adminBaseUrl, userBaseUrl } from '../../utils/const';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { AdminUsersFetchSuccess, getUsers } from '../../Redux/admin/adminUsers';
import { adminAxiosInstance, axiosInstance } from '../../axios';



function AdminBody() {

    const [users, setusers] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState({});
    const [showDelete, setShowDelete] = useState({});

    const dispatch = useDispatch();



    const handleShowEdit = (userId) => {
        setShowEdit((prevShowEdit) => ({
            ...prevShowEdit,
            [userId]: true,
        }));
    }

    const handleCloseEdit = (userId) => {
        setShowEdit((prevShowEdit) => ({
            ...prevShowEdit,
            [userId]: false,
        }));
    }

    const handleShowDelete = (userId) => {
        setShowDelete((prevState) => ({
            ...prevState,
            [userId]: true,
        }));
    };
    const handleCloseDelete = (userId) => {
        setShowDelete((prevState) => ({
            ...prevState,
            [userId]: false,
        }));
    };

    const handleCloseAdd = () => {
        setShowAdd(false);
    };
    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const [updateUI, setUpdateUI] = useState(false);
    const [search, setSearch] = useState('');
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')


    useEffect(() => {
        axios.post(`${adminBaseUrl}/getUser`).then((response) => {
            console.log(response.data);
            setusers(response.data);
        })
    }, [updateUI]);

    
    //Search
    const handleSearch = () => {
        axiosInstance.post(`${adminBaseUrl}/search`, { search: search }).then((response) => {
            console.log(response,"serach response")
            if(response.data.length>=1){
                dispatch(AdminUsersFetchSuccess(response.data.users));
            }else {
                dispatch(getUsers());
                throw new Error("No users Found");
            }
            setSearch('')
            setusers(response.data)
        })
    }


    // Edit 
    const handleEdit = (id) => {
        adminAxiosInstance.post(`${adminBaseUrl}/editUser/${id}`, { name: name, phone: phone, email: email }).then((response) => {
            console.log(response.data);
            setName('');
            setPhone('');
            setEmail('');
            setUpdateUI((prevState) => !prevState)
            handleCloseEdit(id)
        })
    }

    // Delete 
    const handleDelete = (id) => {
        axiosInstance.get(`${adminBaseUrl}/deleteUser/${id}`)
            .then((res) => {
                console.log(res,"response vanuuuuuu");
                setUpdateUI((prevState) => !prevState)
                handleCloseDelete(id);
            })
    }

    // Add 
    const handleAdd = () => {
        axiosInstance.post(`${userBaseUrl}/signup`, { name: name, phone: phone, email: email, password: password })
            .then((res) => {
                console.log(res.data)
                setName('')
                setPhone('')
                setEmail('')
                setPassword('')
                if (res.data.err) {
                    setErr(res.data.err)
                } else {
                    setUpdateUI((prevState) => !prevState)
                    handleCloseAdd()
                }
            })
            .catch((err) => {
                console.log(err, 'signup post error ')
            })
    }


    return (

        <Container>
            <div className="admin-body">

                <Table striped bordered hover>
                    <thead className="table-header">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button onClick={() => handleShowEdit(user._id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleShowDelete(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <form className='searchUser'>
                <div className="mt-1 input-group">
                    <div className="form-outline">
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            type="search" name="name" id="form1" className="form-control" />
                    </div>
                    <button onClick={handleSearch} type='button' className="btn btn-primary">
                        Search
                    </button>
                    <span style={{ marginLeft: '12px' }}></span>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={() => { setUpdateUI((prevState) => !prevState) }} className="btn btn-primary" >
                        Show All users
                    </a>
                </div>
            </form>

            <div className='addUser'>
            <a className="ml-4" data-toggle="modal" data-target="#exampleModal">
                <button type="button" onClick={handleShowAdd} className="addbtn btn btn-secondary btn1 margin">
                    Add User
                </button>
            </a>
            </div>

            {/* Edit Modal */}
            {users.map((user) => (
                <Modal show={showEdit[user._id]} onHide={() => handleCloseEdit(user._id)} centered key={user._id}>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="text-dark">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input
                                        value={name !== '' ? name : user.name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        style={{ color: 'black' }}
                                        className="border"
                                        id="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-form-label">
                                        Email:
                                    </label>
                                    <input
                                        value={email !== '' ? email : user.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        name="email"
                                        className="border"
                                        id="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile" className="col-form-label">
                                        Mobile Number:
                                    </label>
                                    <input
                                        value={phone !== '' ? phone : user.phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="tel"
                                        maxLength="10"
                                        name="mobile"
                                        className="border"
                                        id="mobile"
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseEdit(user._id)}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleEdit(user._id)} variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            ))
            }

            {/* Delete Modal */}
            {users.map((user) => (
                <Modal key={user._id} show={showDelete[user._id]} onHide={() => handleCloseDelete(user._id)} centered>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Do you want to delete user <b className="text-dark">{user.name}</b>?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => handleCloseDelete(user._id)}>
                                Cancel
                            </Button>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={() => { handleDelete(user._id) }} className="btn btn-danger">
                                Delete
                            </a>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            ))}


            {/* Add User */}
            <Modal show={showAdd} onHide={handleCloseAdd} centered>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="text-dark"  >
                            <div className="form-group">
                                <label htmlFor="name" className="col-form-label">
                                    Name:
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text" name="name" style={{ color: 'black' }} className="border" id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-form-label">
                                    Email:
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text" name="email" className="border" id="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile" className="col-form-label">
                                    Mobile Number:
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel" maxLength="10" name="mobile" className="border" id="mobile" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-form-label">
                                    Password:
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="text" name="password" className="border" id="password" />
                            </div>
                            {
                                err ? <div id="msg" className="alert alert-danger ml-4 ">{err}</div> : ''
                            }
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={handleCloseAdd}>
                                    Close
                                </Button>
                                <Button onClick={handleAdd} type="button" variant="primary">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal.Dialog>
            </Modal>

        </Container>


    )

}

export default AdminBody;
