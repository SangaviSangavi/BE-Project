
import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';  
import './Wantedreg.css'

function Wantedreg() {
    const [Patientname, setPatientname] = useState("");
    const [Contactnum, setContactnum] = useState("");
    const [Hospitalname, setHospitalname] = useState("");
    const [HospitalContactnum, setHospitalContactnum] = useState("");
    const [Disease, setDisease] = useState("");
    const [bloodgroup1, setBloodgroup1] = useState("");
    const [age1, setAge1] = useState("");
    const [district1, setDistrict1] = useState("");
    const [gender1, setGender1] = useState("");
    const [responseMessage, setResponseMessage] = useState('');

    const RegisterClicked = () => {
        
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(Contactnum)) {
            window.alert('Please enter a valid 10-digit phone number');
            return;
        }

        if (!phonePattern.test(HospitalContactnum)) {
            window.alert('Please enter a valid 10-digit Hospital Contact number');
            return;
        }
    
        axios.post('http://localhost:5000/save_PatientRegisterdata', {
            Patientname: Patientname,
            Contactnum: Contactnum,
            Hospitalname: Hospitalname,
            HospitalContactnum: HospitalContactnum,
            Disease: Disease,
            bloodgroup1: bloodgroup1,
            age1: age1,
            district1: district1,
            gender1: gender1
        })
        .then(response => {
            console.log(response.data.message);
            if (response.data.message === 'Data saved successfully') {
                setResponseMessage('Registered successfully');
            }
        })
        .catch(error => {
            console.error('Error saving data:', error);
            window.alert('Error submitting data');
        });

        //  axios.get('http://localhost:5000/send_details')
        // .then(response => {
        //     console.log(response.data.message);
        //     if (response.data.message === 'Send to Doners Sussesfully') {
        //         window.alert('Send to Doners Sussesfully');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error saving data:', error);
        //     window.alert('No Matching Doners');
        // });

        
    };
    const confirmDelete = () => {
        axios.get('http://localhost:5000/send_details')
        .then(response => {
            console.log(response.data.message);
            if (response.data.message === 'Send to Doners Sussesfully') {
                window.alert('Send to Doners Sussesfully');
            }
        })
        .catch(error => {
            console.error('Error saving data:', error);
            window.alert('No Matching Doners');
        });

        setResponseMessage('')
    }
    const closePopup = () => {
        setResponseMessage('');  
    };

    return (
        <div className="doner">
        <div >
            <div className="text-center mb-4">
                <h3>Blood Registration</h3>
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Patient Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={Patientname}
                        onChange={(e) => setPatientname(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Phone number"
                        value={Contactnum}
                        onChange={(e) => setContactnum(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        value={age1}
                        onChange={(e) => setAge1(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-select"
                        value={gender1}
                        onChange={(e) => setGender1(e.target.value)}
                    >
                        <option >Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Hospital Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Hospital Name"
                        value={Hospitalname}
                        onChange={(e) => setHospitalname(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Hospital Contact Number</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Hospital Contact Number"
                        value={HospitalContactnum}
                        onChange={(e) => setHospitalContactnum(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Disease</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Disease"
                        value={Disease}
                        onChange={(e) => setDisease(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Blood Group</label>
                    <select
                        className="form-select"
                        value={bloodgroup1}
                        onChange={(e) => setBloodgroup1(e.target.value)}
                    >
                        <option >Select...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">District</label>
                    <select
                        className="form-select"
                        value={district1}
                        onChange={(e) => setDistrict1(e.target.value)}
                    >
                        <option >Select...</option>
                        <option value="Ariyalur">Ariyalur</option>
                        <option value="Chengalpattu">Chengalpattu</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Cuddalore">Cuddalore</option>
                        <option value="Dharmapuri">Dharmapuri</option>
                        <option value="Dindigul">Dindigul</option>
                        <option value="Erode">Erode</option>
                        <option value="Kallakurichi">Kallakurichi</option>
                        <option value="Kancheepuram">Kancheepuram</option>
                        <option value="Kanniyakumari">Kanniyakumari</option>
                        <option value="Karur">Karur</option>
                        <option value="Krishnagiri">Krishnagiri</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Mayiladuthurai">Mayiladuthurai</option>
                        <option value="Nagapattinam">Nagapattinam</option>
                        <option value="Namakkal">Namakkal</option>
                        <option value="Nilgiris">Nilgiris</option>
                        <option value="Perambalur">Perambalur</option>
                        <option value="Pudukkottai">Pudukkottai</option>
                        <option value="Ramanathapuram">Ramanathapuram</option>
                        <option value="Ranipet">Ranipet</option>
                        <option value="Salem">Salem</option>
                        <option value="Sivaganga">Sivaganga</option>
                        <option value="Tenkasi">Tenkasi</option>
                        <option value="Thanjavur">Thanjavur</option>
                        <option value="Theni">Theni</option>
                        <option value="Thoothukudi">Thoothukudi</option>
                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Tirunelveli">Tirunelveli</option>
                        <option value="Tirupattur">Tirupattur</option>
                        <option value="Tiruppur">Tiruppur</option>
                        <option value="Tiruvallur">Tiruvallur</option>
                        <option value="Tiruvannamalai">Tiruvannamalai</option>
                        <option value="Tiruvarur">Tiruvarur</option>
                        <option value="Vellore">Vellore</option>
                        <option value="Viluppuram">Viluppuram</option>
                        <option value="Virudhunagar">Virudhunagar</option>
                        
                    </select>
                </div>

                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={RegisterClicked}>Submit</button>
                    {/* <button type="button" className="btn btn-primary" onClick={send}>Send to Doners</button> */}
                </div>
            </form>
        </div>
        {responseMessage && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <div className="popup-header">
                            <span className="popup-title">Conform to send Patient details to Doner</span>
                            <span className="popup-close" onClick={closePopup}>&times;</span>
                        </div>
                        <div className="popup-body">
                            <p>{responseMessage}</p>
                        </div>
                        <div className='conformmain'>
                            
                            <button className='confirmDelete' onClick={confirmDelete}>OK</button>
                            
                            <button className='cancel' onClick={closePopup}>Cancel</button>
                            
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Wantedreg;
