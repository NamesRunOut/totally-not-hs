# Python backend
## Run
use unix based operating system or vsl tool for windows and type the following command:
```
gunicorn -k eventlet -w 1 --reload app:app
```
## Prerequisites
- installed gunicorn
- installed eventlet (be aware of version!) i was met the following issue and this post have showed me how to fix (https://stackoverflow.com/questions/58589138/error-class-uri-eventlet-invalid-or-not-found) 
- installed python-socketio