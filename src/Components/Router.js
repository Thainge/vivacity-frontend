import React, { useEffect, useRef, useState } from 'react';
import Home from '../Pages/Home';
import styles from './Router.module.css';
import Loader from './Other/Loader';

function RouterComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const ref = useRef();
    useOnClickOutside(ref, setMenuOpen);

    React.useEffect(() => {
        // display loading page
        const loadData = async () => {
            // Wait for two second
            await new Promise((r) => setTimeout(r, 1600));
            // hide loading page
            setLoading(() => false);
        };
        loadData();
    }, []);

    return (
        <div className={`${styles.bodyContainer} ${loading ? styles.fixedBody : styles.nothing}`}>
            <Loader loading={loading} />
            <div className={styles.sldingRoutes}></div>
            <div className={styles.navContainer}>
                <div className={styles.specialNav}>
                    <div className={styles.menuHeaderLeft}>
                        {/* Text and Icon */}
                        <div className={styles.menuHeaderDiv}>
                            <img className={styles.circleImage} src={require('../assets/menuLastName.png')}></img>
                            <div className={styles.headerText}>
                                <div className={styles.h2}>Tobey Hainge</div>
                                <div className={styles.h4}>Full Stack Developer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Home />
        </div>
    );
}

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(() => false);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default RouterComponent;