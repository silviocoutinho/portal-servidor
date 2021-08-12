import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, Collapse } from 'react-bootstrap';

import { BsFillCaretRightFill as BsCicle } from 'react-icons/bs';
import { BsGridFill as BsGrid } from 'react-icons/bs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { BsFillArchiveFill } from 'react-icons/bs';
import { BsFillGridFill } from 'react-icons/bs';

const Menu = () => {
  const [openPontos, setOpenPontos] = useState(true);
  const [openHolerite, setOpenHolerite] = useState(false);

  useEffect(() => {
    console.log(1);
  }, [openPontos]);

  return (
    <div>
      <div className="menu-lateral-titulo">
        <h5>
          <BsFillGridFill className="menu-lateral-button-icone" />
          Menu
        </h5>
      </div>
      <Button
        variant="secondary"
        className="menu-lateral-button"
        onClick={() => setOpenPontos(!openPontos)}
      >
        <BsFillCalendarFill className="menu-lateral-button-icone" />
        Registro de Ponto
      </Button>
      <Collapse in={openPontos} appear={true}>
        <ul>
          <li>
            <Link to={'/restrito/consulta-mensal'}>Relatório por Mês</Link>
          </li>
          <li>
            <Link to={'/restrito/consulta-dia'}>Consulta por dia</Link>
          </li>
        </ul>
      </Collapse>
      <Button
        variant="secondary"
        className="menu-lateral-button"
        onClick={() => setOpenHolerite(!openHolerite)}
      >
        <BsFillArchiveFill className="menu-lateral-button-icone" />
        Holerite
      </Button>
      <Collapse in={openHolerite} appear={true}>
        <ul>
          <li>
            <Link to={'/restrito/obter-holerite'}>Obter</Link>
          </li>
          <li>
            <Link to={'/restrito/solicitar-holerite'}>Solicitações</Link>
          </li>
        </ul>
      </Collapse>
    </div>
  );
};

export default Menu;
