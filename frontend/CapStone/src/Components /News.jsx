import { useState,useEffect } from 'react'


const News = () => {
    const [news, setNews] = useState("");
    const [ titles, setTitles] = useState("");
    const [ authors, setAuthors] = useState("");
    const [ description, setDescription] = useState("");
    const [ title, setTitle] = useState("");
    const [ url,setUrl] = useState("");



    const getNewsApi = async() => {
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=21771ec5adae47a493452f35ddea2d08')
        let data = await response.json()
        console.log(data.articles)
        console.log(data.articles[0].title )
        console.log(data.articles[0].author)
        console.log(data.articles[0].description)
        console.log(data.articles[0].url)
    }
    useEffect(() => {
        getNewsApi()
    }, [])
  return (
    <div>
        <button> </button> 
    </div>
  )
}
export default News