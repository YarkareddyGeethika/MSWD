
// import './App.css';
// import Course from './components/Course'
// const App = () => {
//   const courses = [
//     {
//     id: 1,
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       },
//       {
//         name:'Redux',
//         exercises:11,
//         id: 4
//       }
//     ]
//   },
//   {
//     name: 'Node.js',
//     id: 2,
//     parts: [
//       {
//         name: 'Routing',
//         exercises: 3,
//         id: 1
//       },
//       {
//         name: 'Middlewares',
//         exercises: 7,
//         id: 2
//       }
//     ]
//   }
// ]


//   return (
//     <div>
//       <h1>Web development Curriculum</h1>
//       {courses.map(course=>
//       <Course course={course}key= {course.id}/>)}
//     </div>
//   )
// }

// export default App;


import React, { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './services/phone'
import Notification from './components/Notification'


const App = () => {

  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  const hook = () => { phoneService.getAll().then(response => setContacts(response.data)) }
  useEffect(hook, [])

  const messageDisplayTime = 3000 
  const standardError = {type: 'errorNotification', message: 'Operation failed. Refresh your browser.'}
  const deleteNotificationFunction = (name) => {
    setNotification({type: 'deleteNotification', message: `Deleted ${name} from contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const updateNotificationFunction = (name) => {
    setNotification({type: 'updateNotification', message: `Updated ${name} in contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const addNotificationFunction = (name) => {
    setNotification({type: 'addNotification', message: `Added ${name} to contacts!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const errorNotificationFunction = () => {
    setNotification(standardError)
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }


  const addContact = (event) => {

    event.preventDefault()
    const contactObject = { name: newName, number: newNumber }
    const sameName = contacts.filter(contact => contact.name === newName)
    if (sameName.length > 0) {
      const msg = `Contact ${newName} is already in the phonebook. Do you want to replace the old contact?`
      const confirm = window.confirm(msg)
      if (confirm) {
        phoneService.update(sameName[0].id, contactObject).then(hook)
        .then(() => {updateNotificationFunction(newName)}).catch(error => {errorNotificationFunction()})
      }
    } else {
      phoneService.create(contactObject).then(
        response => {setContacts(contacts.concat(response.data))}
      ).then(() => {addNotificationFunction(newName)})
      .catch(error => {errorNotificationFunction()})
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (event) => {
    const button = event.target
    const confirm = window.confirm(`Delete ${button.name}?`);
    if (confirm) {
      phoneService.destroy(button.id).then(hook)
      .then(() => {deleteNotificationFunction(button.name)})
      .catch(error => {errorNotificationFunction()})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}></Notification>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>

      <h2>Add new</h2>
      <PersonForm
        addObject={addContact} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </PersonForm>

      <h2>Numbers</h2>
      <PersonsList contacts={contacts} filter={newFilter} deleteFun={deleteContact}></PersonsList>
    </div>
  )

}

export default App
