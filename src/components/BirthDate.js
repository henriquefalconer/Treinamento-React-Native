import React from 'react';
import DatePicker from 'react-native-datepicker';

funtion DataDeNascimento() {
    return (
        <DatePicker
        style={{ width: 200 }}
        date={data} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-2016"
        maxDate="01-01-2019"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => setdata(date)}
        />
    );

};


export default DataDeNascimento;