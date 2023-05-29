import { Field, Form, Formik, useFormikContext } from "formik";
import { TStations } from "../types";
import { useState } from "react";

type TValue = Record<string, number | string>;
type TStationArray = Array<TStations>;

interface TFormProps {
  data: TStationArray;
}

export const UploadForm = (Props: TFormProps) => {
  const { data } = Props;

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().substring(0, 5);

  const initialValues = {
    departureDate: currentDate,
    startTime: currentTime,
    returnDate: currentDate,
    endTime: currentTime,
    departureStationName: "",
    departureStationId: 0,
    returnStationName: "",
    returnStationId: 0,
    distance: 0,
  };

  //TODO: Possibly better way to do this. Needs research!
  const calculateDuration = (value: TValue) => {
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
      console.log("value: ", value);
      return value;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values: TValue) => {
        calculateDuration(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <label htmlFor="departureDate"> Departure Date </label>
          <Field type="date" id="departureDate" name="departureDate" />

          <label htmlFor="startTime">Start Time</label>
          <Field type="time" id="startTime" name="startTime" />

          <label htmlFor="returnDate">Return Date</label>
          <Field type="date" id="returnDate" name="returnDate" />

          <label htmlFor="endTime">End Time</label>
          <Field type="time" id="endTime" name="endTime" />

          <label htmlFor="departureStationName">Departure Station</label>
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

          <label htmlFor="returnStationName">Return Station</label>
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

          <label htmlFor="distance">Distance in meters</label>
          <Field id="distance" name="distance" placeholder="0" />

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
