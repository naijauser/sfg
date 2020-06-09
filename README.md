# sfg (Static file generator)

## How to run

### Using npm
RUN `npm start`

### Using Docker 
RUN `docker-compose up`

## Docs

### /add_page POST
This endpoint expects a .md file which contains the markdown for the page. To test, send a `POST` request with a `form-data` body with a file attached. The content of the file will be read and saved in a MongoDB database. This can be tested using postman or any other desired tool.

### /retrieve_page_html/:page_name GET
This endpoint returns a HTML formatted page uploaded earlier using `/add_page`. The formatted HTML uses a template stored in `/htmltemplates/blogpost.js`, the template is for a blog post, so we'll assume that only static pages of blogposts can be used. To get the HTML formatted file, send a `GET` request to the endpoint specifying the `page_name` parameter. Note that the `page_name` is the name of the file uploaded using the `/add_page` endpoint without the `.md`. For example if we uploaded a `blog.md` file, the `:page_name` parameter will be `blog`.

### /set_page_markdown PUT
This endpoint changes the content of earlier created pages. A `PUT` request is sent to the endpoint with a `form-data` body. The name of the page will be filename similar to the `/add_page` endpoint. In order to not get an error, the file must exist in the database.

### /list_pages GET
This endpoint returns a list of all the pages that have been created.

Look inside the file ./routes/file.js to see the workings of the endpoint.
