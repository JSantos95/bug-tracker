import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewBug = () => {
    const [bugName, setBugName] = useState('');
    const [username, setUsername] = useState('JSantos');
    const [description, setDescription] = useState('');
    const [assginee, setAssginee] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('Low');
    const [users, setUsers] = useState(["-"]);
    const [viewMode, setMode] = useState(true);
    let { id } = useParams();

    //call to the db for user and bug info
    useEffect(() => {
        axios.get(('http://localhost:5000/bugs/' + id))
            .then((result) => { 
                setBugName(result.data.bugName);
                setDescription(result.data.description);
                setPriority(result.data.priority);
                setStatus(result.data.status);
                result.data.assginee && setAssginee(result.data.assginee);     
            })
            .catch((err) => { console.log(err); });

        axios.get('http://localhost:5000/users')
            .then((res) => {
                const names = res.data.map(user => user.username);
                setUsers(["-", ...names]);
            })
    }, [id])

    useEffect(() => {
        //there's a assginee, so it can't be unassigned 
        if(assginee !== "-" && assginee !== "" && status === "Unassigned"){
            console.log("terms met, change status");
            setStatus("To Do");
        }

        //there's no assginee, so its unassigned 
        if(assginee === "-" && status !== "Unassigned"){
            setStatus("Unassigned");
        }

    }, [assginee, status])

    const saveBug = (e) => {
        e.preventDefault();
        const bug = {
            bugName,
            reporter: username,
            description,
            status,
            priority,
            assginee,
        }
        console.log(bug);
        axios.post('http://localhost:5000/bugs/update/' + id, bug)
            .then((res) => console.log(res.data))
            .catch((err) => { console.log(err); });
        
        setMode(true);
    }

    const deleteBug = () => {
        axios.delete('http://localhost:5000/bugs/' + id,)
            .then((res) => console.log(res.data));

        window.location = "/";
    }

    return (
        <div>
            { 
                viewMode ? 
                <div>
                    <h1> { bugName } </h1>
                    <p> { description } </p>
                    <button type="button" className="btn btn-primary" onClick={() => setMode(false)}>Edit</button>
                </div> : 
                <form onSubmit={saveBug}>
                    <div className="mb-3">
                        <label htmlFor="bugName">Bug Name: </label>
                        <input type="text" value={bugName} name="bugName" 
                            className="form-control" placeholder="Enter Bug Name"
                            onChange={e => setBugName(e.target.value)} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Description: </label>
                        <textarea type="text" value={description} name="description" 
                            className="form-control" placeholder="Enter Description"
                            onChange={e => setDescription(e.target.value)} 
                        />
                    </div>

                    <div className="mb-3">
                        <label>Status: </label>
                        <select className="form-control" 
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value={"Unassigned"}>Unassigned</option>
                            <option value={"To Do"}>To Do</option>
                            <option value={"In Progress"}>In Progress</option>
                            <option value={"QA"}>QA</option>
                            <option value={"Complete"}>Complete</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Priority: </label>
                        <select className="form-control" 
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value={"Low"}>Low</option>
                            <option value={"Med"}>Med</option>
                            <option value={"High"}>High</option>
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label>Assginee: </label>
                        <select className="form-control"
                            value={assginee}
                            onChange={e => setAssginee(e.target.value)}
                        >
                            { users.map((user, index) => <option key={index}>{user}</option>) }
                        </select>
                    </div>

                    <div className="btn-group">
                        <input className="btn btn-primary" type="submit" value="Save"/>
                        <button type="button" className="btn btn-secondary" onClick={() => setMode(true)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={deleteBug}>Delete</button>
                    </div>
                    
                </form>
            }
        </div>
    )
} 

export default ViewBug;