import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';

import {
  Alert,
  Button,
  GridContainer,
  Select,
  Input,
} from 'components-ui-cmjau';
import FileUpload from '../../../components/FileUpload';
import RadioGroup from '../../../components/RadioGroup';

import { IndexStyles } from '../../Styles';
import { FormStyles } from './Styles';

import { checkData } from './CheckData';
import { sendDataToAPI } from './DataToDatabase';
import { months, years } from './DataToSelects';
import { setMessage } from './MessageNotification';

import { getLabelYearFromArray } from '../../utils';

const Form = props => {
  const [errorMessage, setErrorMessage] = useState('');
  const [typeOfErrorMessage, setTypeOfErrorMessage] = useState('danger');
  const [fieldMonth, setFieldMonth] = useState(1);
  const [fieldYear, setFieldYear] = useState(1);
  const [fieldDescription, setFieldDescription] = useState('');

  useEffect(() => {
    if (errorMessage === 'Arquivo enviado!') {
      clearForm();
    }
  }, [errorMessage]);

  const handleYear = evt => {
    setFieldYear(evt.target.value);
  };

  const handleMonth = evt => {
    setFieldMonth(evt.target.value);
  };

  const handleDescription = evt => {
    setFieldDescription(evt.target.value);
  };

  const clearForm = () => {
    setFieldYear(1);
    setFieldMonth(1);
    setFieldDescription('');
    document.querySelector('input[type="file"]').value = '';
  };

  const sendData = evt => {
    const formData = new FormData();
    const fileToUpload = document.querySelector('input[type="file"]').files[0];
    formData.append('file', fileToUpload);

    evt.preventDefault();

    const isFormValid = checkData(
      fieldMonth,
      getLabelYearFromArray(years, fieldYear),
      fieldDescription,
      fileToUpload,
    );

    if (isFormValid.status === 'ERROR') {
      setTypeOfErrorMessage('danger');
      setErrorMessage(isFormValid.message);
      return;
    }

    try {
      sendDataToAPI(
        fieldMonth,
        getLabelYearFromArray(years, fieldYear),
        fieldDescription,
        fileToUpload,
        setTypeOfErrorMessage,
        setErrorMessage,
      );
    } catch (error) {
      console.log(error);
    }
    clearForm();
    formData.delete('file');
  };

  return (
    <IndexStyles>
      <FormStyles>
        <h1>Enviar Holerites em Lote </h1>
        <Container className="meio">
          <GridContainer columns={2}>
            <div className="select-container">
              <Select
                data={months}
                field="month"
                label="Mês"
                onChange={handleMonth}
                value={fieldMonth}
                selectedValue={fieldMonth}
              />
            </div>
            <div className="select-container">
              <Select
                data={years}
                field="year"
                label="Ano"
                onChange={handleYear}
                value={fieldYear}
                selectedValue={fieldMonth}
              />
            </div>
          </GridContainer>
          <GridContainer columns={2}>
            <div className="select-container">
              <Input
                field="description"
                label="Referência"
                onChange={handleDescription}
                placeholder="Digite aqui a Referência do Holerite"
                value={fieldDescription}
              />
              <RadioGroup
                label="Tipo de envio"
                field="radio-tipo-envio"
                onChange=""
                name="tipoEnvio"
              />
            </div>
          </GridContainer>
          <GridContainer columns={1}>
            <div className="select-container">
              <FileUpload
                label="Selecionar Lote de Holerites"
                field="fileHolerites"
              />
            </div>
          </GridContainer>
          <GridContainer columns={2}>
            <div className="button-form">
              <Button
                label="Enviar"
                btnStyle="primary"
                type="button"
                onClick={sendData}
              />
            </div>
            <div className="button-form">
              <Button
                label="Limpar"
                btnStyle="success"
                type="button"
                onClick={() => clearForm()}
              />
            </div>
          </GridContainer>

          {errorMessage && (
            <Alert message={errorMessage} type={typeOfErrorMessage} />
          )}
        </Container>
      </FormStyles>
    </IndexStyles>
  );
};

export default Form;
