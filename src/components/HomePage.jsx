import './homepage.css';

import Layout from './Layout';
import Header from './Header';
import Projects from './Projects';
import Contact from './Contact'
import avatar from '../img/profile.jpeg'
import { useState, useRef, useEffect  } from 'react';
import { redirect, useNavigate, useLocation } from "react-router-dom";
import 'atropos/css'
import Atropos from 'atropos';

import { useLanguageContext } from '../context/LanguageContext';




function HomePage({props}) {
  const { state } = useLocation();

  let {language, setLanguage} = useLanguageContext();



  //Context provider modo oscuro y claro
  //Ingles espanol
  const [front, setFront] = useState(true)
  const [btnHover, setBtnHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!scrolled) {
      if (state === 'contact') {
        let contactSection = document.querySelector('.contact-content');
        contactSection.scrollIntoView({ behavior: "smooth"})
      }
      else if (state === 'projects') {
        let projectsSection = document.querySelector('.projects-content');
        projectsSection.scrollIntoView({ behavior: "smooth"})
      }
      else if (state === 'home') {
        let homeSection = document.querySelector('.homepage');
        homeSection.scrollIntoView({ behavior: "smooth"})
      }
      setScrolled(true)
    }
  })
  
  const isHover = () => {
    if (btnHover) {
      setBtnHover(false);
    }
    else {
      setBtnHover(true);
    }
  }

  const changeSide = (e) => {
    if (!btnHover) {
      if (front) {
        setFront(false);
      }
      else {
        setFront(true)
      }
  }
  }




  const getPDF = () => {
    // using Java Script method to get PDF file
    fetch('./gastonVecchio-cv.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'gastonVecchio-cv.pdf';
            alink.click();
        })
    })
}

const myAtropos = Atropos({
  el: '.my-atropos',
  activeOffset: 20,
  rotateXMax: 5,
  rotateYMax: 2,
  // rest of parameters
});



  return (
    <>
    <Layout>
      <div className='homepage-container'>
        <div className="homepage" >

          <div className="content" >
              <div className='background'>
              </div>
              
              <div className='profile-container'  >
              <div className="atropos my-atropos">

      <div className="atropos-scale">

        <div className="atropos-rotate">
      
          <div className="atropos-inner">
            
          <div className='profile-content' onClick={(e) => changeSide(e)}> 
                  {
                  front === true &&
                    <div className='front'>
                      <img className='profile' src={avatar}></img>
                      <h1 className="title name" > GASTON VECCHIO</h1>
                      <h2 className='subtitle lastname'> {language==="spanish" ? 'DESAROLLADOR WEB' : 'WEB DEVELOPER'}</h2>
                      <div className="button-container">
                        <button className="profile-button" type="button" onMouseEnter={()=> isHover()} onMouseLeave={() => {isHover()}} onClick={() => {getPDF()}}>Curriculum</button>
                        <button className="profile-button" type="button" onMouseEnter={()=> isHover()} onMouseLeave={() => {isHover()}} onClick={() => {redirect('mailto:gastonvecch@gmail.com')}}>{language === 'english' ? 'Mail' : 'Correo'}</button>
                      </div>
                    </div>
                  } 
                  { front === false &&
                    <div className='back'>
                      <div className='description-info'>
                        <h2 className='description-subtitle'>About me</h2>
                        <p className='description-p'>Hi there!</p>
                        <p className='description-p'>I am 25 years old programmer, most of my knowledge is self learned.</p>
                        <p className='description-p'>I completed the CS50: Introduction to computer Science and currently I am working throguht the Odin Project.</p>
                      </div>
                      <div className='description-profile'>
                          <img className='profile-back' src={avatar}></img>
                          <h1 className="title-back" > GASTON VECCHIO</h1>  
                      </div> 
                    </div>
                  }
                  
                </div>
          </div>
        </div>
      </div>
    </div>
              
                
                
                
              </div>
              


              
              <svg preserveAspectRatio="none" className='curve' xmlns="http://www.w3.org/2000/svg" width="100%" height="58" viewBox="0 0 2000 300" fill="none">
                <path width="100%" height="100%" d="M0 214.286L111.111 192.857C222.222 171.429 444.444 128.571 666.667 128.571C888.889 128.571 1111.11 171.429 1333.33 157.098C1555.56 143.304 1777.78 70.9821 1888.89 35.7589L2000 0V300H1888.89C1777.78 300 1555.56 300 1333.33 300C1111.11 300 888.889 300 666.667 300C444.444 300 222.222 300 111.111 300H0V214.286Z" fill="#F3F4F5"/>
              </svg>

          </div>
          
          <Projects />      
          <Contact />



        </div>
    </div>
   
      </Layout>
    </>
  );
}

export default HomePage;
