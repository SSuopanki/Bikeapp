import { Field, Form, Formik } from "formik";
import { TJourneysWithTime, TPostJourneys, TStation } from "../types";
import styled from "@emotion/styled";
import { useJourneyMutation } from "../Hooks/useJourneyMutation";
import {
  ButtonDiv,
  CancelButton,
  Label,
  SubmitButton,
} from "../StyledComponents";
import { object, string, number, date } from "yup";

type TStationArray = Array<TStation>;

interface TFormProps {
  data: TStationArray;
  setFormOpen: Function;
}

export const UploadJourneyForm = (props: TFormProps) => {
  const { data, setFormOpen } = props;
  const { mutate } = useJourneyMutation();

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().substring(0, 5);

  const initialValues: TJourneysWithTime = {
    duration: 0,
    departureDate: currentDate,
    startTime: currentTime,
    returnDate: currentDate,
    endTime: currentTime,
    departureStationName: "Kaivopuisto",
    departureStationId: 0,
    returnStationName: "Kaivopuisto",
    returnStationId: 0,
    distance: 0,
  };

  const journeyValidationSchema = object({
    departureDate: date().required("Required"),
    returnDate: date().required("Required"),
    startTime: string().required("Required"),
    endTime: string().required("Required"),
    departureStationName: string(),
    departureStationId: number(),
    returnStationName: string(),
    returnStationId: number(),
    distance: number().min(10, "Too short distance").required("Required"),
  });

  //TODO: Possibly better way to do this. Needs research!
  const calculateDuration = (value: TJourneysWithTime) => {
    const { startTime, endTime, departureDate, returnDate } = value;

    //check if dates are equal. Calculate second difference between end and start time
    if (departureDate === returnDate) {
      const start = startTime.toString();
      const startTimeHours = start.slice(0, 2);
      const startTimeMinutes = start.slice(3, 5);

      const end = endTime.toString();
      const endTimeHours = end.slice(0, 2);
      const endTimeMinutes = end.slice(3, 5);

      const startSeconds =
        Number(startTimeHours) * 60 * 60 + Number(startTimeMinutes) * 60;
      const endSeconds =
        Number(endTimeHours) * 60 * 60 + Number(endTimeMinutes) * 60;

      const calculatedDuration = endSeconds - startSeconds;

      value.duration = calculatedDuration;

      return value;
    } else {
      const startDate = new Date(departureDate);
      const endDate = new Date(returnDate);
      const duration = (endDate.getTime() - startDate.getTime()) / 1000;

      value.duration = duration;
      return value;
    }
  };

  return (
    <FormContainer>
      <Formik
        validationSchema={journeyValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values: TJourneysWithTime) => {
          calculateDuration(values);

          const newData: TPostJourneys = {
            ...values,
            returnDate: new Date(values.returnDate),
            departureDate: new Date(values.departureDate),
          };
          console.log(newData);

          mutate(newData);
        }}
      >
        {({ setFieldValue, touched, errors }) => (
          <StyledForm>
            <Fielddiv>
              <Label htmlFor="departureDate"> Departure Date </Label>
              <Field type="date" id="departureDate" name="departureDate" />
              {errors.departureDate && touched.departureDate ? (
                <div>{errors.departureDate}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="startTime">Start Time</Label>
              <Field type="time" id="startTime" name="startTime" />
              {errors.startTime && touched.startTime ? (
                <div>{errors.startTime}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="returnDate">Return Date</Label>
              <Field type="date" id="returnDate" name="returnDate" />
              {errors.returnDate && touched.returnDate ? (
                <div>{errors.returnDate}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="endTime">End Time</Label>
              <Field type="time" id="endTime" name="endTime" />
              {errors.endTime && touched.endTime ? (
                <div>{errors.endTime}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="departureStationName">Departure Station</Label>
              <Field
                as="select"
                id="departureStationName"
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  const currentValue = event.currentTarget.value;
                  setFieldValue("departureStationName", currentValue);
                  const id = data.find(
                    (station) => station.name === currentValue
                  )?.id;
                  setFieldValue("departureStationId", id);
                }}
                name="departureStationName"
              >
                {data.map((value) => {
                  return <option key={value.id}>{value.name}</option>;
                })}
              </Field>
              {errors.departureStationName && touched.departureStationName ? (
                <div>{errors.departureStationName}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="returnStationName">Return Station</Label>
              <Field
                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                  const currentValue = event.currentTarget.value;
                  setFieldValue("returnStationName", currentValue);
                  const id = data.find(
                    (station) => station.name === currentValue
                  )?.id;
                  setFieldValue("returnStationId", id);
                }}
                as="select"
                id="returnStationName"
                name="returnStationName"
              >
                {data.map((value) => {
                  return <option key={value.id}>{value.name}</option>;
                })}
              </Field>
              {errors.returnStationName && touched.returnStationName ? (
                <div>{errors.returnStationName}</div>
              ) : null}
            </Fielddiv>

            <Fielddiv>
              <Label htmlFor="distance">Distance in meters</Label>
              <Field id="distance" name="distance" placeholder="0" />
              {errors.distance && touched.distance ? (
                <div>{errors.distance}</div>
              ) : null}
            </Fielddiv>

            <ButtonDiv>
              <CancelButton
                onClick={() => setFormOpen(false)}
                children="cancel"
                type="button"
              />

              <SubmitButton type="submit" children="submit" />
            </ButtonDiv>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 50rem;
  height: fit-content;
  border: 1px solid black;
  border-radius: 1rem;
`;

const Fielddiv = styled.div`
  display: flex;
  margin: 0.5rem;
  display: grid;
  grid-template-rows: 1.7rem 1.5rem;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 25rem 25rem;
`;
