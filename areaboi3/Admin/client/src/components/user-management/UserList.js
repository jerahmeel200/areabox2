import React, { useState } from 'react';
import { Button } from 'shards-react';
import * as ROLES from '../../roles';

const UserList = ({ users, adminAccess }) => {
  // console.log("users",users)
  const roleDescriptions = {
    [ROLES.USER]: "user - don't have any role assigned yet",
    [ROLES.GLOBALADMIN]:
      '(Platform Admin)-cannot edit or manage user, but can  assiagn Roles',
    [ROLES.GLOBALMODERATOR]:
      '(mods for all channels)- can only moderate in all channel',
    [ROLES.GLOBALBOT]: '(Cannot post in any channel)-cannot post',
    [ROLES.CHANNELSUPERADMIN]:
      '(Channel Owners)-can post and moderate from their own channel',
    [ROLES.CHANNELMODERATOR]: 'Moderate channels',
    [ROLES.SERVICEPROVIDER]:
      '(Merchant, content-creator, dedicated store operator)',
    [ROLES.SERVICEOPERATOR]:
      'Moderator -(Hired admins for radio, cinema, School)-can take all actions',
    [ROLES.GLOBALBOTOPERATOR]:
      '(Cannot post in any channel)-Cannot post, non-hired user)- cannot moderate',
    [ROLES.AREABOIBOT]: '(Can post in all public + service channels)',
    [ROLES.CHANNELBOT]: '(Automated Posts)-Cannot post',
    [ROLES.GLOBALSUPERADMIN]: 'Global Super Admin - Can Take All Actions.'
  };

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = (event, user) => {
    const { value } = event.target;
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [user.key]: value
    }));
    // Pass the role only if it's defined
    if (value !== undefined) {
      adminAccess(user.key, false, value);
    }
  };

  const handleRevokeAdminAccess = (userKey) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [userKey]: ROLES.USER // Set the role to "USER" to revoke admin access
    }));
    // Pass the role only if it's defined
    if (selectedRoles[userKey] !== undefined) {
      adminAccess(userKey, true, selectedRoles[userKey]);
    }
  };

  return (
    <table className="table mb-0">
      <thead className="bg-light">
        <tr>
          <th scope="col" className="border-0">
            #
          </th>
          <th scope="col" className="border-0">
            Username
          </th>
          <th scope="col" className="border-0">
            Role
          </th>
          <th scope="col" className="border-0">
            Descriptions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          console.log('user', user);
          return (
            <tr key={user.key}>
              <td>{index + 1}</td>
              <td> {user.username}</td>
              <td>
                <select
                  onChange={(event) => handleRoleChange(event, user)}
                  className="btn btn-sm btn-success p-2 mr-3"
                  title="Select Role"
                  value={selectedRoles[user.key] || user.role}>
                  <option key="user" value={ROLES.USER}>
                    USER
                  </option>
                  <option key="globaladmin" value={ROLES.GLOBALADMIN}>
                    GLOBAL ADMIN
                  </option>
                  <option key="globalsuperadmin" value={ROLES.GLOBALSUPERADMIN}>
                    GLOBAL SUPER ADMIN
                  </option>
                  <option key="channelMod" value={ROLES.CHANNELMODERATOR}>
                    CHANNEL MODERATOR
                  </option>
                  <option key="serviceProvider" value={ROLES.SERVICEPROVIDER}>
                    SERVICE PROVIDER
                  </option>
                  <option key="serviceOperator" value={ROLES.SERVICEOPERATOR}>
                    SERVICE OPERATOR
                  </option>
                  <option
                    key="channelSuperAdmin"
                    value={ROLES.CHANNELSUPERADMIN}>
                    CHANNEL SUPER ADMIN
                  </option>
                  <option
                    key="globalBotOperator"
                    value={ROLES.GLOBALBOTOPERATOR}>
                    GLOBAL BOT OPERATOR
                  </option>
                  <option key="areabot" value={ROLES.AREABOIBOT}>
                    AREABOY BOT
                  </option>
                  <option key="channelBot" value={ROLES.CHANNELBOT}>
                    CHANNEL BOT
                  </option>
                  <option key="globalbot" value={ROLES.GLOBALBOT}>
                    GLOBAL BOT
                  </option>
                </select>
                <Button
                  onClick={() => handleRevokeAdminAccess(user.key)}
                  className="delete btn-sm btn-danger p-2"
                  title="Revoke Admin Access"
                  data-toggle="tooltip">
                  revoke
                </Button>
              </td>
              <td>{roleDescriptions[user.role]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
