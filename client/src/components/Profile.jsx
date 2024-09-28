import React from "react";
import { Container, Stack, Image, Card } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

const Profile = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Container className="my-5">
      <h1 className="text-center mb-5">PROFILE</h1>
      {user && (
        <Card className="mx-auto p-4 shadow" style={{ maxWidth: '600px' }}>
          <div className="text-center mb-4">
            <Image
              src={user.avatar && user.avatar.url}
              alt="avatar"
              roundedCircle
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>

          <Stack gap={3}>
            <Stack direction="horizontal" className="justify-content-between">
              <p className="fw-bold text-primary">Name:</p>
              <p>{user.name}</p>
            </Stack>
            <Stack direction="horizontal" className="justify-content-between">
              <p className="fw-bold text-primary">Email:</p>
              <p>{user.email}</p>
            </Stack>
            <Stack direction="horizontal" className="justify-content-between">
              <p className="fw-bold text-primary">Phone:</p>
              <p>{user.phone}</p>
            </Stack>
          </Stack>
        </Card>
      )}
    </Container>
    </>
  );
};

export default Profile;
