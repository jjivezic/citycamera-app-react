import React from 'react';
const Lending = () => {

    return (
        <div className="lending-page-container">
            <a className="hiden" href="https://unsplash.com/@zacmeaney?utm_medium=referral&utm_campaign=photographer-credit&utm_content=creditBadge"></a>
            <div className="container">
         
                <h1>City Camera</h1>
                <img className="image-cam" src="https://lh3.googleusercontent.com/Gq7rm2gKTjWsEWW00Lz2a9o0QAkmgtopunK39IlRgCT3L4eZWYswraQZ356oWWFR5Q=s180-rw" alt=""/>
                <p className="lending-subtitle">Lorem ipsum is a pseudo-Latin text used in web design,
                     typography, layout, and printing in place of English to
                     emphasise design elements over content. It's also called
                     placeholder (or filler) text. It's a convenient tool for mock-ups.
                 </p>

                 <div className="download-box">
                 <h5>Download now to get started!</h5>
                <a href="https://play.google.com/store/apps/details?id=com.hyperether.citycamera.su"> <div className="android"></div></a>
                 </div>
            </div>
        </div>
    )
}
export default Lending;