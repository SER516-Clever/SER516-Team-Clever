# SER516-Team-Clever
<div>
    <img width="20" src="https://user-images.githubusercontent.com/25181517/183423507-c056a6f9-1ba8-4312-a350-19bcbc5a8697.png" alt="Python" title="Python"/>
    <img width="20" src="https://github.com/SER516-Clever/SER516-Team-Clever/assets/144571801/ba9e2bda-1b52-4d12-ad76-cd333b38e1eb.png" alt="Java" title="Java" />
    <img width="20" src="https://github.com/SER516-Clever/SER516-Team-Clever/assets/144571801/18933548-0d4d-4241-aca4-551411cbb1bc.png" alt="Spring" title"Spring" />
    <img width="20" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
    <img width="20" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/>
    <img width="20" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/>
    <img width="20" src="https://user-images.githubusercontent.com/25181517/184146221-671413cb-b1ae-47db-a232-b37c99281516.png" alt="SonarQube" title="SonarQube"/>
    <img width="20" src="https://user-images.githubusercontent.com/25181517/184117132-9e89a93b-65fb-47c3-91e7-7d0f99e7c066.png" alt="pytest" title="pytest"/>
    <img width="20" src="https://github.com/SER516-Clever/SER516-Team-Clever/assets/144571801/5494714f-1bcf-4d86-ad76-63b3048adad3.png" alt="Junit5" title="Junit5" />
    <img width="60" src="https://github.com/SER516-Clever/SER516-Team-Clever/assets/144571801/80c8e68e-baf3-4afe-a7fd-0f87deab9ede.png" alt="FastAPI" title="FastAPI" />
</div>

## Taiga API Integration

This project aims to interact with the Taiga API to visualize various metrics. Each metric is computed within its own microservice.

## Running the Application

- ### Running the Application using Docker

  To run the application this way, you need to install docker on your system first. Docker is an application that
  uses containerization technology to package software and its dependencies into standardized units called containers. 
  You can download docker to your system from- https://docs.docker.com/get-docker/.

  To run the application using docker, go to the folder - SER516-Team-Cleaveland (The base folder of the project),
  and run the command- 

   ``` bash
   cd SER516-Team-Clever
   docker-compose up --build -d
   ```
  It should run a multi-container application, which contains the front-end and the back-end applications. 
  Visit http://localhost:3000 to start the application. 

## Using the application
  
- ### Getting Taiga Project Slug

To interact with the Taiga API using the provided Python script, you will need the project slug of your Taiga project. Follow these steps to find the project slug:

1. **Login to Taiga**: Open your web browser and log in to your Taiga account.

2. **Select the Project**: Navigate to the project for which you want to obtain the project slug.

3. **Project URL**: Look at the URL in your browser's address bar while you are inside the project. The project slug is the part of the URL that comes after the last slash     ("/"). For example:


- ### Fetch Metrics from Application
1. Enter username and password of taiga account to login
2. Project page will be displayed
3. Enter project slug eg: ser516asu-ser516-team-cleveland
4. Select type of metric from dropdown.
5. Submit to get the metric displayed on the same screen
