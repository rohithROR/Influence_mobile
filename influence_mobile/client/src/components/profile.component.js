import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';

const ProfileComponent = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      authService.profile().then((data) => {
        setUser(data)
      })
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <ul className="list-group">
          <li className="list-group-item"><span className="fw-bold">Id</span> - {user?.id}</li>
          <li className="list-group-item"><span className="fw-bold">First Name</span> - {user?.first_name}</li>
          <li className="list-group-item"><span className="fw-bold">Last Name</span> - {user?.last_name}</li>
          <li className="list-group-item"><span className="fw-bold">User Name</span> - {user?.user_name}</li>
          <li className="list-group-item"><span className="fw-bold">Gender</span> - {user?.gender}</li>
          <li className="list-group-item"><span className="fw-bold">DOB</span> - {user?.dob}</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileComponent