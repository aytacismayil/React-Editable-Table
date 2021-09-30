import React, {createContext, useState, useEffect, useCallback} from 'react'
import data from '../data';

export const EmployeesContext = createContext()

const EmployeesContextProvider = (props) => {
    let copyOfData = JSON.parse(JSON.stringify(data))
    const [employees, setEmployees] = useState([...copyOfData])
    const [updatedEmployees, setUpdatedEmployees] = useState([])
    const [deletedEmployees, setDeletedEmployees] = useState([])
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [updatedAndDeletedEmployees, setUpdatedAndDeletedEmployees] = useState({})
    const [currentEmployees, setCurrentEmployees] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const employeesPerPage = 5

    const [searchTerm, setSearchTerm] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    
    // DELETE EMPLOYEE
    const deleteEmployee = (inputId) =>{
        let tempEmployees = [...employees];
        const mappedEmployees = tempEmployees.map(employee => {
          if(employee.inputId === inputId){
            if(employee.isDeleted){
              employee.isDeleted = false;
            }
            else if(!employee.isDeleted){
              employee.isDeleted = true;
            }
          }
          return employee
        })

        const markedAsDeletedEmployees = mappedEmployees.filter(employee=> employee.isDeleted === true)
        setDeletedEmployees(markedAsDeletedEmployees)
        setEmployees(mappedEmployees)
    }
    
    // GET UPDATED AND DELETED LISTS
    const showModal = ()=> {
      setIsModalOpened(!isModalOpened)
      const notDeletedEmployees = updatedEmployees.filter(updatedEmployee=> updatedEmployee.isDeleted !== true)
      let updatedAndDeletedEmployees = {
        updated: [...notDeletedEmployees],
        deleted: [...deletedEmployees]
      }
      // console.log(updatedAndDeletedEmployees)
      setUpdatedAndDeletedEmployees(updatedAndDeletedEmployees)
    }
      
    // RESET DATA
    const resetData = ()=> {
      let copyOfData = JSON.parse(JSON.stringify(data))
      setEmployees(copyOfData)
      setDeletedEmployees([])
      setUpdatedEmployees([])
      
    }
    
    // EDITING TABLE CELLS
    const handleEmployeeTableCell = (e) => {
      let str = e.target.id;
      let arr = str.split("");
      arr.splice(str.length - 6, str.length);
      let idStr = arr.join('');
  
      let item = {
        id: idStr,
        name: e.target.name,
        value: e.target.value,
        type: e.target.type
      };
      let copyOfEmployeesArr = employees.slice();

      const textRegex = /([0-9-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\\\/])+/ig// eslint-disable-line
      const positionTextRegex = /([0-9!$@#%^*_+~=`\[\]";'<>?.])+/ig// eslint-disable-line
      const phoneRegex = /^\+(?:[0-9] ?){7,15}[0-9]$/;
    
  
      let editedEmployees = copyOfEmployeesArr.map(employee=> {
        for (let key in employee) {
            if (key === item.name && employee.inputId === item.id) {
              if(item.type==='tel'){
                if(phoneRegex.test(item.value)){
                  employee[key] = item.value;
                }
                else if(!phoneRegex.test(item.value)){
                  break                  
                }
              }
              else if(item.type==='text' && item.name!=='id'&&item.type!=='tel'&&(item.name==='name'||item.name==='surname')){
                if(!textRegex.test(item.value) && item.value !==''){
                  employee[key] = item.value;
                }
                else if(textRegex.test(item.value) || item.value ===''){
                  break
                }
              }
              else if(item.type==='text' && item.name!=='id'&&item.type!=='tel'&&item.name==='position'){
                if(!positionTextRegex.test(item.value) && item.value !==''){
                  employee[key] = item.value;
                }
                else if(positionTextRegex.test(item.value) || item.value ===''){
                  break
                }
              }
              else{
                 employee[key] = item.value;

              }
            }
        }
        return employee;
      });

        setEmployees(editedEmployees);  
    };
    
    // COMPARE INITIAL AND UPDATED
    useEffect(() => {
      let copyOfDataArr = JSON.parse(JSON.stringify(data))
      let copyOfEmployeesArr = employees.slice();    
  
      const comparedEmloyeesArr = copyOfEmployeesArr.filter(employeeObj=>{
        return !copyOfDataArr.some(copyEmployeeObj=>{       
          return copyEmployeeObj.id === employeeObj.id && copyEmployeeObj.name === employeeObj.name  && copyEmployeeObj.surname === employeeObj.surname && copyEmployeeObj.dateOfBirth === employeeObj.dateOfBirth && copyEmployeeObj.position === employeeObj.position && copyEmployeeObj.phoneNumber === employeeObj.phoneNumber      
        });
      });
      setUpdatedEmployees(comparedEmloyeesArr)
    },[employees])

    
    // PAGINATION
    const paginate = useCallback((pageNumber) => {
        const indexOfLastEmployee = pageNumber * employeesPerPage;
        const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
        const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
        setCurrentEmployees(currentEmployees)
        setCurrentPage(pageNumber)
    }, [employeesPerPage, employees])

    useEffect(() => {
      paginate(currentPage)
    }, [currentPage, paginate])

    // HANDLE INPUT CHANGE EVENT
    const handleChange = e => {
      setSearchTerm(e.target.value);
    };
    // GET SEARCH RESULT
    const getSearchResult = useCallback(() => {
      const  dateOfBirthRegex = /\s+|[\/-]/g// eslint-disable-line
      let results = []
      let copyOfEmployeesArr = employees.slice();
      if(searchTerm === ''|| searchTerm === null || searchTerm === ' '){
        setIsSearched(false)
        paginate(currentPage)
      }
      else{
        results = copyOfEmployeesArr.filter(employee => 
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) || employee.id.toLowerCase().includes(searchTerm.toLowerCase()) || employee.dateOfBirth.replace(dateOfBirthRegex, '').includes(searchTerm.replace(dateOfBirthRegex, '')) || employee.position.toLowerCase().includes(searchTerm.toLowerCase()) || employee.phoneNumber.replace(/\s+/g, '').includes(searchTerm.replace(/\s+/g, ''))
          )
          setIsSearched(true)
          setCurrentEmployees(results);
      }

    }, [searchTerm, employees,currentPage, paginate])


    // GET RESULTS ON CHANGE EVENT (WHILE TYPING)
    useEffect(() => {
      getSearchResult()   
    },[getSearchResult]);  
    
    // GET RESULTS ON SUBMIT EVENT (AFTER CLICKING SEARCH ICON)
    const handleSubmit = e => {
      e.preventDefault()
      getSearchResult()   
    };
   

    return (
        <EmployeesContext.Provider value={{employees,updatedEmployees,deletedEmployees,isModalOpened,updatedAndDeletedEmployees,deleteEmployee,showModal,resetData,handleEmployeeTableCell,currentEmployees,employeesPerPage, currentPage, paginate, searchTerm, isSearched, handleChange, handleSubmit}}>
            {props.children}
        </EmployeesContext.Provider>
    )
}

export default EmployeesContextProvider
