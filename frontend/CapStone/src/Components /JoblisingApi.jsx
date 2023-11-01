import React from 'react'
import Card from 'react-bootstrap/Card';
import "../Components/Joblisting.css"

function JoblisingApi() {
    const [news, setNews] = useState("");
    const category = [
        "Computer and IT","Data and Analytics","Design and Ux","Product",
        "Software Engineering",
    ]
    const getNewsApi = async() => {
        let response = await fetch('https://www.themuse.com/api/public/jobs?category=Computer%20and%20IT&category=Data%20and%20Analytics&category=Design%20and%20UX&category=IT&category=Product&category=Project%20Management&category=Software%20Engineering&category=UX&level=Mid%20Level&page=20')
        let data = await response.json()
        console.log(data.results)


    }
    useEffect(() => {
        getNewsApi()
    }, [])


  return (
    <div>

<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    </div>
    // add levels to be a check box entryLevel, SeniorLevel, Internship,Mid Level, management 
    // give usesr the option to pick between 

  )
}

export default JoblisingApi