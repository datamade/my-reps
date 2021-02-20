# My Reps

My Reps helps you locate and contact your federal, state, county and local elected representatives. Based on [my-reps-pbp](https://github.com/datamade/my-reps-pbp) by [DataMade](https://datamade.us/) and [Participatory Budgeting Project](http://participatorybudgeting.org/). Powered by the [Google Civic Information API](https://developers.google.com/civic-information/).

For more, read our launch blog post: "[We find your reps so you don't have to](https://datamade.us/blog/we-find-your-reps-so-you-dont-have-to)".

**Custom installations**: If you would like assistance setting up a customized version of this tool, contact DataMade: info@datamade.us

## Demo site: [myreps.datamade.us](http://myreps.datamade.us)

![My Reps](https://datamade.us/images/blog/2016-07-26-we-find-your-reps-so-you-dont-have-to/img1.jpg)

## Organizers: reuse our code!

We built this tool to be open source and easy to repurpose. Feel free to copy, reuse, and customize the My Reps codebase.

Here's how to do it:

#### 1. Fork this repository

Click the 'Fork' button in the upper right corner of this page to copy it to your GitHub account.

![Fork this repo](https://help.github.com/assets/images/help/repository/fork_button.jpg)

#### 2. Clone this project to your local computer

Next, you can clone it to your local computer (requires the command line):
``` bash
git clone git@github.com:your-name-here/my-reps.git
cd my-reps
```

You can use [GitHub Desktop](https://desktop.github.com/) instead if you are not familiar with the command line.

#### 3. Add your Google API key

For the address search, map and representative lookup to work, you'll need to get a Google API key. You can get yours and enable it by following these instructions: https://developers.google.com/maps/documentation/javascript/get-api-key

You'll need to make sure that you enable the following API services from Google:

* Geocoding API
* Geolocation API
* Maps Javascript API
* Google Civic Information API
* Places API

Read Google's instructions on how to enable these services: https://support.google.com/googleapi/answer/6158841?hl=en

When you get a key, set the `google_api_key` in `_config.yml`.

```
port:  5000
markdown: kramdown
name: "My Reps"

...

google_api_key: YOUR API KEY GOES HERE
```

#### 4. Modify the `index.html` and `/js/lookup_tool.js` files as needed

Some examples of things you can do:

**Customize the messaging**

First, create a new tagline in the `_layouts/default.html` page.

```html
<div class='text-center'>
    <h1><a href='index.html'>My Reps</a></h1>
    <!-- Update this tagline! -->
    <p class='lead'>Enter your address to <strong>find and contact</strong> your federal, state, county and local elected representatives</p>
</div>
```

Then, add text to the top of the `index.html` page.

```html
---
layout: default
---

<p class='text-center'>This is my call to action. Let's do something about it!</p>

<div class="row">
...

```

**Change the instructions in the 'contact' popup for each representative**

You can change the text that displays when you click the 'Contact' button next to each representative. Go to the `modalGuts` section in `index.html` and look for 'Add your contact instructions here!'.

Note that we're using [EJS templates](http://www.embeddedjs.com/) for this part, so mind the template tags.

**Limit your results to specific levels of government (local, county, state & federal)**

In `js/lookup_tool.js` you can toggle if you want to show federal, state, county and local government representatives.

```javascript

var show_federal = true; //change this to false to hide federal results
var show_state   = true;
var show_county  = true;
var show_local   = true;

```

#### 5. Run it

This website is built using Jekyll. You will need to [install it first](http://jekyllrb.com/docs/installation/).

```console
jekyll serve -w
```

Then, open your web browser and navigate to http://localhost:5000

#### 6. Deploy it with GitHub pages

**GitHub pages** You can host your table on GitHub pages for free! Once you've made all your changes and committed them, push everything in the `master` branch to `gh-pages`, which automatically enables GitHub pages.
```bash
git push origin master:gh-pages
```

Then navigate to http://your-github-username.github.io/my-reps/

Read more on working with [GitHub pages projects](https://help.github.com/articles/user-organization-and-project-pages/#project-pages).

#### 7. Add it as an iframe on your site (optional)

Want to embed your nifty table on your website? You can use an [iframe](http://www.w3schools.com/tags/tag_iframe.asp). Once you've deployed your table (above in step 5) you can link to it in an iframe right in your HTML.

Here's an example:

```html
<iframe style="border-style: none;" src="https://datamade.github.io/my-reps/" height="950" width="600"></iframe>
```

If you need professional assistance, contact DataMade at info@datamade.us

## Reporting outdated or missing information

Information on elected officials comes from the [Google Civic Information API](https://developers.google.com/civic-information/), which aggregates data across the United States on elected officials in federal, state, county and local government offices.

Sometimes data is outdated or missing. If you notice an issue with the data, please [report it to Google](https://docs.google.com/forms/d/e/1FAIpQLScFpFTOkTpm0YoerLLprY_ySS9PRXLsu27SM01hebHqkefW2Q/viewform).

## Web dependencies

Data comes from the [Google Civic Information API](https://developers.google.com/civic-information/).

We used the following open source tools:

* [Jekyll](http://jekyllrb.com/docs/installation/) - Static website framework
* [Bootstrap](http://getbootstrap.com/) - Responsive HTML, CSS and Javascript framework
* [jQuery Address](https://github.com/asual/jquery-address) - javascript library creating RESTful URLs
* [Google Civic Information API](https://developers.google.com/civic-information/) - API for looking up elected representatives in the USA

## Team

* Derek Eder - developer, content
* Eric van Zanten - developer

## Errors and Bugs

If something is not behaving intuitively, it is a bug, and should be reported.
Report it here: https://github.com/datamade/my-reps/issues

## Note on Patches and Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Send a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2016 DataMade. Released under the [MIT License](https://github.com/datamade/my-reps/blob/master/LICENSE).
