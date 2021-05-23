# E-Commerce Backend
[Project Repo](https://github.com/gmpaier/ecommerce-backend)

## Description
The E-Commerce Backend is a program designed to store product, tag, and category information in a relational database which could support a front end E-Commerce site.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Walkthrough](#walkthrough)
* [Comments](#comments)
* [Questions](#questions)

## Installation 

Once this program has been downloaded from the repository, run schema.sql in your MySQL shell in order to initiate your database. You'll also want to create a .env file with your username and password credentials in DB_USER and DB_PW respectively; set DB_NAME='ecommerce_db'. As per usual, run an 'npm install' in your terminal in the same level as the package.json to install program dependencies. To seed the database, run 'npm run seed'.

## Usage

Once installed, this program can be run with the command 'npm start' to begin your server. This program has no associated front end, so it is best tested with an API client such as Insomnia. All routes are prefixed with /api/. Available endpoints include a get all, a get by id, a post, a put/update by ID, and a delete by ID route each for products, tags, and categories. 

## Walkthrough

Due to a time limit on my recording software, the walkthrough has been broken into two parts found here: [Part 1](https://drive.google.com/file/d/1NeQ8nvyTnDuXFY3A5BY4HPDak1RtnPAb/view) & [Part 2](https://drive.google.com/file/d/1irpF16PLUxeXFozM_yPxcFJ6PX7Jr62R/view).

## Comments

There seemed to be options in the routes provided to support posting a product without any associated tags, however they did not work as intended and posting a product without tags was not possible when I first recieved the starter code. As such, some of the given routes have been updated by myself.

## Questions

For any questions, please contact Griffin Paier via  
* Github: https://github.com/gmpaier