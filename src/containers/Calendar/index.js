import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export default class DemoApp extends React.Component {
  calendarRef = React.createRef();
  componentDidMount() {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.addEvent({
      title: '샘플 일정1',
      start: '2019-12-30',
      end: '2020-01-07',
      allDay: true,
    });
    calendarApi.addEvent({
      title: '샘플 일정2',
      start: '2020-01-02',
      end: '2020-01-04',
      color: '#396',
      allDay: true,
    });
  }

  render() {
    return (
      <FullCalendar
        ref={this.calendarRef}
        defaultView="dayGridMonth"
        locale={koLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={this.handleDateClick}
        events={[
          { title: 'event 1', date: '2019-12-01' },
          { title: 'event 2', date: '2019-12-02' },
        ]}
      />
    );
  }
}
