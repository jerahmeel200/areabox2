import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import { ref as refD, update, child, onValue, off } from 'firebase/database';
import PageTitle from '../components/common/PageTitle';
import { database } from '../firebase';
import UserList from '../components/user-management/UserList';
import Spinner from '../components/common/Spinner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersRef = refD(database, 'users');
  console.log('usersRef', database);
  const adminAccess = (key, revoke, role) => {
    const roles = {};
    if (revoke) {
      roles['role'] = null; // Remove the admin role when revoke is true
    } else {
      roles['role'] = role;
    }

    // Check if the role is defined before updating the roles
    if (role !== undefined) {
      const userRef = child(usersRef, key);
      update(userRef, roles)
        .then(() => {
          console.log('User roles updated successfully!');
          setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
              if (user.key === key) {
                return {
                  ...user,
                  roles: revoke ? 'USER' : role
                };
              }
              return user;
            });
            return updatedUsers;
          });
        })
        .catch((error) => {
          console.error('Error updating user roles:', error);
        });
    }

    console.log('setUser', setUsers);
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        console.log('updatedUsers', updatedUsers);
        if (user.key === key) {
          return {
            ...user,
            roles: revoke ? 'USER' : role
          };
        }
        return user;
      });
      return updatedUsers;
    });
  };
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);

      try {
        const loadedUsers = [];

        onValue(usersRef, (snapshot) => {
          snapshot.forEach((snap) => {
            const userData = snap.val();
            const userRole = userData.role || 'defaultRole';
            // console.log("userData",userData.role)
            const user = {
              key: snap.key,
              username: userData.userName ? userData.userName : snap.key,
              role: userRole
            };
            // console.log("user",user)
            loadedUsers.push(user);
          });

          setUsers(loadedUsers);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error loading users:', error);
        setLoading(false);
      }
    };

    loadUsers();

    const handleSnapshot = (snapshot) => {
      const loadedUsers = [];
      snapshot.forEach((snap) => {
        const userData = snap.val();

        const userRole = userData.role || 'USER';

        const user = {
          key: snap.key,
          username: userData.userName ? userData.userName : snap.key,
          role: userRole
        };
        loadedUsers.push(user);
      });

      setUsers(loadedUsers);
    };

    const unsubscribe = onValue(usersRef, handleSnapshot);

    return () => {
      off(usersRef, handleSnapshot);
      unsubscribe();
    };
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="User Management"
          subtitle="Users"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Active Users</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              {loading ? (
                <Spinner />
              ) : (
                <UserList users={users} adminAccess={adminAccess} />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
