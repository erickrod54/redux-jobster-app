import React from "react";
import { Logo } from "../components/index";
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom'

/**Jobster app - version 1 - Landing js - Features:
 * 
 *    --> Building 'Landing' page.
 * 
 *    --> Importing and placing 'Logo' Component.
 * 
 *    --> Importing and placing 'Wrapper' style
 *        Component from 'wrappers' directory. 
 * 
 * Note: 'wrappers' directory refers to style library
 * for this project.
 */

const Landing = () => {
    
    return(
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/**info */}
                <div className="info">
                <h1>
                    job <span>tracking</span> app
                </h1>
                <p>
                I'm baby photo booth readymade meh, 
                fit heirloom normcore truffaut sartorial. 
                Portland authentic glossier bicycle rights. 
                Flannel offal small batch kale chips vice lyft. 
                Beard sriracha poke, aesthetic listicle unicorn 
                mukbang venmo flannel iPhone irony ascot church-key.
                Everyday carry migas retro, bushwick meditation 
                cred subway tile. Aesthetic lomo paleo, literally
                 gluten-free cliche seitan chicharrones.
                </p>
                <Link  to='/register' className="btn btn-hero">Login/Register</Link>
                </div>
                <img src={main} alt='job hunt' className="img main-img"/>
            </div>    
        </Wrapper>
    )
}




export default Landing