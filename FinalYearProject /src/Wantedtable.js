import { useEffect, useState } from "react";
import './Wantedtable.css';  

function Wantedtable() {
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
       const fetchDonerData = async () => {
         try {
           const response = await fetch('http://localhost:5000/Patienttable');
           if (!response.ok) {
             throw new Error('Failed to fetch data');
           }

           const data = await response.json();
           setRecipes(data);
           console.log("data", data);
         } catch (error) {
           console.error('Error fetching Doner data:', error);
         } 
       };
        
       fetchDonerData();
   }, []);

   return(
       <div className="doner">
       <div >
           <h2 className="text-center mb-4">Patient Details</h2>
           <div className="table-responsive">
               <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Patient Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Bloodgroup</th>
                      <th>Disease</th>
                      <th>Hospital Name</th>
                      <th>Hospital Number</th>
                      <th>Atender Number</th>
                      <th>District</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipes.map((item, index) => (
                      <tr key={index}>
                        <td>{item.sno}</td>
                        <td>{item.Patientname}</td>
                        <td>{item.age1}</td>
                        <td>{item.gender1}</td>
                        <td>{item.bloodgroup1}</td>
                        <td>{item.Disease}</td>
                        <td>{item.Hospitalname}</td>
                        <td>{item.HospitalContactnum}</td>
                        <td>{item.Contactnum}</td>
                        <td>{item.district1}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
           </div>
       </div>
       </div>
   );
}

export default Wantedtable;
