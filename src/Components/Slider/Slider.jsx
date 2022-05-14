import React, {useState, useEffect} from 'react'
import './Slider.scss'
import Axios from 'axios';
import BtnSlider from './BtnSlider'

export default function Slider() {
    const [slideIndex, setSlideIndex] = useState(1)
    const [slides, setSlides] = useState([])

    useEffect(() => {
        async function getSlides() {
        const {data} = await Axios.get('https://jsonplaceholder.typicode.com/photos')
        setSlides(data)
        }
        getSlides()
    },[])

    const nextSlide = () => {
        if(slideIndex !== slides.slice(0, 6).length){
            setSlideIndex(slideIndex + 1)
        } 
        else{
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else{
            setSlideIndex(slides.slice(0, 6).length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div>
            <h2 className="title">MASTER WiZR Modules</h2>
            <div className="container-dots">
                {slides.slice(0, 6).map((item, index) => (
                    <div className="thumbContainer" onClick={() => moveDot(index + 1)} onScroll={() => nextSlide()} >
                        <div 
                        
                        className={slideIndex === index + 1 ? "dot active img-full" : "dot img"}
                        >
                            <img 
                                src={item.thumbnailUrl} 
                                alt="thumbnailUrl"
                            />
                        </div>
                        <p style={{marginTop: '1rem'}}>{item.title.split(' ')[0]}</p>
                    </div>
                ))}
            </div>  
            <div className="slideWithButton">
                <div className="container-slider">
                    {slides.slice(0, 6).map((obj, index) => {
                        return (
                            <div
                            key={obj.id}
                            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                            
                            >
                                {slideIndex === index + 1 && (
                                    <img 
                                        src={obj.url} 
                                        alt={obj.title}
                                    />
                                )}
                                
                            </div>
                        )
                    })}
                </div>
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            </div>
            
        </div>
    )
}