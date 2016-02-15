# Burning Glass + Institute for Public Policy Research - UK Jobs 

## Running locally

``` bash
git clone git@github.com:datamade/bg-ippr-jobs.git
cd bg-ippr-jobs

# to run locally
jekyll serve
```

navigate to http://localhost:5000/

## Updating data
We use Make to prepare the data.

**1. Initial setup**  
a. ensure that `PG_USER` in `config.mk` is your username  
b. create the database (you'll only have to do this once)  
```
createdb burning_glass
```
c. add postgis extension
```
psql burning_glass
create extension postgis;
```
d. make sure you have the following OS dependencies (brew install these if missing): `gdal`, `postgis`  
e. make sure you have the following python libraries: `csvkit`, `psycopg2`, `MySQL-python`

**2. Add new data**  
The main excel file should be named `BGT_UK_IPPR_Data.xlsx` & it should go in `data/`  

**3. Prep the data**  
to prep everything:
```
cd data/
make clean
make all
```

# Web dependencies
We used the following open source tools:

* [Bootstrap](http://getbootstrap.com/) - Responsive HTML, CSS and Javascript framework
* [Leaflet](http://leafletjs.com/) - javascript library interactive maps
* [jQuery Address](https://github.com/asual/jquery-address) - javascript library creating RESTful URLs
* [GitHub pages](https://pages.github.com/) - free static website hosting

## Team

* Derek Eder - developer, content
* Cathy Deng - developer

## Errors / Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/datamade/bg-ippr-jobs/issues

## Note on Patches/Pull Requests
 
* Fork the project.
* Make your feature addition or bug fix.
* Commit, do not mess with rakefile, version, or history.
* Send a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2015 DataMade and Chicago Area Fair Housing Alliance. Released under the [MIT License](https://github.com/datamade/bg-ippr-jobs/blob/master/LICENSE).
