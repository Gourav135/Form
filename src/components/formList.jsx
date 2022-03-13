
export const FormList = ({employee}) => {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.address}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>{employee.martial_status == true ? "Married" : "Not married"}</td>
        </tr>
    )
}