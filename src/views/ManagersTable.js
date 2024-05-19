import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {tbody, thead} from "../variables/general";
// import '../assets/css/clients.css';
// import { Button } from "@/components/ui/button"
import { Button } from '@mui/base/Button';



const ManagersManagement = () => {
    const [managers, setManagers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentManager, setCurrentManager] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchManagers();
    }, []);

    const fetchManagers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/managers/view-all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setManagers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddManager = async (manager) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://swift-car-django-server-4c51acec5937.herokuapp.com/managers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(manager),
            });
            if (response.ok) {
                fetchManagers();
                setShowAddModal(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateManager = async (id, manager) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://swift-car-django-server-4c51acec5937.herokuapp.com/managers/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(manager),
            });
            if (response.ok) {
                fetchManagers();
                setShowUpdateModal(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteManager = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://swift-car-django-server-4c51acec5937.herokuapp.com/managers/remove/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                fetchManagers();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const filteredManagers = managers.filter((manager) =>
        Object.values(manager).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
                <div className="panel overflow-x-auto">
                    <>
                        <PanelHeader size="sm" />
                        <div className="content">
                            <Row>
                                <Col xs={12}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle tag="h4">Table des Managers</CardTitle>
                                            <div className="intro-section dark:bg-gray-800 dark:text-white">
                                                <p>Click on the "New Manager" button to add a new client to your list.</p>
                                                <button
                                                    className="btn btn-secondary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setShowAddModal(true)}>
                                                    Ajouter Manager
                                                </button>
                                            </div>

                                        </CardHeader>
                                        <CardBody>
                                            <Table responsive>
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Date of Birth</th>
                                                    <th>Gender</th>
                                                    <th>Contact Number</th>
                                                    <th>Address</th>
                                                    <th>Agency ID</th>
                                                    <th>Salary</th>
                                                    <th>CIN</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {filteredManagers.map((manager) => (
                                                    <tr key={manager._id}>
                                                        <td>{manager._id}</td>
                                                        <td>{manager.name}</td>
                                                        <td>{manager.date_of_birth}</td>
                                                        <td>{manager.gender}</td>
                                                        <td>{manager.contact_number}</td>
                                                        <td>{manager.address}</td>
                                                        <td>{manager.agence_id}</td>
                                                        <td>{manager.salary}</td>
                                                        <td>{manager.cin}</td>
                                                        <td>{manager.email}</td>
                                                        <td>
                                                            <ul className="action-list row">
                                                                <button className="col btn btn-success fa fa-edit" data-tip="edit" onClick={() => { setCurrentManager(manager); setShowUpdateModal(true); }}></button>
                                                                <button className="col btn btn-danger" data-tip="delete" onClick={() => handleDeleteManager(manager._id)}><i className="fa fa-trash"></i></button>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </>


                {/* Modal for Adding Manager */}
                {showAddModal && (
                    <div id="addManagerModal" className="modal" style={{ display: 'block' }}>
                        <div className="modal-content dark:bg-gray-800 dark:text-white">
                            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
                            <h2 className="text-xl font-semibold mb-4">Add New Manager</h2>
                            <AddManagerForm onSubmit={handleAddManager} />
                        </div>
                    </div>
                )}

                {/* Modal for Updating Manager */}
                {showUpdateModal && (
                    <div id="updateManagerModal" className="modal" style={{ display: 'block' }}>
                        <div className="modal-content dark:bg-gray-800 dark:text-white">
                            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
                            <h2 className="text-xl font-semibold mb-4">Update Manager</h2>
                            <UpdateManagerForm manager={currentManager} onSubmit={handleUpdateManager} />
                        </div>
                    </div>
                )}
            </div>
    );
};

const AddManagerForm = ({ onSubmit }) => {
    const [manager, setManager] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
        contact_number: '',
        address: '',
        agence_id: '',
        salary: '',
        cin: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setManager((prevManager) => ({ ...prevManager, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(manager);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={manager.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value={manager.date_of_birth} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={manager.gender} onChange={handleChange} className="form-control" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact_number" value={manager.contact_number} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" value={manager.address} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Agency ID</label>
                <input type="text" name="agence_id" value={manager.agence_id} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Salary</label>
                <input type="number" name="salary" value={manager.salary} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>CIN</label>
                <input type="text" name="cin" value={manager.cin} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={manager.email} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

const UpdateManagerForm = ({ manager, onSubmit }) => {
    const [updatedManager, setUpdatedManager] = useState(manager);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedManager((prevManager) => ({ ...prevManager, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(manager._id, updatedManager);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={updatedManager.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value={updatedManager.date_of_birth} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={updatedManager.gender} onChange={handleChange} className="form-control" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Contact Number</label>
                <input type="text" name="contact_number" value={updatedManager.contact_number} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" value={updatedManager.address} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Agency ID</label>
                <input type="text" name="agence_id" value={updatedManager.agence_id} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Salary</label>
                <input type="number" name="salary" value={updatedManager.salary} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>CIN</label>
                <input type="text" name="cin" value={updatedManager.cin} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={updatedManager.email} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default ManagersManagement;
