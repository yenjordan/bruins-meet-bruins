//home page, created separate folder pages to have all 5 files in it
//also these files has to be capitalize

import './Landing.css'

const Landing = () => {
    const handleClicks = () => {    //log clicks 
        console.log('click')
    }
    

    return(
        <>
        <div className="landing">
            <h1>Bruin Meets Bruin</h1>
            <h2>Come Meet Other Bruins!</h2>
            <button className="mainbutton" onClick={handleClicks}>
                {'Sign in'}
            </button>
            
        </div>
        </>
    )
}

export default Landing