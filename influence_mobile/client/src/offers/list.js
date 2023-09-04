import React, { useEffect, useState } from 'react';
import { getOffers } from '../utils/axios'

const Offers = () => {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers().then((data) => {
        setOffers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Offers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Gender</th>
            <th scope="col">Min Age</th>
            <th scope="col">Max Age</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (

            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.title}</td>
              <td>{offer.description}</td>
              <td>{offer.gender}</td>
              <td>{offer.min_age}</td>
              <td>{offer.max_age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Offers;
