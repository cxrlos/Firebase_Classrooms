# Classroom Assignment

## Authors
[Carla Pérez](https://github.com/CarlaPerezGavilan) <br/>
[Carlos García](https://github.com/cxrlos)       
[Alejandra Nissan](https://github.com/AlejandraNissan) <br/>                                                                    

## Description
This is a POC Proof of concept for the inscription system of ITESM for classroom assignment. 

Our proof of concept shows the functionality of students on the system: 
- They can login to the platform. 
- They can check all of the existing classrooms with their location.
- They can flawlessly go through each classroom schedule, which is totally transparent. 


## What was used?
Throughout the project we stated the system was going to be hosted on AWS, and that still stands because we believe that platform can ensure many quality attributes are achieved. But, for the Proof Of Concept we found it to be more convinient to use firebase since it is a very simple platform. 


## Dependencies
- jquery-3.5.1.min.js

Modules of firebase:
- firebase-app.js
- firebase-analytics.js
- firebase-auth.js
- firebase-database.js

And of course the link to our firebase project:
- https://classroom-assignments-52a14.firebaseio.com

## Requirements
### Functional
* All Teachers and Administrative staff should have access to the system.
* Teachers and students have view rights only.
* Department Directors have write rights.
* Assignment should be only in the campus where the user belongs
* A confirmation email should be sent to the teacher and director once the assignment is done.
* Try and catch to avoid assignation of non available classrooms
* ITESM wants to have a screen on each room to indicate the availability of the room.
* An administrator can make a room not available for a certain period.
* Each campus has its own administrator.
### Non-Functional
* Solution should be easy to maintain.
* Solution has an intensive use one week before inscriptions.
* Solution should be scalable.
* Solution should be reliable and resilient.
### Constraints
* Application should be accessible from any device.
* The system should be available via the Internet.
* RTO should be less than 2 minutes
* Authentication should be using the current security system.
* RPO should be less than 2 minutes
