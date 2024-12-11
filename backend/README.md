# Config / installation process

## 1. Clone this repository

```sh
  git clone https://github.com/ilyasalqordhowi/tes-win.git
  cd <project-name>
```

## 2. Open in VSCode

```sh
  code .
```

## 3. Run the database

```sh
docker run --name backend-win -e POSTGRES_PASSWORD=1 -p 5432:5432 -d postgres
```

## 4. Run the migrate in sequelize

```sh
npx sequelize db:create
npx sequelize db:migrate
```

## 5. Run the program

```sh
 nodemon app.js
```

# API References

## Login

```http
  POST /login
```

## Register

```http
  POST /register
```

| Parameter     | Type     | Description                      |
| :------------ | :------- | :------------------------------- |
| `register`    | `POST`   | `Create new user`                |
| `login`       | `POST`   | `login user`                     |
| `product/:id` | `GET`    | `GET product  according to id`   |
| `products`    | `GET`    | `GET a list of products`         |
| `products`    | `PATCH`  | `Edit the selected product data` |
| `product/:id` | `DELETE` | `Remove the selected user data`  |
