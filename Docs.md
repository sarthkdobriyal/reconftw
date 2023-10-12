# Scanner Documentation


## Frontend (Deployment)
- Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`
- Check Node.js and npm versions: `node -v` and `npm -v`
- To run the frontend server:
    1. Install dependencies: `npm install`
    2. Create environment files:
         ```
         VITE_API_URL='scanner.skandashield.com/api'
         VITE_IMAGES_URL='scanner.skandashield.com'
         VITE_AUTH_URL=https://scanner.skandashield.com/api
         ```
    3. Run development server: `npm run dev`
- To build the project and run the production server:
    1. Build: `npm run build`
    2. Preview: `npm run preview`
    3. To run permanently, create a new screen: `screen -S frontendsession`
    4. Run: `npm run preview`
    5. Press `ctrl+a ctrl+d` to exit the screen
    6. Press `ctrl+a esc` to edit
    7. The app will run even after closing

## Backend
- Install Python 3.8 and pip: `sudo apt-get install -y python3.8`
- Verify Python version: `python3.8`
- Install dependencies from requirements.txt: `pip install -r requirements.txt`
- Create environment file:
    ```
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DJANGO_DEBUG=
    ```
- Run database migrations: `python3 manage.py makemigrations` and `python3 manage.py migrate_schemas`
- Create superuser: `python3 manage.py createsuperuser`
- Add IP to CORS allowed
- Run development server on host on any port: `python manage.py runserver 127.0.0.1:8050`
- To run permanently, create a new screen and then run the server

## Redis and Celery
- Install Redis on Linux and run it
- Install Celery in the app
- To run Celery inside the project folder: `celery -A web worker -l info -P solo` or `celery -A web worker -l info --concurrency=10 --pool=gevent`
- To run Celery Flower, in another terminal run: `celery -A web flower --port=5656`
- To run Celery Beat, in another terminal run: `celery -A web beat -l info`

## Database
- Install PostgreSQL: https://tecadmin.net/how-to-install-postgresql-in-ubuntu-20-04/
- To run a PostgreSQL connection: `sudo -u postgres psql`
- Connection info: `\conninfo`
- To access pgAdmin server, go to http://localhost:5555/pgadmin4/browser/
- Admin credentials: admin@admin.com:admin@123
- To connect to Django, change the environment files

## Current Screens
- Screens running: frontend:4173, backend:9000, Celery, CeleryBeat, CeleryFlower
- Check all screens: `screen -ls`
- Create new screen: `screen -S <screen name>`
- To open any screen: `screen -r <screen name>`
- `ctrl+A ctrl+D`: exit screen
- `ctrl+A ESC`: scroll mode

## Credentials for App
- Admin: admin:recon@123
- Clients: client1:secretpassword123 (for all other clients as well)


