import React, {useState, useContext} from 'react';
import { Button, TextInput, Text, RadioButton } from 'react-native-paper';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { profileStyle } from './profile.style';
import { registerStyle } from '../register/register.style';
import { HeaderComponent } from '../../components/header/header.component';
import { Context } from '../../components/global_context/globalContext';
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';

export const ProfileScreen = ({navigation}) => {
    const globalContext = useContext(Context);
    const {userObj, setUserObj, domain, accessToken, setAccessToken, refreshToken, setRefreshToken} = globalContext;
    const [apiError, setApiError] = useState('');
    const [phone, setPhone] = useState(userObj.phone_number);
    const [phoneError,setPhoneError] = useState('');
    const [dob, setDob] = useState(new Date(userObj.date_of_birth));
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState(userObj.gender);
    const [bmi, setBmi] = useState(userObj.bmi);
    const bmiData = [
        {key:'UW', value:'Underweight'},
        {key:'HW', value:'Normal'},
        {key:'OW', value:'Slightly Overweight'},
        {key:'O', value:'Obess'},
    ]
    let bmiValue = 'Select BMI category'
    if(bmi) {
        if(bmi === 'UW')  bmiValue = 'Underweight';
        else if(bmi === 'HW') bmiValue = 'Normal';
        else if(bmi === 'OW') bmiValue = 'Slightly Overweight';
        else if(bmi === 'O') bmiValue = 'Obess';
        else bmiValue = 'Select BMI category'
    }
   // if phone number satisfies the requirement, call update()
    function handleUpdate() {
        if(phone != '' || dob != '' || gender != '' || bmi != '') {
            if(phone != '' && !phone
            .toLowerCase()
            .match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                setPhoneError('Invalid phone number.')
            } else {
                setPhoneError('')
            }

            if(!phoneError) {
                update()
            }
        }
    }

    //update user information
    function update() {
        let birth='';
        if(dob) {
            birth = new Date(dob).toISOString().split('T')[0];
        }
        const body = JSON.stringify({
            "phone_number": phone,
            "gender": gender,
            "bmi":bmi,
            "date_of_birth": birth
        });
        fetch(`${domain}/dj-rest-auth/user/`, {
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`}),
          body: body,
        })
        .then(response => {
            if(response.ok) {
              return response.json();
            }
            else {
              throw response.json();
            }
          })
          .then(data => {
            setApiError('');
            setUserObj(data)
            console.log(data)
            navigation.navigate('Profile');
          })
          .catch(error => {
            error
              ? setApiError('Error in API')
              : setApiError('');
          });
      }

    //user logout
    function handleLogout() {
        if(accessToken === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4ODgyMzg3LCJpYXQiOjE2Njg4ODIwODcsImp0aSI6ImJkYjg1MjEzYTU4YzRjMzU4MGZjNjNkYzM1MjJkNWY5IiwidXNlcl9pZCI6Mn0.twQgOsfltbQM3971RcoNIVO_yiKUZbnZsO_o4B3xOuU') console.log('CORECT TOKN')
        const body = JSON.stringify({});
        fetch(`${domain}/dj-rest-auth/logout/`, {
            method: 'POST',
            headers: new Headers(
                {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": `JWT ${refreshToken}`,
                }
            ),
            body: {},
        })
        .then(response => {
              return response.json();})
        .then(data => {
            console.log(data)
            setApiError('');
            setAccessToken('');
            setRefreshToken('');
            setUserObj('');
            setIsLoggedIn(false);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
    <SafeAreaView>
        <ScrollView>
        <HeaderComponent title='Profile' navigation={navigation}/>
            <View style={profileStyle.view}>
            <Text style={profileStyle.profileTitle}>PROFILE</Text>
            {apiError ? (
                <Text style={registerStyle.errors}>{apiError}</Text>
            ) : null}
                <Text style={profileStyle.label}>Name: {userObj.firstname} {userObj.lastname}</Text>
                <Text style={profileStyle.label}>Email: {userObj.email}</Text>
                {phoneError ? (
                <Text >{phoneError}</Text>
                ) : null}
                <Text style={profileStyle.label}>Phone:</Text>
                <TextInput 
                style={profileStyle.inputBox}
                placeholder='XXX-XXX-XXXX'
                onChangeText={(number) => setPhone(number)}
                keyboardType="phone-pad"
                value={phone}
                ></TextInput>
                <Text style={profileStyle.label}>Date of birth:</Text>
                <Text style={profileStyle.dob}>{dob ? String(dob.toDateString()) : ''}</Text>
                <>
                <Button title="Add Dob"  mode="contained"
                style={profileStyle.updateBtn} onPress={() => setOpen(true)}>
                    <Text style={profileStyle.updateBtnText}>Edit Date of Birth</Text>
                </Button>
                <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={dob? dob : new Date()}
                    minimumDate={new Date("1950-01-01")}
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                    setOpen(false)
                    setDob(date)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />
                </>
                <Text style={profileStyle.label}>Gender:</Text>
                <RadioButton.Group 
                    onValueChange={gender => setGender(gender)} value={gender}>
                    <RadioButton.Item
                        labelStyle={profileStyle.radiolabel}
                        color='#FFFFFF' 
                        uncheckedColor='#FFFFFF'
                        selected={userObj.gender === 'M'}
                        label="Male" value="M" />
                    <RadioButton.Item 
                        labelStyle={profileStyle.radiolabel}
                        color='#FFFFFF' 
                        uncheckedColor='#FFFFFF'
                        selected={userObj.gender === 'F'}
                        label="Female" value="F" />
                </RadioButton.Group>
                <Text style={profileStyle.label}>BMI:</Text>
                <SelectList 
                    search={false}
                    boxStyles={profileStyle.list}
                    inputStyles={profileStyle.list}
                    dropdownStyles={profileStyle.list}
                    dropdownTextStyles={profileStyle.list}
                    setSelected={(key) => { setBmi(key)}} 
                    data={bmiData} 
                    defaultOption={{ key:userObj.bmi, value: bmiValue }} 
                    save="key"
                />
                <Button
                mode="contained"
                style={profileStyle.updateBtn}
                onPress={() => handleUpdate()}>
                <Text style={profileStyle.updateBtnText}>UPDATE</Text>
                </Button>
                <Button
                mode="contained"
                style={profileStyle.updateBtn}
                onPress={() => handleLogout()}>
                <Text style={profileStyle.updateBtnText}>LOGOUT</Text>
                </Button>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}