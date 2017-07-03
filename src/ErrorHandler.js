import EventEmitter from 'events';

class ErrorHandler extends EventEmitter {

    handleError(code, message)  {
        this.emit('error', code, message);
    }

}

export default new ErrorHandler();