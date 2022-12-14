
import socketio
from aiohttp import web

sio = socketio.AsyncServer()
app = web.Application()

sio.attach(app)

## we can define aiohttp endpoints just as we normally
## would with no change
async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

## If we wanted to create a new websocket endpoint,
## use this decorator, passing in the name of the
## event we wish to listen out for
@sio.on('message')
async def print_message(sid, message):
    ## When we receive a new event of type
    ## 'message' through a socket.io connection
    ## we print the socket ID and the message
    print("Socket ID: " , sid)
    print(message)
    
@sio.on("getCardPicture")
async def get_card_picture(name):
    #TODO:"https://www.youtube.com/watch?v=Kg-sxVmCt5Q"
    pass

## pattern to receive id of data and send 
@sio.event("sendAnyData")
def my_message(dataid):
    print('message received with ', dataid)
    sio.emit('my response', {'response': 'my response'})

## We bind our aiohttp endpoint to our app
## router
app.router.add_get('/', index)

## We kick off our server
if __name__ == '__main__':
    web.run_app(app)