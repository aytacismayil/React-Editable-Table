import React, { useContext } from 'react';

import {EmployeesContext} from '../context/EmployeesContext'
import EmpoleyeesDataModal from '../components/EmployeesDataModal'
import EditableTableCell from '../components/EditableTableCell'
import Pagination from '../components/Pagination'
import Search from '../components/Search'

function Grid() {

const {employees,isModalOpened,updatedAndDeletedEmployees,deleteEmployee,showModal,resetData,handleEmployeeTableCell, currentEmployees, employeesPerPage, currentPage, paginate, searchTerm, isSearched, handleChange, handleSubmit} = useContext(EmployeesContext)
  return (
    <main> 
      <Search searchTerm={searchTerm} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <section className="container">
      
        <div className="btns-container">    
            <button type='button' onClick={showModal}>Submit data</button>           
            <button type='button' onClick={resetData}>Reset data</button>        
        </div>

            <article className="table-container">
                <table id="employees">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Date of birth</th>
                        <th>Position</th>
                        <th>Phone number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                            currentEmployees.map((employee) => 
                            {
                                const {id, name, surname, dateOfBirth, position, phoneNumber, isDeleted, inputId} = employee
                                // console.log(id, name, surname, dateOfBirth, position, phoneNumber, isDeletedç inputId)
                                return(
                                <tr key={inputId} className={`status ${isDeleted ? 'deleted' : 'not-deleted'}`}>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "id",
                                    value: id,
                                    id: `${inputId}input1`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "name",
                                    value: name,
                                    id: `${inputId}input2`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "surname",
                                    value: surname,
                                    id: `${inputId}input3`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "date",
                                    "name": "dateOfBirth",
                                    value: dateOfBirth,
                                    id: `${inputId}input4`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "position",
                                    value: position,
                                    id: `${inputId}input5`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "tel",
                                    "name": "phoneNumber",
                                    value: phoneNumber,
                                    id: `${inputId}input6`
                                    }}/>
                                    <td className={`status ${isDeleted ? 'deleted' : 'not-deleted'}`}><span>{isDeleted ? 'deleted' : '.............'}</span></td>
                                    <td>
                                    {
                                        isDeleted ? <i className="fas fa-trash-restore" onClick={()=>deleteEmployee(inputId)}></i> : <i className="fas fa-trash" onClick={()=>deleteEmployee(inputId)}/>
                                    }
                                    
                                    </td>
                                    
                                </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
              
                
            </article>
            {
                    isSearched ? null :<Pagination employeesPerPage={employeesPerPage} employees={employees} currentPage={currentPage} paginate={paginate}/> 
                }
           
            
        </section>

        {
            isModalOpened &&  <EmpoleyeesDataModal updatedAndDeletedEmployees={updatedAndDeletedEmployees} showModal={showModal}/>
        }
   
    </main>
    )
}

export default Grid;
