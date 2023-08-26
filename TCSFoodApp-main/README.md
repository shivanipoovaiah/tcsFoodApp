# TCSFoodApp

## Documentation for frontend

Download the latest version of Node.js
Android Studio should be setup with atleast one emulator setup in AVD Manager

### 1. Load all node modules used

- Open terminal from 'frontend' folder of the project and run command
  `npm i`
  To download all modules.

### 2. Start mobile application in local

- Open terminal from 'frontend' folder of the project and run command
  `npx react-native run-android`
  To start application

## Documentation for backend

### 1. prerequisite installation

- run "pip install -r /path/to/requirements.txt"
  (see "requirements.txt" for all dependency that need to install)

### 2. API documentation

- **path: `/backend/`** <br />

  - description: get the list of users <br />

  - **request:** <br />
    GET <br />

  - **response:** <br />
    [
    {
    "pk": ,
    "username": "",
    "firstname": null,
    "lastname": null,
    "password": "",
    "email": "",
    "gender": "M",
    "phone_number": null,
    "bmi": "HW",
    "is_retailer": false,
    "address": null,
    "date_of_birth": null
    }]

- **path: `/dj-rest-auth/registration/`** <br />

  - description: registrate user <br />

  - **request:** <br />
    POST（customer)
    {
    "username": "",(optional)
    "email": "",
    "password1": "",
    "password2": "",
    "date_of_birth": "1997-09-29",(optional)
    "gender": "M",("F","NS")(optional)
    "firstname": "",
    "lastname": "",
    "phone_number": "",(optional)
    "bmi": "HW",(optional)
    "is_retailer": false,
    "address": ""(optional)
    }

    POST（retailer)
    {
    "username": "",(optional)
    "email": "",
    "password1": "",
    "password2": "",
    "phone_number": "",(optional)
    "is_retailer": true,
    "address": ""(optional)
    }

  - **response:** <br />
    {
    "access_token": "",
    "refresh_token": "",
    "user": {
    "pk": 9,
    "username": "TestRegister8",
    "firstname": "Test",
    "lastname": "User8",
    "password": "",
    "email": "fackemail8@gmail.com",
    "gender": "M",
    "phone_number": "23413452345",
    "bmi": "HW",
    "is_retailer": false,
    "address": "Test User str， Test Ave",
    "date_of_birth": "1997-09-29"
    }
    }

- **path: `/dj-rest-auth/login/`** <br />

  - description: login user <br />

  - **request:** <br />
    POST
    {
    "username": "TestRegister5",
    "password": "fackemail5@gmail",
    "email": "fackemail5@gmail.com"
    }

  - **response:** <br />
    {
    "access_token": "",
    "refresh_token": "",
    "user": {
    "pk": 8,
    "username": "TestRegister5",
    "firstname": "Test",
    "lastname": "User4",
    "password": "",
    "email": "",
    "gender": "",
    "phone_number": "",
    "bmi": "HW",
    "is_retailer": false,
    "address": "Test User str， Test Ave",
    "date_of_birth": "1997-09-29"
    }
    }

- **path: `/dj-rest-auth/change-password/`** <br />

  - description: change users' password <br />

  - **request:** <br />
    "Authorization:Bearer <token_received>" PUT <br />
    {
    "old_password":"tcsfood&cmucapstone",
    "new_password":"fackemail5@gmail"
    }

  - **response:** <br />
    {
    "status": "success",
    "code": 200,
    "message": "Password updated successfully",
    "data": []
    }

- **path: `/dj-rest-auth/logout/`** <br />

  - description: logout user <br />

  - **request:** <br />
    "Authorization:JWT <token_received>" POST <br />
    {}
  - **response:** <br />
    {
    "detail": "Successfully logged out."
    }

- **path: `/dj-rest-auth/user/ `** <br />

  - description: update user profile <br />

  - **request:** <br />
    "Authorization:JWT <token_received>" PATCH <br />
    {
    \*\*fields you need to update, likes
    "phone_number": "135670346",
    "address":"Test2 User str， Test Ave"
    }
  - **response:** <br />
    {
    "pk": 1,
    "username": "retialerTest5",
    "firstname": null,
    "lastname": null,
    "password": "pbkdf2_sha256$390000$pLdgEtm5nBGZrZ9jXJt9HJ$EJb5eIZSMNpxpOhUjrLgP4jkxKbIxFMjjsZhu1WuLd0=",
    "email": "fackemail5@gmail.com",
    "gender": null,
    "phone_number": "135670346",
    "bmi": null,
    "is_retailer": true,
    "address": "Test2 User str， Test Ave",
    "date_of_birth": null
    }

