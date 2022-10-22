import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pgLimit, setPgLimit] = useState(9);
  useEffect(() => {
    loadUsers(0, pgLimit, 0);
  }, [page]);
  const loadUsers = async (start, end, paginate) => {
    const result = await axios.get(
      `http://localhost:5000/users?_start=${start}&_end=${end}`
    );
    setUsers(result.data);
  };
  const deleteUser = async (id, name) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    alert(`Are you sure delete **${name}**`);
    loadUsers(0, pgLimit, 0);
  };

  const renderPage = () => {};
  return (
    <InfiniteScroll
      dataLength={users.length}
      onScroll={() => setPgLimit(pgLimit + 2)}
      next={() => setPage(page + 1)}
      hasMore={true}
    >
      <div className="container">
        <div className="py-4">
          <h1>Home </h1>
          <table className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="btn" to={`/users/${user.id}`}>
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <Link className="btn" to={`/users/edit/${user.id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link
                      className="btn"
                      onClick={() => deleteUser(user.id, user.name)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default Home;
