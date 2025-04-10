
# Scammy Back

The Backend part of a scammer detector project using python,scraperAPI and Vader




![Logo](https://firebasestorage.googleapis.com/v0/b/my-portfolio-27db3.appspot.com/o/Screenshot%202025-04-10%20094523.png?alt=media&token=e3226c18-1c62-4731-a2fc-f694844ef65d)


## Related

Here are the two other parts of the project

[Scammy AI with python,SCRAPER API and NLTK](https://github.com/saliiimm/scammy-ai)

[Scammy front with nextjs](https://github.com/saliiimm/scammy-front)


## Features

- connecting between the [Scammy front part](https://github.com/saliiimm/scammy-front) and [Scammy AI part](https://github.com/saliiimm/scammy-ai)
- optimize AI usage


## Installation

In order to test this project in your computer you have to install nodejs,and bun

You will also need to create a **MONGODB databsase** locally or using mongodb atlas [Click here for tutorial](https://www.mongodb.com/resources/products/fundamentals/create-database) 


[Link to install Nodejs](https://nodejs.org/en/download)


[Link to install bun](https://bun.sh/docs/installation)


    


## Environment Variables

To run this project, you will need to you have to insert the AI api link and mongodb database link  to your .env file

`DB_LINK`

`AI_API_URL`


## Run Locally

Clone the project

```bash
  git clone https://github.com/saliiimm/scammy-back
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies
```bash
  bun install
```
Start the server

```bash
  bun run start:dev
```


## API Reference

#### Analyze a Product

```http
  POST /api/v1/products/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. The product you want to analyze  |




## Authors

- [@saliiimm](https://github.com/saliiimm)

  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)   


[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)  

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


