const UserCard = ({ user }) => (
  <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
    <img
      className="w-20 h-20 rounded-full mx-auto mb-2"
      src={user.avatar}
      alt=""
    />
    <h5 className="text-xl font-medium mb-1">{`${user.first_name} ${user.last_name}`}</h5>
    <p className="text-gray-600 mb-2">{user.email}</p>
    <div className="flex items-center">
      <span className="mr-2 text-gray-600">Gender:</span>
      <span>{user.gender}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-2 text-gray-600">Domain:</span>
      <span>{user.domain}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-2 text-gray-600">Availability:</span>
      <span>{user.available == true ? "Available" : "Not Available"}</span>
    </div>
  </div>
);

export default UserCard;
