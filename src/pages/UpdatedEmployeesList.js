import React, { useState, useEffect, useCallback, useContext } from 'react';
import {EmployeesContext} from '../context/EmployeesContext'

const UpdatedEmployeesList = () => {
    const {updatedEmployees} = useContext(EmployeesContext)

    const [updatedButNotDeletedEmployees, setUpdatedButNotDeletedEmployees] = useState([])
  
    const getNotDeletedEmployees = useCallback( () => {
      const notDeletedEmployees = updatedEmployees.filter(updatedEmployee=> updatedEmployee.isDeleted !== true)
      setUpdatedButNotDeletedEmployees(notDeletedEmployees)
    }, [updatedEmployees])
  
    useEffect(() => {
        getNotDeletedEmployees()
    }, [updatedEmployees, getNotDeletedEmployees])

    return (
        <main>
            <section className="container">
            <h1 className='mt-5 pt-5'>Updated employees</h1>
                <article className="table-container ">
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
                    updatedButNotDeletedEmployees.length === 0 ? <p>Nothing here...</p> : updatedButNotDeletedEmployees.map(updatedEmployee =>{
                        const {id, name, surname, dateOfBirth, position, phoneNumber, inputId} = updatedEmployee
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

export default UpdatedEmployeesList
