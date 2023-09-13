

export default function AdminProfile ({userData}) {
    return (
        <div className="wrapper">
            <h1>{userData.username}</h1>
        </div>
    );
}
