import React from 'react';

interface UserProfileProps {
  email: string;
  representativeImage: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ email, representativeImage }) => {
  const displayImageUrl = representativeImage ? `data:image/jpeg;base64,${representativeImage}` : '/icons/usericon2.png';

  return (
    <div className="flex items-center">
      <img
        src={displayImageUrl}
        alt="User Icon"
        className="w-24 h-24 rounded-full mr-4"
      />
      <p className="text-lg">{email}</p>
    </div>
  );
};

export default UserProfile;

