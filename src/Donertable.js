import { useEffect, useState } from "react";
import './Donertable.css';

function Donertable() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchDonerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Donertable');
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
    const intervalId = setInterval(fetchDonerData, 1000);  // Refresh data every second
    return () => clearInterval(intervalId);  // Cleanup interval when the component unmounts

  }, []);  // Empty dependency array ensures it runs once when the component mounts

  return (
    <div className="doner">
      <h2 className="text-center mb-4">Doner Details</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Doner Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Bloodgroup</th>
              <th>Phone Number</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No data available</td>
              </tr>
            ) : (
              recipes.map((item, index) => (
                <tr key={index}>
                  <td>{item.doner_id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.bloodgroup}</td>
                  <td>{item.phnum}</td>
                  <td>{item.district}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donertable;
