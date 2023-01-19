class Employee:
    def __init__(self, employee_id, name):
        self.employee_id = employee_id
        self.name = name
        self.assigned_desk = None

    # Set Employee    
    def setEmployee(self, employee_id, name):
        self.employee_id = employee_id
        self.name = name

    # Get Employee
    def getEmployee(self):
        return self

    # Display Employee
    def __repr__(self):
       return f"employee_id = {self.employee_id}, name = {self.name}"

employees = {
    1: Employee(1,"Thabiso Matsaba"),
    2: Employee(2,"Tinayo Baloyi"),
    3: Employee(3,"Ofaletsi Mokone")
}

print(repr(employees))  