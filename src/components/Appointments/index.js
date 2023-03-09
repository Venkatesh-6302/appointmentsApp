// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {titleInput: '', date: '', appointmentList: [], isStarred: false}

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, date} = this.state

    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isFav: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      date: '',
    }))
  }

  updateFavourite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isFav: !each.isFav}
        }
        return each
      }),
    }))
  }

  updateStarred = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  getList = () => {
    const {isStarred, appointmentList} = this.state
    if (isStarred === true) {
      return appointmentList.filter(each => each.isFav === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, date, isStarred} = this.state
    const filteredList = this.getList()
    const className = isStarred ? 'active-btn' : ''
    return (
      <div className="bg-container">
        <div className="form-card">
          <div className="appointment-form-img-container">
            <form className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="title-date-text">
                TITLE
              </label>
              <input
                id="title"
                className="title-input"
                type="text"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="date" className="title-date-text">
                Date
              </label>
              <input
                id="date"
                className="date-input"
                type="date"
                value={date}
                onChange={this.onChangeDate}
              />
              <button
                className="add-btn"
                type="button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>
            <img
              className="appointments-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointments-container">
            <div className="heading-btn-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-btn ${className}`}
                onClick={this.updateStarred}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredList.map(each => (
                <AppointmentItem
                  appointmentDetails={each}
                  key={each.id}
                  updateFavourite={this.updateFavourite}
                  addAppointment={this.addAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
