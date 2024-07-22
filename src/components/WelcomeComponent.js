import React from 'react'

function WelcomeComponent(){

    return(
        <div className='uk-container uk-margin-top'>
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <h3 class="uk-card-title uk-text-center">Colorle</h3>
                <p className='uk-text-bold'> How to play ? </p>
                <ul className={`uk-list uk-list-bullet`}>
                    <li>The color cards are arranged in a random order.</li>
                    <li>The player needs to arramge the colors in a particular order.</li>
                    <li>With every check it will show how many cards are in their correct place.</li>
                    <li>The player needs to arrange the colors in the correct order in minimum tries.</li>
                </ul>
                <button class="uk-button uk-button-primary">START</button>
            </div>
            
        </div>
    )

}

export default WelcomeComponent;