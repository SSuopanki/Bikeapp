import { Field, Form, Formik } from "formik";
import styled from "@emotion/styled";
import {
  ButtonDiv,
  CancelButton,
  SubmitButton,
  Label,
} from "../StyledComponents";
import { useStationMutation } from "../Hooks/useStationMutation";

interface TFormProps {
  setFormOpen: Function;
}

export const UploadStationForm = ({ setFormOpen }: TFormProps) => {
  const { mutate } = useStationMutation();
  const initialValues = {
    id: 0,
    nimi: "",
    namn: "",
    name: "",
    osoite: "",
    adress: "",
    kaupunki: "",
    stad: "",
    operaattor: "",
    kapasiteet: 0,
    coordinateX: 0,
    coordinateY: 0,
  };
  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          mutate(values);
        }}
      >
        <StyledForm>
          <FieldDiv>
            <Label htmlFor="id" children="Id" />
            <Field type="number" id="id" name="id" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="nimi" children="Nimi" />
            <Field id="nimi" name="nimi" placeholder="nimi" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="namn" children="Namn" />
            <Field id="namn" name="namn" placeholder="namn" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="name" children="Name" />
            <Field id="name" name="name" placeholder="name" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="osoite" children="Osoite" />
            <Field id="osoite" name="osoite" placeholder="osoite" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="adress" children="Adress" />
            <Field id="adress" name="adress" placeholder="Adress" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="kaupunki" children="Kaupunki" />
            <Field id="kaupunki" name="kaupunki" placeholder="kaupunki" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="stad" children="Stad" />
            <Field id="stad" name="stad" placeholder="stad" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="operaattor" children="Operaattor" />
            <Field id="operaattor" name="operaattor" placeholder="Operaattor" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="kapasiteet" children="Kapasiteet" />
            <Field type="number" id="kapasiteet" name="kapasiteet" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="coordinateX" children="CoordinateX" />
            <Field type="number" id="coordinateX" name="coordinateX" />
          </FieldDiv>
          <FieldDiv>
            <Label htmlFor="coordinateY" children="CoordinateY" />
            <Field type="number" id="coordinateY" name="coordinateY" />
          </FieldDiv>
          <ButtonDiv>
            <CancelButton
              type="button"
              children="cancel"
              onClick={() => setFormOpen(false)}
            />
            <SubmitButton type="submit" children="Submit" />
          </ButtonDiv>
        </StyledForm>
      </Formik>
    </FormContainer>
  );
};

const FieldDiv = styled.div`
  display: flex;
  margin: 0.5rem;
  display: grid;
  grid-template-rows: 1.7rem 1.5rem;
`;

const FormContainer = styled.div`
  width: 50rem;
  height: fit-content;
  border: 1px solid black;
  border-radius: 1rem;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 25rem 25rem;
`;
