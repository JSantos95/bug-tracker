import axios from "axios";
import { Redirect } from "react-router";
import React, { useState, useEffect } from "react";

const CreateBug = () => {
    const [bugName, setBugName] = useState('');
    const [username, setUsername] = useState('');
    const [type, setType] = useState('Bug');
    const [description, setDescription] = useState('');
    const [assginee, setAssginee] = useState('');
    const [priority, setPriority] = useState('Low');
    const [users, setUsers] = useState(["-"]);
    const [toAuth, setToAuth] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const bug = {
            bugName,
            reporter: username,
            type,
            description,
            priority,
            assginee,
        }
        console.log(bug);
        axios.post('https://bug-tracker-project1.herokuapp.com/bugs/add', bug)
            .then((res) => console.log(res.data))
            .catch((err) => console.log("no user",err));
        window.location = '/bug';
    }

    useEffect(() => {
        //get all users
        axios.get('https://bug-tracker-project1.herokuapp.com/api/auth')
            .then((res) => {
                const names = res.data.map(user => user.username);
                setUsers(["-", ...names]);
            })
        //get user info
        axios.get('https://bug-tracker-project1.herokuapp.com/api/private', {headers: {Authorization: `Bearer ${sessionStorage.token}`}})
            .then((res) => {
                setUsername(res.data.data.username);
            })
    }, [])

    return (
        <div>
            {toAuth && <Redirect to="/user" />}
            {
                !sessionStorage.token ? 
                <div className="container-fluid">
                    <div className="col-5 mx-auto">
                        <h1>Sign In to see your bugs!</h1>
                        <button className="btn btn-primary" onClick={setToAuth(true)}>
                            Sign In
                        </button>
                    </div>
                </div> :
                <div className="container">
                    <h2 className="col-5 mx-auto">Create A New Bug</h2>
                    <div className="container">
                        <form onSubmit={onSubmit} className="col-5 mx-auto">
                            <div className="mb-3">
                                <label htmlFor="bugName">Bug Name: </label>
                                <input type="text" value={bugName} name="bugName" 
                                    className="form-control" placeholder="Enter Bug Name"
                                    onChange={e => setBugName(e.target.value)} 
                                />
                            </div>

                            <div className="mb-3">
                                <label>Type: </label>
                                <select className="form-control" 
                                    onChange={e => setType(e.target.value)}
                                >
                                    <option value={"Bug"}>Bug</option>
                                    <option value={"Task"}>Task</option>
                                    <option value={"Feature"}>Feature</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Description: </label>
                                <textarea type="text" value={description} name="description" 
                                    className="form-control" placeholder="Enter Description"
                                    onChange={e => setDescription(e.target.value)} 
                                />
                            </div>

                            <div className="mb-3">
                                <label>Priority: </label>
                                <select className="form-control" 
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value={"Low"}>Low</option>
                                    <option value={"Med"}>Med</option>
                                    <option value={"High"}>High</option>
                                </select>
                            </div>

                            <div className='mb-3'>
                                <label>Assginee: (Optional)</label>
                                <select className="form-control"
                                    onChange={e => setAssginee(e.target.value)}
                                >
                                    { users.map((user, index) => <option key={index}>{user}</option>) }
                                </select>
                            </div>

                            <input className="btn btn-primary" type="submit"/>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreateBug;