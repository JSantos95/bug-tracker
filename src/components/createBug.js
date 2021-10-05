import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateBug = () => {
    const [bugName, setBugName] = useState('');
    const [username, setUsername] = useState('JSantos');
    const [description, setDescription] = useState('');
    const [assginee, setAssginee] = useState('');
    const [priority, setPriority] = useState('Low');
    const [users, setUsers] = useState(["-"]);

    const onSubmit = (e) => {
        e.preventDefault();
        const bug = {
            bugName,
            reporter: username,
            description,
            priority,
            assginee,
        }
        console.log(bug);
        axios.post('http://localhost:5000/bugs/add', bug)
            .then((res) => console.log(res.data));

        window.location = '/';
    }

    useEffect(() => {
        //call to the the db for the user
        axios.get('http://localhost:5000/users')
            .then((res) => {
                const names = res.data.map(user => user.username);
                setUsers(["-", ...names]);
            })
    }, [])

    return (
        <div>
            <h2>Create A New Bug</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="bugName">Bug Name: </label>
                    <input type="text" value={bugName} name="bugName" 
                        className="form-control" placeholder="Enter Bug Name"
                        onChange={e => setBugName(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description">Description: </label>
                    <input type="text" value={description} name="description" 
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
    )
}

export default CreateBug;