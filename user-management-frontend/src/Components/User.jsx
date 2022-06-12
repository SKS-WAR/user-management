import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Modal,ModalBody,ModalHeader,ModalFooter } from 'reactstrap';
const User = (props) => {
    const [modal,setModal] = useState(false);
    const [user,setUser] = useState(props?.data);
    const [name,setName] = useState(props?.data?.fullName);
    const toggle = () => setModal(!modal);

    const handleUpdate = () => {
        axios.put('http://localhost:1337/user/'+user.id,{fullName:name})
        .then(res => {
            setUser(res.data);
            setModal(!modal);
            // update props.allUsers
            console.log(props.allUsers);
            // update props.allUsers state with new user
            props.setAllUsers( props.allUsers.map(user => {
                if(user.id === res.data.id){
                    user.fullName = res.data.fullName;
                }
                return user;
            }
            ))
        }
        )
        .catch(err => {
            console.log(err);
            setModal(!modal);
        }
        )
    }

  return (
    <div>
        <button className="btn btn-primary" onClick={toggle}>View/Edit</button>
        <Modal isOpen={modal}
            toggle={toggle}
            size={'lg'}>
            <ModalHeader toggle={toggle}>
                {user.fullName}
            </ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-3">User Name</div>
                    <div className="col-9"><input type={'text'} value={name} onChange={(e) => setName(e.target.value)}/></div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                <button className="btn btn-danger" onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default User