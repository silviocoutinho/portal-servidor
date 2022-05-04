import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Header from '../elements/Header';
import Menu from '../elements/Menu';
import { IndexStyles } from '../Styles';

const PageNotFound = props => {
  return (
    <IndexStyles>
      <Header title={'Portal do Servidor'} />
      <Container fluid="xs md lg">
        <Row>
          <Col xs={4} md={3} className="menu-lateral">
            <Menu />
          </Col>
          <Col xs={8} md={9} className="principal">
            <h1>Página não encontrada!</h1>
          </Col>
        </Row>
      </Container>
    </IndexStyles>
  );
};

export default PageNotFound;
