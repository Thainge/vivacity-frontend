import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import styles from './Home.module.css';
import {
    useLazyGetApplicantQuery,
    useLazyPostApplicantQuery,
    useLazyPutApplicantQuery,
    useLazyDeleteApplicantQuery
} from '../Hooks/api';
import ReactLoading from 'react-loading';

export interface Applicant {
    id: Number;
    firstname: String;
    lastname: String;
    about: String;
    address: String;
    state: String;
    city: String;
    zip: String;
}

const defaultApplicant: Applicant = {
    id: 1,
    firstname: "",
    lastname: "",
    about: "",
    address: "",
    state: "",
    city: "",
    zip: "",
}

function Home() {
    // Redux API calls
    const [GETApplicantAPI, { isFetching }] = useLazyGetApplicantQuery();
    const [POSTApplicantAPI] = useLazyPostApplicantQuery();
    const [PUTApplicantAPI] = useLazyPutApplicantQuery();
    const [DELETEApplicantAPI] = useLazyDeleteApplicantQuery();

    const [userData, setUserData] = useState<Applicant>(defaultApplicant);
    const [creating, setCreating] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    const GetApplicant = async () => {
        // GET applicant data from API
        let response = await GETApplicantAPI(1);
        if (response.data != null) {
            // setstate with data
            setUserData(() => response.data);
            setEditing(() => false);
            setCreating(() => false);
        }
    }

    const CreateApplicant = async () => {
        if (!creating) {
            // Show creating form
            setCreating(() => true);
            setEditing(() => false);
        } else {
            // Add applicant
            POSTApplicantAPI(userData);
            setEditing(() => false);
            setCreating(() => false);
        }
    }

    const UpdateApplicant = async () => {
        if (!editing) {
            // Show editing form
            setEditing(() => true);
            setCreating(() => false);
        } else {
            // Update applicant
            PUTApplicantAPI(userData);
            setEditing(() => false);
            setCreating(() => false);
        }
    }

    const DeleteApplicant = async () => {
        // delete id 1 since only 1 applicant for this project
        await DELETEApplicantAPI(1);
        setUserData(() => defaultApplicant);
    }

    const UpdateField = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // dynamically pull name and value from inputs
        let value = e.target.value;
        let name = e.target.name;

        try {
            // update form data
            setUserData((prevData) => {
                let newData = { ...prevData };
                newData[name] = value;
                return newData;
            });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={`${styles.header} ${editing || creating ? styles.headerExtra : styles.nothing}`}>
            <div className={styles.headerFlex}>
                <Fade left distance={'10em'}>
                    <div className={styles.headerForm}>
                        {creating ? <h2 className={styles.formHeader}>Create</h2> : <></>}
                        {editing ? <h2 className={styles.formHeader}>Edit</h2> : <></>}
                        <h2 className={`${styles.headerH2} ${styles.aboutHeader}`}>
                            {
                                creating || editing
                                    ? <div className={styles.textDates}>
                                        <label id="address" className={styles.textLabel}>
                                            Address
                                            <input className={styles.textInput} name='address' value={userData.address as string} onChange={(e) => UpdateField(e)}></input>
                                        </label>
                                        <label className={styles.textLabel}>
                                            City
                                            <input className={styles.textInput} name='city' value={userData.city as string} onChange={(e) => UpdateField(e)}></input>
                                        </label>
                                        <label className={styles.textLabel}>
                                            State
                                            <input className={styles.textInput} name='state' value={userData.state as string} onChange={(e) => UpdateField(e)}></input>
                                        </label>
                                        <label className={styles.textLabel}>
                                            Zip
                                            <input className={styles.textInput} name='zip' value={userData.zip as string} onChange={(e) => UpdateField(e)}></input>
                                        </label>
                                    </div>
                                    : isFetching ? <ReactLoading type={"bubbles"} color={"#fff"} height={667} width={375} /> : <>{userData.address}{userData.address.length > 0 ? ',' : ''} {userData.city}{userData.address.length > 0 ? ',' : ''} {userData.state} {userData.zip}</>
                            }
                        </h2>
                        <h1 className={`${styles.headerH1} ${creating || editing ? styles.editMargin : styles.nothing}`}>
                            {
                                creating || editing ? <div className={`${styles.textDates} ${creating || editing ? styles.editNames : styles.nothing}`}>
                                    <label className={styles.textLabelNames}>
                                        First Name
                                        <input className={styles.textInput} name='firstname' value={userData.firstname as string} onChange={(e) => UpdateField(e)}></input>
                                    </label>
                                    <label className={styles.textLabelNames}>
                                        Last Name
                                        <input className={styles.textInput} name='lastname' value={userData.lastname as string} onChange={(e) => UpdateField(e)}></input>
                                    </label>
                                </div>
                                    : isFetching ? <ReactLoading type={"bubbles"} color={"#fff"} height={667} width={375} /> : <>{userData.firstname} {userData.lastname}</>
                            }
                        </h1>
                        <div className={`${styles.headerPara} ${creating || editing ? styles.nothing : styles.extraPara}`}>
                            {
                                creating || editing ? <label className={styles.textLabelP}>
                                    Description
                                    <textarea autoComplete="nope" className={styles.textInputArea} name='about' value={userData.about as string} onChange={(e) => UpdateField(e)}></textarea>
                                </label> : isFetching ? <ReactLoading type={"bubbles"} color={"#fff"} height={667} width={375} /> : <>{userData.about}</>
                            }
                        </div>
                        <div className={styles.headerButtons}>
                            <div className={styles.button2} onClick={CreateApplicant}>{creating ? "Submit" : "Create"}</div>
                            <div className={styles.button2} onClick={UpdateApplicant}>{editing ? "Submit" : "Edit"}</div>
                            <div className={styles.headerSplitter}>or</div>
                            <div className={styles.button2} onClick={DeleteApplicant}>Delete</div>
                        </div>
                    </div>
                </Fade>
                <Fade up delay={400} distance={'5em'}>
                    <div className={styles.floatingImageBox}>
                        <img onClick={GetApplicant} src={require('../assets/tobey.png')} className={styles.profilePicture} />
                    </div>
                </Fade>
            </div>
            <div className={styles.waveBox}>
                <div className={styles.waveAnimation}>
                    <div className={styles.wave} />
                    <div className={styles.waveStatic} />
                </div>
            </div>
        </div>
    );
}

export default Home;