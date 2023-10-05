
import WeekScheduler from './WeekScheduler';

const data = [
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-05',
    Time: '08:00',
  },
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-08',
    Time: '17:00',
  },
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-07',
    Time: '14:00',
  },
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-12',
    Time: '11:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-09-18',
    Time: '09:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-21',
    Time: '11:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-09-27',
    Time: '19:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-16',
    Time: '11:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-10-15',
    Time: '12:00',
  }
  ,
  {
    Id: 101,
    Name: 'test',
    Date: '2023-09-14',
    Time: '09:00',
  }

];

function App() {
  return (
    <div className="App">
      {/* <TimeSchedule data={data} />
       */}
      {/* <WeekView startDate={startDate} data={data} /> */}
      <WeekScheduler data={data} />
    </div>
  );
}

export default App;
