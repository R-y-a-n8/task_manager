from flask_restful import Resource, reqparse
from models import Task, db


task_parser = reqparse.RequestParser()
task_parser.add_argument('title', type=str, required=True, help="Title is required")
task_parser.add_argument('completed', type=bool, required=False, default=False)


class TaskListResource(Resource):
    def get(self):
        return [task.json() for task in Task.query.all()]

    def post(self):
        args = task_parser.parse_args()
        new_task = Task(title=args['title'])
        db.session.add(new_task)
        db.session.commit()
        return new_task.json(), 201


class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get(task_id)
        if task:
            return task.json()
        return {"message": "Task not found"}, 404

    def put(self, task_id):
        task = Task.query.get(task_id)
        if task:
            args = task_parser.parse_args()
            task.title = args['title']
            task.completed = args['completed']
            db.session.commit()
            return task.json()
        return {"message": "Task not found"}, 404

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if task:
            db.session.delete(task)
            db.session.commit()
            return {"message": "Task deleted"}
        return {"message": "Task not found"}, 404
