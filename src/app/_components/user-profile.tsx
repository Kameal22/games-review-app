"use client";
import { useUserStore } from "@/stores/user-store";

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useUserStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Member since:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
