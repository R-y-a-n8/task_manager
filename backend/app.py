from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
api = Api(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)


class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return [{'id': task.id, 'title': task.title, 'completed': task.completed} for task in tasks]

    def post(self):
        new_task = Task(title="New Task", completed=False)
        db.session.add(new_task)
        db.session.commit()
        return {'id': new_task.id, 'title': new_task.title, 'completed': new_task.completed}, 201


class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get(task_id)
        if task:
            return {'id': task.id, 'title': task.title, 'completed': task.completed}
        return {'message': 'Task not found'}, 404

    def put(self, task_id):
        task = Task.query.get(task_id)
        if task:
            task.completed = not task.completed
            db.session.commit()
            return {'id': task.id, 'title': task.title, 'completed': task.completed}
        return {'message': 'Task not found'}, 404

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if task:
            db.session.delete(task)
            db.session.commit()
            return {'message': 'Task deleted successfully'}
        return {'message': 'Task not found'}, 404

api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')

if __name__ == '__main__':
    db.create_all()  
    app.run(debug=True)
