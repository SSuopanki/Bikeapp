import { Field, Form, Formik } from "formik";
import styled from "@emotion/styled";
import {
  ButtonDiv,
  CancelButton,
  SubmitButton,
  Label,
} from "../StyledComponents";
import { useStationMutation } from "../Hooks/useStationMutation";
import { object, string, number, date } from "yup";

interface TFormProps {
  setFormOpen: Function;
}

export const UploadStationForm = ({ setFormOpen }: TFormProps) => {
  const { mutate } = useStationMutation();
  const initialValues = {
    fId: 0,
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

  const stationValidationSchema = object({
    fId: number()
      .min(1000, "FId must be between 1000-9999")
      .max(9999, "FId must be between 1000-9999")
      .required(),
    id: number()
      .min(1000, "FId must be between 1000-9999")
      .max(9999, "FId must be between 1000-9999")
      .required(),
    nimi: string().required("nimi is required"),
    namn: string().required("namn is required"),
    name: string().required("name is required"),
    osoite: string().required("osoite is required"),
    adress: string().required("adress is required"),
    kaupunki: string(),
    stad: string(),
    operaattor: string(),
    kapasiteet: number().min(1),
    coordinateX: number().required("required"),
    coordinateY: number().required("required"),
  });
  return (
    <FormContainer>
      <Formik
        validationSchema={stationValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          mutate(values);
        }}
      >
        {({ setFieldValue, touched, errors }) => (
          <StyledForm>
            <FieldDiv>
              <Label htmlFor="fId" children="FId" />
              <Field type="number" id="fId" name="fId" />
              {errors.fId && touched.fId ? <div>{errors.fId}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="id" children="Id" />
              <Field type="number" id="id" name="id" />
              {errors.id && touched.id ? <div>{errors.id}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="nimi" children="Nimi" />
              <Field id="nimi" name="nimi" placeholder="nimi" />
              {errors.nimi && touched.nimi ? <div>{errors.nimi}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="namn" children="Namn" />
              <Field id="namn" name="namn" placeholder="namn" />
              {errors.namn && touched.namn ? <div>{errors.namn}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="name" children="Name" />
              <Field id="name" name="name" placeholder="name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="osoite" children="Osoite" />
              <Field id="osoite" name="osoite" placeholder="osoite" />
              {errors.osoite && touched.osoite ? (
                <div>{errors.osoite}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="adress" children="Adress" />
              <Field id="adress" name="adress" placeholder="Adress" />
              {errors.adress && touched.adress ? (
                <div>{errors.adress}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="kaupunki" children="Kaupunki" />
              <Field id="kaupunki" name="kaupunki" placeholder="kaupunki" />
              {errors.kaupunki && touched.kaupunki ? (
                <div>{errors.kaupunki}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="stad" children="Stad" />
              <Field id="stad" name="stad" placeholder="stad" />
              {errors.stad && touched.stad ? <div>{errors.stad}</div> : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="operaattor" children="Operaattor" />
              <Field
                id="operaattor"
                name="operaattor"
                placeholder="Operaattor"
              />
              {errors.operaattor && touched.operaattor ? (
                <div>{errors.operaattor}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="kapasiteet" children="Kapasiteet" />
              <Field type="number" id="kapasiteet" name="kapasiteet" />
              {errors.kapasiteet && touched.kapasiteet ? (
                <div>{errors.kapasiteet}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="coordinateX" children="CoordinateX" />
              <Field type="number" id="coordinateX" name="coordinateX" />
              {errors.coordinateX && touched.coordinateX ? (
                <div>{errors.coordinateX}</div>
              ) : null}
            </FieldDiv>

            <FieldDiv>
              <Label htmlFor="coordinateY" children="CoordinateY" />
              <Field type="number" id="coordinateY" name="coordinateY" />
              {errors.coordinateY && touched.coordinateY ? (
                <div>{errors.coordinateY}</div>
              ) : null}
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
        )}
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
