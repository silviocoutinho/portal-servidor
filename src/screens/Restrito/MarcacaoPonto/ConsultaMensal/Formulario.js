import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  Alert,
  Button,
  Select,
  GridContainer,
  TimeCard,
} from 'components-ui-cmjau';

import { IndexStyles } from '../../Styles';
import { months, years } from './Dados';

const Formulario = props => {
  const [dataTimeCard, setDataTimeCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldMonth, setFieldMonth] = useState(1);
  const [fieldYear, setFieldYear] = useState('1');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { REACT_APP_PORT_API, REACT_APP_URL_API, REACT_APP_VERSION_API } =
    process.env;

  const RESOURCE = 'consulta-mensal';
  const MAIN_ROUTE = `${REACT_APP_VERSION_API}/pontos/${RESOURCE}`;

  const apiURL = `${REACT_APP_URL_API}:${REACT_APP_PORT_API}/${MAIN_ROUTE}`;

  const handleYear = evt => {
    setFieldYear(evt.target.value);
    setFieldMonth(1);
  };

  const handleMonth = evt => {
    setFieldMonth(evt.target.value);
  };

  const getDataFromAPI = () => {
    const token = localStorage.getItem('token');
    const config = {
      Authorization: 'Bearer ' + token,
    };
    try {
      axios
        .get(apiURL, {
          params: {
            year: 2021,
            month: 5,
          },
          headers: config,
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          if (!err.response) {
            setErrorMessage(
              'O Servidor está indisponível, contate o Setor de TI!',
            );
          } else {
            const code = err.response.status;
            const response = err.response.data;
            setErrorMessage(
              `Estamos com problemas no Servidor. Mensagem: ${response}. Código: ${code}`,
            );
          }
        });
    } catch (error) {
      console.log('Backend is offline!');
    }
  };

  const filterData = () => {
    let selectedYears;
    years.forEach((element, key) => {
      if (element.value === fieldYear) selectedYears = element.label;
    });
    if (
      currentYear === Number(selectedYears) &&
      Number(fieldMonth) > currentMonth
    ) {
      setDataTimeCard(null);
      setErrorMessage(
        'Mês selecionado inválido. Selecione um mês igual ou inferior ao atual!',
      );
    } else {
      setDataTimeCard([
        {
          dia: '2021-05-10',
          ent1: '08:01',
          sai1: '12:10',
          ent2: '13:30',
          sai2: '17:00',
          ent3: null,
          sai3: null,
        },
        {
          dia: '2021-05-11',
          ent1: '08:00',
          sai1: '12:00',
          ent2: '13:30',
          sai2: '17:30',
          ent3: null,
          sai3: null,
        },
      ]);
      getDataFromAPI();
    }
  };

  return (
    <IndexStyles>
      <h1>Relatório por mês</h1>
      <Container className="meio">
        <GridContainer columns={3}>
          <div className="select-container">
            <Select
              data={months}
              field="month"
              label="Mês"
              onChange={handleMonth}
            />
          </div>
          <div className="select-container">
            <Select
              data={years}
              field="year"
              label="Ano"
              onChange={handleYear}
            />
          </div>
          <div className="button-container">
            <Button
              label="Filtrar"
              btnStyle="primary"
              type="button"
              onClick={filterData}
            />
          </div>
        </GridContainer>
        {dataTimeCard && (
          <TimeCard
            data={dataTimeCard}
            head={{
              data: 'Dia',
              dia: 'Data',
              diaDaSemana: 'Dia da Semana',
              ent1: 'Entrada 1',
              ent2: 'Entrada 2',
              ent3: 'Entrada 3',
              horaExtra: 'Hora-extra',
              sai1: 'Saída 1',
              sai2: 'Saída 2',
              sai3: 'Saída 3',
              total: 'Total',
            }}
            workingTime={8}
          />
        )}
        {errorMessage && <Alert message={errorMessage} type="danger" />}
      </Container>
    </IndexStyles>
  );
};

export default Formulario;
