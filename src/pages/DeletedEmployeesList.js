import React, { useContext }  from 'react'
import {EmployeesContext} from '../context/EmployeesContext'

const DeletedEmployeesList = () => {
    const {deletedEmployees} = useContext(EmployeesContext)
    return (
        <main>
            <section className="container">
            <h1 className='mt-5 pt-5'>Deleted employees</h1>
                   <article className="table-container mt-5 pt-5">
                   <table id="employees">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Date of birth</th>
                        <th>Position</th>
                        <th>Phone number</th>                      
                    </tr>
                    </thead>
                    <tbody>
                    {
                        deletedEmployees.length === 0 ? <p>Nothing here...</p> :  deletedEmployees.map(deletedEmployee =>{
                            const {id, name, surname, dateOfBirth, position, phoneNumber, inputId} = deletedEmployee
                            return (                            
                                <tr className='status deleted'>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{surname}</td>
                                    <td>{dateOfBirth}</td>
                                    <td>{position}</td>
                                   <td>{phoneNumber}</td>
                                </tr>                  
                            )
                        })
                    }
                    </tbody>
                </table>
                </article>
            </section>
        </main>
    )
}

export default DeletedEmployeesList
