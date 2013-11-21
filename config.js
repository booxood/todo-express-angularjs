var dbUrl = '127.0.0.1:27017/todo';

if(process.env.NODE_ENV && ''.toLowerCase.apply(process.env.NODE_ENV) === 'test'){
    dbUrl = '127.0.0.1:27017/todo_test';
};

exports.dbUrl = dbUrl;
