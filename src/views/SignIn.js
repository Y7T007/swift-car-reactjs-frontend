import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === 'admin@swift-car.com' && password === 'admin@123') {
      localStorage.setItem('swiftcar-token', 'Y7T007');
        window.location.href = '/admin/dashboard';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Swift Car</h2>
            <h6 className="text-center mb-4">Admin Platform</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button className="w-100" type="submit">Sign In</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}