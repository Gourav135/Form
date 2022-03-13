import axios from 'axios';
import { useState,useEffect } from 'react'
import { FormList } from './formList';
import { nanoid } from "nanoid";

export const Forms = () => {
    const [formData, setFormData] = useState({
        id: nanoid(),
        name: "",
        age: "",
        address:"",
        department:"",
        salary:"",
        martial_status:"",
    });

    const [employees, setEmployees] = useState([]);



    const handleChange = (e) => {
        const { id,value,type } = e.target;
        if(type=="checkbox"){
            setFormData({
                ...formData,[id]:e.target.checked
            })
        }
        else{
            setFormData({
                ...formData,[id]:value
            })
        }
        
    }

    useEffect(() => {
        getEmployees()
    },[])

    const getEmployees = (async (e) => {
        try{
            var res = await fetch("http://localhost:3001/users");
            var data = await res.json();
            setEmployees(data);

        }
        catch(e){
            console.log(e)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/users", formData).then(() => {
            alert("User created Sucessfully")
            getEmployees()
        })
        
    }
    return <form onSubmit={handleSubmit}>
        <h3>Employee Details</h3>
        <input id="name" type="text" onChange={handleChange} placeholder="Enter name" />
        <input id="age" type="number" onChange={handleChange} placeholder="Enter age" />
        <input id="address" type="text" onChange={handleChange} placeholder="Enter address" />
        <select id="department" onChange={handleChange}>
            <option value="">select department</option>
            <option value="Production">Production</option>
            <option value="Research and Development">Research and Development</option>
            <option value="Marketing">Marketing</option>
        </select>
        <input id="salary" type="Number" onChange={handleChange} placeholder="Enter salary" />
        <input id="martial_status" onChange={handleChange} type="checkbox" value="checked" />

        <input type="submit" value="Create user" />
        
        <table border = "1" cellSpacing="2">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Address</td>
                        <td>Department</td>
                        <td>salary</td>
                        <td>Martial Status</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((e) => {
                        return <FormList key={e.id} employee = {e}/>
                    })}
                </tbody>
            </table>
    </form>
}