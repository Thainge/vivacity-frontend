import styles from './footer.module.css';

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.wave} />
            <div className={styles.footer}>

                {/* Logo & copyright */}
                <div className={`${styles.column} ${styles.col1}`}>
                    <div className={styles.miniColumn}>
                        <div className={styles.h1}>Tobey Hainge</div>
                        <div className={styles.text}><img src={require('../../assets/loc.png')} className={styles.icon} /> United States</div>
                        <div className={styles.text}><img src={require('../../assets/email.png')} className={styles.icon} /> tobeyhainge@gmail.com</div>
                        <div className={styles.text}><img src={require('../../assets/phone.png')} className={styles.icon} /> +1-910-321-8215</div>
                    </div>
                    <div className={styles.copyright}>© 2023 Tobey Hainge</div>
                </div>

                <div className={styles.twoColumns}>
                    {/* Solutions */}
                    <div className={`${styles.column} ${styles.col2}`}>
                        <h2 className={styles.h2}>Resources</h2>
                        <div className={styles.link}>About</div>
                        <div className={styles.link}>Portfolio</div>
                        <div className={styles.link}>Contact</div>
                    </div>

                    {/* Contact */}
                    <div className={`${styles.column} ${styles.col4}`}>
                        <h2 className={styles.h2}>Have questions?</h2>
                        <div className={styles.link}>Contact Me</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer;