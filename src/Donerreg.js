import axios from 'axios';
import { useState } from 'react';
import './Donerreg.css';

function Donerreg() {
    const [name, setName] = useState('');
    const [phnum, setPhnum] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [age, setAge] = useState('');
    const [district, setDistrict] = useState('');
    const [gender, setGender] = useState('');

    const RegisterClicked = () => {
        // Validate that the phone number is exactly 10 digits
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phnum)) {
            window.alert('Please enter a valid 10-digit phone number');
            return;
        }

        axios.post('http://localhost:5000/save_Registerdata', {
            name: name,
            phnum: phnum,
            bloodgroup: bloodgroup,
            age: age,
            district: district,
            gender: gender
        })
        .then(response => {
            console.log(response.data.message);
            if (response.data.message === 'Data saved successfully') {
                window.alert('Registered successfully');
            }
        })
        .catch(error => {
            console.error('Error saving data:', error);
            window.alert('Error saving registration data.Mobile Number Already Registerd.');
        });
    };

    return (
        <div className='doner'>
            <div>
                <div className="text-center mb-4">
                    <h3>Donor Registration</h3>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            name='phnum'
                            value={phnum}
                            onChange={(e) => setPhnum(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option>Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Blood Group</label>
                        <select
                            className="form-select"
                            value={bloodgroup}
                            onChange={(e) => setBloodgroup(e.target.value)}
                        >
                            <option>Select...</option>
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
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                            <option>Select...</option>
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
                        <button type="button" className="btn btn-primary" onClick={RegisterClicked}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Donerreg;
