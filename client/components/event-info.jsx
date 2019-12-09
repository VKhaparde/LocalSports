import React from 'react';

class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false
    };
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick(event) {
    this.setState(({ favorited }) => {
      return { favorited: !favorited };
    });
    this.props.info.callback(event);
  }

  render() {
    const { favorited } = this.state;

    return (
      <div className="eventInfo d-flex flex-column overflow-hidden p-2">
        <div className="d-flex justify-content-between h3 m-0">{this.props.info.events[0]['event-name']}
          <button id={favorited ? 'liked-event-heart' : 'unliked-heart-event'}
            onClick={() => this.handleEventClick(this.props.info.events[0])}>
            <i className={`liked-event-heart ${favorited ? 'fas' : 'far'} fa-heart`}></i>
          </button>
        </div>
        <div className="d-flex justify-content-between mt-1 ">
          <div>{this.props.info.events[0]['event-day']}</div>
          <div className='rating' style={{ backgroundImage: `url(${this.props.ratingImage})` }}></div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div>{this.props.info.events[0].name}</div>
          <button className="backButton"
            onClick={() => this.props.toggleView()}>
            <i className="fas fa-arrow-left fa-1.5x"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default EventInfo;
