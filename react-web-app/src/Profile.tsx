import { useEffect, useState } from "react";
import { GetTokenWithPopupOptions, PopupConfigOptions, User } from "@auth0/auth0-react";

interface IProfileProps {
  user: User | undefined;
  getAccessTokenWithPopup: (options?: GetTokenWithPopupOptions | undefined, config?: PopupConfigOptions | undefined) => Promise<string | undefined>;
}

function Profile ({ user, getAccessTokenWithPopup }: IProfileProps) {
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-6vmmxbqy66u4zfxt.us.auth0.com";
      
      const accessToken = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://dev-6vmmxbqy66u4zfxt.us.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata"
        },
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      });

      const { user_metadata } = await metadataResponse.json();
      setUserMetadata(user_metadata);
    };
  
    getUserMetadata();
  }, [getAccessTokenWithPopup, user?.sub]);

  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  );
};

export default Profile;