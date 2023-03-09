// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateFavourite} = props
  const {id, title, date, isFav} = appointmentDetails
  const startImgUrl = isFav
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    updateFavourite(id)
  }

  return (
    <li className="list-item">
      <div className="title-star-img-container">
        <p className="title-name">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={startImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
