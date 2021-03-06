import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewBug = () => {
    const [bugName, setBugName] = useState('');
    const [reporter, setReporter] = useState('');
    const [type, setType] = useState('Bug');
    const [description, setDescription] = useState('');
    const [assginee, setAssginee] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('Low');
    const [users, setUsers] = useState(["-"]);
    const [viewMode, setMode] = useState(true);
    let { id } = useParams();

    //call to the db for users and bug info
    useEffect(() => {
        axios.get(('https://bug-tracker-project1.herokuapp.com/bugs/' + id))
            .then((result) => { 
                setBugName(result.data.bugName);
                setType(result.data.type);
                setDescription(result.data.description);
                setPriority(result.data.priority);
                setStatus(result.data.status);
                setReporter(result.data.reporter);
                result.data.assginee && setAssginee(result.data.assginee);     
            })
            .catch((err) => { console.log(err); });

        axios.get('https://bug-tracker-project1.herokuapp.com/api/auth')
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
            reporter,
            type,
            description,
            status,
            priority,
            assginee,
        }
        console.log(bug);
        axios.post('https://bug-tracker-project1.herokuapp.com/bugs/update/' + id, bug)
            .then((res) => console.log(res.data))
            .catch((err) => { console.log(err); });
        
        setMode(true);
    }

    const deleteBug = () => {
        axios.delete('https://bug-tracker-project1.herokuapp.com/bugs/' + id,)
            .then((res) => console.log(res.data));

        window.location = "/bug";
    }

    return (
        <div>
            { 
                viewMode ? 
                <div className="mx-auto col-sm-7 ps-3 pe-1 overflow-hidden mt-4">
                    <div className="row gy-2">
                        <h1> { bugName } </h1>
                        <div className="row row-cols-auto fs-4">
                            <div className="col">Type: { type }</div>
                            <div className="col">Priority: { priority }</div>
                        </div>
                        <div>
                            <p className="fs-5">Description: <br/> { description } </p>
                            <button type="button" className="btn btn-primary" onClick={() => setMode(false)}>Edit</button>
                        </div>
                    </div>
                </div> : 
                <div className="mx-auto col-sm-5 mt-4">
                    <h1>Editing: { bugName } </h1>
                    <form className="container" onSubmit={saveBug}>
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
                                value={type}
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
                </div>
            }
        </div>
    )
} 

export default ViewBug;