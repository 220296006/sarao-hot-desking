import  Employee 


class Desk:
    def __init__(self, location):
        self.location = location
        self.occupied = False
        self.occupant = None

    def check_in(employee_id, desk_id):
        employee = employee.employees[employee_id]
        desk = desks[desk_id]
        if not desk.occupied:
            employee.assigned_desk = desk
            desk.occupied = True
            desk.occupant = employee
            return True
        else:
            return False


    def check_out(employee_id):
        employee = employee.employees[employee_id]
        desk = employee.assigned_desk
        if desk:
            employee.assigned_desk = None
            desk.occupied = False
            desk.occupant = None
            return True
        else:
            return False


desks = {
    1: Desk("A1"),
    2: Desk("A2"),
    3: Desk("A3")

}
