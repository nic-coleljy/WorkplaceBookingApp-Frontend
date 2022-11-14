{bookingRecords.map((bookingRecord) => (
    <h3 key={bookingRecord.date}>{bookingRecord.date}</h3>
  ))}



  const [bookingRecords, showRecods] = useState([
    {
      bid: 1,
      date: '10/08/1021',
      location: 'flower',
      status: 'approved',
    },
    {
      bid: 2,
      date: '11/08/1021',
      location: 'cloud',
      status: 'rejected',
    },
    {
      bid: 3,
      date: '12/08/1021',
      location: 'pudding',
      status: 'pending',
    },
  ])
  useEffect(() => {
    const getRecords = async () => {
      const tasksFromServer = await fetchRecords()
      showRecods(tasksFromServer)
    }

    getRecords()
  }, [])

  // Fetch Tasks
  const fetchRecords = async () => {
    const res = await fetch('http://localhost:8080/booking')
    const data = await res.json()

    return data
  }
