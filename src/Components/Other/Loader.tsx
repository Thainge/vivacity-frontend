import React from 'react';
import Fade from 'react-reveal/Fade';
import ReactLoading from 'react-loading';
import styles from './Loader.module.css';

function Loader({ loading }) {
    // Loader used between route changes
    return (
        <div className={`
            ${styles.LoaderBody} 
            ${!loading ? styles.loaderFinished : styles.nothing}
        `}>

            {/* Header */}
            <div className={styles.menuHeaderLeft}>
                {/* Text and Icon */}
                <div className={styles.menuHeaderDiv}>
                    <img className={styles.circleImage} src={require('../../assets/menuLastName.png')}></img>
                    <div className={styles.headerText}>
                        <div className={styles.h2}>Tobey Hainge</div>
                        <div className={styles.h4}>Full Stack Developer</div>
                    </div>
                </div>
            </div>

            {/* Loader */}
            <div className={styles.loaderMiddle}>
                <div className={styles.loaderContainer}>
                    <ReactLoading type={'spinningBubbles'} color={'#f5f5f5'} height={'100%'} width={'100%'} />
                </div>
            </div>

            {/* Footer */}
            <div className={styles.fixedText}>
                <Fade up distance={'2em'} duration={800}>
                    <div className={styles.loaderH3}>Welcome</div>
                    <div className={styles.loaderH1}>Please Wait</div>
                </Fade>
            </div>

        </div>
    );
}

export default Loader;