import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

function NeedsAssessment() {

  
    return(
        <div>
          {/* Navbar */}
      <header style={{ paddingLeft: 0 }}>
        <ClientNav/>
      </header>

<table className="table">
  <thead>
    <tr>
      <th scope="col">Focus Area</th>
      <th scope="col">Desired Future State</th>
      <th scope="col">Current State</th>
      <th scope="col">Identified Gap</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Example</th>
      <td>To do good</td>
      <td>We are doing okay.</td>
      <td>30%</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" style={{fontFamily: 'Bitter', color: black, backgroundColor: white}}>Edit
</button></td>
    </tr>
    <tr>
      <th scope="row">Example2</th>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" style={{fontFamily: 'Bitter', color: black, backgroundColor: white}}>Edit
</button></td>
    </tr>
    <tr>
      <th scope="row">Example3</th>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" style={{fontFamily: 'Bitter', color: black, backgroundColor: white}}>Edit
</button></td>
    </tr>
  </tbody>
</table>
<div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="editModalLabel">Edit Focus</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <input type="text" class="form-control" aria-label="Focus Area" />
      <input type="text" class="form-control" aria-label="Desired Future State" />
      <input type="text" class="form-control" aria-label="Current State" />
      <input type="text" class="form-control" aria-label="Identified Gap" />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
  )
}

export default NeedsAssessment;