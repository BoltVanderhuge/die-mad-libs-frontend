# Die Mad Libs

Die Mad Libs is a web app that allows users to do create a madlib on a single page application. It was devloped for the Flatiron School Module 3 Project.

A user can sign up or login, and then has the option to create a madlib story based on story options. Once a user chooses a story, they can fill in a form with the nouns, verbs, adverbs, etc. requested, and then see their story. They can save and delete their own story while also being able to see and like other users' stories. 

This project uses:
* Backend: Ruby on Rails as an API
* Frontend: Javascript, CSS, SCSS
* Postgres Server
* Gems: 
    * `gem 'active_model_serializers', '~> 0.10.0'`
    * `gem 'activerecord-reset-pk-sequence'`
    * `gem 'rack-cors'`


## Prerequisites

Before you begin, ensure you have met the following requirements:
<!--- These are just example requirements. Add, duplicate or remove as required --->
* If you wish to make any CSS changes, this app uses the Live Sass Compiler Extension in VS Code


## Installing Die Mad Libs

To install Die Mad Libs, follow these steps:

Fork and clone this reposity. And the repository for the backend, [found here](https://github.com/BoltVanderhuge) 

For the backend, please run `bundle install` for the gem file and seed the database by running `rails db:seed` with the included seed file. For the database, be sure to run your preferred database and update the gemfile. Note: the current gemfile includes a gem for Postgres. If you are using Postgres, you can create a server by running `rails db:create`

## Using <project_name>

To use <project_name>, follow these steps:

* Sign up with your name and age.
* You can then choose from different stories to create your own new tale.
* Once your response has been submitted you can choose to save your story, this will allow you to review past stories you enjoyed and will also allow other users to like your story if they so choose.
* If you end up no longer wishing to have that story saved you can delete it as well.  
You can view other people's saved stories and lke them if he mood takes you.


## Contributors

Thanks to the following people who have contributed to this project:

* [@boltvanderhuge](https://github.com/BoltVanderhuge) 
* [@melissen-up](https://github.com/melissen-up) 




