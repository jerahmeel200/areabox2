import React from 'react';
import { Container, Button } from 'shards-react';
import { useNavigate } from 'react-router-dom';

function Restrict() {
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>500</h2>
          <h3>Something went wrong!</h3>
          <p>There was a problem on our end. Please try again later.</p>
          <Button pill>
            <a style={{ color: 'white' }} href="/">
              {' '}
              &larr; Privacy Policy
            </a>
            .
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Restrict;
