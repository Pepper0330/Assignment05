# Noah Vickerson 30206712
#Gabe Delisle

from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

students = [
    {
        "id": 1,
        "username": "Alice",
        "password": "password123",
        "email": "0Tm9a@example.com",
        "enrolled_courses": [1, 2, 3]
    }
    ]

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    if data["username"] in [student["username"] for student in students]:
        return jsonify({"success": False, "message": "Username already exists"})
    
    students.append({
        "id": len(students) + 1,
        "username": data["username"],
        "password": data["password"],
        "email": data["email"],
        "enrolled_courses": []
    })
    
    return jsonify({"success": True, "message": "Registration successful"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    upass = {student["username"]:student["password"] for student in students}
    if data["username"] in upass.keys() and data["password"] == upass[data["username"]]:
        return jsonify({"success": True, "message": "Login successful", "id": [student["id"] for student in students if student["username"] == data["username"]][0]})
    
    return jsonify({"success": False, "message": "Incorrect username or password", "id": -1})

@app.route("/testimonials", methods=["GET"])
def testimonials():
    with(open("testimonials.json", "r")) as f:
        data = json.load(f)
        random.shuffle(data)

        return jsonify([data[i] for i in range(2)])

@app.route("/enroll/<student_id>", methods=["POST"])
def enroll(student_id):
    data = request.get_json()
    
    if(int(student_id) not in [student["id"] for student in students]):
        return jsonify({"success": False, "message": "Invalid student ID"})
    
    student = [student for student in students if student["id"] == int(student_id)][0]

    if(data["id"] in student["enrolled_courses"]):
        return jsonify({"success": False, "message": "Course already enrolled"})

    student["enrolled_courses"].append(data["id"])
    return jsonify({"success": True, "message": "Enrollment successful"})

@app.route("/drop/<student_id>", methods=["DELETE"])
def drop(student_id):
    data = request.get_json()

    if(int(student_id) not in [student["id"] for student in students]):
        return jsonify({"success": False, "message": "Invalid student ID"})
    
    student = [student for student in students if student["id"] == int(student_id)][0]

    if(data["id"] not in student["enrolled_courses"]):
        return jsonify({"success": False, "message": "Not enrolled in course"})
    
    student["enrolled_courses"].remove(data["id"])
    return jsonify({"success": True, "message": "Drop successful"})

@app.route("/courses", methods=["GET"])
def courses():
    with open("courses.json", 'r') as f:
        data = json.load(f)
        random.shuffle(data)

        return jsonify(data)
    
@app.route("/student_courses/<student_id>", methods=["GET"])
def getStudentCourses(student_id):
    if(int(student_id) not in [student["id"] for student in students]):
        return jsonify({"success": False, "message": "Invalid student ID"})
    
    student = [student for student in students if student["id"] == int(student_id)][0]

    with open("courses.json", 'r') as f:
        courses_data = json.load(f)
        print("cab")

        student_courses = [course for course in courses_data if (course["id"] in student["enrolled_courses"])]
        return jsonify(student_courses)
    
if __name__ == "__main__":
    app.run(debug=True)
