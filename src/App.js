import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function App() {
  let initUsers = [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
    {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
    {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    }
  ];
  let initUser = {
    id: "",
    createdDate: "",
    status: "",
    firstName: "",
    lastName: "",
    userName: "",
    registrationNumber: "",
  }
  const [users, setUsers] = useState(initUsers);
  const [user, setUser] = useState(initUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  }
  const handleAdd = (e) => {
    const userCopie = { ...user, id: Date.now() }
    console.log(userCopie)
    setUsers([...users, userCopie]);
  }
  const handleDelete = (id) => {

    setUsers(users.filter(u => u.id !== id));
  }
  const classeStatus = (status) => {

    if (status === 'En validation') return 'on-validation';
    else if (status === 'Validé') return 'valide';
    else return 'rejected';
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      
      <Button variant="primary" onClick={handleShow} className="my-5 d-block ms-auto me-5">
       Nouveau
      </Button>
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Nouveau</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container shadow p-3 rounded mt-5 " id="form">
        <div className="row">
          <div className="col-md-4">
            <label for="lastName">Nom</label><input type="text" name="lastName" id="lastName" className="form-control" value={user.lastName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label for="firstName">Prénom</label><input type="text" name="firstName" id="firstName" className="form-control" value={user.firstName} onChange={handleChange} />
          </div>
          <div className="col-md-4">

            <label for="status">Etat</label><select name="status" id="status" className="form-control" value={user.status} onChange={handleChange} >
              <option defaultValue="..." ></option>
              <option value="Validé" >Validé</option>
              <option value="En validation" >En Validation</option>
              <option value="Rejeté" >Rejeté</option>
            </select>
          </div>


        </div>
        <div className="row">
          <div className="col-md-4">
            <label for="userName">Nom d'utilisateur</label><input type="text" name="userName" id="userName"
              className="form-control" value={user.userName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label for="createdDate">Date de création</label><input type="datetime-local" name="createdDate" id="createdDate"
              className="form-control" value={user.createdDate} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label for="registrationNumber">Matricule</label><input type="text" name="registrationNumber" id="registrationNumber"
              className="form-control" value={user.registrationNumber} onChange={handleChange} />
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-warning" onClick={handleAdd}>Enregistrer</button>

        </div>
      </div>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
         
        </Modal.Footer>
      </Modal>


      <br />
      <table className="container table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date de creation </th>
            <th>Etat</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Nom d'utilisateur</th>
            <th>Matricule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(u => <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.createdDate}</td>
              <td><span className={'badge ' + classeStatus(u.status)} >{u.status}</span></td>
              <td>{u.lastName}</td>
              <td>{u.firstName}</td>
              <td>{u.userName}</td>
              <td>{u.registrationNumber}</td>
              <td><button onClick={() => handleDelete(u.id)} ><i class="far fa-trash-alt"></i></button></td>
            </tr>)
          }

        </tbody>
      </table>


    </div>
  );
}

export default App;
