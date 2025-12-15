    import users from "../data/users";

    function Users() {
    return (
        <div className="page">
        <h2>Users</h2>
        <table>
            <tbody>
            {users.map((u, i) => (
                <tr key={i}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

    export default Users;
