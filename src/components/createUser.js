import React, { useState, useEffect } from "react";
import axios from "axios";

// if newUser prop is true this form will register a user, else for login 
const CreateUser = ({ newUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNew, setNew] = useState(newUser);

    useEffect(() => {
        setNew(newUser);
    }, [newUser])

    const authentication = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        }
        console.log(user);

        if(isNew) {
            //create new user
            this.username = username;
            axios.post('https://bug-tracker-project1.herokuapp.com/api/auth/register', user)
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem('token', res.data.token);
                window.location = '/bug';
            })
            .catch((err) => console.log(err))
        } else {
            //login
            axios.post('https://bug-tracker-project1.herokuapp.com/api/auth/login', user)
            .then((res) => {
                console.log(res.data);
                sessionStorage.setItem('token', res.data.token);
                window.location = '/bug';
            })
            .catch((err) => console.log(err))
        }
    }

    return (
        <div className="container-fluid">
            <div className="col-5 mx-auto">
                { isNew ? <h2>Create New Account</h2> : <h2>Log In</h2> }
                <div className="container-fluid">
                    <form onSubmit={authentication}>
                        {
                            isNew && 
                            <div className="mb-3">
                                <label htmlFor="username">Username: </label>
                                <input type="text" value={username} name="username" 
                                    className="form-control" placeholder="Enter Username"
                                    onChange={e => setUsername(e.target.value)} 
                                />
                            </div>
                        }

                        <div className="mb-3">
                            <label htmlFor="email">Email: </label>
                            <input type="email" value={email} name="email" 
                                className="form-control" placeholder="Enter Email"
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password: </label>
                            <input type="password" value={password} name="password" 
                                className="form-control" placeholder="Enter Password"
                                minLength="5" required
                                onChange={e => setPassword(e.target.value)} 
                            />
                            {
                                isNew ? 
                                <span id="passwordHelpInline" className="form-text">
                                    Must at least 5 characters long
                                </span> :
                                <button type="button" className="btn btn-sm btn-link text-decoration-none">
                                    Forgot Password?
                                </button>
                            }
                        </div>

                        <div className="d-flex justify-content-between">
                            <input className="btn btn-primary" type="submit"/>
                            <button type="button" className="btn btn-link text-decoration-none" onClick={() => setNew(!isNew)}>
                                    { isNew ? "Have An Account?" : "Create New?" }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;