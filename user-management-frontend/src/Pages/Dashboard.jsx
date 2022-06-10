import React,{useEffect,useState} from 'react'
import { Route,Navigate } from 'react-router-dom';
import Auth from '../Services/Auth';
import axios from 'axios';
const Dashboard = () => {
    
    const [allUsers,setAllUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const [pageNumber,setPageNumber] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [tempUsers,setTempUsers] = useState([]);
    const [currentPageData,setCurrentPageData] = useState([]);

    const [search,setSearch] = useState('');
    const [sort,setSort] = useState('');

    const [isAuthenticated,setIsAuthenticated] = useState(Auth.isAuthenticated);

    const dataPerPage = 3;
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:1337/user')
        .then(res => {
            setAllUsers(res.data);
            setTempUsers(res.data);
            setTotalPages(res.data.length/dataPerPage);
            setCurrentPageData(res.data.slice(0,dataPerPage));
            setLoading(false);
        }
        )
        .catch(err => {
            setError(err.message);
            setLoading(false);
        }
        )
    }
    ,[])

    const handleSearch = () => {
        setLoading(true);
        setTempUsers(allUsers.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase())));
        setTotalPages(tempUsers.length/dataPerPage);
        setCurrentPageData(tempUsers.slice(0,dataPerPage));
        setLoading(false);
    }
    
    
    if(!isAuthenticated){
        return <Navigate to="/login" />
    }
    
    return (
        <div className='w-100'>
            <h1>
                Dashboard
                {/* logout button */}
                <button className="btn btn-danger text-right" onClick={() => Auth.signout(() => {
                    localStorage.clear();
                    setIsAuthenticated(false);
                    // Navigate('/login');
                }
                )}>Logout</button>
            </h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>All Users</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>
                                                Name
                                                {/* sort by name  ASC/DESC*/}
                                                <i className="fa fa-sort" onClick={() => {
                                                    setSort(sort === 'asc' ? 'desc' : 'asc');
                                                    setTempUsers(tempUsers.sort((a,b) => {
                                                        if(sort === 'asc'){
                                                            return a.fullName.localeCompare(b.fullName);
                                                        }
                                                        else{
                                                            return b.fullName.localeCompare(a.fullName);
                                                        }
                                                    }
                                                    ));
                                                    setCurrentPageData(tempUsers.slice(0,5));
                                                }
                                                }
                                                />
                                            </th>
                                            <th>
                                                Email
                                                <i className="fa fa-sort" onClick={() => {
                                                    setSort(sort === 'asc' ? 'desc' : 'asc');
                                                    setTempUsers(tempUsers.sort((a,b) => {
                                                        if(sort === 'asc'){
                                                            return a.fullName.localeCompare(b.fullName);
                                                        }
                                                        else{
                                                            return b.fullName.localeCompare(a.fullName);
                                                        }
                                                    }
                                                    ));
                                                    setCurrentPageData(tempUsers.slice(0,5));
                                                }
                                                }
                                                />
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? <tr><td colSpan="4" className="text-center">Loading...</td></tr> : currentPageData.map(user => {
                                            return <tr key={user._id}>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        setLoading(true);
                                                        axios.get(`http://localhost:1337/user/${user._id}`)
                                                        .then(res => {
                                                            setAllUsers(allUsers.filter(u => u._id !== user._id));
                                                            setLoading(false);
                                                            // setSuccess('User deleted successfully');
                                                        }
                                                        )
                                                        .catch(err => {
                                                            setError(err.message);
                                                            setLoading(false);
                                                        }
                                                        )
                                                    }
                                                    }>View</button>
                                                </td>
                                            </tr>
                                        }
                                        )}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-md-12">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item"><button className="page-link" onClick={() => {
                                                    if(pageNumber > 1){
                                                        setPageNumber(pageNumber - 1);
                                                        setCurrentPageData(allUsers.slice((pageNumber - 2) * dataPerPage,(pageNumber - 1) * dataPerPage));
                                                    }
                                                }
                                                }>Previous</button></li>
                                                {/* page numbers */}
                                                
                                                {tempUsers.slice(0,Math.ceil(tempUsers.length/dataPerPage)).map((x,i) => {
                                                    return <li key={i} className={pageNumber === i + 1 ? 'page-item active' : 'page-item'}><button className="page-link" onClick={() => {
                                                        setPageNumber(i + 1);
                                                        setCurrentPageData(tempUsers.slice(i * dataPerPage,(i + 1) * dataPerPage));
                                                    }
                                                }>{i + 1}</button></li>
                                                }
                                                )}  


                                                <li className="page-item"><button className="page-link" onClick={() => {
                                                    if(pageNumber < totalPages){
                                                        setPageNumber(pageNumber + 1);
                                                        setCurrentPageData(allUsers.slice(pageNumber * dataPerPage,(pageNumber + 1) * dataPerPage));
                                                    }
                                                }
                                                }>Next</button></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
    
export default Dashboard