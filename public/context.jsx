import React,{useState,useContext} from 'react'


import axios from 'axios'

const table ={
    sports:21,
    history:23,
    politics:24
}

const API_ENDPOINT = 'https://opentdb.com/api_config.php?';


const AppContext = React.createContext()


const AppProvider = ({children})=>{

    const [waiting ,setWaiting] = useState(true)
    const [loading ,setLoading] = useState(false)
    const [question,setQuestion] = useState([])
    const [index,setIndex] = useState(0)
    const [correct,setCorcet] = useState(0)
    const [error,setError] = useState(false)
    const [quiz,setQuiz] = useState({
        amaount:10,
        category:'sports',
        difficulty:'easy'
    })
    const [isModalOpen ,setModalOpen] = useState(false)

    const fetchQuestion = async (url) =>{
        setLoading(true)
        setWaiting(false)
        const response = await axios(url).catch((err)=> console.log(err))
        if(response){
            const data = response.data.results
            if(data.length > 0){
                setQuestion(data)
                setLoading(false)
                setWaiting(false)
                setError(false)
            }else{

                setWaiting(true)
                setError(true)
            }
            
        }else{
            setWaiting(true)
        }
    }

    const nextQuestion = ()=>{
        setIndex((oldIndex)=>{
            const index = oldIndex+1;
            if(index > question.length -1){
                openModal();
                return 0;

            }else{
                return index
            }
        })
    }


}