- **path: `/backend/createRecord`** <br />

  - name='createRecord' <br />
  - description: Save a Record when the user take a picture with the camera <br />

  - **request:** <br />
    request['user'] = user id <br />
    request['image'] = the image <br />
    e.g.,
    {
    "user": 1,
    "image": "file://data/user/0/com.frontend/cache/mrousavy710674076364561239.jpg"
    }

  - **response:** <br />
    {
    "status": "200(OK)/ 400(BAD_REQUEST)/ 404(NOT_FOUND)"
    }

    body:

    ```
    {
    "user": 1,
    "image": "http://127.0.0.1:8000/media/images/strawberry_xK4ozf2.png",
    "fruit": "preudo_fruit_name_ohoh",
    "days_left": 85,
    "ripe_percentage": 0.0961,
    "creation_time": "2022-11-18T23:16:19.885019Z",
    "record_id": 41
    }
    ```

- **path: `/backend/getResult/{recordId}`** <br />

  - name='getResult' <br />
  - description: get the result of stored record <br />

  - **request:** <br />

  - **response:** <br />
    {
    "status": "200(ok)/ 404(error)",
    }
    ```
    {
    "user": 1,
    "image": "http://127.0.0.1:8000/media/images/banana_fXuySBU.jpeg",
    "fruit": "preudo_fruit_name_ohoh",
    "days_left": 11,
    "ripe_percentage": 0.1664,
    "creation_time": "2022-11-18T22:53:12.421863Z"
    }
    ```

- **path: `/backend/updateFruitName/{recordId}`** <br />

  - name='updateFruitName' <br />
  - description: Update the fruit name of an existing record <br />

  - **request:** <br />
    request['fruit_name'] = fruit name <br />
    e.g.,

    ```
    {
    "fruit_name": "banana"
    }
    ```

  - **response:** <br />
    {
    "status": "200(ok)/ 400(bad_request): if not providing fruit name or fruit name is empty/ 404(error)" if record not exist",
    }
    - success:
      {
      "msg": "fruit name successfully updated"
      }
    - fail:
      {
      "msg": "invalid fruit name provided"
      }

- **path: `/backend/getHistory/{userId}`** <br />

  - name='getHistory' <br />
  - description: get the last 5 scan result of the current user <br />

  - **request:** <br />

  - **response:** <br />
    ```
    [
    {
        "user": 1,
        "image": "http://127.0.0.1:8000/media/images/strawberry_xK4ozf2.png",
        "fruit": "preudo_fruit_name_ohoh",
        "days_left": 85,
        "ripe_percentage": 0.0961,
        "creation_time": "2022-11-18T23:16:19.885019Z"
    },
    {
        "user": 1,
        "image": "http://127.0.0.1:8000/media/images/strawberry.png",
        "fruit": "preudo_fruit_name_ohoh",
        "days_left": 97,
        "ripe_percentage": 0.4242,
        "creation_time": "2022-11-18T23:11:29.021080Z"
    },
    {
        "user": 1,
        "image": "http://127.0.0.1:8000/media/images/banana_fXuySBU.jpeg",
        "fruit": "preudo_fruit_name_ohoh",
        "days_left": 11,
        "ripe_percentage": 0.1664,
        "creation_time": "2022-11-18T22:53:12.421863Z"
    },
    {
        "user": 1,
        "image": "http://127.0.0.1:8000/media/backend/images/banana.jpeg",
        "fruit": "preudo_fruit_name_ohoh",
        "days_left": 36,
        "ripe_percentage": 0.9416,
        "creation_time": "2022-11-18T22:51:27.537677Z"
    },
    {
        "user": 1,
        "image": "http://127.0.0.1:8000/media/images/banana_aMwD4rz.jpeg",
        "fruit": "preudo_fruit_name_ohoh",
        "days_left": 64,
        "ripe_percentage": 0.6908,
        "creation_time": "2022-11-18T22:45:47.775151Z"
    }
    ]
    ```

## Documentation for integration

Check if `adb devices` in your command prompt displays your emulator/mobile phone.

If you are testing on an emulator and not a physical device, be sure to change the domain ip address in the globalContext.js file to "10.0.2.2", since this is the localhost address for emulators.

For testing on Android emulator, each time you should map your computer's local server port to same port in device using: <br />
`adb reverse tcp:8000 tcp:8000` <br />
