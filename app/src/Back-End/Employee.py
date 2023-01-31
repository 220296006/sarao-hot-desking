# Employee.py class
# Date: 19/01/2022
# Author: Thabiso Matsaba

class Employee:
    def __init__(self, employee_id, name):
        self.employee_id = employee_id
        self.name = name
        self.assigned_desk = None
        self.unassign_desk = False 
        self.floor = None